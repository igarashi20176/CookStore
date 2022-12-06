"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
router.post('/my_comment', async (req, res) => {
    const { uid, postId, body } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: {
                userId: uid, postId: postId, body: body
            }
        });
        return res.json(comment);
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
