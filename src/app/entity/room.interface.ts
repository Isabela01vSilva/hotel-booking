import { ICurrency } from './currency.interface'

export interface IRoom{
    roomType: {
      name: string
    },
    price: ICurrency,
    cancellationPolicies: {
      refundable: boolean
    }
  }
