export type ICustomTag = {
  text: string;
  getAttribute<T>(name: string): T;
};
