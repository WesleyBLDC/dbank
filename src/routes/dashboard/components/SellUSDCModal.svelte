<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let usdcAmount = ''
    let kshAmount = ''
    let phoneNumber = ''
    let isSuccess = false
    let successPhoneNumber = ''

    const CONVERSION_RATE = 128.21 // 1 USDC to KSH (inverse of 0.0078)

    function closeModal() {
        dispatch('close')
    }

    function calculateKSH() {
        kshAmount = (parseFloat(usdcAmount) * CONVERSION_RATE).toFixed(2)
    }

    function confirmSell() {
        // Implement sell logic here
        console.log('Selling USDC')
        isSuccess = true
        successPhoneNumber = phoneNumber
    }

    $: {
        if (usdcAmount) {
            calculateKSH()
        }
    }
</script>

<div class="modal modal-open">
    <div class="modal-box">
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
                <p class="text-center text-lg font-semibold">
                    Successfully sold {usdcAmount} USDC for<br />{successPhoneNumber}
                </p>
                <button on:click={closeModal} class="btn btn-primary mt-4">Close</button>
            </div>
        {:else}
            <h3 class="mb-4 text-lg font-bold">Sell USDC</h3>
            <div class="form-control mb-4 w-full">
                <label class="label">
                    <span class="label-text">Phone Number:</span>
                </label>
                <input
                    type="tel"
                    bind:value={phoneNumber}
                    placeholder="Enter phone number"
                    class="input input-bordered w-full"
                    required
                />
            </div>
            <div class="form-control mb-4 w-full">
                <label class="label">
                    <span class="label-text">Amount in USDC:</span>
                </label>
                <div class="relative">
                    <input
                        type="number"
                        bind:value={usdcAmount}
                        placeholder="0.00"
                        class="input input-bordered w-full pr-16"
                    />
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        USDC
                    </span>
                </div>
            </div>
            <div class="my-2 flex justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
            <div class="form-control mb-4 w-full">
                <label class="label">
                    <span class="label-text">Amount in Kenyan Shilling:</span>
                </label>
                <div class="relative">
                    <input
                        type="number"
                        bind:value={kshAmount}
                        placeholder="0.00"
                        class="input input-bordered w-full pr-12"
                        disabled
                    />
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        KSh
                    </span>
                </div>
            </div>
            <div class="modal-action">
                <button on:click={confirmSell} class="btn btn-primary">Confirm Sell</button>
                <button on:click={closeModal} class="btn">Cancel</button>
            </div>
        {/if}
    </div>
</div>
