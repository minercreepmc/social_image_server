import { Result } from '@ddd/domain/base-classes/result';
import { UserEmail } from '../value-objects/user-email';
import { UserPassword } from '../value-objects/user-password';
import { UserEntity } from './user.entity';

describe('user entity', () => {
  it('Should be able to create a valid user', () => {
    const emailOrError = UserEmail.create('valid@example.com');
    const passwordOrError = UserPassword.create('StrongPassword123++');

    const valueObjectResult = Result.resultBulk([
      emailOrError,
      passwordOrError,
    ]);

    expect(valueObjectResult.isSuccess).toBe(true);

    const email = emailOrError.value;
    const password = emailOrError.value;

    const userOrError = UserEntity.create({ email, password });
    expect(userOrError.isSuccess).toBe(true);
  });
});
