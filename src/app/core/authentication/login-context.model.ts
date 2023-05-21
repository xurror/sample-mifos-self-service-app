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
  mobileNumber: string;
  email: string;
  password: string;
}
