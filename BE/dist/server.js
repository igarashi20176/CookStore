"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
app.use('/api/v1/recipes', recipe_1.default);
app.use('/api/v1/menus', menu_1.default);
app.use('/api/v1/users', signup_1.default);
app.use('/api/v1/fav', fav_1.default);
app.use('/api/v1/comment', comment_1.default);
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
// app.use((req: Request, res: Response, next: NextFunction) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "*");
// 	res.header("Access-Control-Allow-Headers", "*");
// 	next();
// });
app.get('/', (req, res) => {
    res.send('Hello from GCE EXPRESS!');
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
