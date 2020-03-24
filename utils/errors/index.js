export class ValidationError extends Error {
	constructor(message) {
		super(message || "Incorrect data provided");
		this.name = this.constructor.name;
	}
}
