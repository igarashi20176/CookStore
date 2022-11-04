"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Movie_1 = require("./entity/Movie");
const User_1 = require("./entity/User");
const Review_1 = require("./entity/Review");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    // host: "192.168.1.3",　本番環境
    host: "34.146.116.70",
    port: 3306,
    username: "root",
    password: "renty@0220",
    database: "moviewer",
    entities: [User_1.User, Movie_1.Movie, Review_1.Review],
    synchronize: true,
    logging: true,
});
