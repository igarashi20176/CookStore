export class Post {
    private articleId: number;
    private postId: number;
	private author: string;
	private create_at: any;
	private title: string;
	private description: string;
	private remarks: string;

    constructor( articleId: number ,postId: number, author: string, create_at: any, title: string, description: string, remarks: string ) {
        this.articleId = articleId;
        this.postId = postId;
        this.author = author;
        this.create_at = create_at;
        this.title = title;
        this.description = description;
        this.remarks = remarks;
    };

    get_articleId (): number {
        return this.articleId;
    };

    get_postId (): number {
        return this.postId;
    };

    get_author ():string {
        return this.author;
    }

    get_created_at ():any {
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
}