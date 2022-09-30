import { Result } from '@ddd/domain/base-classes/result';
import { UseCaseError } from '@ddd/domain/base-classes/use-case';

export namespace CreateUserErrors {
  export class EmailAlreadyExistError extends Result<UseCaseError> {
    public static create(message: string) {
      return new EmailAlreadyExistError(message);
    }

    constructor(message: string) {
      super({
        isSuccess: false,
        value: message,
      });
    }
  }
}
