export interface YouthProgram {
  id: string
  title: string
  description: string
  organization: string
  location: {
    name: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  ageRange: {
    min: number
    max: number
  }
  categories: ProgramCategory[]
  schedule: {
    startDate: string
    endDate?: string
    days: string[]
    time: string
    frequency: 'daily' | 'weekly' | 'monthly' | 'one-time'
  }
  cost: {
    amount: number
    currency: 'USD'
    free: boolean
    scholarship?: boolean
  }
  capacity: {
    current: number
    max: number
  }
  requirements: string[]
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  images: string[]
  safetyRating: number // 1-5 scale
  verified: boolean
  lastUpdated: string
  source: 'seattle.gov' | 'partner' | 'social' | 'manual'
}

export type ProgramCategory = 
  | 'sports' 
  | 'arts' 
  | 'education' 
  | 'stem' 
  | 'music' 
  | 'dance' 
  | 'theater' 
  | 'volunteer' 
  | 'leadership' 
  | 'outdoor' 
  | 'academic' 
  | 'career' 
  | 'health' 
  | 'community'

export interface UserProfile {
  id: string
  name: string
  age: number
  email: string
  interests: ProgramCategory[]
  location: {
    neighborhood: string
    zipCode: string
  }
  parentEmail?: string // Required for users under 18
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  preferences: {
    maxDistance: number // in miles
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'any'
    daysAvailable: string[]
  }
  safetySettings: {
    requireParentApproval: boolean
    allowUnsupervised: boolean
    maxAgeDifference: number
  }
}

export interface SwipeAction {
  programId: string
  action: 'like' | 'pass' | 'superlike'
  timestamp: string
  reason?: string
}

export interface Match {
  id: string
  programId: string
  userId: string
  matchedAt: string
  status: 'pending' | 'approved' | 'declined' | 'expired'
  parentApproval?: boolean
  notes?: string
}

export interface SafetyCheck {
  programId: string
  checks: {
    ageAppropriate: boolean
    verifiedOrganization: boolean
    backgroundCheckedStaff: boolean
    safeLocation: boolean
    appropriateSupervision: boolean
    noInappropriateContent: boolean
  }
  overallScore: number
  flagged: boolean
  reviewNotes?: string
}
