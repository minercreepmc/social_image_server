import { Result } from '@ddd/domain/base-classes/result';
import { Exception } from '@exceptions/exception.base';
import { AggregateRoot } from 'src/shared/ddd/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from 'src/shared/ddd/domain/base-classes/entity.base';
import { UUID } from 'src/shared/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { UserEmail } from '../value-objects/user-email';
import { UserPassword } from '../value-objects/user-password';
import { UserRole } from './user.type';

export interface CreateUserProps {
  email: UserEmail;
  password: UserPassword;
}

export interface UserProps extends CreateUserProps {
  role: UserRole;
}

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: UUID;

  public static create(createProps: CreateUserProps): Result<UserEntity> {
    const result = Result.resultBulk([
      super.guard(createProps),
      UserEntity.guard(createProps),
    ]);
    if (result.isFailure) {
      return Result.fail(result.error);
    }

    const uuidOrError = UUID.create();

    if (uuidOrError.isFailure) {
      return Result.fail(uuidOrError.error);
    }

    const uuid = uuidOrError.value;
    const props: UserProps = { ...createProps, role: UserRole.guest };

    const newUser = new UserEntity({ id: uuid, props });
    return Result.ok(newUser);
  }

  public static isValid(candidate: object) {
    if (!(candidate instanceof UserEntity)) return false;
    return true;
  }

  protected static guard(props: CreateUserProps): Result<Exception> {
    if (!UserEntity.isValid(props)) {
      return Result.fail(ArgumentInvalidExeception.create('Incorrect user'));
    }

    return Result.ok();
  }

  private constructor({ id, props }: CreateEntityProps<UserProps>) {
    super({ id, props });
  }
}
