'use client'

import { useState, useEffect } from 'react'
import { SwipeInterface } from '@/components/SwipeInterface'
import { Header } from '@/components/Header'
import { FilterPanel } from '@/components/FilterPanel'
import { AuthModal } from '@/components/AuthModal'
import { ParentalControls } from '@/components/ParentalControls'
import { UserProfile, Match } from '@/lib/types'
import { mockPrograms } from '@/lib/data'
import { MatchingEngine } from '@/lib/matching'

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showParentalControls, setShowParentalControls] = useState(false)
  const [filteredPrograms, setFilteredPrograms] = useState(mockPrograms)
  const [matches, setMatches] = useState<Match[]>([])
  const [matchingEngine, setMatchingEngine] = useState<MatchingEngine | null>(null)

  useEffect(() => {
    // Check if user is already logged in (in a real app, this would check localStorage or cookies)
    const savedUser = localStorage.getItem('ruse-user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setMatchingEngine(new MatchingEngine(userData, mockPrograms))
    } else {
      setShowAuth(true)
    }
  }, [])

  useEffect(() => {
    if (user && matchingEngine) {
      // Get AI-ranked programs
      const rankedPrograms = matchingEngine.getRankedPrograms()
      setFilteredPrograms(rankedPrograms)
    }
  }, [user, matchingEngine])

  const handleLogin = (userData: UserProfile) => {
    setUser(userData)
    setMatchingEngine(new MatchingEngine(userData, mockPrograms))
    localStorage.setItem('ruse-user', JSON.stringify(userData))
    setShowAuth(false)
  }

  const handleLogout = () => {
    setUser(null)
    setMatchingEngine(null)
    localStorage.removeItem('ruse-user')
    setShowAuth(true)
  }

  const handleFilterChange = (filters: any) => {
    if (!matchingEngine) return

    // Apply filters to programs
    let filtered = mockPrograms

    if (filters.categories?.length > 0) {
      filtered = filtered.filter(program => 
        program.categories.some(cat => filters.categories.includes(cat))
      )
    }

    if (filters.ageRange) {
      filtered = filtered.filter(program => 
        program.ageRange.min <= user?.age! && program.ageRange.max >= user?.age!
      )
    }

    if (filters.cost) {
      if (filters.cost === 'free') {
        filtered = filtered.filter(program => program.cost.free)
      } else if (filters.cost === 'paid') {
        filtered = filtered.filter(program => !program.cost.free)
      }
    }

    // Re-rank filtered programs
    const newEngine = new MatchingEngine(user!, filtered)
    const rankedPrograms = newEngine.getRankedPrograms()
    setFilteredPrograms(rankedPrograms)
  }

  const handleMatch = (program: any) => {
    if (!user) return

    const newMatch: Match = {
      id: Math.random().toString(36).substr(2, 9),
      programId: program.id,
      userId: user.id,
      matchedAt: new Date().toISOString(),
      status: user.age < 18 && user.safetySettings.requireParentApproval ? 'pending' : 'approved',
      parentApproval: user.age < 18 ? false : undefined
    }

    setMatches(prev => [...prev, newMatch])

    // If user is under 18, show parental controls
    if (user.age < 18 && user.safetySettings.requireParentApproval) {
      setShowParentalControls(true)
    }
  }

  const handleApproveMatch = (matchId: string) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'approved', parentApproval: true }
          : match
      )
    )
  }

  const handleDeclineMatch = (matchId: string) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'declined' }
          : match
      )
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RUSE...</p>
        </div>
        <AuthModal 
          isOpen={showAuth} 
          onClose={() => setShowAuth(false)} 
          onLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Header 
        user={user} 
        onFilterToggle={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        onLogout={handleLogout}
        onParentalControls={() => setShowParentalControls(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to RUSE, {user.name}! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing youth programs in Seattle that match your interests and age. 
            Swipe right to like, left to pass, and find your perfect match!
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <SwipeInterface 
            programs={filteredPrograms}
            user={user}
            onMatch={handleMatch}
          />
        </div>

        {/* Parental Controls Section */}
        {user.age < 18 && matches.length > 0 && (
          <div className="mt-12 max-w-2xl mx-auto">
            <ParentalControls 
              user={user}
              matches={matches}
              onApproveMatch={handleApproveMatch}
              onDeclineMatch={handleDeclineMatch}
            />
          </div>
        )}
      </main>

      {showFilters && (
        <FilterPanel 
          onClose={() => setShowFilters(false)}
          onFilterChange={handleFilterChange}
          user={user}
        />
      )}

      {showParentalControls && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Parental Controls</h2>
                <button
                  onClick={() => setShowParentalControls(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ParentalControls 
                user={user}
                matches={matches}
                onApproveMatch={handleApproveMatch}
                onDeclineMatch={handleDeclineMatch}
              />
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onLogin={handleLogin}
      />
    </div>
  )
}
