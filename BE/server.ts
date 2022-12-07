import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();


app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://authcloudrun-x3e22bo5za-an.a.run.app'
    ],
    optionsSuccessStatus: 200 
}));
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


app.use('/v1/recipes', recipeRouter);
app.use('/v1/menus', menuRouter);
app.use('/v1/users', signupRouter);
app.use('/v1/fav', favRouter );
app.use('/v1/comment', commentRouter );


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT: string | number = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
