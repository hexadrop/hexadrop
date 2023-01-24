import { MotherCreator } from './MotherCreator';

export class DateMother {
	static future(years?: number, refDate?: Date | number | string): Date {
		return MotherCreator.random().date.future(years, refDate);
	}

	static past(years?: number, refDate?: Date | number | string): Date {
		return MotherCreator.random().date.past(years, refDate);
	}

	static recent(days?: number, refDate?: Date | number | string): Date {
		return MotherCreator.random().date.recent(days, refDate);
	}

	static soon(days?: number, refDate?: Date | number | string): Date {
		return MotherCreator.random().date.soon(days, refDate);
	}
}
