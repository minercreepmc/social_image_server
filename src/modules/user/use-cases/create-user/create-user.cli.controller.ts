import { BaseController } from '@ddd/interface-adapters/base-classes/controller.base';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDTO } from './create-user.request.dto';

export class CreateUserCliController extends BaseController {
  async createUser(userDto?: CreateUserRequestDTO): Promise<void> {
    const commandOrError = CreateUserCommand.create(userDto);
    if (commandOrError.isFailure) {
      console.log(commandOrError.error);
    }

    const command = commandOrError.value;
    await this.commandBus.execute(command);
  }
}
