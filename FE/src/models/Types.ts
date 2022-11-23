export type Ingredient = {
	name: string
	amount: string
	grams: number | null
};

export type AddInfo = {
	title: string
	category_id: number
	description: string
	ingredients: Array<Ingredient>
	remarks: string
	nut_option: boolean
	file: any
}

export type Comment = {
	name: string
	body: string
	date: string
};
