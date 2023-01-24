import { MotherCreator } from './MotherCreator';

export class IntegerMother {
	static random(min?: number, max?: number): number {
		if (max && min) {
			return MotherCreator.random().datatype.number({ max, min });
		}
		if (max) {
			return MotherCreator.random().datatype.number({ max });
		}
		if (min) {
			return MotherCreator.random().datatype.number({ min });
		}

		return MotherCreator.random().datatype.number();
	}
}
