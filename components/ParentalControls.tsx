'use client'

import { useState } from 'react'
import { UserProfile, Match } from '@/lib/types'
import { Shield, CheckCircle, XCircle, Clock, Mail, Phone, User } from 'lucide-react'

interface ParentalControlsProps {
  user: UserProfile
  matches: Match[]
  onApproveMatch: (matchId: string) => void
  onDeclineMatch: (matchId: string) => void
}

export function ParentalControls({ user, matches, onApproveMatch, onDeclineMatch }: ParentalControlsProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'declined'>('pending')
  
  const pendingMatches = matches.filter(m => m.status === 'pending')
  const approvedMatches = matches.filter(m => m.status === 'approved')
  const declinedMatches = matches.filter(m => m.status === 'declined')

  if (user.age >= 18) {
    return null // No parental controls for adults
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-blue-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Parental Controls</h2>
          <p className="text-sm text-gray-600">
            Manage {user.name}'s program participation and safety settings
          </p>
        </div>
      </div>

      {/* Safety Settings Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-900 mb-2">Current Safety Settings</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Parental approval required for all programs</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Only supervised activities allowed</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Maximum age difference: {user.safetySettings.maxAgeDifference} years</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'pending', label: 'Pending Approval', count: pendingMatches.length },
          { key: 'approved', label: 'Approved', count: approvedMatches.length },
          { key: 'declined', label: 'Declined', count: declinedMatches.length }
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'pending' && (
          <PendingApprovals 
            matches={pendingMatches}
            onApprove={onApproveMatch}
            onDecline={onDeclineMatch}
          />
        )}
        
        {activeTab === 'approved' && (
          <ApprovedMatches matches={approvedMatches} />
        )}
        
        {activeTab === 'declined' && (
          <DeclinedMatches matches={declinedMatches} />
        )}
      </div>

      {/* Emergency Contact Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Emergency Contact</h3>
        {user.emergencyContact ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">{user.emergencyContact.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{user.emergencyContact.phone}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Relationship: {user.emergencyContact.relationship}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No emergency contact information provided</p>
        )}
      </div>
    </div>
  )
}

function PendingApprovals({ 
  matches, 
  onApprove, 
  onDecline 
}: { 
  matches: Match[]
  onApprove: (matchId: string) => void
  onDecline: (matchId: string) => void
}) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No pending approvals</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-900">Program Match</h4>
              <p className="text-sm text-gray-600">Match ID: {match.id}</p>
              <p className="text-sm text-gray-500">
                Requested: {new Date(match.matchedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onApprove(match.id)}
                className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded hover:bg-green-200 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => onDecline(match.id)}
                className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded hover:bg-red-200 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
          
          {match.notes && (
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-700">
                <strong>Notes:</strong> {match.notes}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ApprovedMatches({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <p className="text-gray-600">No approved matches yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-900">Approved</span>
          </div>
          <p className="text-sm text-green-800">
            Approved on {new Date(match.matchedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

function DeclinedMatches({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No declined matches</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-900">Declined</span>
          </div>
          <p className="text-sm text-red-800">
            Declined on {new Date(match.matchedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
