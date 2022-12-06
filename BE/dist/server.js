"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://authcloudrun-x3e22bo5za-an.a.run.app'
    ],
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/**
 * router
 */
const signup_1 = __importDefault(require("./routes/signup"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const menu_1 = __importDefault(require("./routes/menu"));
const fav_1 = __importDefault(require("./routes/fav"));
const comment_1 = __importDefault(require("./routes/comment"));
app.use('/v1/recipes', recipe_1.default);
app.use('/v1/menus', menu_1.default);
app.use('/v1/users', signup_1.default);
app.use('/v1/fav', fav_1.default);
app.use('/v1/comment', comment_1.default);
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
