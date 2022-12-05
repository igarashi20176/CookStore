"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
router.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}));
// ユーザログイン
router.get('/:uid/account', async (req, res) => {
    const uid = req.params.uid;
    const user = await prisma.user.findUnique({
        where: {
            id: uid
        },
        select: { id: true, name: true, like: { select: { postId: true } } }
    });
    return res.json(user);
});
// 新規ユーザーの登録
router.post('/account', async (req, res) => {
    const { uid, name, age, gender } = req.body;
    try {
        const post_user = await prisma.user.create({
            data: {
                id: uid, name: name, age: age, gender: gender
            }
        });
        return res.json(post_user);
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(e);
            }
        }
        return res.status(400).json(e);
    }
});
exports.default = router;
