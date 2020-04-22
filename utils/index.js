export const createRequestValidator = ({ body, params, query }) => async (
	req,
	res,
	next
) => {
	body && (await body.validate(req.body, { abortEarly: false }));
	params && (await params.validate(req.params, { abortEarly: false }));
	query && (await query.validate(req.query, { abortEarly: false }));

	next();
};

export const getTags = (text) => {
	const tags = [];
	let matchResult = [];

	while ((matchResult = text.match(/#(>>>)?(\w+)(>>>)?/im))) {
		tags.push(matchResult[2]);
		text = text.slice(matchResult["index"] + 1);
	}

	return tags;
};
