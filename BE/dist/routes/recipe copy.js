"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// 全てのレシピを取得
router.get('/all', async (req, res) => {
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
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, VA: true, VB1: true, VB2: true, VB6: true, VC: true, VD: true, VE: true, folic: true, natrium: true, kalium: true, calcium: true, iron: true, magnesium: true, zinc: true
                }
            }
        }
    });
    return res.json(all_recipes);
});
router.get('/:category_id/category', async (req, res) => {
    const category_id = req.params.category_id;
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
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, VA: true, VB1: true, VB2: true, VB6: true, VC: true, VD: true, VE: true, folic: true, natrium: true, kalium: true, calcium: true, iron: true, magnesium: true, zinc: true
                }
            }
        }
    });
    return res.json(recipes);
});
router.get('/:uid/my_recipe', async (req, res) => {
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
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, VA: true, VB1: true, VB2: true, VB6: true, VC: true, VD: true, VE: true, folic: true, natrium: true, kalium: true, calcium: true, iron: true, magnesium: true, zinc: true
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
router.get('/popular', async (req, res) => {
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
                    kcal: true, carbo: true, protein: true, fat: true, fiber: true, VA: true, VB1: true, VB2: true, VB6: true, VC: true, VD: true, VE: true, folic: true, natrium: true, kalium: true, calcium: true, iron: true, magnesium: true, zinc: true
                }
            }
        }
    });
    return res.json(recipes);
});
// レシピを登録
router.post('/post_recipe', async (req, res) => {
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
                nut_sum_list.va += n.VA * (i.grams / 100);
                nut_sum_list.vb1 += n.VB1 * (i.grams / 100);
                nut_sum_list.vb2 += n.VB2 * (i.grams / 100);
                nut_sum_list.vb6 += n.VB6 * (i.grams / 100);
                nut_sum_list.vc += n.VC * (i.grams / 100);
                nut_sum_list.vd += n.VD * (i.grams / 100);
                nut_sum_list.ve += n.VE * (i.grams / 100);
                nut_sum_list.folic += n.folic * (i.grams / 100);
                nut_sum_list.nat += n.natrium * (i.grams / 100);
                nut_sum_list.kal += n.kalium * (i.grams / 100);
                nut_sum_list.calc += n.calcium * (i.grams / 100);
                nut_sum_list.iron += n.iron * (i.grams / 100);
                nut_sum_list.mag += n.magnesium * (i.grams / 100);
                nut_sum_list.zinc += n.zinc * (i.grams / 100);
            });
            const nut = await prisma.nutrition.create({
                data: {
                    recipeId: recipe.id, kcal: roundDecimal(nut_sum_list.kcal, 0), carbo: roundDecimal(nut_sum_list.carbo, 1), protein: roundDecimal(nut_sum_list.protein, 1), fat: roundDecimal(nut_sum_list.fat, 1), fiber: roundDecimal(nut_sum_list.fiber, 1), VA: roundDecimal(nut_sum_list.va, 0), VB1: roundDecimal(nut_sum_list.vb1, 2), VB2: roundDecimal(nut_sum_list.vb2, 2), VB6: roundDecimal(nut_sum_list.vb6, 2), VC: roundDecimal(nut_sum_list.vc, 0), VD: roundDecimal(nut_sum_list.vd, 1), VE: roundDecimal(nut_sum_list.ve, 1), folic: roundDecimal(nut_sum_list.folic, 0), natrium: roundDecimal(nut_sum_list.nat, 0), kalium: roundDecimal(nut_sum_list.kal, 0), calcium: roundDecimal(nut_sum_list.calc, 0), iron: roundDecimal(nut_sum_list.iron, 1), magnesium: roundDecimal(nut_sum_list.mag, 0), zinc: roundDecimal(nut_sum_list.zinc, 1)
                }
            });
        }
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
router.delete('/del_recipe', async (req, res) => {
    const { post_id } = req.body;
    try {
        await prisma.recipe.delete({
            where: {
                postId: post_id
            }
        });
        await prisma.like.deleteMany({
            where: {
                postId: post_id
            }
        });
        await prisma.comment.deleteMany({
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
exports.default = router;
