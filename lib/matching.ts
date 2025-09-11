import { YouthProgram, UserProfile, SafetyCheck } from './types'

export interface MatchScore {
  programId: string
  score: number
  reasons: string[]
  safetyScore: number
  ageAppropriate: boolean
  interestMatch: number
  locationScore: number
  scheduleMatch: number
  costMatch: number
}

export class MatchingEngine {
  private user: UserProfile
  private programs: YouthProgram[]

  constructor(user: UserProfile, programs: YouthProgram[]) {
    this.user = user
    this.programs = programs
  }

  /**
   * Calculate match score for a program
   */
  calculateMatchScore(program: YouthProgram): MatchScore {
    const ageAppropriate = this.checkAgeAppropriate(program)
    const interestMatch = this.calculateInterestMatch(program)
    const locationScore = this.calculateLocationScore(program)
    const scheduleMatch = this.calculateScheduleMatch(program)
    const costMatch = this.calculateCostMatch(program)
    const safetyScore = this.calculateSafetyScore(program)

    // Weighted scoring
    let totalScore = 0
    const reasons: string[] = []

    // Age appropriateness (mandatory - 0 if not appropriate)
    if (!ageAppropriate) {
      return {
        programId: program.id,
        score: 0,
        reasons: ['Not age appropriate'],
        safetyScore,
        ageAppropriate: false,
        interestMatch: 0,
        locationScore: 0,
        scheduleMatch: 0,
        costMatch: 0
      }
    }

    // Interest matching (40% weight)
    totalScore += interestMatch * 0.4
    if (interestMatch > 0.7) {
      reasons.push('Matches your interests')
    }

    // Location proximity (20% weight)
    totalScore += locationScore * 0.2
    if (locationScore > 0.8) {
      reasons.push('Close to your location')
    }

    // Schedule compatibility (20% weight)
    totalScore += scheduleMatch * 0.2
    if (scheduleMatch > 0.8) {
      reasons.push('Fits your schedule')
    }

    // Cost compatibility (10% weight)
    totalScore += costMatch * 0.1
    if (costMatch > 0.8) {
      reasons.push('Good value for money')
    }

    // Safety bonus (10% weight)
    totalScore += safetyScore * 0.1
    if (safetyScore > 0.9) {
      reasons.push('Highly rated for safety')
    }

    // Boost score for verified programs
    if (program.verified) {
      totalScore += 0.1
      reasons.push('Verified organization')
    }

    // Boost score for programs with scholarships if user needs financial assistance
    if (program.cost.scholarship && program.cost.amount > 100) {
      totalScore += 0.05
      reasons.push('Scholarships available')
    }

    return {
      programId: program.id,
      score: Math.min(totalScore, 1), // Cap at 1.0
      reasons,
      safetyScore,
      ageAppropriate: true,
      interestMatch,
      locationScore,
      scheduleMatch,
      costMatch
    }
  }

  /**
   * Check if program is age appropriate for user
   */
  private checkAgeAppropriate(program: YouthProgram): boolean {
    const userAge = this.user.age
    const { min, max } = program.ageRange

    // Check if user age falls within program age range
    if (userAge < min || userAge > max) {
      return false
    }

    // Additional safety check for age difference in mixed-age programs
    if (this.user.safetySettings.maxAgeDifference > 0) {
      const ageSpan = max - min
      if (ageSpan > this.user.safetySettings.maxAgeDifference) {
        return false
      }
    }

    return true
  }

  /**
   * Calculate interest matching score
   */
  private calculateInterestMatch(program: YouthProgram): number {
    if (this.user.interests.length === 0) return 0.5 // Neutral if no interests specified

    const matchingCategories = program.categories.filter(category =>
      this.user.interests.includes(category)
    )

    return matchingCategories.length / Math.max(program.categories.length, 1)
  }

  /**
   * Calculate location proximity score
   */
  private calculateLocationScore(program: YouthProgram): number {
    // Mock distance calculation - in real app, would use actual coordinates
    const mockDistance = Math.floor(Math.random() * 20) + 1

    if (mockDistance <= this.user.preferences.maxDistance) {
      return 1 - (mockDistance / this.user.preferences.maxDistance) * 0.5
    }

    return 0.2 // Low score for programs outside preferred distance
  }

  /**
   * Calculate schedule compatibility score
   */
  private calculateScheduleMatch(program: YouthProgram): number {
    const userDays = this.user.preferences.daysAvailable
    const programDays = program.schedule.days

    if (userDays.length === 0) return 0.5 // Neutral if no days specified

    const matchingDays = programDays.filter(day =>
      userDays.some(userDay => 
        userDay.toLowerCase().includes(day.toLowerCase()) ||
        day.toLowerCase().includes(userDay.toLowerCase())
      )
    )

    if (matchingDays.length === 0) return 0.1

    return matchingDays.length / Math.max(programDays.length, 1)
  }

  /**
   * Calculate cost compatibility score
   */
  private calculateCostMatch(program: YouthProgram): number {
    if (program.cost.free) return 1.0

    // Mock affordability calculation
    const cost = program.cost.amount
    if (cost <= 50) return 0.9
    if (cost <= 100) return 0.7
    if (cost <= 200) return 0.5
    if (cost <= 500) return 0.3
    return 0.1
  }

  /**
   * Calculate safety score based on program attributes
   */
  private calculateSafetyScore(program: YouthProgram): number {
    let score = program.safetyRating / 5 // Base score from safety rating

    // Bonus for verified programs
    if (program.verified) {
      score += 0.2
    }

    // Bonus for programs with clear requirements
    if (program.requirements.length > 0) {
      score += 0.1
    }

    // Bonus for programs with contact information
    if (program.contact.phone || program.contact.email) {
      score += 0.1
    }

    // Bonus for programs with capacity limits (indicates supervision)
    if (program.capacity.max < 50) {
      score += 0.1
    }

    return Math.min(score, 1.0)
  }

  /**
   * Get ranked programs based on match scores
   */
  getRankedPrograms(): YouthProgram[] {
    const scoredPrograms = this.programs.map(program => ({
      program,
      score: this.calculateMatchScore(program)
    }))

    // Filter out programs with score 0 (not age appropriate)
    const validPrograms = scoredPrograms.filter(({ score }) => score.score > 0)

    // Sort by score descending
    validPrograms.sort((a, b) => b.score.score - a.score.score)

    return validPrograms.map(({ program }) => program)
  }

  /**
   * Get match explanation for a program
   */
  getMatchExplanation(program: YouthProgram): string[] {
    const score = this.calculateMatchScore(program)
    return score.reasons
  }
}

/**
 * Safety validation for programs
 */
export class SafetyValidator {
  /**
   * Perform comprehensive safety check on a program
   */
  static validateProgram(program: YouthProgram): SafetyCheck {
    const checks = {
      ageAppropriate: this.checkAgeAppropriate(program),
      verifiedOrganization: this.checkVerifiedOrganization(program),
      backgroundCheckedStaff: this.checkBackgroundChecks(program),
      safeLocation: this.checkSafeLocation(program),
      appropriateSupervision: this.checkSupervision(program),
      noInappropriateContent: this.checkContent(program)
    }

    const overallScore = Object.values(checks).filter(Boolean).length / Object.keys(checks).length
    const flagged = overallScore < 0.6 || !checks.ageAppropriate

    return {
      programId: program.id,
      checks,
      overallScore,
      flagged,
      reviewNotes: flagged ? 'Program requires manual review' : undefined
    }
  }

  private static checkAgeAppropriate(program: YouthProgram): boolean {
    // Check for reasonable age ranges
    const ageSpan = program.ageRange.max - program.ageRange.min
    return ageSpan <= 10 && program.ageRange.min >= 0 && program.ageRange.max <= 25
  }

  private static checkVerifiedOrganization(program: YouthProgram): boolean {
    return program.verified && 
           program.organization.length > 0 &&
           (program.contact.email || program.contact.phone)
  }

  private static checkBackgroundChecks(program: YouthProgram): boolean {
    // Programs with capacity limits likely have supervised staff
    return program.capacity.max < 100 && program.requirements.length > 0
  }

  private static checkSafeLocation(program: YouthProgram): boolean {
    // Check for public or well-known venues
    const safeVenues = [
      'library', 'community center', 'school', 'park', 'museum', 
      'theater', 'gym', 'church', 'mosque', 'temple'
    ]
    
    const locationName = program.location.name.toLowerCase()
    return safeVenues.some(venue => locationName.includes(venue))
  }

  private static checkSupervision(program: YouthProgram): boolean {
    // Programs with clear schedules and requirements likely have supervision
    return program.schedule.days.length > 0 && 
           program.requirements.length > 0 &&
           program.capacity.max < 50
  }

  private static checkContent(program: YouthProgram): boolean {
    // Check for inappropriate content in title and description
    const inappropriateKeywords = [
      'alcohol', 'drinking', 'smoking', 'drugs', 'party', 'club',
      'adult', 'mature', 'explicit', 'unsupervised'
    ]

    const text = `${program.title} ${program.description}`.toLowerCase()
    return !inappropriateKeywords.some(keyword => text.includes(keyword))
  }
}
