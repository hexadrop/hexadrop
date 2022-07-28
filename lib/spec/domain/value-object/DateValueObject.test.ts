import { describe, expect, test } from 'vitest';
import { DateValueObject } from '../../../src';
import { InvalidDateValueTypeError } from '../../../src/domain/error/InvalidDateValueTypeError';
import { DateMother } from '../../../src/test';
import { DateValueObjectMother } from './mother/DateValueObjectMother';

describe('DateValueObject', () => {
    test('should create', () => {
        const voValue = new Date(1659011272040);
        const soonValue = DateMother.soon(undefined, voValue);
        const recentValue = DateMother.recent(undefined, voValue);
        const vo = DateValueObjectMother.create(voValue);
        const soon = DateValueObjectMother.create(soonValue);
        const recent = DateValueObjectMother.create(recentValue);

        expect(vo).toBeDefined();
        expect(vo.value).toBe(voValue);
        expect(vo.toString()).toBe('2022-07-28T12:27:52.040Z');
        expect(vo.isEqualsTo(soon)).toBeFalsy();
        expect(vo.isEqualsTo(soon)).toBeFalsy();
        expect(vo.isAfterThan(recent)).toBeTruthy();
        expect(vo.isBeforeThan(soon)).toBeTruthy();
    });
    test('should throw an error if undefined', () => {
        const fn = () => DateValueObjectMother.invalidWithUndefined();
        expect(fn).toThrow(InvalidDateValueTypeError);
    });
    test('should throw an error if invalid type', () => {
        const fn = () => DateValueObjectMother.invalidWithString();
        expect(fn).toThrow(InvalidDateValueTypeError);
    });
});
