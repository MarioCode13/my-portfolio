import { createClient } from '@sanity/client'

export const sanity = createClient({
    projectId: 'zcsc2ikh', // find this in sanity.json or manage.sanity.io
    dataset: 'production',        // or your dataset name
    apiVersion: '2023-01-01',     // use a fixed date
    useCdn: true,                 // `false` if you want fresh data
})