import type { Identifier } from './identifier';

/**
 * Creates, wires dependencies and manages lifetime for a set of services.
 */
export interface Container {
	/**
	 * Gets the service object of the registered identifier.
	 * @param identifier Class of the service to get.
	 * @typeParam T The type of the service.
	 * @returns
	 */
	get<T>(identifier: Identifier<T>): T;
}
