export type AppImages = {
	title_log: string
    bookmark: string
    bookmark_color: string
    heart: string
    heart_color: string
    chef_hat: string
    user: string
    writing: string
    ranking: string
    question: string
    photo_camera: string
}

export type Ingredient = {
	name: string
	amount: string
	grams: number | null
};

export type AddRecipeInfo = {
	title: string
	category_id: number
	description: string
	ingredients: Array<Ingredient>
	remarks: string
	nut_option: boolean
	file: any
}

export type AddUserInfo = {
	email: string
	password: string
	name: string
	age: number | null
	gender: number | null
}

export type Nutriton = {
	kcal: number,
	carbo: number,
	protein: number,
	fat: number,
	fiber: number,
	VA: number,
	VB1: number,
	VB2: number,
	VB6: number,
	VC: number,
	VD: number,
	VE: number,
	folic: number,
	natrium: number,
	kalium: number,
	calcium: number,
	iron: number, 
	magnesium: number,
	zinc: number,
}

export type Comment = {
	name: string
	body: string
	createdAt: string
};

export type Mypage = {
	posts: number,
	likes: number,
	comments: number
}

export type MenuRecipe = {
	title: string,
	image: string,
	post: object,
	created_at: string
}