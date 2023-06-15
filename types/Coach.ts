import { Rating } from './Rating'
import { Gender } from './Gender'
import { VerificationMethod } from './VerificationMethod'
import { UserUI } from './User'

export interface CoachStats {
  memberSince: Date
  openRequestCount: number
  requestCount: number
  verifiedCount: number
}

export interface Coach extends UserUI, CoachStats {}

export interface VerificationApproveInput {
  ratingAfter: Rating
  gender: Gender
  method: VerificationMethod
  info: string
}

export interface Verification extends VerificationApproveInput {
  _id: string
  userID: string
  coachRequestedID?: string
  locationID?: string
  coachID?: string
  verifiedAt?: Date
  declinedAt?: Date
  declineReason?: string
  createdAt: Date
  user: UserUI
  coach?: UserUI
}
