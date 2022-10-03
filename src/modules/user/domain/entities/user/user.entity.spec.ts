import { Result } from '@core/domain/base-classes/result';
import { BaseEmail } from '../../value-objects/email';
import { BasePassword } from '../../value-objects/password';
import { UserEntity } from './user.entity';

describe('user entity', () => {
  it('Should be able to create a valid user', () => {
    const emailOrError = BaseEmail.create('valid@example.com');
    const passwordOrError = BasePassword.create('StrongPassword123++');

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
