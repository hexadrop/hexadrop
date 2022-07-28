import { MotherCreator } from './MotherCreator';

export class DateMother {
	static recent(days?: number, refDate?: string | Date | number): Date {
		return MotherCreator.random().date.recent(days, refDate)
	}
	static soon(days?: number, refDate?: string | Date | number): Date {
		return MotherCreator.random().date.soon(days, refDate)
	}
	static past(years?: number, refDate?: string | Date | number): Date {
		return MotherCreator.random().date.past(years, refDate)
	}
	static future(years?: number, refDate?: string | Date | number): Date {
		return MotherCreator.random().date.future(years, refDate)
	}
}
