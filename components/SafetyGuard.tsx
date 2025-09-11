'use client'

import { useState, useEffect } from 'react'
import { YouthProgram, UserProfile, SafetyCheck } from '@/lib/types'
import { SafetyValidator } from '@/lib/matching'
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react'

interface SafetyGuardProps {
  program: YouthProgram
  user: UserProfile
  onSafetyCheck: (check: SafetyCheck) => void
}

export function SafetyGuard({ program, user, onSafetyCheck }: SafetyGuardProps) {
  const [safetyCheck, setSafetyCheck] = useState<SafetyCheck | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate safety check processing
    const performSafetyCheck = async () => {
      setIsLoading(true)
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const check = SafetyValidator.validateProgram(program)
      setSafetyCheck(check)
      onSafetyCheck(check)
      setIsLoading(false)
    }

    performSafetyCheck()
  }, [program, onSafetyCheck])

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-sm text-blue-800">Running safety check...</span>
        </div>
      </div>
    )
  }

  if (!safetyCheck) return null

  const isSafe = !safetyCheck.flagged && safetyCheck.overallScore >= 0.8
  const needsReview = safetyCheck.flagged || safetyCheck.overallScore < 0.6

  return (
    <div className={`border rounded-lg p-4 mb-4 ${
      isSafe 
        ? 'bg-green-50 border-green-200' 
        : needsReview 
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-red-50 border-red-200'
    }`}>
      {/* Safety Status Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {isSafe ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          ) : needsReview ? (
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
          )}
          <span className={`font-medium ${
            isSafe 
              ? 'text-green-800' 
              : needsReview 
                ? 'text-yellow-800'
                : 'text-red-800'
          }`}>
            {isSafe ? 'Safety Verified' : needsReview ? 'Needs Review' : 'Safety Concerns'}
          </span>
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
        >
          {showDetails ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Safety Score */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-700">Safety Score</span>
          <span className="text-sm font-medium text-gray-900">
            {Math.round(safetyCheck.overallScore * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              safetyCheck.overallScore >= 0.8 
                ? 'bg-green-500' 
                : safetyCheck.overallScore >= 0.6 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`}
            style={{ width: `${safetyCheck.overallScore * 100}%` }}
          />
        </div>
      </div>

      {/* Detailed Safety Checks */}
      {showDetails && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Safety Checks</h4>
          {Object.entries(safetyCheck.checks).map(([check, passed]) => (
            <div key={check} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize">
                {check.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
              {passed ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
          ))}
          
          {safetyCheck.reviewNotes && (
            <div className="mt-3 p-2 bg-yellow-100 rounded text-sm text-yellow-800">
              <strong>Note:</strong> {safetyCheck.reviewNotes}
            </div>
          )}
        </div>
      )}

      {/* Safety Warnings */}
      {needsReview && (
        <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-medium text-yellow-800 mb-1">
                Safety Review Required
              </h5>
              <p className="text-sm text-yellow-700">
                This program requires additional safety review before participation. 
                Please contact the organization directly for more information.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Age Appropriateness Warning */}
      {!safetyCheck.checks.ageAppropriate && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
          <div className="flex items-start">
            <XCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-medium text-red-800 mb-1">
                Age Inappropriate
              </h5>
              <p className="text-sm text-red-700">
                This program may not be suitable for your age group. 
                Please review the age requirements carefully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Parental Approval Required */}
      {user.age < 18 && user.safetySettings.requireParentApproval && (
        <div className="mt-3 p-3 bg-blue-100 border border-blue-300 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-medium text-blue-800 mb-1">
                Parental Approval Required
              </h5>
              <p className="text-sm text-blue-700">
                Your parent or guardian must approve this program before you can participate.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
