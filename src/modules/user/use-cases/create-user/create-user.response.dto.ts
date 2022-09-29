import { Either, Result } from '@ddd/domain/base-classes/result';
import { CreateUserErrors } from './create-user.error';

export type CreateUserResponseDTO = Either<
  CreateUserErrors.EmailAlreadyExistError | Result<any>,
  any
>;
