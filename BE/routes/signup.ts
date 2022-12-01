import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import cors from "cors";

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

router.use(cors({
	origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200 
}));

// ユーザログイン
router.get('/:uid', async (req: Request, res: Response) => {
	
	const uid  = req.params.uid;
	
	const user = await prisma.user.findUnique({
		where: {
			id: uid
		},
		select: { id: true, name: true, like: { select: { postId: true } } }
	});

	return res.json(user);
});

// 新規ユーザーの登録
router.post('/', async (req: Request, res: Response) => {
	
	const { uid, name, age, gender } = req.body;

	try {
    	const post_user = await prisma.user.create({
      		data: {
        		id: uid, name: name,  age: age, gender: gender
      		}
    	});

		return res.json(post_user);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				console.log(e);
			}
		}
		return res.status(400).json(e);
	}
});

export default router;