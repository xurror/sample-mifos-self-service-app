/**
 * Login context model.
 */
export interface LoginContext {
  username: string;
  password: string;
  remember: boolean;
}

export interface RegistrationContext {
  accountNumber: string;
  firstName: string;
  lastName: string;
  username: string;
  mobileNumber: number;
  email: string;
  password: string;
  authenticationMode: string;
}
