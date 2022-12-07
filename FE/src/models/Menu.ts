import { Post } from "../models/Post";
import { MenuRecipe } from "../models/Types";

export class Menu extends Post {
    private staple: MenuRecipe;
    private main: MenuRecipe;
    private sub: MenuRecipe;
    private soup: MenuRecipe;

    constructor( articleId: number, postId: number, authorId: string, authorName: string, create_at: string, title: string, description: string , remarks: string, staple: MenuRecipe, main: MenuRecipe, sub: MenuRecipe, soup: MenuRecipe ) {
        super(articleId, postId, authorId, authorName, create_at, title, description, remarks)
        this.staple = staple;
        this.main = main;
        this.sub = sub;
        this.soup = soup;
    };

    get_staple (): object {
        return this.staple;
    }

    get_staple_image (): string {
        return this.staple.image;
    }

    set_staple_image ( imageURL: string ): string {
        return this.staple.image = imageURL;
    }

    get_main (): object {
        return this.main;
    }

    get_main_image (): string {
        return this.main.image;
    }

    set_main_image ( imageURL: string ): string {
        return this.main.image = imageURL;
    }

    get_sub (): object {
        return this.sub;
    }

    get_sub_image (): string {
        return this.sub.image;
    }

    set_sub_image ( imageURL: string ): string {
        return this.sub.image = imageURL;
    }

    get_soup (): object {
        return this.soup;
    }

    get_soup_image (): string {
        return this.soup.image;
    }

    set_soup_image ( imageURL: string ): string {
        return this.soup.image = imageURL;
    }
};