/* eslint-disable unicorn/better-regex */
import SpanishDocumentNumberError from './spanish-document-number.value-object.error';
import StringValueObject from './string.value-object';

const NIF_REGEX = /[0-9]{8}[A-Z]/;
const CIF_REGEX = /^(?<startLetter>[A-HJ-NP-SU-W])(?<numbers>\d{7})(?<endLetter>[\dA-J])$/;
const NIE_REGEX = /^(?<startLetter>[X-Z])\d{7,8}(?<endLetter>[A-Z])$/;

class SpanishDocumentNumberValueObject extends StringValueObject {
	constructor(value: string) {
		const sanitizedValue = SpanishDocumentNumberValueObject.sanitizeDocumentNumber(value);
		SpanishDocumentNumberValueObject.assertIsValid(sanitizedValue);
		super(sanitizedValue, undefined, 'SpanishDocumentNumber');
	}

	public static isValidDocumentNumber(nifCif: string): boolean {
		const esNif = NIF_REGEX.test(nifCif);
		const esCif = CIF_REGEX.test(nifCif);
		const esNie = NIE_REGEX.test(nifCif);

		return (
			(esNif && this.validateNifLetter(nifCif)) ||
			(esCif && this.validateCifLetter(nifCif)) ||
			(esNie && this.validateNieLetter(nifCif))
		);
	}

	private static assertIsValid(cifNif: string) {
		if (!this.isValidDocumentNumber(cifNif)) {
			throw new SpanishDocumentNumberError(cifNif);
		}
	}

	// Método para devolver el string limpio de caracteres
	private static sanitizeDocumentNumber(value: null | string | undefined): string {
		if (value === undefined || value === null || value === '') {
			throw new SpanishDocumentNumberError(value);
		}

		return value.toUpperCase().trim().replaceAll('_', '').replaceAll('-', '').padStart(9, '0');
	}

	// Método para validar la letra de control de un CIF
	private static validateCifLetter(cif: string) {
		if (!cif || cif.length !== 9) {
			return false;
		}

		const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
		const digits = cif.slice(1, -1);
		const letter = cif.slice(0, 1);
		const control = cif.slice(Math.max(0, cif.length - 1));
		let sum = 0;
		let index;
		let digit;

		if (!/[A-Z]/.test(letter)) {
			return false;
		}

		for (index = 0; index < digits.length; ++index) {
			digit = Number(digits[index]);

			if (Number.isNaN(digit)) {
				return false;
			}

			if (index % 2 === 0) {
				digit *= 2;
				if (digit > 9) {
					digit = Math.floor(digit / 10) + (digit % 10);
				}

				sum += digit;
			} else {
				sum += digit;
			}
		}

		sum %= 10;
		digit = sum === 0 ? sum : 10 - sum;

		if (/[ABEH]/.test(letter)) {
			return String(digit) === control;
		}
		if (/[NP-SW]/.test(letter)) {
			return letters[digit] === control;
		}

		return String(digit) === control || letters[digit] === control;
	}

	private static validateNieLetter(nif: string) {
		let niePrefix = nif.charAt(0);

		switch (niePrefix) {
			case 'X': {
				niePrefix = '0';
				break;
			}
			case 'Y': {
				niePrefix = '1';
				break;
			}
			case 'Z': {
				niePrefix = '2';
				break;
			}
			default: {
				return false;
			}
		}

		return this.validateNifLetter(niePrefix + nif.slice(1));
	}

	// Método para validar la letra de control de un NIF
	private static validateNifLetter(nif: string) {
		const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
		const letter = dniLetters.charAt(Number.parseInt(nif, 10) % 23);

		return letter === nif.charAt(8);
	}
}

export default SpanishDocumentNumberValueObject;
