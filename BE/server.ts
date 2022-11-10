import "dotenv/config";
import express from "express";
import bodyParser from 'body-parser';
const app = express();

/**
 * Tables
 */
 import { AppDataSource } from "./index";
 import { Movies } from "./entity/Movie";
 import { Users } from "./entity/User";
 import { Reviews } from "./entity/Review";
 import { Comments } from "./entity/Comments";
 import { Likes } from "./entity/Likes";


// DB接続
AppDataSource.initialize().catch((e) => {
  console.log(e);
  throw new Error("DBの接続に失敗しました")
})


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


/**
 * リポジトリ
 */
const userRepository = AppDataSource.getRepository(Users);
const movieRepository = AppDataSource.getRepository(Movies);
const reviewRepository = AppDataSource.getRepository(Reviews);


/**
 * ルーティング
 */
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from GCE EXPRESS!');
});

app.get('/api/v1/movie', async (req: express.Request, res: express.Response) => {
  const savedMovie = await movieRepository.find().catch(() => "")
  if (!savedMovie) {
    res.json({ msg: "error find" })
  } else {
    res.json(savedMovie)
  }
});

app.get('/api/v1/find/:pattern', async (req: express.Request, res: express.Response) => {
    let savedPhotos
    
    if (parseInt(req.params.pattern) === 0) {
      savedPhotos = await movieRepository.find().catch(() => "")

      // 年代別レビュー数
    } else if(parseInt(req.params.pattern) === 1) {
      savedPhotos = await reviewRepository.createQueryBuilder("r")
      .select(['r.movie_id, count(*) as movieCount']).where("u.age > 30").andWhere("u.age < 39").innerJoin(Users, "u", "r.user_Id = u.id").groupBy("movie_id").getRawMany()
      .catch(() => "")

      // 総レビュー数
    } else if(parseInt(req.params.pattern) === 2) {
      savedPhotos = await reviewRepository.createQueryBuilder("r")
      .select(['r.movie_id, count(*) as movieCount']).innerJoin(Users, "u", "r.user_Id = u.id").groupBy("movie_id").getRawMany()
      .catch(() => "")
    }
    if (!savedPhotos) {
      res.json({ msg: "error find" })
    } else {
      res.json(savedPhotos)
    }
});

app.get('/api/v1/user', async (req: express.Request, res: express.Response) => {
  const savedUsers = await userRepository.find().catch(() => "")

  if (!savedUsers) {
    res.json({ msg: "error find" })
  } else {
    res.json(savedUsers)
  }
})


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
