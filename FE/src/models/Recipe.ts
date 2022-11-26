import { Post } from "../models/Post";
import { Nutriton } from "../models/Types";

export class Recipe extends Post {
	private ingredients: string;
    private category: number;
    private image: string;
    private favs: number;
    private nutrition: Nutriton | null;

    constructor( articleId: number ,postId: number, authorId: string, authorName: string, category: number, create_at: string, title: string, description: string, ingredients: string , remarks: string, image: string, favs: number, nutrition: Nutriton | null) {
        super(articleId, postId, authorId, authorName, create_at, title, description, remarks);
        this.ingredients = ingredients;
        this.category = category;
        this.image = image;
        this.favs = favs;
        this.nutrition = nutrition;
    };

    get_ingredients (): object[] {
        const ary: { [K in 'name' & 'amount']: string | number }[] = [];
        this.ingredients.split(",").map(value => value.split(":")).forEach(values => ary.push({ name: values[0], amount: values[1] }));

        return ary;
    }

    get_category(): number {
        return this.category;
    }

    get_favs(): number {
        return this.favs;
    }

    get_nut(): Nutriton | null{
        return this.nutrition;
    }
    
    get_image(): string {
        return this.image;
    }

    set_image( imageURL: string ): void {
        this.image = imageURL;
    }
};
