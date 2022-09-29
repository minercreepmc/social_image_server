import { Fail, Result } from '@ddd/domain/base-classes/result';
import { UseCase } from '@ddd/domain/base-classes/use-case';
import { Guard } from '@ddd/guard';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { CreateUserRequestDTO } from './create-user.request.dto';
import { CreateUserResponseDTO } from './create-user.response.dto';

export class CreateUserUseCase
  implements UseCase<CreateUserRequestDTO, CreateUserResponseDTO>
{
  execute(dto?: CreateUserRequestDTO): CreateUserResponseDTO {
    const emailOrError = Email.create(dto?.email);
    const passwordOrError = Password.create(dto?.email);

    const dtoResult = Guard.resultBulk([emailOrError, passwordOrError]);

    if (dtoResult.isFailure) {
      return Fail.create(Result.fail(dtoResult.error));
    }


  }
}
