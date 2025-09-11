'use client'

import { useState, useRef, useEffect } from 'react'
import { YouthProgram, UserProfile } from '@/lib/types'
import { ProgramCard } from './ProgramCard'
import { SwipeActions } from './SwipeActions'
import { Heart, X, Star } from 'lucide-react'
import toast from 'react-hot-toast'

interface SwipeInterfaceProps {
  programs: YouthProgram[]
  user: UserProfile
  onMatch: (program: YouthProgram) => void
}

export function SwipeInterface({ programs, user, onMatch }: SwipeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipedPrograms, setSwipedPrograms] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentProgram = programs[currentIndex]
  const remainingCount = programs.length - currentIndex

  const handleSwipe = (direction: 'left' | 'right' | 'up', program: YouthProgram) => {
    if (isAnimating) return

    setIsAnimating(true)
    setSwipedPrograms(prev => new Set([...prev, program.id]))

    // Add animation class
    if (cardRef.current) {
      cardRef.current.classList.add(
        direction === 'left' ? 'swiped-left' : 
        direction === 'right' ? 'swiped-right' : 'swiped-up'
      )
    }

    // Handle different swipe actions
    if (direction === 'right') {
      // Like
      toast.success(`Liked ${program.title}!`)
      onMatch(program)
    } else if (direction === 'up') {
      // Super like
      toast.success(`Super liked ${program.title}! ⭐`)
      onMatch(program)
    } else {
      // Pass
      toast('Passed on this program')
    }

    // Move to next program after animation
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setIsAnimating(false)
    }, 300)
  }

  const handleAction = (action: 'like' | 'pass' | 'superlike') => {
    if (!currentProgram || isAnimating) return

    const direction = action === 'like' ? 'right' : action === 'pass' ? 'left' : 'up'
    handleSwipe(direction, currentProgram)
  }

  // Reset animation classes when program changes
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.className = cardRef.current.className
        .replace(/swiped-(left|right|up)/g, '')
    }
  }, [currentIndex])

  if (currentIndex >= programs.length) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          That's all for now!
        </h3>
        <p className="text-gray-600 mb-6">
          You've seen all available programs. Check back later for new opportunities!
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setSwipedPrograms(new Set())
          }}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Program Counter */}
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500">
          {remainingCount} program{remainingCount !== 1 ? 's' : ''} remaining
        </span>
      </div>

      {/* Program Card */}
      <div className="relative">
        <div
          ref={cardRef}
          className="swipe-card"
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX
            const startY = e.touches[0].clientY
            
            const handleTouchMove = (e: TouchEvent) => {
              if (isAnimating) return
              
              const currentX = e.touches[0].clientX
              const currentY = e.touches[0].clientY
              const diffX = currentX - startX
              const diffY = currentY - startY
              
              if (cardRef.current) {
                const rotation = diffX * 0.1
                const translateX = diffX * 0.5
                const translateY = diffY * 0.1
                
                cardRef.current.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`
                
                // Add visual feedback
                if (Math.abs(diffX) > 50) {
                  cardRef.current.classList.add('swiping')
                } else {
                  cardRef.current.classList.remove('swiping')
                }
              }
            }
            
            const handleTouchEnd = (e: TouchEvent) => {
              if (isAnimating) return
              
              const endX = e.changedTouches[0].clientX
              const endY = e.changedTouches[0].clientY
              const diffX = endX - startX
              const diffY = endY - startY
              
              // Reset transform
              if (cardRef.current) {
                cardRef.current.style.transform = ''
                cardRef.current.classList.remove('swiping')
              }
              
              // Determine swipe direction
              if (Math.abs(diffX) > 100 || Math.abs(diffY) > 100) {
                if (Math.abs(diffY) > Math.abs(diffX)) {
                  // Vertical swipe
                  if (diffY < -100) {
                    handleSwipe('up', currentProgram)
                  }
                } else {
                  // Horizontal swipe
                  if (diffX > 100) {
                    handleSwipe('right', currentProgram)
                  } else if (diffX < -100) {
                    handleSwipe('left', currentProgram)
                  }
                }
              }
              
              document.removeEventListener('touchmove', handleTouchMove)
              document.removeEventListener('touchend', handleTouchEnd)
            }
            
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', handleTouchEnd)
          }}
        >
          <ProgramCard 
            program={currentProgram} 
            user={user}
            onLike={() => handleAction('like')}
            onPass={() => handleAction('pass')}
            onSuperLike={() => handleAction('superlike')}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <SwipeActions
        onLike={() => handleAction('like')}
        onPass={() => handleAction('pass')}
        onSuperLike={() => handleAction('superlike')}
        disabled={isAnimating}
      />

      {/* Instructions */}
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>Swipe right to like • Swipe left to pass • Swipe up to super like</p>
      </div>
    </div>
  )
}
