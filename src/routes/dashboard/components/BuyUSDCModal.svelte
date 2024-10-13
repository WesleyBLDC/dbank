<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let kshAmount = ''
    let usdcAmount = ''

    function closeModal() {
        dispatch('close')
    }

    function confirmBuy() {
        // Implement buy logic here
        console.log('Buying USDC')
        closeModal()
    }
</script>

<div class="modal modal-open">
    <div class="modal-box">
        <h3 class="mb-4 text-lg font-bold">Buy USDC</h3>
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
                />
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                    KSh
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
        <div class="modal-action">
            <button on:click={confirmBuy} class="btn btn-primary">Confirm Buy</button>
            <button on:click={closeModal} class="btn">Cancel</button>
        </div>
    </div>
</div>
