<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte'

    const dispatch = createEventDispatcher()
    // const { update: updateBalances } = getContext('balances')

    let phoneNumber = ''
    let amount = ''
    let selectedCurrency = 'USDC'
    let loading = false
    let error: string | null = null
    let isSuccess = false
    let successPhoneNumber = ''

    function close() {
        dispatch('close')
    }

    async function handleSubmit() {
        loading = true
        error = null

        try {
            // Convert USDC to ZMW if necessary (assuming 1 USDC = 20 ZMW)
            const depositAmount = selectedCurrency === 'USDC' ? Number(amount) * 20 : Number(amount)
            const depositCurrency = selectedCurrency === 'USDC' ? 'ZMW' : selectedCurrency

            const depositDetails = {
                amount: depositAmount,
                currency: depositCurrency,
                provider: 'MTN_MOMO_ZMB',
                phoneNumber,
                description: 'Deposit via PawaPay',
            }

            // Invoke the Stellar contract using the API endpoint
            const command = `stellar contract invoke --id CC4HZMV6HBBQH2NTT77OWK65TZKM3ONFLUV3RIP5DZIG5IPBE7IISDGM --source-account SCW7AWQJCPLPTAZGPHWWIEVWA2N2R32GWNJZM75Q2HT6UI5FNYQYW3JD --network testnet  -- transfer --from GCCUGGJ6ZIKL2YHCB2IZPCCXF52AURCOWGL3UCDPNWY5CSS5GRLD3XKK --to GDZJXADTUPOU5BYEX5QM3WMWAEXWVIWGYA2EQ5CJ35CLHH5SJOCGEXJ6 --amount 10000000000000`

            const response = await fetch('/api/invoke-contract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to invoke Stellar contract')
            }

            console.log('Contract invocation result:', data.result)

            // Check if the result contains successful contract execution
            if (data.result.includes('in_successful_contract_call: true')) {
                isSuccess = true
                successPhoneNumber = phoneNumber

                // Update balances
                updateBalances((currentBalances) => {
                    return currentBalances.map((balance) => {
                        if (balance.asset_code === selectedCurrency) {
                            return {
                                ...balance,
                                balance: (parseFloat(balance.balance) + parseFloat(amount)).toFixed(
                                    7
                                ),
                            }
                        }
                        return balance
                    })
                })

                dispatch('deposit', depositDetails)
            } else {
                throw new Error('Contract execution was not successful')
            }
        } catch (err) {
            console.error('Deposit preparation failed:', err)
            error =
                err instanceof Error
                    ? err.message
                    : 'An error occurred while preparing your deposit'
        } finally {
            loading = false
        }
    }

    $: currencySymbol = selectedCurrency
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
>
    <div class="relative mx-auto w-full max-w-md px-4">
        <div
            class="relative flex w-full flex-col rounded-lg border-0 bg-gray-800 shadow-xl outline-none focus:outline-none"
        >
            <div
                class="flex items-center justify-between rounded-t border-b border-gray-700 px-6 py-4"
            >
                <h3 class="text-2xl font-bold text-white">
                    {isSuccess ? 'Deposit Status' : 'Deposit'}
                </h3>
                <button
                    class="ml-auto flex h-8 w-8 items-center justify-center border-0 bg-transparent text-2xl leading-none text-white opacity-50 transition-opacity duration-200 ease-in-out hover:opacity-100"
                    on:click={close}
                >
                    <span class="block">&times;</span>
                </button>
            </div>
            {#if isSuccess}
                <div class="flex flex-col items-center justify-center p-6">
                    <svg
                        class="mb-4 h-16 w-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                    <p class="text-center text-lg font-semibold text-white">
                        Deposit Successful to<br />{successPhoneNumber}
                    </p>
                </div>
            {:else}
                <form on:submit|preventDefault={handleSubmit} class="space-y-6 p-6">
                    <div>
                        <span class="mb-2 block text-sm font-medium text-gray-300">Currency</span>
                        <div class="flex space-x-4">
                            <label class="inline-flex items-center">
                                <input
                                    type="radio"
                                    class="form-radio text-blue-600"
                                    name="currency"
                                    value="USDC"
                                    bind:group={selectedCurrency}
                                    checked
                                />
                                <span class="ml-2 text-white">USDC</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input
                                    type="radio"
                                    class="form-radio text-blue-600"
                                    name="currency"
                                    value="KES"
                                    bind:group={selectedCurrency}
                                />
                                <span class="ml-2 text-white">Kenyan Shilling</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label
                            for="phoneNumber"
                            class="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            class="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                            bind:value={phoneNumber}
                            required
                        />
                    </div>
                    <div>
                        <label for="amount" class="mb-2 block text-sm font-medium text-gray-300">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            class="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                            bind:value={amount}
                            required
                        />
                    </div>
                    <div class="flex justify-end">
                        <button
                            type="submit"
                            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            disabled={loading}
                        >
                            {#if loading}
                                Processing...
                            {:else}
                                Confirm Deposit
                            {/if}
                        </button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
<div class="fixed inset-0 z-40 bg-black opacity-25"></div>

{#if error}
    <div class="mt-4 text-sm text-red-500">{error}</div>
{/if}
