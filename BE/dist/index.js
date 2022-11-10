"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Movie_1 = require("./entity/Movie");
const User_1 = require("./entity/User");
const Review_1 = require("./entity/Review");
const Comments_1 = require("./entity/Comments");
const Likes_1 = require("./entity/Likes");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    // 本番環境
    // host: "192.168.1.3",
    // ローカル開発環境
    host: "34.146.116.70",
    port: 3306,
    username: "root",
    password: "renty@0220",
    database: "moviewer",
    entities: [User_1.Users, Movie_1.Movies, Review_1.Reviews, Comments_1.Comments, Likes_1.Likes],
    synchronize: true,
    logging: true,
});
