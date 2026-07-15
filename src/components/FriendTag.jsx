import React from 'react'

export default function FriendTag({ name, color = 'bg-pastel-pink' }) {
  return (
    <span className={`inline-block ${color} text-gray-800 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1`}>
      👤 {name}
    </span>
  )
}
