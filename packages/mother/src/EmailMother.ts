import { MotherCreator } from './MotherCreator';

export class EmailMother {
	static random(): string {
		return MotherCreator.random().internet.email();
	}
}
