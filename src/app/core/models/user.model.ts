export interface UserModel {
  firstName: string;
  lastName: string;
  email: string
}

export interface LoginResponse {
  user: UserModel;
  status: string;
  token: string;
}

export interface LoginState {
  isLoggedIn: boolean
}
export interface DescriptionModel{
  value: string
}
export interface ProductMdodel
 {
  name: string;
  description: DescriptionModel[];
  price: number;
  img_link: string;
  weight: number;
  vendor: string;
 }
