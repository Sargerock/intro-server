export class HandledError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status || 500;
	}
}

export class ValidationError extends HandledError {
	constructor(errors, message, status) {
		super(message || "Incorrect data provided");
		this.name = this.constructor.name;
		this.status = status || 400;
		this.errors = errors || {};
	}
}

export class AuthorizationError extends HandledError {
	constructor(message, status) {
		super(message || "Unauthorized");
		this.name = this.constructor.name;
		this.status = status || 401;
	}
}
