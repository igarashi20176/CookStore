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
            { id: 'cghi11', name: "Hil", age: 18, gender: 1 },
            { id: 'zzxx21', name: "lux", age: 42, gender: 0 },
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
            { userId: 'zzxx21', postId: 1 },
            { userId: 'zzxx21', postId: 6 },
            { userId: 'cghi11', postId: 1 },
            { userId: 'cghi11', postId: 6 },
            { userId: 'cghi11', postId: 7 },
        ]
    });
    const comments = await prisma.comment.createMany({
        data: [
            { userId: 'sda234', postId: 2, body: "すごくおいしい!" },
            { userId: 'sda234', postId: 3, body: "すごく簡単です．" },
            { userId: 'jui221', postId: 3, body: "すごく簡単です．" },
            { userId: 'ghu562', postId: 3, body: "1コメ!" },
            { userId: 'bhu123', postId: 3, body: "すごく美味しい!" },
            { userId: 'aaji21', postId: 2, body: "すこし味が薄かったのでこちらは塩を足しました．" },
            { userId: 'aaji21', postId: 3, body: "バリエーション豊かなのに時間が掛からなくてイイ!" },
            { userId: 'cghi11', postId: 3, body: "毎日食べてみたいかも!" },
            { userId: 'zzxx21', postId: 3, body: "これを毎日食べたら受験に合格しました!" },
            { userId: 'cghi11', postId: 1, body: "美味しすぎる！" },
            { userId: 'cghi11', postId: 6, body: "リピートします!" },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 2, body: "ちょうどいい味で満足です!リピ確です" },
            { userId: '3ArXqijaxBT6Fd7RqQX7eQSBt8Q2', postId: 3, body: "僕はこのレシピ好きじゃないかなぁ" },
        ]
    });
    const nutritions = await prisma.nutrition.createMany({
        data: [
            { name: "豚バラ", kcal: 386, carbo: 0.1, protein: 14.2, fat: 34.6, fiber: 0, VA: 10, VB1: 0.54, VB2: 0.13, VB6: 0.21, VC: 2, VD: 0.4, VE: 0.6, folic: 2, natrium: 47, kalium: 250, calcium: 3, iron: 0.6, magnesium: 15, zinc: 1.8 },
            { name: "豚ロース", kcal: 263, carbo: 0.2, protein: 19.3, fat: 19.2, fiber: 0, VA: 6, VB1: 0.69, VB2: 0.15, VB6: 0.32, VC: 1, VD: 0.1, VE: 0.3, folic: 1, natrium: 42, kalium: 310, calcium: 4, iron: 0.3, magnesium: 22, zinc: 1.6 },
            { name: "鶏ムネ(皮なし)", kcal: 108, carbo: 0, protein: 22.3, fat: 1.5, fiber: 0, VA: 8, VB1: 0.08, VB2: 0.1, VB6: 0.54, VC: 3, VD: 0.1, VE: 0.2, folic: 8, natrium: 42, kalium: 350, calcium: 4, iron: 0.2, magnesium: 27, zinc: 0.7 },
            { name: "鶏ムネ(皮あり)", kcal: 191, carbo: 0, protein: 16.2, fat: 14, fiber: 0, VA: 39, VB1: 0.07, VB2: 0.18, VB6: 0.18, VC: 3, VD: 0.1, VE: 0.2, folic: 11, natrium: 38, kalium: 270, calcium: 5, iron: 0.4, magnesium: 19, zinc: 1.6 },
            { name: "鶏モモ(皮なし)", kcal: 116, carbo: 0, protein: 18.8, fat: 3.9, fiber: 0, VA: 18, VB1: 0.08, VB2: 0.22, VB6: 0.22, VC: 4, VD: 0, VE: 0.2, folic: 14, natrium: 69, kalium: 340, calcium: 5, iron: 2, magnesium: 23, zinc: 2 },
            { name: "鶏モモ(皮あり)", kcal: 200, carbo: 0, protein: 16.2, fat: 14, fiber: 0, VA: 39, VB1: 0.07, VB2: 0.18, VB6: 0.18, VC: 3, VD: 0.1, VE: 0.2, folic: 11, natrium: 59, kalium: 300, calcium: 5, iron: 0.4, magnesium: 19, zinc: 1.6 },
            { name: "サバ", kcal: 202, carbo: 0.3, protein: 20.7, fat: 12.1, fiber: 0, VA: 24, VB1: 0.15, VB2: 0.28, VB6: 0.51, VC: 0, VD: 11, VE: 0.9, folic: 12, natrium: 140, kalium: 320, calcium: 9, iron: 1, magnesium: 32, zinc: 1 },
            { name: "鮭", kcal: 138, carbo: 0.1, protein: 22.5, fat: 4.5, fiber: 0, VA: 27, VB1: 0.26, VB2: 0.15, VB6: 0.41, VC: 0, VD: 33, VE: 1.3, folic: 13, natrium: 57, kalium: 380, calcium: 10, iron: 0.5, magnesium: 31, zinc: 0.5 },
            { name: "キャベツ", kcal: 23, carbo: 5.2, protein: 1.3, fat: 0.2, fiber: 1.8, VA: 4, VB1: 0.04, VB2: 0.03, VB6: 0.11, VC: 41, VD: 0, VE: 0.1, folic: 1.8, natrium: 5, kalium: 300, calcium: 43, iron: 0.3, magnesium: 14, zinc: 0.2 },
            { name: "じゃがいも", kcal: 76, carbo: 17.6, protein: 1.6, fat: 0.1, fiber: 1.3, VA: 0, VB1: 0.09, VB2: 0.03, VB6: 0.18, VC: 35, VD: 0, VE: 0, folic: 21, natrium: 1, kalium: 200, calcium: 3, iron: 0.4, magnesium: 20, zinc: 0.4 },
            { name: "トマト", kcal: 19, carbo: 4.7, protein: 0.7, fat: 0.1, fiber: 0, VA: 45, VB1: 0.05, VB2: 0.02, VB6: 0.08, VC: 15, VD: 0, VE: 0.9, folic: 22, natrium: 3, kalium: 210, calcium: 7, iron: 0.2, magnesium: 9, zinc: 0.1 },
            { name: "ミカン", kcal: 45, carbo: 11.5, protein: 0.7, fat: 0.1, fiber: 0.4, VA: 92, VB1: 0.09, VB2: 0.03, VB6: 0.05, VC: 33, VD: 0, VE: 0.4, folic: 22, natrium: 1, kalium: 150, calcium: 15, iron: 0.1, magnesium: 10, zinc: 0.1 },
            { name: "白菜", kcal: 14, carbo: 3.2, protein: 0.8, fat: 0.1, fiber: 1.3, VA: 8, VB1: 0.03, VB2: 0.03, VB6: 0.09, VC: 19, VD: 0, VE: 0.2, folic: 61, natrium: 6, kalium: 220, calcium: 43, iron: 0.3, magnesium: 10, zinc: 0.2 },
            { name: "ぶなしめじ", kcal: 18, carbo: 5, protein: 2.7, fat: 0.6, fiber: 3.7, VA: 0, VB1: 0.16, VB2: 0.16, VB6: 0.08, VC: 7, VD: 2.2, VE: 0, folic: 28, natrium: 3, kalium: 380, calcium: 1, iron: 0.4, magnesium: 11, zinc: 0.5 },
            { name: "ほうれん草", kcal: 20, carbo: 3.1, protein: 2.2, fat: 0.4, fiber: 2.8, VA: 350, VB1: 0.11, VB2: 0.2, VB6: 0.14, VC: 35, VD: 0, VE: 2.1, folic: 210, natrium: 16, kalium: 690, calcium: 49, iron: 2, magnesium: 69, zinc: 0.7 },
            { name: "ニラ", kcal: 21, carbo: 4, protein: 1.7, fat: 0.3, fiber: 2.7, VA: 290, VB1: 0.06, VB2: 0.13, VB6: 0.16, VC: 19, VD: 0, VE: 2.5, folic: 100, natrium: 1, kalium: 510, calcium: 48, iron: 0.7, magnesium: 18, zinc: 0.3 },
            { name: "リンゴ", kcal: 54, carbo: 14.6, protein: 0.2, fat: 0.1, fiber: 1.5, VA: 2, VB1: 0.02, VB2: 0.01, VB6: 0.03, VC: 4, VD: 0, VE: 0.2, folic: 5, natrium: 110, kalium: 110, calcium: 3, iron: 0, magnesium: 3, zinc: 0 },
            { name: "牛乳", kcal: 67, carbo: 4.8, protein: 3.3, fat: 3.8, fiber: 0, VA: 38, VB1: 0.04, VB2: 0.15, VB6: 0.03, VC: 1, VD: 0.3, VE: 0.1, folic: 5, natrium: 41, kalium: 150, calcium: 110, iron: 0, magnesium: 10, zinc: 0.4 },
            { name: "鶏卵", kcal: 151, carbo: 0.3, protein: 12.3, fat: 10.3, fiber: 0, VA: 150, VB1: 0.06, VB2: 0.43, VB6: 0.08, VC: 0, VD: 1.8, VE: 1, folic: 43, natrium: 140, kalium: 130, calcium: 51, iron: 1.3, magnesium: 11, zinc: 1.3 },
            { name: "バター", kcal: 745, carbo: 0.2, protein: 0.6, fat: 81, fiber: 0, VA: 510, VB1: 0.01, VB2: 0.03, VB6: 0, VC: 0, VD: 0.6, VE: 1.5, folic: 0, natrium: 750, kalium: 28, calcium: 15, iron: 0.1, magnesium: 10, zinc: 0.4 },
            { name: "サバ缶", kcal: 190, carbo: 0.2, protein: 20.9, fat: 10.7, fiber: 12, VA: 0, VB1: 0.15, VB2: 0.4, VB6: 0.36, VC: 0, VD: 11, VE: 3.2, folic: 12, natrium: 340, kalium: 260, calcium: 260, iron: 1.6, magnesium: 31, zinc: 1.7 },
            { name: "ハム", kcal: 196, carbo: 1.3, protein: 16.5, fat: 13.9, fiber: 0, VA: 0, VB1: 0.6, VB2: 0.12, VB6: 0.23, VC: 50, VD: 0.6, VE: 0.3, folic: 2, natrium: 1000, kalium: 260, calcium: 10, iron: 0.5, magnesium: 19, zinc: 1.1 },
            { name: "ベーコン", kcal: 405, carbo: 0.3, protein: 12.9, fat: 39.1, fiber: 0, VA: 6, VB1: 0.47, VB2: 0.14, VB6: 0.18, VC: 35, VD: 0.5, VE: 0.6, folic: 1, natrium: 800, kalium: 210, calcium: 6, iron: 0.6, magnesium: 18, zinc: 1.8 },
            { name: "乾燥わかめ", kcal: 117, carbo: 41.3, protein: 13.6, fat: 1.6, fiber: 32.7, VA: 650, VB1: 0.39, VB2: 0.83, VB6: 0.09, VC: 27, VD: 0, VE: 1, folic: 440, natrium: 6600, kalium: 5200, calcium: 780, iron: 2.6, magnesium: 1100, zinc: 0.9 },
            { name: "砂糖", kcal: 384, carbo: 99.2, protein: 0, fat: 0, fiber: 0, VA: 0, VB1: 0, VB2: 0, VB6: 0, VC: 0, VD: 0, VE: 0, folic: 0, natrium: 1, kalium: 2, calcium: 1, iron: 0, magnesium: 0, zinc: 0 },
            { name: "醤油", kcal: 71, carbo: 10.1, protein: 7.7, fat: 0, fiber: 0, VA: 0, VB1: 0.05, VB2: 0.17, VB6: 0.17, VC: 0, VD: 0, VE: 0, folic: 33, natrium: 5700, kalium: 390, calcium: 29, iron: 1.7, magnesium: 65, zinc: 0.9 },
        ]
    });
}
main()
    .catch((e) => {
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
