import { UserEmail } from './user-email.value-object';

describe('email value object', () => {
  it('should fail to create a invalid email', () => {
    const emailOrError = UserEmail.create('invalid');
    expect(emailOrError.isFailure).toBe(true);
  });

  it('should be able to create a valid email', () => {
    const emailOrError = UserEmail.create('valid@example.com');
    expect(emailOrError.isSuccess).toBe(true);

    const email = emailOrError.value;
    expect(email.value).toBe('valid@example.com');
  });
});
