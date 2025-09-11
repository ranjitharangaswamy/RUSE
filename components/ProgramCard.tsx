'use client'

import { YouthProgram, UserProfile } from '@/lib/types'
import { categoryIcons, getAgeGroup, ageGroupLabels } from '@/lib/data'
import { MapPin, Clock, DollarSign, Users, Shield, Star, Heart, X, Zap } from 'lucide-react'
import { format } from 'date-fns'
import { SafetyGuard } from './SafetyGuard'

interface ProgramCardProps {
  program: YouthProgram
  user: UserProfile
  onLike: () => void
  onPass: () => void
  onSuperLike: () => void
}

export function ProgramCard({ program, user, onLike, onPass, onSuperLike }: ProgramCardProps) {
  const ageGroup = getAgeGroup(user.age)
  const isAgeAppropriate = program.ageRange.min <= user.age && program.ageRange.max >= user.age
  const isInterested = program.categories.some(cat => user.interests.includes(cat))
  const distance = Math.floor(Math.random() * 10) + 1 // Mock distance

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px] flex flex-col">
      {/* Image Header */}
      <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500">
        {program.images[0] && (
          <img
            src={program.images[0]}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Safety Badge */}
        {program.safetyRating >= 4 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Verified Safe
          </div>
        )}

        {/* Age Group Badge */}
        <div className={`absolute top-3 left-3 age-badge ${ageGroup}`}>
          {ageGroupLabels[ageGroup]}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <button
            onClick={onPass}
            className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={onSuperLike}
            className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
          >
            <Zap className="w-6 h-6" />
          </button>
          <button
            onClick={onLike}
            className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Safety Guard */}
        <SafetyGuard 
          program={program}
          user={user}
          onSafetyCheck={(check) => {
            // Handle safety check results
            console.log('Safety check completed:', check)
          }}
        />

        {/* Title and Organization */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
            {program.title}
          </h3>
          <p className="text-sm text-gray-600">{program.organization}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1">
          {program.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {program.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isInterested 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-1">{categoryIcons[category]}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          ))}
          {program.categories.length > 3 && (
            <span className="text-xs text-gray-500">
              +{program.categories.length - 3} more
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="space-y-3 mb-4">
          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{program.location.name}</span>
            <span className="ml-2 text-gray-400">• {distance} mi</span>
          </div>

          {/* Schedule */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {program.schedule.days.join(', ')} • {program.schedule.time}
            </span>
          </div>

          {/* Cost */}
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {program.cost.free ? 'Free' : `$${program.cost.amount}`}
              {program.cost.scholarship && ' (Scholarships available)'}
            </span>
          </div>

          {/* Capacity */}
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {program.capacity.current}/{program.capacity.max} spots filled
            </span>
          </div>
        </div>

        {/* Age Appropriateness Warning */}
        {!isAgeAppropriate && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                This program is for ages {program.ageRange.min}-{program.ageRange.max}
              </span>
            </div>
          </div>
        )}

        {/* Safety Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">Safety Rating:</span>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < program.safetyRating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {program.verified && (
            <div className="flex items-center text-green-600 text-sm">
              <Shield className="w-4 h-4 mr-1" />
              Verified
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
