import { DomainNotFoundError } from '../../../../src';
import { UuidMother, WordMother } from '../../../../src/test';

export class DomainNotFoundErrorMother {
    static create(
        domain: string,
        id: string,
        param?: string,
        code?: string,
    ): DomainNotFoundError {
        return new DomainNotFoundError(
            domain,
            id,
            param,
            code,
        );
    }

    static creator() {
        return () => DomainNotFoundErrorMother.random();
    }

    static random() {
        const domain = WordMother.random();
        const id = UuidMother.random();
        const param = WordMother.random();
        return this.create(domain, id, param);
    }

    static randomWithCode(code: string) {
        const domain = WordMother.random();
        const id = UuidMother.random();
        const param = WordMother.random();
        return this.create(domain, id, param, code);
    }

    static randomWithOutParam() {
        const domain = WordMother.random();
        const id = UuidMother.random();
        return this.create(domain, id);
    }
}
