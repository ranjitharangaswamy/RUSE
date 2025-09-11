'use client'

import { useState } from 'react'
import { UserProfile, ProgramCategory } from '@/lib/types'
import { categoryIcons } from '@/lib/data'
import { X, Filter } from 'lucide-react'

interface FilterPanelProps {
  onClose: () => void
  onFilterChange: (filters: FilterState) => void
  user: UserProfile
}

interface FilterState {
  categories: ProgramCategory[]
  ageRange: boolean
  cost: 'all' | 'free' | 'paid'
  distance: number
  timeOfDay: string[]
  days: string[]
  safetyRating: number
}

export function FilterPanel({ onClose, onFilterChange, user }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    ageRange: true,
    cost: 'all',
    distance: user.preferences.maxDistance,
    timeOfDay: [],
    days: [],
    safetyRating: 0
  })

  const handleCategoryToggle = (category: ProgramCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      ageRange: true,
      cost: 'all',
      distance: user.preferences.maxDistance,
      timeOfDay: [],
      days: [],
      safetyRating: 0
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Programs</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(categoryIcons).map(([category, icon]) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category as ProgramCategory)}
                  className={`flex items-center p-3 rounded-lg border transition-colors ${
                    filters.categories.includes(category as ProgramCategory)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-lg mr-2">{icon}</span>
                  <span className="text-sm font-medium capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Age Appropriate</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.ageRange}
                onChange={(e) => handleFilterChange('ageRange', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Only show programs for my age ({user.age})
              </span>
            </label>
          </div>

          {/* Cost */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Cost</h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Programs' },
                { value: 'free', label: 'Free Only' },
                { value: 'paid', label: 'Paid Programs' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="cost"
                    value={option.value}
                    checked={filters.cost === option.value}
                    onChange={(e) => handleFilterChange('cost', e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Maximum Distance: {filters.distance} miles
            </h3>
            <input
              type="range"
              min="1"
              max="25"
              value={filters.distance}
              onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Time of Day */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Time of Day</h3>
            <div className="grid grid-cols-2 gap-2">
              {['morning', 'afternoon', 'evening', 'any'].map((time) => (
                <label key={time} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.timeOfDay.includes(time)}
                    onChange={(e) => {
                      const newTimes = e.target.checked
                        ? [...filters.timeOfDay, time]
                        : filters.timeOfDay.filter(t => t !== time)
                      handleFilterChange('timeOfDay', newTimes)
                    }}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{time}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Days */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Days Available</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.days.includes(day)}
                    onChange={(e) => {
                      const newDays = e.target.checked
                        ? [...filters.days, day]
                        : filters.days.filter(d => d !== day)
                      handleFilterChange('days', newDays)
                    }}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Safety Rating */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Minimum Safety Rating: {filters.safetyRating || 'Any'}
            </h3>
            <input
              type="range"
              min="0"
              max="5"
              value={filters.safetyRating}
              onChange={(e) => handleFilterChange('safetyRating', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={clearFilters}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
