import { IAttributes } from '../interfaces/attributes.interface';
export declare class CustomTag {
    private readonly attributes;
    readonly text: string;
    constructor(attributes: IAttributes, text: string);
    getAttribute<T>(name: string): T;
}
//# sourceMappingURL=custom-tag.model.d.ts.map