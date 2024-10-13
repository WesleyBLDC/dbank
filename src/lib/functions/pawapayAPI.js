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
    const token =
        'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjM0NzAiLCJleHAiOjIwNDQyOTA0NTUsImlhdCI6MTcyODc1NzY1NSwicG0iOiJEQUYsUEFGIiwianRpIjoiYzgyYzdiNGQtMGE2Zi00NTVmLWEzNzctNTY2NzViNzI2N2M4In0.-V9GqsJiBpjLnkbraPmtqbU35XnY_QX__iynrSb91wJ6aFXjvOrmsSZPIH-O6Q0rChdLI_HNv57ChDV2wdQksA'
    const url = '/api/deposits' // This will be proxied to https://api.sandbox.pawapay.io/deposits

    const customerTimestamp = new Date().toISOString()

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            depositId: Math.random().toString().slice(2, 11),
            amount: amount.toString(),
            currency: currency,
            correspondent: correspondent,
            payer: {
                type: 'MSISDN',
                address: {
                    value: payer,
                },
            },
            customerTimestamp: customerTimestamp,
            statementDescription: statementDescription,
        }),
        mode: 'cors',
        credentials: 'include',
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('API Error:', errorText)
            throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.error('Error:', err.message)
        return { error: err.message }
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
    const token =
        'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjM0NzAiLCJleHAiOjIwNDQyOTA0NTUsImlhdCI6MTcyODc1NzY1NSwicG0iOiJEQUYsUEFGIiwianRpIjoiYzgyYzdiNGQtMGE2Zi00NTVmLWEzNzctNTY2NzViNzI2N2M4In0.-V9GqsJiBpjLnkbraPmtqbU35XnY_QX__iynrSb91wJ6aFXjvOrmsSZPIH-O6Q0rChdLI_HNv57ChDV2wdQksA'
    const url = `/api/deposits/${depositId}`

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('API Error:', errorText)
            throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.error('Error:', err.message)
        return { error: err.message }
    }
}
