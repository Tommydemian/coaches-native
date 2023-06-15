import { Gender } from './Gender'
import { Rating } from './Rating'
import { Verification } from './Coach'
import { Subscription } from './Subscription'

export interface BlockedUser {
  _id: string
  additionalText: string
  reason: string
}

export interface SilencedUser {
  _id: string
  createdAt: Date | string
  data: UserUI
}

export interface User {
    /* FROM GQL */
    _id: string
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    age: number
    countryIsoCode: string
    emailValidated: boolean
    subscription: Subscription
    ranking: number
    rankingVerified: number
    rankingConfidence: number
    rankingVerifiedConfidence: number
    photo: string
    // matches: Match[]
    lastResetPasswordRequestDate: Date
    resetPasswordAttemptsAtDate: number
    resetPasswordAttempts: number
    token: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  
    isCoach: boolean
    locationID: string
    rating: Rating
    ratingVerified?: Rating
    type: string
    blockedUsers?: BlockedUser[]
    silencedUsers?: SilencedUser[]
    verification: {
      createdAt: Date
    }
}

export interface UserUI {
    [key: string]: unknown
    _id: string
    firstName: string
    lastName: string
    photo?: string
    team?: string
    rating?: Rating
    ratingVerified?: Rating | null
    ratingBefore?: Rating | null
    ratingAfter?: Rating | null
    location?: {
      _id: string
      name: string
    }
    travelLocation?: {
      _id: string
      name: string
    }
    gender?: Gender
    isCoach?: boolean
    verification?: Verification | null
    pendingVerification?: Verification | null
    hidden: boolean
  }