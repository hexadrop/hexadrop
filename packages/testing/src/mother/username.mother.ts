import { MotherCreator } from './mother.creator';

export class UsernameMother {
	static random(): string {
		return MotherCreator.random().internet.userName();
	}
}
