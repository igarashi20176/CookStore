import "reflect-metadata"
import { DataSource, Like } from "typeorm";
import { Movies } from "./entity/Movie";
import { Users } from "./entity/User";
import { Reviews } from "./entity/Review";
import { Comments } from "./entity/Comments";
import { Likes } from "./entity/Likes";


export const AppDataSource = new DataSource({
  type: "mysql",
  // 本番環境
  // host: "192.168.1.3",
  // ローカル開発環境
  host: "34.146.116.70",
  port: 3306,
  username: "root",
  password: "renty@0220",
  database: "moviewer",
  entities: [Users, Movies, Reviews, Comments, Likes],
  synchronize: true, // テーブル情報を自動で反映 ※本番環境では外す
  logging: true,
});