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
        }
    ]
})