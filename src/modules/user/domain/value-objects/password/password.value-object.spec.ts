import { BasePassword } from './password.value-object';

describe('password value object', () => {
  it('should fail to create week password', () => {
    const passwordOrError = BasePassword.create('week');
    expect(passwordOrError.isFailure).toBe(true);
  });

  it('should be able to create a valid and strong password', () => {
    const passwordOrError = BasePassword.create('ValidPassword123++');
    expect(passwordOrError.isSuccess).toBe(true);

    const password = passwordOrError.value;
    expect(password.value).toBe('ValidPassword123++');
  });
});
