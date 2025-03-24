export interface UpdateUserDTO {
  chatId: string;
  name: string;
  city: string;
  phoneNumber: string;
  email: string;
  isAgent: boolean;
  agency: string;
  password: string;
  rentLink?: string;
  housesLink?: string;
  groundsLink?: string;
  flatsLink?: string;
}
