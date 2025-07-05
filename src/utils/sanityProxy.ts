// Alternative Sanity client using Netlify function proxy
export const sanityProxy = {
  fetch: async (query: string, params?: any) => {
    try {
      const response = await fetch('/.netlify/functions/sanity-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, params }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Sanity proxy error:', error)
      throw error
    }
  }
} 