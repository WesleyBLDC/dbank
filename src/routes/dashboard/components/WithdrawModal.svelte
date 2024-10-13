<script>
    import { createEventDispatcher } from 'svelte'
    import { page } from '$app/stores'

    const dispatch = createEventDispatcher()

    function close() {
        dispatch('close')
    }
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
>
    <div class="relative mx-auto my-6 w-auto max-w-3xl">
        <div
            class="relative flex w-full flex-col rounded-lg border-0 bg-gray-800 shadow-lg outline-none focus:outline-none"
        >
            <div
                class="flex items-center justify-between rounded-t border-b border-solid border-gray-600 p-3"
            >
                <h3 class="text-xl font-semibold text-white">Withdraw</h3>
                <button
                    class="ml-auto border-0 bg-transparent p-1 text-xl font-semibold leading-none text-white opacity-50 outline-none hover:opacity-100 focus:outline-none"
                    on:click={close}
                >
                    ×
                </button>
            </div>
            <div class="relative flex-auto p-6">
                <p class="mb-4 text-lg leading-relaxed text-white">
                    The withdraw page allows you to send payments to other Stellar addresses. You
                    can select from a dropdown containing your contact list names, or you could
                    enter your own "Other..." public key.
                </p>

                <h2 class="mb-2 text-xl font-semibold text-white">Withdrawal Options</h2>
                <p class="mb-2 text-white">
                    Please complete the fields below to send a payment on the Stellar network:
                </p>

                <ul class="list-inside list-disc text-white">
                    <li>Select a destination from your contacts or enter a custom address</li>
                    <li>Enter the amount you wish to withdraw</li>
                    <li>Choose the asset you want to send</li>
                    <li>Add an optional memo for the transaction</li>
                </ul>

                <p class="mt-4 text-white">
                    Note: If the destination address is not a funded account, you will be informed
                    that you'll be using a `createAccount` operation, and must send at least 1 XLM.
                </p>
            </div>
            <div
                class="flex items-center justify-end rounded-b border-t border-solid border-gray-600 p-3"
            >
                <button
                    class="background-transparent px-4 py-1 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    on:click={close}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</div>
<div class="fixed inset-0 z-40 bg-black opacity-25"></div>
