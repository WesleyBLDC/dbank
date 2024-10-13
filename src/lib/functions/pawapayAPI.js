/**
 * Sends a POST request to create a deposit.
 * 
 * @param {number} amount - The currency of the deposit (e.g., ZMW).
 * @param {string} currency - The country code (e.g., ZMB).
 * @param {string} correspondent - The correspondent (e.g., MTN_MOMO_ZMB).
 * @param {string} payer - The MSISDN payer address (e.g., '260763456789').
 * @param {string} statementDescription - A description for the statement.
 * @returns {Promise<Object>} - The response data or an error message.
 */
export async function requestDeposit(amount, currency, correspondent, payer, statementDescription) {
  const token = 'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjM0NzAiLCJleHAiOjIwNDQyOTA0NTUsImlhdCI6MTcyODc1NzY1NSwicG0iOiJEQUYsUEFGIiwianRpIjoiYzgyYzdiNGQtMGE2Zi00NTVmLWEzNzctNTY2NzViNzI2N2M4In0.-V9GqsJiBpjLnkbraPmtqbU35XnY_QX__iynrSb91wJ6aFXjvOrmsSZPIH-O6Q0rChdLI_HNv57ChDV2wdQksA';  // Replace <token> with your actual token
  const url = 'https://api.sandbox.pawapay.io/deposits';

  const customerTimestamp = new Date().toISOString();

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      depositId: Math.random() * 100000,  // Insert depositId dynamically
      amount: amount.toString(),  // Ensure the amount is a string
      currency: currency,
      correspondent: correspondent,
      payer: {
        type: 'MSISDN',
        address: {
          value: payer  // Dynamic payer value (MSISDN number)
        }
      },
      customerTimestamp: customerTimestamp,
      statementDescription: statementDescription
    })
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
      return { error: err.message };
    } else {
      console.error('Unknown error:', err);
      return { error: 'An unknown error occurred.' };
    }
  }
}

// Example usage
// requestDeposit('INSERT_UUID_FOR_DEPOSIT', 15, 'ZMW', 'MTN_MOMO_ZMB', '260763456789', 'Payment for service')
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

/**
 * Sends a GET request to retrieve a deposit by ID.
 * 
 * @param {string | number} depositId - The ID of the deposit to retrieve.
 * @returns {Promise<Object>} - The deposit data or an error message.
 */
export async function getDeposit(depositId) {
  const token = 'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjM0NzAiLCJleHAiOjIwNDQyOTA0NTUsImlhdCI6MTcyODc1NzY1NSwicG0iOiJEQUYsUEFGIiwianRpIjoiYzgyYzdiNGQtMGE2Zi00NTVmLWEzNzctNTY2NzViNzI2N2M4In0.-V9GqsJiBpjLnkbraPmtqbU35XnY_QX__iynrSb91wJ6aFXjvOrmsSZPIH-O6Q0rChdLI_HNv57ChDV2wdQksA';  // Replace <token> with your actual token
  const url = `https://api.sandbox.pawapay.io/deposits/${depositId}`;  // Replace depositId dynamically

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'  // Ensure correct content type
    }
  };

  try {
    // Send the GET request
    const response = await fetch(url, options);
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the response JSON
    const data = await response.json();
    return data;

  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
      return { error: err.message };
    } else {
      console.error('Unknown error:', err);
      return { error: 'An unknown error occurred.' };
    }
  }
}

