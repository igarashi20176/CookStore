export class Recipe {
    private postId: number;
	private author: string;
	private readonly create_at: string;
	private title: string;
	private description: string;
	private ingredients: string;
	private remarks: string;

    constructor(postId: number, author: string, create_at: string, title: string, description: string, ingredients: string , remarks: string ) {
        this.postId = postId;
        this.author = author;
        this.create_at = create_at;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.remarks = remarks;
    };

    get_postId (): number {
        return this.postId;
    };

    get_ingredients (): object[] {
        const ary: { [K in 'name' & 'amount']: string | number }[] = [];
        this.ingredients.split(",").map(value => value.split(":")).map(values => ary.push({ name: values[0], amount: values[1] }));

        return ary;
    }

    get_author ():string {
        return this.author;
    }

    get_created_date ():string {
        return this.create_at;
    }

    get_title ():string {
        return this.title;
    }

    get_description ():string {
        return this.description;
    }

    get_remarks ():string {
        return this.remarks;
    }

};