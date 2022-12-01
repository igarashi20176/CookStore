import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * router
 */
import signupRouter from "./routes/signup";
import recipeRouter from "./routes/recipe";
import menuRouter from "./routes/menu";
import favRouter from "./routes/fav";
import commentRouter from "./routes/comment";

app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/menus', menuRouter);
app.use('/api/v1/users', signupRouter );
app.use('/api/v1/fav', favRouter );
app.use('/api/v1/comment', commentRouter );



//CROS対応（というか完全無防備：本番環境ではだめ絶対）
// app.use((req: Request, res: Response, next: NextFunction) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "*");
// 	res.header("Access-Control-Allow-Headers", "*");
// 	next();
// });


app.get('/', (req: Request, res: Response) => {
	res.send('Hello from GCE EXPRESS!');
});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
