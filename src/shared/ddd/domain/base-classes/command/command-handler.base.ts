import { Either } from '../result';
import { Command } from './command.base';

export abstract class CommandHandlerBase<ICommand, IResponseDTO> {
  abstract execute(command: Command<ICommand>): Promise<IResponseDTO> | IResponseDTO;
}
