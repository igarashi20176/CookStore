"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const Movie_1 = require("./entity/Movie");
const User_1 = require("./entity/User");
const Review_1 = require("./entity/Review");
// const cors = require("cors")
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// DB接続
index_1.AppDataSource.initialize().catch((e) => {
    console.log(e);
    throw new Error("DBの接続に失敗しました");
});
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
/**
 * リポジトリ
 */
const userRepository = index_1.AppDataSource.getRepository(User_1.User);
const movieRepository = index_1.AppDataSource.getRepository(Movie_1.Movie);
const reviewRepository = index_1.AppDataSource.getRepository(Review_1.Review);
/**
 * ルーティング
 */
app.get('/', (req, res) => {
    res.send('Hello from GCE EXPRESS!');
});
app.get('/api/v1/find/:pattern', async (req, res) => {
    let savedPhotos;
    if (parseInt(req.params.pattern) === 0) {
        savedPhotos = await movieRepository.find().catch(() => "");
        // 年代別レビュー数
    }
    else if (parseInt(req.params.pattern) === 1) {
        savedPhotos = await reviewRepository.createQueryBuilder("r")
            .select(['r.movie_id, count(*) as movieCount']).where("u.age > 30").andWhere("u.age < 39").innerJoin(User_1.User, "u", "r.user_Id = u.id").groupBy("movie_id").getRawMany()
            .catch(() => "");
        // 総レビュー数
    }
    else if (parseInt(req.params.pattern) === 2) {
        savedPhotos = await reviewRepository.createQueryBuilder("r")
            .select(['r.movie_id, count(*) as movieCount']).innerJoin(User_1.User, "u", "r.user_Id = u.id").groupBy("movie_id").getRawMany()
            .catch(() => "");
    }
    if (!savedPhotos) {
        res.json({ msg: "error find" });
    }
    else {
        res.json(savedPhotos);
    }
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
