import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
const app = express();

/**
 * Prisma
 */

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});


/**
 * ルーティング
 */

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from GCE EXPRESS!');
});

// ユーザログイン
app.get('/api/v1/user', async (req: Request, res: Response) => {
	
	const { uid } = req.query;
	
	const user = await prisma.user.findUnique({
		where: {
			id: String(uid)
		},
		select: { id: true, name: true, like: { select: { postId: true } } }
	});

	return res.json(user);
});

// 新規ユーザーの登録
app.post('/api/v1/user', async (req: Request, res: Response) => {
	
	const { uid, name, age, gender } = req.body;

	try {
    	const user = await prisma.user.create({
      		data: {
        		id: uid, name: name,  age: age, gender: gender
      		}
    	});

		return res.json(user);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				console.log(e);
			}
		}
		return res.status(400).json(e);
	}
});


// 全てのレシピを取得
app.get('/api/v1/recipes', async (req: Request, res: Response) => {
	const recipes = await prisma.recipe.findMany({
    	include: { post: { select: { authorId: true, like: true, comment: true }}} 
	});

  	return res.json(recipes);
});

// レシピを登録
app.post('/api/v1/recipe', async (req: Request, res: Response) => {
  	// const { uid ,title, description, ingredients, remarks, nut_option } = req.body;
  	const { uid, title, category_id, description, ingredients, remarks, img_url, nut_option } = req.body;

	// 原材料のオブジェクトをテキストに変換
	let ing: Array<string> = [];
	ingredients.forEach( (i: any) => {
		ing.push(`${i.name}:${i.amount}`)
	});
	
  	try {
    	const post = await prisma.post.create({
      		data: {
        		authorId: uid
      		}
    	});

    	const recipe = await prisma.recipe.create({
			data: {
				postId: post.id, title: title, categoryId: category_id, description: description, ingredients: ing.join(), remarks: remarks, image: img_url
			}
		});

		const food_nut = await prisma.nutrition.findMany({
			where: {
				name: {
					in: ingredients.map( (i: any) => i.name )
				}
			}
		});

		if ( nut_option ) {
			
			function roundDecimal(value: number, n: number) {
				return Math.round(value * Math.pow(10, n) ) / Math.pow(10, n);
			  }

			const nut_sum_list = {
				kcal: 0,
				carbo: 0,
				protein: 0,
				fat: 0,
				fiber: 0,
				va: 0,
				vb1: 0,
				vb2: 0,
				vb6: 0,
				vc: 0, 
				vd: 0, 
				ve: 0, 
				folic: 0, 
				nat: 0, 
				kal: 0, 
				calc: 0, 
				iron: 0, 
				mag: 0, 
				zinc: 0
			};
			ingredients.forEach( (i: any) => {
				const n = food_nut.find( f => f.name === i.name ); 
				nut_sum_list.kcal += n!.kcal * (i.grams /100);
				nut_sum_list.carbo += n!.carbo * (i.grams /100);
				nut_sum_list.protein += n!.protein * (i.grams /100);
				nut_sum_list.fat += n!.fat * (i.grams /100);
				nut_sum_list.fiber += n!.fiber * (i.grams /100);
				nut_sum_list.va += n!.va * (i.grams /100);
				nut_sum_list.vb1 += n!.vb1 * (i.grams /100);
				nut_sum_list.vb2 += n!.vb2 * (i.grams /100);
				nut_sum_list.vb6 += n!.vb6 * (i.grams /100);
				nut_sum_list.vc += n!.vc * (i.grams /100);
				nut_sum_list.vd += n!.vd * (i.grams /100);
				nut_sum_list.ve += n!.ve * (i.grams /100);
				nut_sum_list.folic += n!.folic * (i.grams /100);
				nut_sum_list.nat += n!.nat * (i.grams /100);
				nut_sum_list.kal += n!.kal * (i.grams /100);
				nut_sum_list.calc += n!.calc * (i.grams /100);
				nut_sum_list.iron += n!.iron * (i.grams /100);
				nut_sum_list.mag += n!.mag * (i.grams /100);
				nut_sum_list.zinc += n!.zinc * (i.grams /100);
			});

			const nut = await prisma.nutrition.create({
				data: {
					recipeId: recipe.id, kcal: roundDecimal(nut_sum_list.kcal, 0), carbo: roundDecimal(nut_sum_list.carbo, 1), protein: roundDecimal(nut_sum_list.protein, 1), fat: roundDecimal(nut_sum_list.fat, 1), fiber: roundDecimal(nut_sum_list.fiber, 1), va: roundDecimal(nut_sum_list.va, 0), vb1: roundDecimal(nut_sum_list.vb1, 2), vb2: roundDecimal(nut_sum_list.vb2, 2), vb6: roundDecimal(nut_sum_list.vb6, 2), vc: roundDecimal(nut_sum_list.vc, 0), vd: roundDecimal(nut_sum_list.vd, 1), ve: roundDecimal(nut_sum_list.ve, 1), folic: roundDecimal(nut_sum_list.folic, 0), nat: roundDecimal(nut_sum_list.nat, 0), kal: roundDecimal(nut_sum_list.kal, 0), calc: roundDecimal(nut_sum_list.calc, 0), iron: roundDecimal(nut_sum_list.iron, 1), mag: roundDecimal(nut_sum_list.mag, 0), zinc: roundDecimal(nut_sum_list.zinc, 1)
				}
			});
		}
		
		res.json(recipe);

 	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				console.log(e);
			}
		}
		console.log(e);
    	return res.status(400).json(e);
  	}
});


// いいね数が多い上位5レシピを取得
app.get('/api/v1/popular', async (req: Request, res: Response) => {
	const recipes = await prisma.recipe.findMany({
		take: 5,
		orderBy: {
			post: {
				like: {
					_count: 'desc'
				}
			}
		},
    	include: {
			post: {
				include: {
					_count: {
						select: {
							like: true
						}
					},
				}
			}
		}
	});
  	return res.json(recipes);
});


app.get('/api/v1/menus', async (req: Request, res: Response) => {
	const menus = await prisma.menu.findMany({
		include: { 
			post: true, 
			staple: { select: { title: true, created_at: true, image: true ,post: { select: { authorId: true } } } }, 
			main: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true } } } }, 
			sub: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true } } } },
			soup: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true } } } } }
	});
	return res.json(menus);
});


// お気に入りに追加
app.post('/api/v1/fav', async (req: Request, res: Response) => {
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
// 全てのメニューを取得
app.delete('/api/v1/fav', async (req: Request, res: Response) => {
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



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
