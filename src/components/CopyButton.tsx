import React, { useState } from 'react'
import { BsClipboard, BsCheck } from 'react-icons/bs'

interface CopyButtonProps {
  text: string
  className?: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-md transition-all duration-200 hover:bg-gray-700 ${
        copied ? 'text-green-400' : 'text-gray-400 hover:text-white'
      } ${className}`}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? <BsCheck size={16} /> : <BsClipboard size={16} />}
    </button>
  )
}

export default CopyButton 