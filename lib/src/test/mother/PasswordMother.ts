import { MotherCreator } from './MotherCreator';

export class PasswordMother {
	static random(): string {
		return MotherCreator.random().internet.password();
	}
}
