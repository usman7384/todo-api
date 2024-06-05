import app from './web/expressApp';
import config from './infra/config';
import 'reflect-metadata';
import { AppDataSource } from "./infra/db/data-source";


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
