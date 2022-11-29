"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
/**
 * Prisma
 */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
/**
 * ルーティング
 */
app.get('/', (req, res) => {
    res.send('Hello from GCE EXPRESS!');
});
// ユーザログイン
app.get('/api/v1/user/:uid', async (req, res) => {
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
app.post('/api/v1/user', async (req, res) => {
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
// 全てのレシピを取得
app.get('/api/v1/recipes', async (req, res) => {
    const all_recipes = await prisma.recipe.findMany({
        include: {
            post: {
                select: {
                    authorId: true,
                    _count: {
                        select: { like: true }
                    },
                    comment: {
                        select: {
                            user: {
                                select: { name: true }
                            },
                            body: true,
                            created_at: true
                        }
                    },
                    author: {
                        select: { name: true }
                    }
                }
            },
            nutrition: {
                select: {
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, va: true, vb1: true, vb2: true, vb6: true, vc: true, vd: true, ve: true, folic: true, nat: true, kal: true, calc: true, iron: true, mag: true, zinc: true
                }
            }
        }
    });
    return res.json(all_recipes);
});
app.get('/api/v1/category/:id', async (req, res) => {
    const category_id = req.params.id;
    const recipes = await prisma.recipe.findMany({
        where: {
            categoryId: Number(category_id)
        },
        include: {
            post: {
                select: {
                    authorId: true,
                    _count: {
                        select: { like: true }
                    },
                    comment: {
                        select: {
                            user: {
                                select: { name: true }
                            },
                            body: true,
                            created_at: true
                        }
                    },
                    author: {
                        select: { name: true }
                    }
                }
            },
            nutrition: {
                select: {
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, va: true, vb1: true, vb2: true, vb6: true, vc: true, vd: true, ve: true, folic: true, nat: true, kal: true, calc: true, iron: true, mag: true, zinc: true
                }
            }
        }
    });
    return res.json(recipes);
});
app.get('/api/v1/mypage/:uid', async (req, res) => {
    const uid = req.params.uid;
    const my_recipes = await prisma.recipe.findMany({
        where: {
            post: {
                authorId: uid
            }
        },
        include: {
            post: {
                select: {
                    authorId: true,
                    _count: {
                        select: { like: true }
                    },
                    comment: {
                        select: {
                            user: {
                                select: { name: true }
                            },
                            body: true,
                            created_at: true
                        }
                    },
                    author: {
                        select: { name: true }
                    }
                }
            },
            nutrition: {
                select: {
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, va: true, vb1: true, vb2: true, vb6: true, vc: true, vd: true, ve: true, folic: true, nat: true, kal: true, calc: true, iron: true, mag: true, zinc: true
                }
            }
        }
    });
    const all_post_number = await prisma.post.count({
        where: {
            authorId: uid
        }
    });
    const all_like_number = await prisma.like.count({
        where: {
            post: {
                authorId: uid
            }
        }
    });
    const all_comment_number = await prisma.comment.count({
        where: {
            post: {
                authorId: uid
            }
        }
    });
    const my_recipe_info = Object.assign({ my_recipes }, { posts: all_post_number, likes: all_like_number, comments: all_comment_number });
    return res.json(my_recipe_info);
});
// いいね数が多い上位5レシピを取得
app.get('/api/v1/popular', async (req, res) => {
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
                select: {
                    authorId: true,
                    _count: {
                        select: { like: true }
                    },
                    comment: {
                        select: {
                            user: {
                                select: { name: true }
                            },
                            body: true,
                            created_at: true
                        }
                    },
                    author: {
                        select: { name: true }
                    }
                }
            },
            nutrition: {
                select: {
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, va: true, vb1: true, vb2: true, vb6: true, vc: true, vd: true, ve: true, folic: true, nat: true, kal: true, calc: true, iron: true, mag: true, zinc: true
                }
            }
        }
    });
    return res.json(recipes);
});
// レシピを登録
app.post('/api/v1/recipe', async (req, res) => {
    // const { uid ,title, description, ingredients, remarks, nut_option } = req.body;
    const { uid, title, category_id, description, ingredients, remarks, img_url, nut_option } = req.body;
    // 原材料のオブジェクトをテキストに変換
    let ing = [];
    ingredients.forEach((i) => {
        ing.push(`${i.name}:${i.amount}`);
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
                    in: ingredients.map((i) => i.name)
                }
            }
        });
        if (nut_option) {
            function roundDecimal(value, n) {
                return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
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
            ingredients.forEach((i) => {
                const n = food_nut.find(f => f.name === i.name);
                nut_sum_list.kcal += n.kcal * (i.grams / 100);
                nut_sum_list.carbo += n.carbo * (i.grams / 100);
                nut_sum_list.protein += n.protein * (i.grams / 100);
                nut_sum_list.fat += n.fat * (i.grams / 100);
                nut_sum_list.fiber += n.fiber * (i.grams / 100);
                nut_sum_list.va += n.va * (i.grams / 100);
                nut_sum_list.vb1 += n.vb1 * (i.grams / 100);
                nut_sum_list.vb2 += n.vb2 * (i.grams / 100);
                nut_sum_list.vb6 += n.vb6 * (i.grams / 100);
                nut_sum_list.vc += n.vc * (i.grams / 100);
                nut_sum_list.vd += n.vd * (i.grams / 100);
                nut_sum_list.ve += n.ve * (i.grams / 100);
                nut_sum_list.folic += n.folic * (i.grams / 100);
                nut_sum_list.nat += n.nat * (i.grams / 100);
                nut_sum_list.kal += n.kal * (i.grams / 100);
                nut_sum_list.calc += n.calc * (i.grams / 100);
                nut_sum_list.iron += n.iron * (i.grams / 100);
                nut_sum_list.mag += n.mag * (i.grams / 100);
                nut_sum_list.zinc += n.zinc * (i.grams / 100);
            });
            await prisma.nutrition.create({
                data: {
                    recipeId: recipe.id, kcal: roundDecimal(nut_sum_list.kcal, 0), carbo: roundDecimal(nut_sum_list.carbo, 1), protein: roundDecimal(nut_sum_list.protein, 1), fat: roundDecimal(nut_sum_list.fat, 1), fiber: roundDecimal(nut_sum_list.fiber, 1), va: roundDecimal(nut_sum_list.va, 0), vb1: roundDecimal(nut_sum_list.vb1, 2), vb2: roundDecimal(nut_sum_list.vb2, 2), vb6: roundDecimal(nut_sum_list.vb6, 2), vc: roundDecimal(nut_sum_list.vc, 0), vd: roundDecimal(nut_sum_list.vd, 1), ve: roundDecimal(nut_sum_list.ve, 1), folic: roundDecimal(nut_sum_list.folic, 0), nat: roundDecimal(nut_sum_list.nat, 0), kal: roundDecimal(nut_sum_list.kal, 0), calc: roundDecimal(nut_sum_list.calc, 0), iron: roundDecimal(nut_sum_list.iron, 1), mag: roundDecimal(nut_sum_list.mag, 0), zinc: roundDecimal(nut_sum_list.zinc, 1)
                }
            });
        }
        res.json(recipe);
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(e);
            }
        }
        console.log(e);
        return res.status(400).json(e);
    }
});
// レシピを削除 
app.delete('/api/v1/recipe', async (req, res) => {
    const { post_id } = req.body;
    try {
        const delete_recipe = await prisma.recipe.delete({
            where: {
                postId: post_id
            }
        });
        const delete_post = await prisma.post.delete({
            where: {
                id: post_id
            }
        });
        return res.json(delete_post);
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
app.get('/api/v1/menus', async (req, res) => {
    const menus = await prisma.menu.findMany({
        include: {
            post: {
                select: { author: { select: { name: true } } }
            },
            staple: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } }, } } },
            main: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } },
            sub: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } },
            soup: { select: { title: true, created_at: true, image: true, post: { select: { authorId: true, author: { select: { name: true } } } } } }
        }
    });
    return res.json(menus);
});
// お気に入りに追加
app.post('/api/v1/fav', async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        const like = await prisma.like.create({
            data: {
                userId: user_id, postId: post_id
            }
        });
        return res.json(like);
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
// お気に入りから削除 
app.delete('/api/v1/fav', async (req, res) => {
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
app.post('/api/v1/comment', async (req, res) => {
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
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.LISTENPORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
