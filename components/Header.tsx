'use client'

import { UserProfile } from '@/lib/types'
import { Filter, Settings, Bell, User } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  user: UserProfile
  onFilterToggle: () => void
  showFilters: boolean
  onLogout: () => void
  onParentalControls: () => void
}

export function Header({ user, onFilterToggle, showFilters, onLogout, onParentalControls }: HeaderProps) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RUSE</h1>
              <p className="text-sm text-gray-500">Seattle Youth Connector</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Filter Button */}
            <button
              onClick={onFilterToggle}
              className={`p-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Filter programs"
            >
              <Filter size={20} />
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">Age {user.age}</p>
                    <p className="text-sm text-gray-500">{user.location.neighborhood}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Edit Profile
                    </button>
                    <button 
                      onClick={onParentalControls}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Safety Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Matches
                    </button>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
