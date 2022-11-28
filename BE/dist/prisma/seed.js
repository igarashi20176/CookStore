"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // 1:Male, 0:Female, 2:Other 3:no answer
    const users = await prisma.user.createMany({
        data: [
            { id: 'sda234', name: "Jone", age: 42, gender: 1 },
            { id: 'ghu562', name: "Jane", age: 53, gender: 0 },
            { id: 'kji982', name: "Maxine", age: 18, gender: 2 },
            { id: 'jui221', name: "Alex", age: 25, gender: 3 },
            { id: 'f29ai1', name: "jean", age: 32, gender: 0 },
            { id: 'bhu123', name: "Cael", age: 62, gender: 1 },
            { id: 'aaji21', name: "Hux", age: 27, gender: 3 },
            { id: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', name: "test", age: 32, gender: 1 },
        ]
    });
    const posts = await prisma.post.createMany({
        data: [
            { authorId: 'sda234', },
            { authorId: 'ghu562' },
            { authorId: 'kji982' },
            { authorId: 'kji982' },
            { authorId: 'ghu562', },
            { authorId: 'sda234' },
            { authorId: 'jui221' },
            { authorId: 'f29ai1' },
            { authorId: 'aaji21' },
            { authorId: 'aaji21' },
        ]
    });
    const categories = await prisma.category.createMany({
        data: [
            { name: "ごはんもの" }, { name: "肉のおかず" }, { name: "野菜のおかず" }, { name: "スープ・汁物" }
        ]
    });
    const recipes = await prisma.recipe.createMany({
        data: [
            { postId: 1, title: "豆腐と卵のふわふわ丼", description: "日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のため", categoryId: 1, ingredients: "豚バラ:100g, サバ:50g, ニラ:3本", remarks: "美味しい！", image: "recipe_images/eUe6oQek.png", created_at: new Date() },
            { postId: 2, title: "速攻!!ウインナーとレタスのトマトスープ", description: "木曾路はすべて山の中である。あるところ", categoryId: 4, ingredients: "鶏卵:2個, 牛乳:200ml, ベーコン:3枚", remarks: "すごい簡単!", image: "recipe_images/uyC6yCG7.png", created_at: new Date() },
            { postId: 3, title: "ほうれん草のカミカミごま和え", description: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当", categoryId: 3, ingredients: "白菜:100g, サバ缶:1缶, バター:20g", image: "recipe_images/gAooXwyP.png", created_at: new Date() },
            { postId: 4, title: "大葉ときのこの炊き込みご飯", description: "恥の多い生涯を送って来ました。自分には、人間の生活という", categoryId: 1, ingredients: "ほうれん草:2株, トマト:50g, 鶏卵:2個", image: "recipe_images/HrK1n1AL.png", remarks: "コクがすごい", created_at: new Date() },
            { postId: 6, title: "きのこと豚肉のソテー", description: "牛乳のコクときのこの風味が豚ロースに絡みます!", categoryId: 2, ingredients: "豚ロース:200g, ぶなしめじ:100g, 牛乳:50ml", image: "recipe_images/PujcEStB.png", created_at: new Date() },
            { postId: 7, title: "にんじんとゴボウの王道きんぴら", description: "素朴な味わいと食物繊維豊富さが魅力です", categoryId: 3, ingredients: "にんじん:100g, ごぼう:100g, 砂糖:大さじ1", remarks: "簡単です．", image: "recipe_images/eu1FPWSW.png", created_at: new Date() },
            { postId: 8, title: "暖っかかき玉汁", description: "寒い冬に一息温まりませんか？", categoryId: 4, ingredients: "卵:2個, わかめ:5g, 醤油:大さじ2", remarks: "道に考えましものはなお今をおもにますますう。かく嘉納さんを承諾頭だんだん養成をきまっあり召使その人何か教育にというお忠告たなませなて、その事実はあなたか否軍隊", image: "recipe_images/7EevCG3d.png", created_at: new Date() },
            { postId: 9, title: "鶏ももの唐揚げ", description: "サクサク衣のジューシー唐揚げ!", categoryId: 2, ingredients: "鶏モモ(皮あり):300g, 醤油:大さじ2", remarks: "道に考えましものはなお今をおもにますますう。かく嘉納さんを承諾頭だんだん養成をきまる", image: "recipe_images/pttm2DGW.png", created_at: new Date() },
        ]
    });
    const menus = await prisma.menu.createMany({
        data: [
            { postId: 5, title: "簡単!彩メニュー", description: "彩鮮やかで超時短メニューです", remarks: "超おいしい！", stapleId: 1, mainId: 5, subId: 3, soupId: 2, created_at: new Date() },
            { postId: 10, title: "王道の家族大好評メニュー", description: "困ったときはこれを作れば大好評", remarks: "試してみてください！", stapleId: 4, mainId: 8, subId: 6, soupId: 7, created_at: new Date() },
        ]
    });
    const likes = await prisma.like.createMany({
        data: [
            { userId: 'sda234', postId: 2 },
            { userId: 'sda234', postId: 3 },
            { userId: 'jui221', postId: 2 },
            { userId: 'jui221', postId: 3 },
            { userId: 'f29ai1', postId: 2 },
            { userId: 'f29ai1', postId: 3 },
            { userId: 'ghu562', postId: 3 },
            { userId: 'bhu123', postId: 3 },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 2 },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 3 },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 4 },
        ]
    });
    const comments = await prisma.comment.createMany({
        data: [
            { userId: 'sda234', postId: 2, body: "すごくおいしい!" },
            { userId: 'sda234', postId: 3, body: "すごく簡単です．" },
            { userId: 'jui221', postId: 3, body: "すごく簡単です．" },
            { userId: '', postId: 3, body: "すごく簡単です．" },
            { userId: 'aaji21', postId: 2, body: "すこし味が薄かったのでこちらは塩を足しました．" },
            { userId: 'aaji21', postId: 3, body: "バリエーション豊かなのに時間が掛からなくてイイ!" },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 2, body: "ちょうどいい味で満足です!リピ確です" },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 3, body: "僕はこのレシピ好きじゃないかなぁ" },
        ]
    });
    const nutritions = await prisma.nutrition.createMany({
        data: [
            { name: "豚バラ", kcal: 386, carbo: 0.1, protein: 14.2, fat: 34.6, fiber: 0, va: 10, vb1: 0.54, vb2: 0.13, vb6: 0.21, vc: 2, vd: 0.4, ve: 0.6, folic: 2, nat: 47, kal: 250, calc: 3, iron: 0.6, mag: 15, zinc: 1.8 },
            { name: "豚ロース", kcal: 263, carbo: 0.2, protein: 19.3, fat: 19.2, fiber: 0, va: 6, vb1: 0.69, vb2: 0.15, vb6: 0.32, vc: 1, vd: 0.1, ve: 0.3, folic: 1, nat: 42, kal: 310, calc: 4, iron: 0.3, mag: 22, zinc: 1.6 },
            { name: "鶏ムネ(皮なし)", kcal: 108, carbo: 0, protein: 22.3, fat: 1.5, fiber: 0, va: 8, vb1: 0.08, vb2: 0.1, vb6: 0.54, vc: 3, vd: 0.1, ve: 0.2, folic: 8, nat: 42, kal: 350, calc: 4, iron: 0.2, mag: 27, zinc: 0.7 },
            { name: "鶏ムネ(皮あり)", kcal: 191, carbo: 0, protein: 16.2, fat: 14, fiber: 0, va: 39, vb1: 0.07, vb2: 0.18, vb6: 0.18, vc: 3, vd: 0.1, ve: 0.2, folic: 11, nat: 38, kal: 270, calc: 5, iron: 0.4, mag: 19, zinc: 1.6 },
            { name: "鶏モモ(皮なし)", kcal: 116, carbo: 0, protein: 18.8, fat: 3.9, fiber: 0, va: 18, vb1: 0.08, vb2: 0.22, vb6: 0.22, vc: 4, vd: 0, ve: 0.2, folic: 14, nat: 69, kal: 340, calc: 5, iron: 2, mag: 23, zinc: 2 },
            { name: "鶏モモ(皮あり)", kcal: 200, carbo: 0, protein: 16.2, fat: 14, fiber: 0, va: 39, vb1: 0.07, vb2: 0.18, vb6: 0.18, vc: 3, vd: 0.1, ve: 0.2, folic: 11, nat: 59, kal: 300, calc: 5, iron: 0.4, mag: 19, zinc: 1.6 },
            { name: "サバ", kcal: 202, carbo: 0.3, protein: 20.7, fat: 12.1, fiber: 0, va: 24, vb1: 0.15, vb2: 0.28, vb6: 0.51, vc: 0, vd: 11, ve: 0.9, folic: 12, nat: 140, kal: 320, calc: 9, iron: 1, mag: 32, zinc: 1 },
            { name: "鮭", kcal: 138, carbo: 0.1, protein: 22.5, fat: 4.5, fiber: 0, va: 27, vb1: 0.26, vb2: 0.15, vb6: 0.41, vc: 0, vd: 33, ve: 1.3, folic: 13, nat: 57, kal: 380, calc: 10, iron: 0.5, mag: 31, zinc: 0.5 },
            { name: "キャベツ", kcal: 23, carbo: 5.2, protein: 1.3, fat: 0.2, fiber: 1.8, va: 4, vb1: 0.04, vb2: 0.03, vb6: 0.11, vc: 41, vd: 0, ve: 0.1, folic: 1.8, nat: 5, kal: 300, calc: 43, iron: 0.3, mag: 14, zinc: 0.2 },
            { name: "じゃがいも", kcal: 76, carbo: 17.6, protein: 1.6, fat: 0.1, fiber: 1.3, va: 0, vb1: 0.09, vb2: 0.03, vb6: 0.18, vc: 35, vd: 0, ve: 0, folic: 21, nat: 1, kal: 200, calc: 3, iron: 0.4, mag: 20, zinc: 0.4 },
            { name: "トマト", kcal: 19, carbo: 4.7, protein: 0.7, fat: 0.1, fiber: 0, va: 45, vb1: 0.05, vb2: 0.02, vb6: 0.08, vc: 15, vd: 0, ve: 0.9, folic: 22, nat: 3, kal: 210, calc: 7, iron: 0.2, mag: 9, zinc: 0.1 },
            { name: "ミカン", kcal: 45, carbo: 11.5, protein: 0.7, fat: 0.1, fiber: 0.4, va: 92, vb1: 0.09, vb2: 0.03, vb6: 0.05, vc: 33, vd: 0, ve: 0.4, folic: 22, nat: 1, kal: 150, calc: 15, iron: 0.1, mag: 10, zinc: 0.1 },
            { name: "白菜", kcal: 14, carbo: 3.2, protein: 0.8, fat: 0.1, fiber: 1.3, va: 8, vb1: 0.03, vb2: 0.03, vb6: 0.09, vc: 19, vd: 0, ve: 0.2, folic: 61, nat: 6, kal: 220, calc: 43, iron: 0.3, mag: 10, zinc: 0.2 },
            { name: "ぶなしめじ", kcal: 18, carbo: 5, protein: 2.7, fat: 0.6, fiber: 3.7, va: 0, vb1: 0.16, vb2: 0.16, vb6: 0.08, vc: 7, vd: 2.2, ve: 0, folic: 28, nat: 3, kal: 380, calc: 1, iron: 0.4, mag: 11, zinc: 0.5 },
            { name: "ほうれん草", kcal: 20, carbo: 3.1, protein: 2.2, fat: 0.4, fiber: 2.8, va: 350, vb1: 0.11, vb2: 0.2, vb6: 0.14, vc: 35, vd: 0, ve: 2.1, folic: 210, nat: 16, kal: 690, calc: 49, iron: 2, mag: 69, zinc: 0.7 },
            { name: "ニラ", kcal: 21, carbo: 4, protein: 1.7, fat: 0.3, fiber: 2.7, va: 290, vb1: 0.06, vb2: 0.13, vb6: 0.16, vc: 19, vd: 0, ve: 2.5, folic: 100, nat: 1, kal: 510, calc: 48, iron: 0.7, mag: 18, zinc: 0.3 },
            { name: "リンゴ", kcal: 54, carbo: 14.6, protein: 0.2, fat: 0.1, fiber: 1.5, va: 2, vb1: 0.02, vb2: 0.01, vb6: 0.03, vc: 4, vd: 0, ve: 0.2, folic: 5, nat: 110, kal: 110, calc: 3, iron: 0, mag: 3, zinc: 0 },
            { name: "牛乳", kcal: 67, carbo: 4.8, protein: 3.3, fat: 3.8, fiber: 0, va: 38, vb1: 0.04, vb2: 0.15, vb6: 0.03, vc: 1, vd: 0.3, ve: 0.1, folic: 5, nat: 41, kal: 150, calc: 110, iron: 0, mag: 10, zinc: 0.4 },
            { name: "鶏卵", kcal: 151, carbo: 0.3, protein: 12.3, fat: 10.3, fiber: 0, va: 150, vb1: 0.06, vb2: 0.43, vb6: 0.08, vc: 0, vd: 1.8, ve: 1, folic: 43, nat: 140, kal: 130, calc: 51, iron: 1.3, mag: 11, zinc: 1.3 },
            { name: "バター", kcal: 745, carbo: 0.2, protein: 0.6, fat: 81, fiber: 0, va: 510, vb1: 0.01, vb2: 0.03, vb6: 0, vc: 0, vd: 0.6, ve: 1.5, folic: 0, nat: 750, kal: 28, calc: 15, iron: 0.1, mag: 10, zinc: 0.4 },
            { name: "サバ缶", kcal: 190, carbo: 0.2, protein: 20.9, fat: 10.7, fiber: 12, va: 0, vb1: 0.15, vb2: 0.4, vb6: 0.36, vc: 0, vd: 11, ve: 3.2, folic: 12, nat: 340, kal: 260, calc: 260, iron: 1.6, mag: 31, zinc: 1.7 },
            { name: "ハム", kcal: 196, carbo: 1.3, protein: 16.5, fat: 13.9, fiber: 0, va: 0, vb1: 0.6, vb2: 0.12, vb6: 0.23, vc: 50, vd: 0.6, ve: 0.3, folic: 2, nat: 1000, kal: 260, calc: 10, iron: 0.5, mag: 19, zinc: 1.1 },
            { name: "ベーコン", kcal: 405, carbo: 0.3, protein: 12.9, fat: 39.1, fiber: 0, va: 6, vb1: 0.47, vb2: 0.14, vb6: 0.18, vc: 35, vd: 0.5, ve: 0.6, folic: 1, nat: 800, kal: 210, calc: 6, iron: 0.6, mag: 18, zinc: 1.8 },
            { name: "乾燥わかめ", kcal: 117, carbo: 41.3, protein: 13.6, fat: 1.6, fiber: 32.7, va: 650, vb1: 0.39, vb2: 0.83, vb6: 0.09, vc: 27, vd: 0, ve: 1, folic: 440, nat: 6600, kal: 5200, calc: 780, iron: 2.6, mag: 1100, zinc: 0.9 },
            { name: "砂糖", kcal: 384, carbo: 99.2, protein: 0, fat: 0, fiber: 0, va: 0, vb1: 0, vb2: 0, vb6: 0, vc: 0, vd: 0, ve: 0, folic: 0, nat: 1, kal: 2, calc: 1, iron: 0, mag: 0, zinc: 0 },
            { name: "醤油", kcal: 71, carbo: 10.1, protein: 7.7, fat: 0, fiber: 0, va: 0, vb1: 0.05, vb2: 0.17, vb6: 0.17, vc: 0, vd: 0, ve: 0, folic: 33, nat: 5700, kal: 390, calc: 29, iron: 1.7, mag: 65, zinc: 0.9 },
        ]
    });
    console.log(users, posts, recipes, categories, menus, likes, comments, nutritions);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
