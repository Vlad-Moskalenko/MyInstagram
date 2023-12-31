export interface UserLogin {
  email: string,
  password: string
}

export interface UserSignUp extends UserLogin {
  name: string,
}

export interface AuthUser {
  id: string,
  name: string,
  email: string,
}