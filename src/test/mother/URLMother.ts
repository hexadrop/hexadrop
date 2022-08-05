import { MotherCreator } from './MotherCreator';

export class URLMother {
	static random(): string {
		return MotherCreator.random().internet.url().replace('http://', 'https://');
	}
}
