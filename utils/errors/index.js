export class HandledError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status || 500;
	}
}

export class ValidationError extends HandledError {
	constructor(message, status) {
		super(message || "Incorrect data provided");
		this.name = this.constructor.name;
		this.status = status || 400;
	}
}

export class AuthorizationError extends HandledError {
	constructor(message, status) {
		super(message || "Unauthorized");
		this.name = this.constructor.name;
		this.status = status || 401;
	}
}
