import { UUID } from './uuid.value-object';

describe('uuid value object', () => {
  it('should create a valid uuid', () => {
    const uuidOrError = UUID.create();
    expect(uuidOrError.isSuccess).toBe(true);

    const uuid = uuidOrError.value;
    expect(UUID.isValid(uuid)).toBe(true);
  });
});
