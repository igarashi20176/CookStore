import express, { Request, Response } from "express";
const router = express.Router();
import cors from "cors";

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

router.use(cors({
	origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200 
}));


router.get('/', async (req: Request, res: Response) => {
	const menus = await prisma.menu.findMany({
		include: { 
			post: {
				select: { author: { select: { name: true } } }
			}, 
			staple: { select: { title: true, created_at: true, image: true ,post: { select: { authorId: true, author: { select: { name: true } } }, } } }, 
			main: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } }, 
			sub: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } },
			soup: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } } 
		}
	});
	return res.json(menus);
});

export default router;