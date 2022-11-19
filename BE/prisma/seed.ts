import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1:Male, 0:Female, 2:Other 3:no answer
  const users = await prisma.user.createMany({
    data: [
      { id: 'sda234', name: "Jone", age: 42, gender: 1 }, 
      { id: 'ghu562', name: "Jane", age: 53, gender: 0 },
      { id: 'kji982', name: "Maxine", age: 18, gender: 2 },
      { id: 'jui221', name: "Alex", age: 25, gender: 3 },
    ]
  });

  const posts = await prisma.post.createMany({
    data: [
      { authorId: 'sda234' }, 
      { authorId: 'ghu562' },
      { authorId: 'kji982' },
      { authorId: 'kji982' },
      { authorId: 'ghu562' },
    ]
  });

  const recipes = await prisma.recipe.createMany({
    data: [
      { postId: 1, title: "豆腐と卵のふわふわ丼", description: "日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のため", category: "main", ingredients: "豚バラ : 100g, サバ : 50g, ニラ : 3本"}, 
      { postId: 2, title: "速攻!!ウインナーとレタスのトマトスープ", description: "木曾路はすべて山の中である。あるところ", category: "soup", ingredients: "鶏卵 : 2個, 牛乳 : 200ml, ベーコン : 3枚" },
      { postId: 3, title: "ほうれん草のカミカミごま和え", description: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当", category: "sub", ingredients: "白菜 : 100g, サバ缶 : 1缶, バター : 20g"},
      { postId: 4, title: "大葉ときのこの炊き込みご飯", description: "恥の多い生涯を送って来ました。自分には、人間の生活という", category: "staple", ingredients: "鶏モモ : 250g, トマト : 50g, 鶏卵 : 2個" },
    ]
  });

  const menus = await prisma.menu.createMany({
    data: [
      {  postId: 5, title: "簡単!彩メニュー", description: "彩鮮やかで超時短メニューです", stapleId: 4, mainId: 1, subId: 3, soupId: 2 }, 
    ]
  });

  const likes = await prisma.like.createMany({
    data: [
      { userId: 'sda234', postId: 2 }, 
      { userId: 'sda234', postId: 3 }, 
      { userId: 'kji982', postId: 2 }, 
      { userId: 'jui221', postId: 3 }, 
    ]
  });

  const comments = await prisma.comment.createMany({
    data: [
      { userId: 'sda234', postId: 2, body: "すごくおいしい!" }, 
      { userId: 'sda234', postId: 3, body: "すごく簡単です．" }, 
      { userId: 'kji982', postId: 2, body: "すこし味が薄かったのでこちらは塩を足しました．" }, 
      { userId: 'jui221', postId: 5, body: "バリエーション豊かなのに時間が掛からなくてイイ!" }, 
    ]
  });

  const nutritions = await prisma.nutrition.createMany({
    data: [
      { name: "豚バラ", kcal: 386, carbo: 0.1, protein: 14.2, fat: 34.6, fiber: 0, va: 10, vb1: 0.54, vb2: 0.13, vb6: 0.21, vc: 2, vd: 0.4, ve: 0.6, folic: 2, calc: 3, iron: 0.6, mag: 15, zinc: 1.8 },
      { name: "鶏モモ", kcal: 200, carbo: 0, protein: 16.2, fat: 14, fiber: 0, va: 39, vb1: 0.07, vb2: 0.18, vb6: 0.18, vc: 3, vd: 0.1, ve: 0.2, folic: 11, calc: 5, iron: 0.4, mag: 19, zinc: 1.6 },
      { name: "サバ", kcal: 202, carbo: 0.3, protein: 20.7, fat: 12.1, fiber: 0, va: 24, vb1: 0.15, vb2: 0.28, vb6: 0.51, vc: 0, vd: 11, ve: 0.9, folic: 12, calc: 9, iron: 1, mag: 32, zinc: 1 },
      { name: "トマト", kcal: 19, carbo: 4.7, protein: 0.7, fat: 0.1, fiber: 0, va: 45, vb1: 0.05, vb2: 0.02, vb6: 0.08, vc: 15, vd: 0, ve: 0.9, folic: 22, calc: 7, iron: 0.2, mag: 9, zinc: 0.1 },
      { name: "白菜", kcal: 14, carbo: 3.2, protein: 0.8, fat: 0.1, fiber: 1.3, va: 8, vb1: 0.03, vb2: 0.03, vb6: 0.09, vc: 19, vd: 0, ve: 0.2, folic: 61, calc: 43, iron: 0.3, mag: 10, zinc: 0.2 },
      { name: "ニラ", kcal: 21, carbo: 4, protein: 1.7, fat: 0.3, fiber: 2.7, va: 290, vb1: 0.06, vb2: 0.13, vb6: 0.16, vc: 19, vd: 0, ve: 2.5, folic: 100, calc: 48, iron: 0.7, mag: 18, zinc: 0.3 },
      { name: "牛乳", kcal: 67, carbo: 4.8, protein: 3.3, fat: 3.8, fiber: 0, va: 38, vb1: 0.04, vb2: 0.15, vb6: 0.03, vc: 1, vd: 0.3, ve: 0.1, folic: 5, calc: 110, iron: 0, mag: 10, zinc: 0.4 },
      { name: "鶏卵", kcal: 151, carbo: 0.3, protein: 12.3, fat: 10.3, fiber: 0, va: 150, vb1: 0.06, vb2: 0.43, vb6: 0.08, vc: 0, vd: 1.8, ve: 1, folic: 43, calc: 51, iron: 1.3, mag: 11, zinc: 1.3 },
      { name: "バター", kcal: 745, carbo: 0.2, protein: 0.6, fat: 81, fiber: 0, va: 510, vb1: 0.01, vb2: 0.03, vb6: 0, vc: 0, vd: 0.6, ve: 1.5, folic: 0, calc: 15, iron: 0.1, mag: 10, zinc: 0.4 },
      { name: "サバ缶", kcal: 190, carbo: 0.2, protein: 20.9, fat: 10.7, fiber: 12, va: 0, vb1: 0.15, vb2: 0.4, vb6: 0.36, vc: 0, vd: 11, ve: 3.2, folic: 12, calc: 260, iron: 1.6, mag: 31, zinc: 1.7 },
      { name: "ハム", kcal: 196, carbo: 1.3, protein: 16.5, fat: 13.9, fiber: 0, va: 0, vb1: 0.6, vb2: 0.12, vb6: 0.23, vc: 50, vd: 0.6, ve: 0.3, folic: 2, calc: 10, iron: 0.5, mag: 19, zinc: 1.1 },
      { name: "ベーコン", kcal: 405, carbo: 0.3, protein: 12.9, fat: 39.1, fiber: 0, va: 6, vb1: 0.47, vb2: 0.14, vb6: 0.18, vc: 35, vd: 0.5, ve: 0.6, folic: 1, calc: 6, iron: 0.6, mag: 18, zinc: 1.8 },
    ]
  })

  console.log(users, posts, recipes, menus, likes, comments, nutritions);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });