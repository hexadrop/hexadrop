import { InvalidStringValueError } from '../error/InvalidStringValueError';
import { InvalidStringValueTypeError } from '../error/InvalidStringValueTypeError';

export abstract class StringValueObject<S extends string = string> {
    readonly value: S;

    protected constructor(value: S, allowedValues?: S[])
    protected constructor(value: S, allowedValues?:undefined) {
        StringValueObject.notEmpty(value);
        StringValueObject.allowedType(value);
        StringValueObject.allowedValues(value, allowedValues);
        this.value = value;
    }

    isEqualsTo(other: StringValueObject): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    private static notEmpty(value: unknown) {
        if (value === null || value === undefined) throw new InvalidStringValueTypeError();
    }

    private static allowedType(value: unknown) {
        if (typeof value !== 'string') throw new InvalidStringValueTypeError();
    }

    private static allowedValues(value: string, values?: string[]) {
        if (values && !values.includes(value)) throw new InvalidStringValueError(value);
    }
}
