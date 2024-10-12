<!--
@component

The `/dashboard/deposit` page allows users to view their public key for receiving deposits.
-->

<script>
    // We import any Svelte components we will need
    import TruncatedKey from '$lib/components/TruncatedKey.svelte'

    // We import any stores we will need to read and/or write
    import { page } from '$app/stores'
</script>

<h1>Deposit</h1>
<p>
    The <code>/dashboard/deposit</code> page displays your public key for receiving deposits on the Stellar
    network.
</p>

<h2>Your Public Key</h2>
<p>Use this address to receive deposits:</p>
<div class="rounded-lg bg-base-200 p-4">
    <TruncatedKey keyText={$page.data.publicKey} />
</div>

<p class="mt-4">
    To deposit funds, send the desired amount to this public key on the Stellar network.
</p>
