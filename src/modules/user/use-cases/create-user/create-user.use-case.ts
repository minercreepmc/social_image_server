import { Fail, Result } from '@ddd/domain/base-classes/result';
import { UseCase } from '@ddd/domain/base-classes/use-case';
import { Guard } from '@ddd/guard';
import { UnexpectedException } from '@exceptions/unexpected.exception';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { UserRepository } from '@modules/user/infrastructure/database/user.repository';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserErrors } from './create-user.error';
import { CreateUserRequestDTO } from './create-user.request.dto';
import { CreateUserResponseDTO } from './create-user.response.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase
  implements UseCase<CreateUserRequestDTO, CreateUserResponseDTO>
{
  constructor(private readonly repository: UserRepository) {}

  async execute(command?: CreateUserCommand): CreateUserResponseDTO {
    const emailOrError = Email.create(command?.email);
    const passwordOrError = Password.create(command?.email);

    const dtoResult = Guard.resultBulk([emailOrError, passwordOrError]);

    if (dtoResult.isFailure) {
      return Fail.create(Result.fail(dtoResult.error));
    }

    const email = emailOrError.value;
    const password = passwordOrError.value;

    try {
      const isEmailExist = await this.repository.exist(email);
      if (isEmailExist) {
        const emailAlreadyExistError =
          CreateUserErrors.EmailAlreadyExistError.create(
            'Email was already taken',
          );
        return Fail.create(Result.fail(emailAlreadyExistError));
      }
    } catch (error) {
      const unexpectedError = UnexpectedException.create(error.message);
      return Fail.create(Result.fail(unexpectedError));
    }
  }
}
