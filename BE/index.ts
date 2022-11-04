import "reflect-metadata"
import { DataSource } from "typeorm";
import { Movie } from "./entity/Movie";
import { User } from "./entity/User";
import { Review } from "./entity/Review";


export const AppDataSource = new DataSource({
  type: "mysql",
  // host: "192.168.1.3",　本番環境
  host: "34.146.116.70",
  port: 3306,
  username: "root",
  password: "renty@0220",
  database: "moviewer",
  entities: [User, Movie, Review],
  synchronize: true, // テーブル情報を自動で反映 ※本番環境では外す
  logging: true,
});