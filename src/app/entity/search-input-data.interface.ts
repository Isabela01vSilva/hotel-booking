export interface ISearchInputData {
  destinationName: string;
  region: string;
  checkInDate: number;
  checkOutDate: number;
  guest: {
    adults: number;
    children: number;
  };
}
