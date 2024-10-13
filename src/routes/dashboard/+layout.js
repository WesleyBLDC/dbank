/**
 * @description If a directory contained within `/src/routes/` contains a
 * `+layout.js` file, you can use it to load data which will then be available
 * to thes sibling `+layout.svelte` and `+page.svelte` files, as well as any
 * other layout files nested further down the directory tree.
 * @see {@link https://kit.svelte.dev/docs/load#layout-data}
 */

import { get } from 'svelte/store'
import { goto } from '$app/navigation'
import { writable } from 'svelte/store'

import { fetchAccountBalances, fetchRecentPayments } from '$lib/stellar/horizonQueries'
import { walletStore } from '$lib/stores/walletStore'

/** @type {import ('./$types').LayoutLoad} */
export async function load() {
    const { publicKey } = get(walletStore)
    if (!publicKey) {
        goto('/signup')
    }

    let balances = []
    // Add hardcoded USDC balance
    balances.push({
        balance: '1000.0000000',
        asset_type: 'credit_alphanum4',
        asset_code: 'USDC',
        asset_issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
        limit: '922337203685.4775807',
        buying_liabilities: '0.0000000',
        selling_liabilities: '0.0000000',
        last_modified_ledger: 420818,
        is_authorized: true,
        is_authorized_to_maintain_liabilities: true,
        sponsor: null,
    })

    balances.push({
        balance: '1000000.0000000',
        asset_type: 'credit_alphanum4',
        asset_code: 'KES',
        asset_issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
        limit: '922337203685.4775807',
        buying_liabilities: '0.0000000',
        selling_liabilities: '0.0000000',
        last_modified_ledger: 420818,
        is_authorized: true,
        is_authorized_to_maintain_liabilities: true,
        sponsor: null,
    })

    // const balancesStore = writable(balances)

    let payments = []
    // try {
    payments = await fetchRecentPayments(publicKey)
    // } catch (error) {
    //     console.error('Error fetching recent payments:', error)
    // }

    return {
        publicKey: publicKey,
        balances: balances,
        payments: payments,
    }
}
