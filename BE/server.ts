import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
const app = express();

/**
 * Prisma
 */

import { PrismaClient, Prisma } from '@prisma/client';
import { type } from "os";
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
	console.log(user);
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
		console.log(user);
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
    	include: { post: { select: { authorId: true, like: true, comment: true }}} })
  	return res.json(recipes);
});

// レシピを登録
app.post('/api/v1/recipe', async (req: Request, res: Response) => {
  	// const { uid ,title, description, ingredients, remarks, nut_option } = req.body;
  	const { uid, title, category_id, description, ingredients, remarks, img_url ,nut_option } = req.body;

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
    	return res.json(recipe);

 	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				console.log(e);
			}
		}
    	return res.status(400).json(e);
  	}
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

// 全てのメニューを取得
app.post('/api/v1/fav', async (req: Request, res: Response) => {
	const { user_id, post_id } = req.body;
	try {
		const fav = await prisma.like.create({
			data: {
				userId: user_id, postId: post_id
			}
		});
		console.log(fav);
		return res.json(fav);
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



// // リレーションモデルも含めたGET
// app.get('/api/v1/users', async (req: Request, res: Response) => {
//   const users = await prisma.user.findMany({
//     include: { Posts: true }
//   });
//   return res.json(users);
// });

// // ポスト
// app.post('/api/v1/users', async (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email
//       }
//     });
//     return res.json(user);
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === 'P2002') {
//         console.log(
//           'There is a unique constraint violation, a new user cannot be created with this email'
//         );
//       }
//     }
//     return res.status(400).json(e);
//   }
//   });

// // Postのポスト
// app.post('/api/v1/post', async (req: Request, res: Response) => {
//   const { title, content, authorId } = req.body;
//   try {
//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         authorId,
//       },
//     });
//     return res.json(post);
//   } catch (e) {
//     return res.status(400).json(e);
//   }
// });

// // ユーザ情報の更新
// app.put('/api/v1/user/:id', async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const { name } = req.body;
//   try {
//    const user = await prisma.user.update({
//     where: {
//       id
//     },
//     data: {
//       name
//     }
//    });
//    return res.json(user);
//   } catch (e) {
//     return res.status(400).json(e);
//   }
// });

// app.delete('/api/v1/user/:id', async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         id,
//       },
//     });
//     return res.json(user);
//   } catch (e) {
//     return res.status(400).json(e);
//   }
// });

