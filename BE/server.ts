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


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * ルーティング　見本
 */
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from GCE EXPRESS!');
// });

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

