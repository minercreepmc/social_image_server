import { Command, CommandHandlerBase } from '../command';

export interface UseCase<ICommand, IResponseDTO>
  extends CommandHandlerBase<ICommand, IResponseDTO> {
  execute(command: Command<ICommand>): Promise<IResponseDTO> | IResponseDTO;
}
