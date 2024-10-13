use obi::{OBIDecode, OBIEncode, OBISchema};
use owasm_kit::{execute_entry_point, ext, oei, prepare_entry_point};
use serde::{Deserialize, Serialize};
use std::str::FromStr;

// Input structure for the oracle
#[derive(OBIDecode, OBISchema)]
struct Input {
    // number: String,
    // amount: String,
    transaction_id: String,
}

// Output structure for the oracle
#[derive(OBIEncode, OBISchema)]
struct Output {
    is_valid: bool,
}

// Structs for API response
#[derive(Debug, Deserialize, Serialize, PartialEq)]
struct Address {
    value: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
struct Payer {
    r#type: String,
    address: Address,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
struct CorrespondentIds {
    financial_transaction_id: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
struct Metadata {
    order_id: String,
    customer_id: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
struct APIResponse {
    deposit_id: String,
    status: String,
    requested_amount: String,
    deposited_amount: String,
    currency: String,
    country: String,
    correspondent: String,
    payer: Payer,
    customer_timestamp: String,
    statement_description: String,
    created: String,
    correspondent_ids: CorrespondentIds,
    metadata: Metadata,
}

// Implement `FromStr` for `APIResponse` to handle parsing
impl FromStr for APIResponse {
    type Err = serde_json::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        serde_json::from_str(s)
    }
}

const DATA_SOURCE_ID: i64 = 98;
const EXTERNAL_ID: i64 = 0;

#[no_mangle]
fn prepare_impl(input: Input) {
    oei::ask_external_data(
        EXTERNAL_ID,
        DATA_SOURCE_ID,
        input.transaction_id.as_bytes(),
    );
}

#[no_mangle]
fn execute_impl(_input: Input) -> Output {
    // Load and parse the response from external data
    let res: Option<APIResponse> = ext::load_majority::<APIResponse>(EXTERNAL_ID);

    match res {
        Some(api_response) => Output {
            is_valid: api_response.status.eq_ignore_ascii_case("COMPLETED"),
        },
        None => Output {
            is_valid: false,
        },
    }
}


// Entry points for the oracle
prepare_entry_point!(prepare_impl);
execute_entry_point!(execute_impl);
