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
