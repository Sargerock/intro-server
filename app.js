import express from "express";
import cors from "cors";

import { PORT } from "./config";
import useRoutes from "./routers";
import sequelize from "./db";
import mainErrorHandler from "./utils/errors/main-error-handler";

const app = express();

app.use(cors());
app.use(express.json());
useRoutes(app);
app.use(mainErrorHandler);

sequelize.sync({ force: true }).then(() => {
	console.log(`Database successfully synchronized`);
	app.listen(PORT || 8000, () => {
		console.log("Server is running on port: ", PORT);
	});
});
