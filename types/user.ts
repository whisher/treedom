export interface UserCredentialsDto {
  email: string;
  password: string;
}
export interface UserDetailsDto {
  firstname: string;
  lastname: string;
}
export interface UserAddressDto {
  street: string;
  city: string;
}
export interface UserFormDto {
  credentials: UserCredentialsDto | null;
  details: UserDetailsDto | null;
  address: UserAddressDto | null;
}
