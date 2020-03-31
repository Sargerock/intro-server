import express from "express";
import cors from "cors";

import { PORT, SEED } from "./config";
import useRoutes from "./routers";
import sequelize from "./db";
import mainErrorHandler from "./utils/errors/main-error-handler";
import dbSeed from "./db/db-seed";

const app = express();

app.use(cors());
app.use(express.json());
useRoutes(app);
app.use(mainErrorHandler);

sequelize.sync({ force: SEED }).then(async () => {
	if (SEED) await dbSeed();
	console.log(`Database successfully synchronized`);
	app.listen(PORT || 8000, () => {
		console.log("Server is running on port: ", PORT);
	});
});
