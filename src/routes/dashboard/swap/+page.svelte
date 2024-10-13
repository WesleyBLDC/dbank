<script>
    import { MenuIcon } from 'svelte-feather-icons'

    let sellAsset = 'XLM'
    let receiveAsset = 'BTC'
    let sellAmount = ''
    let receiveAmount = ''

    const assets = [
        { code: 'XLM', icon: '⚡' },
        { code: 'BTC', icon: '₿' },
        { code: 'ETH', icon: 'Ξ' },
        { code: 'USDC', icon: '$' },
    ]
</script>

<h1>Swap</h1>
<p>
    Exchange your assets quickly and easily. Select the assets you want to swap and enter the
    amount.
</p>

<div class="card bg-base-100 shadow-xl">
    <div class="card-body">
        <div class="flex justify-between">
            <h2 class="card-title">Swap</h2>
            <button class="btn btn-circle btn-ghost">
                <MenuIcon size="24" />
            </button>
        </div>

        <div class="form-control">
            <label class="label" for="sell-amount">
                <span class="label-text">You sell</span>
            </label>
            <div class="input-group">
                <select bind:value={sellAsset} class="select select-bordered">
                    {#each assets as asset}
                        <option value={asset.code}>{asset.icon} {asset.code}</option>
                    {/each}
                </select>
                <input
                    id="sell-amount"
                    type="number"
                    placeholder="0"
                    class="input input-bordered w-full"
                    bind:value={sellAmount}
                />
            </div>
        </div>

        <div class="divider">↓</div>

        <div class="form-control">
            <label class="label" for="receive-amount">
                <span class="label-text">You receive</span>
            </label>
            <div class="input-group">
                <select bind:value={receiveAsset} class="select select-bordered">
                    {#each assets as asset}
                        <option value={asset.code}>{asset.icon} {asset.code}</option>
                    {/each}
                </select>
                <input
                    id="receive-amount"
                    type="number"
                    placeholder="0"
                    class="input input-bordered w-full"
                    bind:value={receiveAmount}
                />
            </div>
        </div>

        <div class="card-actions mt-4 justify-end">
            <button class="btn btn-primary btn-block">Connect Wallet</button>
        </div>
    </div>
</div>
