import { IAttribute } from '../../interfaces/attribute.interface';

export type AttributeDto<T> = {
  name: string;
  value: T;
} & IAttribute;