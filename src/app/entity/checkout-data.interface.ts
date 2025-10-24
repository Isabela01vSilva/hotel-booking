export interface ICheckoutData {
  contactName: string,
  contactEmail: string,
  contactPhone: string,
  guests: {
    name: string,
    lastname: string
  }[];
}
