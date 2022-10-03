import { Email } from '../../value-objects/email';
import { Password } from '../../value-objects/password';

export enum UserRole {
  admin = 'admin',
  guest = 'guest',
}

export interface CreateUserProps {
  email: Email;
  password: Password;
}

export interface UserProps extends CreateUserProps {
  role: UserRole;
}

export type User = UserProps;
