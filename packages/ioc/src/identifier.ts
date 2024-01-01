import type { Abstract } from '@hexadrop/types/abstract';
import type { Newable } from '@hexadrop/types/newable';

/**
 * Service identifier. Can be a concrete implementation or an abstraction.
 * @typeParam T Class type.
 */
export type Identifier<T> = Newable<T> | Abstract<T>;
