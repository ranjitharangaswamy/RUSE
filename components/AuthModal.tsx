'use client'

import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import { X, Mail, Lock, User, Calendar, MapPin, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: UserProfile) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [step, setStep] = useState<'age' | 'details' | 'parental'>('age')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    parentEmail: '',
    neighborhood: '',
    interests: [] as string[],
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    requireParentApproval: true,
    allowUnsupervised: false,
    maxAgeDifference: 2
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validateAge = (age: string) => {
    const ageNum = parseInt(age)
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 25) {
      return 'Please enter a valid age between 0 and 25'
    }
    return null
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return null
  }

  const handleNext = () => {
    const newErrors: Record<string, string> = {}

    if (step === 'age') {
      const ageError = validateAge(formData.age)
      if (ageError) newErrors.age = ageError
    } else if (step === 'details') {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else {
        const emailError = validateEmail(formData.email)
        if (emailError) newErrors.email = emailError
      }
      if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Neighborhood is required'
      if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest'
    } else if (step === 'parental') {
      const age = parseInt(formData.age)
      if (age < 18) {
        if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent email is required for users under 18'
        else {
          const parentEmailError = validateEmail(formData.parentEmail)
          if (parentEmailError) newErrors.parentEmail = parentEmailError
        }
        if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required'
        if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required'
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      if (step === 'age') setStep('details')
      else if (step === 'details') setStep('parental')
      else handleSubmit()
    }
  }

  const handleSubmit = () => {
    const age = parseInt(formData.age)
    const user: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      age,
      email: formData.email,
      interests: formData.interests as any[],
      location: {
        neighborhood: formData.neighborhood,
        zipCode: '98101' // Mock zip code
      },
      parentEmail: age < 18 ? formData.parentEmail : undefined,
      emergencyContact: age < 18 ? {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship
      } : undefined,
      preferences: {
        maxDistance: 10,
        timeOfDay: 'afternoon',
        daysAvailable: ['Saturday', 'Sunday']
      },
      safetySettings: {
        requireParentApproval: formData.requireParentApproval,
        allowUnsupervised: formData.allowUnsupervised,
        maxAgeDifference: formData.maxAgeDifference
      }
    }

    onLogin(user)
    onClose()
  }

  const interestOptions = [
    'sports', 'arts', 'education', 'stem', 'music', 'dance', 'theater',
    'volunteer', 'leadership', 'outdoor', 'academic', 'career', 'health', 'community'
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Join RUSE</h2>
              <p className="text-sm text-gray-600">Seattle Youth Connector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            {['age', 'details', 'parental'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepName 
                    ? 'bg-primary-600 text-white' 
                    : index < ['age', 'details', 'parental'].indexOf(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    index < ['age', 'details', 'parental'].indexOf(step)
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'age' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's your age?</h3>
                <p className="text-gray-600">This helps us show you age-appropriate programs</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your age"
                />
                {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tell us about yourself</h3>
                <p className="text-gray-600">Help us personalize your experience</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Neighborhood
                </label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Capitol Hill, Ballard, Queen Anne"
                />
                {errors.neighborhood && <p className="text-red-600 text-sm mt-1">{errors.neighborhood}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          const newInterests = e.target.checked
                            ? [...formData.interests, interest]
                            : formData.interests.filter(i => i !== interest)
                          setFormData({ ...formData, interests: newInterests })
                        }}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {interest.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.interests && <p className="text-red-600 text-sm mt-1">{errors.interests}</p>}
              </div>
            </div>
          )}

          {step === 'parental' && parseInt(formData.age) < 18 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Parental Information</h3>
                <p className="text-gray-600">Required for users under 18</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 mb-1">
                      Safety First
                    </h4>
                    <p className="text-sm text-yellow-700">
                      For your safety, we require parental approval for all program participation. 
                      Your parent will receive notifications about your activity.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent/Guardian Email
                </label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="parent@example.com"
                />
                {errors.parentEmail && <p className="text-red-600 text-sm mt-1">{errors.parentEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Emergency contact full name"
                />
                {errors.emergencyContactName && <p className="text-red-600 text-sm mt-1">{errors.emergencyContactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="(206) 555-0123"
                />
                {errors.emergencyContactPhone && <p className="text-red-600 text-sm mt-1">{errors.emergencyContactPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship to Emergency Contact
                </label>
                <select
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select relationship</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}

          {step === 'parental' && parseInt(formData.age) >= 18 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">You're all set!</h3>
              <p className="text-gray-600">As an adult, you have full access to all features.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          {step !== 'age' && (
            <button
              onClick={() => setStep(step === 'parental' ? 'details' : 'age')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {step === 'parental' ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
