export interface UserDetailsResponse {
  UserId: number;
  Name: string;
  Role: '1' | '2';
  UserName: string;
  UserMenus: string[];
}

export interface UserAddUpdateRequest {
  UserId: number;
  Name: string;
  Role: '1' | '2';
  Password: string;
  UserName: string;
  UserMenus: string[];
}

export interface UserResponse{
  Token:string,
  ExpiryDate:Date
}
