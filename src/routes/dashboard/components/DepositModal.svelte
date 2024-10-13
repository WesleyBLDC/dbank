<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let phoneNumber = ''
    let amount = ''
    let selectedCurrency = 'USDC'
    let isSuccess = false
    let successPhoneNumber = ''

    function close() {
        dispatch('close')
    }

    async function handleSubmit() {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        isSuccess = true
        successPhoneNumber = phoneNumber
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
                            Amount to add ({currencySymbol})
                        </label>
                        <div class="relative">
                            <span
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
                            >
                                {currencySymbol}
                            </span>
                            <input
                                type="number"
                                id="amount"
                                class="w-full rounded-lg border border-gray-600 bg-gray-700 py-2 pl-12 pr-3 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                                bind:value={amount}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button
                            type="submit"
                            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Confirm Deposit
                        </button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
<div class="fixed inset-0 z-40 bg-black opacity-25"></div>
