'use client'

import { Heart, X, Zap } from 'lucide-react'

interface SwipeActionsProps {
  onLike: () => void
  onPass: () => void
  onSuperLike: () => void
  disabled?: boolean
}

export function SwipeActions({ onLike, onPass, onSuperLike, disabled }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center space-x-8 mt-6">
      {/* Pass Button */}
      <button
        onClick={onPass}
        disabled={disabled}
        className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        title="Pass on this program"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Super Like Button */}
      <button
        onClick={onSuperLike}
        disabled={disabled}
        className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        title="Super like this program"
      >
        <Zap className="w-7 h-7" />
      </button>

      {/* Like Button */}
      <button
        onClick={onLike}
        disabled={disabled}
        className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        title="Like this program"
      >
        <Heart className="w-6 h-6" />
      </button>
    </div>
  )
}
