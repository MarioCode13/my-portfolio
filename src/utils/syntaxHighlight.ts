// Simple syntax highlighting for common programming languages
export const highlightSyntax = (code: string, language?: string): string => {
  if (!language) return code

  const languageMap: { [key: string]: (code: string) => string } = {
    javascript: highlightJavaScript,
    typescript: highlightTypeScript,
    html: highlightHTML,
    css: highlightCSS,
    python: highlightPython,
    json: highlightJSON,
    sql: highlightSQL,
  }

  const highlighter = languageMap[language.toLowerCase()]
  return highlighter ? highlighter(code) : code
}

const highlightJavaScript = (code: string): string => {
  return code
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await|try|catch|finally)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
    .replace(/\b(console|Math|Date|Array|Object|String|Number|Boolean)\b/g, '<span class="text-blue-400">$1</span>')
    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>')
}

const highlightTypeScript = (code: string): string => {
  return code
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await|try|catch|finally|interface|type|enum|namespace|module|declare)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
    .replace(/\b(console|Math|Date|Array|Object|String|Number|Boolean)\b/g, '<span class="text-blue-400">$1</span>')
    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>')
    .replace(/\b(string|number|boolean|any|void|never|unknown)\b/g, '<span class="text-cyan-400">$1</span>')
}

const highlightHTML = (code: string): string => {
  return code
    .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)([^&]*?)(&gt;)/g, '<span class="text-blue-400">$1</span><span class="text-purple-400">$2</span><span class="text-gray-300">$3</span><span class="text-blue-400">$4</span>')
    .replace(/([a-zA-Z-]+)=/g, '<span class="text-orange-400">$1</span>=')
    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-gray-500">$1</span>')
}

const highlightCSS = (code: string): string => {
  return code
    .replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span class="text-orange-400">$1</span>')
    .replace(/(:)/g, '<span class="text-gray-300">$1</span>')
    .replace(/([{};])/g, '<span class="text-blue-400">$1</span>')
    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
    .replace(/\b(\d+\.?\d*(?:px|em|rem|%|vh|vw|deg|rad|turn|s|ms)?)\b/g, '<span class="text-yellow-400">$1</span>')
}

const highlightPython = (code: string): string => {
  return code
    .replace(/\b(def|class|import|from|as|return|if|elif|else|for|while|try|except|finally|with|in|is|not|and|or|True|False|None)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>')
    .replace(/\b(print|len|range|list|dict|set|tuple|str|int|float|bool)\b/g, '<span class="text-blue-400">$1</span>')
}

const highlightJSON = (code: string): string => {
  return code
    .replace(/(["'])([^"']+)\1(?=\s*:)/g, '<span class="text-orange-400">$1$2$1</span>')
    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/([{}\[\],:])/g, '<span class="text-blue-400">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>')
}

const highlightSQL = (code: string): string => {
  return code
    .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INDEX|PRIMARY|FOREIGN|KEY|REFERENCES|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|AS|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|DISTINCT|COUNT|SUM|AVG|MAX|MIN)\b/gi, '<span class="text-purple-400">$1</span>')
    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(--.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>')
} 