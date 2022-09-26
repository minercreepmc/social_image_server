import { ValueObject } from '../base-classes/value-object.base';

export abstract class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
