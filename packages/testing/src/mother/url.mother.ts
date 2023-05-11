import { MotherCreator } from './mother.creator';

export class UrlMother {
	static random(): string {
		return MotherCreator.random().internet.url().replace('http://', 'https://');
	}
}
