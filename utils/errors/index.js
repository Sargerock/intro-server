export class IntroError extends Error {
	constructor(message) {
		super(message);
		this.status = 500;
	}
}

export class ValidationError extends IntroError {
	constructor(message) {
		super(message || "Incorrect data provided");
		this.name = this.constructor.name;
		this.status = 400;
	}
}

export class AuthorizationError extends IntroError {
	constructor(message) {
		super(message || "Unauthorized");
		this.name = this.constructor.name;
		this.status = 401;
	}
}
