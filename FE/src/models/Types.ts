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

export type Comment = {
	name: string
	body: string
	date: string
};
