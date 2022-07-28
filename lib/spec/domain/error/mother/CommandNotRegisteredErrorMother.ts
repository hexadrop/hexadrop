import { CommandNotRegisteredError } from '../../../../src/domain/error/CommandNotRegisteredError';
import { WordMother } from '../../../../src/test';

export class CommandNotRegisteredErrorMother {
    static create(command: string): CommandNotRegisteredError {
        return new CommandNotRegisteredError(command);
    }

    static creator() {
        return () => CommandNotRegisteredErrorMother.random();
    }

    static random() {
        const word = WordMother.random();
        return this.create(word);
    }
}
