import { createClient } from '@sanity/client'

export const sanity = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'zcsc2ikh',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-01-01',
    useCdn: import.meta.env.VITE_SANITY_USE_CDN !== 'false',
    // Optional: Add token for private datasets or enhanced security
    // token: import.meta.env.VITE_SANITY_TOKEN, // Only if you need private content
})