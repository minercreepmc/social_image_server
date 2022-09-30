import { RequestDTO } from '@ddd/interface-adapters/base-classes/request.dto.base';
import { CreateUser } from '@interfaces/user';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDTO extends RequestDTO<CreateUser> {
  @IsEmail()
  @MinLength(5)
  @MaxLength(320)
  readonly email: string;

  @MinLength(8)
  @MaxLength(128)
  readonly password: string;
}
