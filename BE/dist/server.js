"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
/**
 * Prisma
 */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
/**
 * ルーティング
 */
app.get('/', (req, res) => {
    res.send('Hello from GCE EXPRESS!');
});
app.get('/api/v1/users', async (req, res) => {
    const users = await prisma.user.findMany({
        include: { Posts: true }
    });
    return res.json(users);
});
app.post('/api/v1/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });
        return res.json(user);
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log('There is a unique constraint violation, a new user cannot be created with this email');
            }
        }
        return res.status(400).json(e);
    }
});
app.post('/api/v1/post', async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
        return res.json(post);
    }
    catch (e) {
        return res.status(400).json(e);
    }
});
app.put('/api/v1/user/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name
            }
        });
        return res.json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
});
app.delete('/api/v1/user/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await prisma.user.delete({
            where: {
                id,
            },
        });
        return res.json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
