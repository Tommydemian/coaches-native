export interface Rating {
    value: number
    volatility?: number
    deviation?: number
    confidence?: number
  }
  
  export interface RatingHistory {
    date: string
    rating: number
  }
  
  export interface RatingDetail extends Rating {
    verified: boolean
  }
  