import { IAttributes } from '../interfaces/attributes.interface';

export class CustomTag {
  private readonly attributes: IAttributes;
  readonly text: string;

  constructor(attributes: IAttributes, text: string) {
    this.attributes = attributes;
    this.text = text;
  }

  getAttribute<T>(name: string) {
    return this.attributes.find((a) => a.name === name)?.value as T;
  }
}
