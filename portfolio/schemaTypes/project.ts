import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first. Use increments of 10 (10, 20, 30...) for easy reordering.',
            validation: Rule => Rule.required()
        },
        {
            name: 'projectType',
            title: 'Project Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Web Application', value: 'web' },
                    { title: 'Mobile Application', value: 'mobile' },
                    { title: 'Desktop Application', value: 'desktop' },
                    { title: 'Game', value: 'game' },
                    { title: 'Other', value: 'other' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: Rule => Rule.min(1)
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            name: 'stack',
            title: 'Tech Stack',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'technology' }]
                }
            ],
            description: 'List the technologies used in this project'
        },
        {
            name: 'url',
            title: 'Project URL',
            type: 'url',
            description: 'Optional: Link to the live project or demo'
        },
        {
            name: 'appStoreUrl',
            title: 'App Store URL',
            type: 'url',
            description: 'Optional: Link to the app store listing (for mobile apps)'
        },
        {
            name: 'playStoreUrl',
            title: 'Play Store URL',
            type: 'url',
            description: 'Optional: Link to the Google Play Store listing (for mobile apps)'
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
            description: 'Optional: Link to the GitHub repository'
        },
        {
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List the key features of the project'
        },
        {
            name: 'platforms',
            title: 'Platforms',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [
                            { title: 'iOS', value: 'ios' },
                            { title: 'Android', value: 'android' },
                            { title: 'Web', value: 'web' },
                            { title: 'Desktop', value: 'desktop' },
                            { title: 'Cross-platform', value: 'cross-platform' }
                        ]
                    }
                }
            ],
            description: 'Supported platforms (for mobile/desktop apps)'
        }
    ]
})