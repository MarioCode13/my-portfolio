import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
    defineArrayMember({
      title: 'Code Block',
      name: 'code',
      type: 'object',
      fields: [
        {
          title: 'Code',
          name: 'code',
          type: 'text',
          rows: 10,
        },
        {
          title: 'Language',
          name: 'language',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'SCSS', value: 'scss'},
              {title: 'Python', value: 'python'},
              {title: 'Java', value: 'java'},
              {title: 'C++', value: 'cpp'},
              {title: 'C#', value: 'csharp'},
              {title: 'PHP', value: 'php'},
              {title: 'Ruby', value: 'ruby'},
              {title: 'Go', value: 'go'},
              {title: 'Rust', value: 'rust'},
              {title: 'SQL', value: 'sql'},
              {title: 'JSON', value: 'json'},
              {title: 'YAML', value: 'yaml'},
              {title: 'Markdown', value: 'markdown'},
              {title: 'Bash', value: 'bash'},
              {title: 'Shell', value: 'shell'},
              {title: 'Plain Text', value: 'text'},
            ],
          },
        },
        {
          title: 'Filename (optional)',
          name: 'filename',
          type: 'string',
        },
      ],
      preview: {
        select: {
          title: 'language',
          subtitle: 'filename',
          code: 'code',
        },
        prepare(selection) {
          const {title, subtitle, code} = selection
          return {
            title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Code Block',
            subtitle: subtitle || (code ? `${code.slice(0, 50)}...` : ''),
          }
        },
      },
    }),
  ],
})
