import { MotherCreator } from './mother.creator';

export class IntegerMother {
	static random(min?: number, max?: number): number {
		if (max && min) {
			return MotherCreator.random().number.int({ max, min });
		}
		if (max) {
			return MotherCreator.random().number.int({ max });
		}
		if (min) {
			return MotherCreator.random().number.int({ min });
		}

		return MotherCreator.random().number.int();
	}
}
