<!--
@component

The `AssetStats` component implements a chunk of statistics that we can display
to the user on the `/dashboard` page. We are showing the user the asset balances
for each asset they hold a trustline to.
-->

<script>
    // We import the `page` store into this component so we can access the
    // loaded data the `+page.svelte` file has access to without having to pass
    // props to this component
    import { page } from '$app/stores'
    import DepositModal from '../components/DepositModal.svelte'
    import WithdrawModal from '../components/WithdrawModal.svelte'
    import BuyUSDCModal from '../components/BuyUSDCModal.svelte'
    import SellUSDCModal from '../components/SellUSDCModal.svelte'

    let showDepositModal = false
    let showWithdrawModal = false
    let showBuyUSDCModal = false
    let showSellUSDCModal = false

    function openDepositModal() {
        showDepositModal = true
    }

    function openWithdrawModal() {
        showWithdrawModal = true
    }

    function openBuyUSDCModal() {
        showBuyUSDCModal = true
    }

    function openSellUSDCModal() {
        showSellUSDCModal = true
    }

    function closeModals() {
        showDepositModal = false
        showWithdrawModal = false
        showBuyUSDCModal = false
        showSellUSDCModal = false
    }
</script>

<h3 class="mb-4 text-2xl font-bold">Overview</h3>
<div class="mb-4 rounded-lg bg-gray-800 p-6 shadow-lg">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        {#each $page.data.balances as balance}
            <div class="rounded-lg bg-gray-700 p-4">
                <div class="text-sm text-gray-400">{balance.asset_code ?? 'XLM'} Balance</div>
                <div class="text-2xl font-bold text-white">
                    {parseFloat(balance.balance).toFixed(2)}
                    {balance.asset_code ?? 'XLM'}
                </div>
            </div>
        {/each}
    </div>
</div>
<div class="grid grid-cols-1 gap-4">
    <button on:click={openDepositModal} class="btn btn-primary w-full">Deposit</button>
    <div class="grid grid-cols-2 gap-4">
        <button on:click={openBuyUSDCModal} class="btn btn-success w-full">Buy USDC</button>
        <button on:click={openSellUSDCModal} class="btn btn-error w-full">Sell USDC</button>
    </div>
</div>

{#if showDepositModal}
    <DepositModal on:close={closeModals} />
{/if}

{#if showWithdrawModal}
    <WithdrawModal on:close={closeModals} />
{/if}

{#if showBuyUSDCModal}
    <BuyUSDCModal on:close={closeModals} />
{/if}

{#if showSellUSDCModal}
    <SellUSDCModal on:close={closeModals} />
{/if}
<!-- <h3>Assets Overview</h3>
<div class="stats stats-vertical w-full bg-primary text-primary-content shadow lg:stats-horizontal">
    {#each $page.data.balances as balance}
        <div class="stat">
            <div class="stat-title">{balance.asset_code ?? 'XLM'} Balance</div>
            <div class="stat-value">
                {parseFloat(balance.balance).toFixed(2)}
                {balance.asset_code ?? 'XLM'}
            </div>
        </div>
    {/each}
</div> -->
