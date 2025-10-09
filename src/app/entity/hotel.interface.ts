import { ICurrency } from './currency.interface'
import { IRoom } from './room.interface'

export interface IHotel{
  id: number,
  hotel: {
    name: string,
    address: string,
    stars: number,
    image: string,
    description: string
  },
  lowestPrice: ICurrency,
  rooms: IRoom[]
}
