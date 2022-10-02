import { DateVO } from './date.value-object';

describe('date value object', () => {
  it('should fail to create invalid date', () => {
    const dateOrError = DateVO.create('invalid');
    expect(dateOrError.isFailure).toBe(true);
  });

  it('should be able to create valid date', () => {
    const dateOrError = DateVO.create('02-10-2022');
    expect(dateOrError.isSuccess).toBe(true);
  });
});
