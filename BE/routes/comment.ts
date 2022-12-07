import express, { Request, Response } from "express";
const router = express.Router();

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();


router.post('/my_comment', async (req: Request, res: Response) => {
	const { uid, postId, body } = req.body;
	
	try {
		const comment = await prisma.comment.create({
			data: {
				userId: uid, postId: postId, body: body
			}
		});
		return res.json(comment);

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