<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let phoneNumber = ''
    let amount = ''

    function close() {
        dispatch('close')
    }

    function handleSubmit() {
        // TODO: Implement form submission logic
        console.log('Submitted:', { phoneNumber, amount })
        // Close the modal after submission
        close()
    }
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
>
    <div class="relative mx-auto w-full max-w-md px-4">
        <div
            class="relative flex w-full flex-col rounded-lg border-0 bg-gray-800 shadow-lg outline-none focus:outline-none"
        >
            <div
                class="flex items-center justify-between rounded-t border-b border-gray-600 px-4 py-2"
            >
                <h3 class="text-xl font-semibold text-white">Deposit</h3>
                <button
                    class="ml-auto flex h-8 w-8 items-center justify-center border-0 bg-transparent text-2xl leading-none text-white opacity-50 transition-opacity duration-200 ease-in-out hover:opacity-100"
                    on:click={close}
                >
                    <span class="block">×</span>
                </button>
            </div>
            <form on:submit|preventDefault={handleSubmit} class="p-4">
                <div class="mb-4">
                    <label for="phoneNumber" class="mb-2 block text-sm font-medium text-gray-300">
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
                <div class="mb-4">
                    <label for="amount" class="mb-2 block text-sm font-medium text-gray-300">
                        Amount to add (Kenyan Shilling)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        class="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                        bind:value={amount}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="fixed inset-0 z-40 bg-black opacity-25"></div>
