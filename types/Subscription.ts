export interface Subscription {
    status: boolean
    plan?: string
    stripeData?: {
      customerID?: string
      priceID?: string
      productID?: string
    }
  }
  