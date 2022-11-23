import { Post } from "../models/Post";

export class Recipe extends Post {
	private ingredients: string;
    private category: number;
    private image: string;

    constructor( articleId: number ,postId: number, author: string, category: number, create_at: string, title: string, description: string, ingredients: string , remarks: string, image: string ) {
        super(articleId, postId, author, create_at, title, description, remarks);
        this.ingredients = ingredients;
        this.category = category;
        this.image = image
    };

    get_ingredients (): object[] {
        const ary: { [K in 'name' & 'amount']: string | number }[] = [];
        this.ingredients.split(",").map(value => value.split(":")).map(values => ary.push({ name: values[0], amount: values[1] }));

        return ary;
    }

    get_category() {
        return this.category;
    }
    
    get_image() {
        return this.image;
    }

    set_image( imageURL: string ) {
        this.image = imageURL;
    }
};
