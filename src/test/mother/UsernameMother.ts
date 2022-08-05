import { MotherCreator } from './MotherCreator';

export class UsernameMother {
	static random(): string {
		return MotherCreator.random().internet.userName();
	}
}
