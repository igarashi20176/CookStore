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
      { postId: 1, title: "豆腐と卵のふわふわ丼", description: "日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のために、諸国民との協和による成果と、わが国全土にわたつて自由のもたらす恵沢を確保し、政府の行為によつて再び戦争の惨禍", category: "main", ingredients: "豚肉:100g"}, 
      { postId: 2, title: "速攻!!ウインナーとレタスのトマトスープ", description: "木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木", category: "soup", ingredients: "卵:2個" },
      { postId: 3, title: "ほうれん草のカミカミごま和え", description: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーと鳴いたが間の抜けた声が返るだけである", category: "sub", ingredients: "白菜:100g"},
      { postId: 4, title: "大葉ときのこの炊き込みご飯", description: "恥の多い生涯を送って来ました。自分には、人間の生活という", category: "staple", ingredients: "鶏むね肉:250g" },
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

  console.log(users, posts, recipes, menus, likes, comments);
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });