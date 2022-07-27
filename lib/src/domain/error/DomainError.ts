import { InvalidErrorCodeError } from './InvalidErrorCodeError';

const DOMAIN_ERROR_CODE = /[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/;

/**
 * The base class for all domain errors.
 *
 * @public
 */
export abstract class DomainError extends Error {
    /**
     * Returns the average of two numbers.
     *
     * @param name - The name of the error
     * @param message - The error message
     * @param code - [Optional] The error code. Must follow the next Regexp `/[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/`.
     *    For example FNL(123) or RPA(435678)
     */
    protected constructor(
        name: string,
        message: string,
        readonly code?: string,
    ) {
        DomainError.allowedValues(code);
        super(message);
        this.name = name;
    }

    private static allowedValues(value?: string) {
        if (!value) return;
        if (!DOMAIN_ERROR_CODE.test(value)) {
            throw new InvalidErrorCodeError();
        }
    }

    get errorCode(): number | undefined {
        const code = this.code?.substring(4).replace(')', '');
        return !code || isNaN(+code) ? undefined : +code;
    }
}
