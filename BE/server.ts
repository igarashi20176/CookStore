import "dotenv/config";
import express from "express";
import { AppDataSource } from "./index";
import { Movie } from "./entity/Movie";
import { User } from "./entity/User";
import { Review } from "./entity/Review";
// const cors = require("cors")
import bodyParser from 'body-parser';
const app = express();

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
const userRepository = AppDataSource.getRepository(User);
const movieRepository = AppDataSource.getRepository(Movie);
const reviewRepository = AppDataSource.getRepository(Review);


/**
 * ルーティング
 */
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from GCE EXPRESS!');
});


// postに変えろ！！！！！！
// app.get('/api/v1/insert', async (req: express.Request, res: express.Response) => {  
//   // insert data
//   const user = new User()
//   user.name = "須藤充"
//   user.age = 34
//   user.gender = 1
//   user.image = "aaa.jpg"

//   const movie = new Movie()
//   movie.title = "NO MAN"
//   movie.genre = "コメディ"
//   movie.director = "やまだごろー"
//   movie.actor_1 = "酒井俊"
//   movie.actor_2 = "山沢絵里"
//   movie.image = "bbb.jpg"
//   movie.release = "2022-01-03"

//   // 一意の値に変更する　***
//   const review = new Review()
//   review.user_id = 2
//   review.movie_id = 2
//   review.content = "『俺なんか』、ですか。あなたがご自分を誰と比べてそう言っているのか分かりませんが、あなたにとっては唯一の、大切な自分自身ですよ。そのように言ったら、あなた自身が可哀想です"
//   review.category = "感想"
//   review.rewatch = true
//   review.rating = 4
//   review.publish = "2022-07-11"

//   try {
//     await userRepository.save(user)
//     await movieRepository.save(movie)
//     await reviewRepository.save(review)    
//   } catch (error) {
//     res.send("データの保存に失敗")
//   }
  
//   res.send("insert success!")
// });

app.get('/api/v1/find/:pattern', async (req: express.Request, res: express.Response) => {
    if (parseInt(req.params.pattern) === 0) {

      const savedPhotos = await movieRepository.find().catch(() => "")
      
      if (!savedPhotos) {
        res.json({ msg: "error find" })
      } else {
        res.json(savedPhotos)
      }
    } else if(parseInt(req.params.pattern) === 1) {
      const savedPhotos = await reviewRepository.createQueryBuilder("r")
      .select(['r.movieId, count(*) as movieCount']).where("u.age > 30").andWhere("u.age < 39").innerJoin(User, "u", "r.userId = u.id").groupBy("movieId").getRawMany()
      .catch(() => "")
      
      if (!savedPhotos) {
        res.json({ msg: "error find" })
      } else {
        res.json(savedPhotos)
      }
    }
});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
