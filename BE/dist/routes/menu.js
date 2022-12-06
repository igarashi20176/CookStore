"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
router.get('/all', async (req, res) => {
    const menus = await prisma.menu.findMany({
        include: {
            post: {
                select: { authorId: true, author: { select: { name: true } } }
            },
            staple: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } }, } } },
            main: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } },
            sub: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } },
            soup: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } }
        }
    });
    return res.json(menus);
});
exports.default = router;
