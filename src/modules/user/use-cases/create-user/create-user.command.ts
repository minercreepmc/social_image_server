import { Command } from '@ddd/domain/base-classes/command.base';
import { Result } from '@ddd/domain/base-classes/result';
import { CreateUserRequestDTO } from './create-user.request.dto';

export class CreateUserCommand extends Command<CreateUserRequestDTO> {
  readonly email: string;
  readonly password: string;
  public static create(dto?: CreateUserRequestDTO) {
    const dtoOrError = Command.guard(dto);
    if (dtoOrError.isFailure) {
      return Result.fail(dtoOrError.error);
    }

    return Result.ok(new CreateUserCommand(dtoOrError.value));
  }

  private constructor(dto?: CreateUserRequestDTO) {
    super(dto);
  }
}
