export abstract class DomainError extends Error {
	protected constructor(private readonly code: number, message: string) {
		super(message);
	}

	public errorCode(): number {
		return this.code;
	}
}
