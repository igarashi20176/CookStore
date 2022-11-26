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
	va: number,
	vb1: number,
	vb2: number,
	vb6: number,
	vc: number,
	vd: number,
	ve: number,
	folic: number,
	nat: number,
	kal: number,
	calc: number,
	iron: number, 
	mag: number,
	zinc: number,
}

export type Comment = {
	name: string
	body: string
	date: string
};
