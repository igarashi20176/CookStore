export type Ingredient = {
	name: string
	amount: string
	grams: number | null
};

export type AddInfo = {
	title: string
	description: string
	ingredients: Array<Ingredient>
	remarks: string
	nut_option: boolean
}

export type Recipe = {
	author: string
	create_date: string
	title: string
	description: string
	ingredients: string
	remarks: string
};

export type Comment = {
	name: string
	body: string
	date: string
};
