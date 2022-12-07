import express, { Request, Response } from "express";
const router = express.Router();

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();


// お気に入りに追加
router.post('/on_fav', async (req: Request, res: Response) => {
	const { user_id, post_id } = req.body;
	
	try {
		const like = await prisma.like.create({
			data: {
				userId: user_id, postId: post_id
			}
		});
		return res.json(like);

	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				console.log(e);
			}
		}
    	return res.status(400).json(e);
  	}
});

// お気に入りから削除 
router.delete('/off_fav', async (req: Request, res: Response) => {
	const { user_id, post_id } = req.body;
	
	try {
		const like = await prisma.like.delete({
			where: {
				userId_postId: {
					userId: user_id, postId: post_id
				}
			}
		});

		return res.json(like);
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
