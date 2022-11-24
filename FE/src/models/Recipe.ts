import { Post } from "../models/Post";

export class Recipe extends Post {
	private ingredients: string;
    private category: number;
    private image: string;
    private favs: number;

    constructor( articleId: number ,postId: number, author: string, category: number, create_at: string, title: string, description: string, ingredients: string , remarks: string, image: string, favs: number) {
        super(articleId, postId, author, create_at, title, description, remarks);
        this.ingredients = ingredients;
        this.category = category;
        this.image = image;
        this.favs = favs;
    };

    get_ingredients (): object[] {
        const ary: { [K in 'name' & 'amount']: string | number }[] = [];
        this.ingredients.split(",").map(value => value.split(":")).map(values => ary.push({ name: values[0], amount: values[1] }));

        return ary;
    }

    get_category(): number {
        return this.category;
    }

    get_favs(): number {
        return this.favs;
    }
    
    get_image(): string {
        return this.image;
    }

    set_image( imageURL: string ): void {
        this.image = imageURL;
    }
};
