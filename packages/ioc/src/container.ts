import type { Identifier } from './identifier';

/**
 * Creates, wires dependencies and manages lifetime for a set of services.
 */
export interface Container {
	/**
	 * Returns service ids for a given tag.
	 * @param tag The tag name.
	 * @typeParam T The type of the returned services.
	 * @returns An array of service identifiers tagged with the given tag.
	 */
	findTaggedServiceIdentifiers<T = unknown>(tag: string): Identifier<T>[];

	/**
	 * Gets the service object of the registered identifier.
	 * @param identifier Class of the service to get.
	 * @typeParam T The type of the service.
	 * @returns
	 */
	get<T>(identifier: Identifier<T>): T;
}
