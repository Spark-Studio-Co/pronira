export interface IGetUserDto {
  agencyName?: string;
  balance: number;
  category: string[];
  city: string;
  email: string;
  flatsLink: string;
  subscriptionActive: boolean;
  subscriptionExpiresAt: string;
  groundsLink: string;
  housesLink: string;
  rentLink: string;
  isAgent: boolean;
  name: string;
  password: string;
  phoneNumber: string;
  promocode: string;
  role: string;
  id: string;
}
