import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ICreateUser } from './create-user.interface';

export class CreateUserRequestDTO implements ICreateUser {
  @IsEmail()
  @MinLength(5)
  @MaxLength(320)
  readonly email: string;

  @MinLength(8)
  @MaxLength(128)
  readonly password: string;
}
