import config from '../config';
import { DataSource } from "typeorm";
import { UserModel } from '../models/User';
import { TodoModel } from '../models/Todo';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
  synchronize: true,
  logging: false,
  entities: [UserModel,TodoModel],
  migrations: [],
  subscribers: [],
});
