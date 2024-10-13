import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        include: ['@stellar/stellar-sdk', 'buffer'],
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
})
