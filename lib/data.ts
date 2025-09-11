import { YouthProgram, ProgramCategory } from './types'

export const mockPrograms: YouthProgram[] = [
  {
    id: '1',
    title: 'Seattle Youth Symphony Orchestra',
    description: 'Join our world-class youth orchestra program for musicians ages 8-18. Develop your musical skills with professional instruction and perform in beautiful venues across Seattle.',
    organization: 'Seattle Youth Symphony Orchestra',
    location: {
      name: 'Benaroya Hall',
      address: '200 University St, Seattle, WA 98101',
      coordinates: { lat: 47.608013, lng: -122.335167 }
    },
    ageRange: { min: 8, max: 18 },
    categories: ['music', 'arts'],
    schedule: {
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      days: ['Saturday'],
      time: '10:00 AM - 12:00 PM',
      frequency: 'weekly'
    },
    cost: {
      amount: 300,
      currency: 'USD',
      free: false,
      scholarship: true
    },
    capacity: {
      current: 45,
      max: 60
    },
    requirements: ['Audition required', 'Previous musical experience', 'Commitment to weekly rehearsals'],
    contact: {
      phone: '(206) 362-2300',
      email: 'info@syso.org',
      website: 'https://syso.org'
    },
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500'],
    safetyRating: 5,
    verified: true,
    lastUpdated: '2024-01-01T00:00:00Z',
    source: 'partner'
  },
  {
    id: '2',
    title: 'Coding Bootcamp for Teens',
    description: 'Learn web development, Python, and data science in this intensive 8-week program designed specifically for high school students.',
    organization: 'Seattle Public Library',
    location: {
      name: 'Central Library',
      address: '1000 4th Ave, Seattle, WA 98104',
      coordinates: { lat: 47.608013, lng: -122.335167 }
    },
    ageRange: { min: 14, max: 18 },
    categories: ['stem', 'education', 'career'],
    schedule: {
      startDate: '2024-02-01',
      endDate: '2024-03-28',
      days: ['Tuesday', 'Thursday'],
      time: '4:00 PM - 6:00 PM',
      frequency: 'weekly'
    },
    cost: {
      amount: 0,
      currency: 'USD',
      free: true,
      scholarship: false
    },
    capacity: {
      current: 12,
      max: 20
    },
    requirements: ['Basic computer skills', 'Laptop required', 'Commitment to complete all sessions'],
    contact: {
      phone: '(206) 386-4636',
      email: 'teens@seattle.gov',
      website: 'https://spl.org/teens'
    },
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500'],
    safetyRating: 5,
    verified: true,
    lastUpdated: '2024-01-01T00:00:00Z',
    source: 'seattle.gov'
  },
  {
    id: '3',
    title: 'Youth Basketball League',
    description: 'Join our competitive basketball league for ages 12-17. Develop teamwork, sportsmanship, and athletic skills while having fun with peers.',
    organization: 'Seattle Parks and Recreation',
    location: {
      name: 'Community Center Gym',
      address: '1234 Main St, Seattle, WA 98101',
      coordinates: { lat: 47.608013, lng: -122.335167 }
    },
    ageRange: { min: 12, max: 17 },
    categories: ['sports', 'leadership'],
    schedule: {
      startDate: '2024-01-20',
      endDate: '2024-04-20',
      days: ['Saturday', 'Sunday'],
      time: '2:00 PM - 4:00 PM',
      frequency: 'weekly'
    },
    cost: {
      amount: 50,
      currency: 'USD',
      free: false,
      scholarship: true
    },
    capacity: {
      current: 28,
      max: 32
    },
    requirements: ['Physical examination', 'Parent/guardian consent', 'Team commitment'],
    contact: {
      phone: '(206) 684-4075',
      email: 'parks@seattle.gov',
      website: 'https://seattle.gov/parks'
    },
    images: ['https://images.unsplash.com/photo-1546519638-68e10945ff68?w=500'],
    safetyRating: 4,
    verified: true,
    lastUpdated: '2024-01-01T00:00:00Z',
    source: 'seattle.gov'
  },
  {
    id: '4',
    title: 'Environmental Stewardship Program',
    description: 'Make a difference in your community while learning about environmental conservation. Participate in park cleanups, tree planting, and sustainability workshops.',
    organization: 'Seattle Youth Environmental Network',
    location: {
      name: 'Discovery Park',
      address: '3801 Discovery Park Blvd, Seattle, WA 98199',
      coordinates: { lat: 47.6621, lng: -122.4096 }
    },
    ageRange: { min: 13, max: 24 },
    categories: ['volunteer', 'outdoor', 'community'],
    schedule: {
      startDate: '2024-01-10',
      endDate: '2024-12-31',
      days: ['Saturday'],
      time: '9:00 AM - 12:00 PM',
      frequency: 'weekly'
    },
    cost: {
      amount: 0,
      currency: 'USD',
      free: true,
      scholarship: false
    },
    capacity: {
      current: 15,
      max: 25
    },
    requirements: ['Interest in environmental issues', 'Ability to work outdoors', 'Commitment to monthly participation'],
    contact: {
      email: 'youth@seattleenvironment.org',
      website: 'https://seattleenvironment.org/youth'
    },
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500'],
    safetyRating: 5,
    verified: true,
    lastUpdated: '2024-01-01T00:00:00Z',
    source: 'partner'
  },
  {
    id: '5',
    title: 'Creative Writing Workshop',
    description: 'Express yourself through poetry, short stories, and creative nonfiction. Work with published authors and share your work in a supportive environment.',
    organization: 'Seattle Arts Academy',
    location: {
      name: 'Arts Academy Studio',
      address: '5678 Creative Way, Seattle, WA 98102',
      coordinates: { lat: 47.608013, lng: -122.335167 }
    },
    ageRange: { min: 15, max: 20 },
    categories: ['arts', 'education'],
    schedule: {
      startDate: '2024-02-15',
      endDate: '2024-05-15',
      days: ['Wednesday'],
      time: '6:00 PM - 8:00 PM',
      frequency: 'weekly'
    },
    cost: {
      amount: 200,
      currency: 'USD',
      free: false,
      scholarship: true
    },
    capacity: {
      current: 8,
      max: 12
    },
    requirements: ['Writing sample submission', 'Commitment to sharing work', 'Open to feedback'],
    contact: {
      phone: '(206) 555-0123',
      email: 'writing@seattlearts.org',
      website: 'https://seattlearts.org'
    },
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'],
    safetyRating: 5,
    verified: true,
    lastUpdated: '2024-01-01T00:00:00Z',
    source: 'partner'
  }
]

export const categoryIcons: Record<ProgramCategory, string> = {
  sports: '⚽',
  arts: '🎨',
  education: '📚',
  stem: '🔬',
  music: '🎵',
  dance: '💃',
  theater: '🎭',
  volunteer: '🤝',
  leadership: '👑',
  outdoor: '🌲',
  academic: '📖',
  career: '💼',
  health: '💪',
  community: '🏘️'
}

export const ageGroupLabels = {
  '0-5': 'Early Childhood',
  '6-12': 'Elementary',
  '13-17': 'Teen',
  '18-24': 'Young Adult'
}

export function getAgeGroup(age: number): keyof typeof ageGroupLabels {
  if (age <= 5) return '0-5'
  if (age <= 12) return '6-12'
  if (age <= 17) return '13-17'
  return '18-24'
}
