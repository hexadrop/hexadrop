import { MotherCreator } from './MotherCreator';

export class SerialNumberMother {
	static random(): string {
		return MotherCreator.random().internet.password();
	}
}
