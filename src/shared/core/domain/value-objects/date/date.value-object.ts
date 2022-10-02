import { Result } from '@core/domain/base-classes/result';
import { ValueObject } from '@core/domain/base-classes/value-object.base';
import { Exception, ArgumentInvalidExeception } from '@exceptions';

export type DateVOValue = Date | string | number;

export class DateVO extends ValueObject<DateVOValue> {
  public get value(): DateVOValue {
    return this.props.value;
  }

  public static create(value: DateVOValue): Result<Exception | DateVO> {
    const dateVo = new DateVO(value);
    return dateVo.guard();
  }

  public guard(): Result<Exception | DateVO> {
    if (!DateVO.isValid(this)) {
      return Result.fail(ArgumentInvalidExeception.create('Incorrect date'));
    }

    return Result.ok(this);
  }

  public static isValid(candidate: DateVOValue | DateVO) {
    let parsedCandidate: DateVOValue;
    if (typeof candidate === 'string') {
      parsedCandidate = Date.parse(candidate.trim());
    } else if (candidate instanceof DateVO) {
      if (candidate.value === 'Invalid Date') return false;
      if (typeof candidate.value === 'string') {
        parsedCandidate = Date.parse(candidate.value);
      }
    }
    return Boolean(!Number.isNaN(parsedCandidate));
  }

  public static now() {
    return new DateVO(Date.now());
  }

  private constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date.toString() });
  }
}
