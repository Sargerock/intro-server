import express from "express";
import cors from "cors";

import { PORT, SEED } from "./config";
import sequelize from "./db";
import { errorHandler } from "./utils/errors/";
import dbSeed from "./db/db-seed";
import router from "./routers";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

if (SEED) {
	sequelize.sync({ force: true }).then(async () => {
		await dbSeed();
		console.log(`Database successfully synchronized`);
	});
}
app.listen(PORT || 8000, () => {
	console.log("Server is running on port: ", PORT);
});
