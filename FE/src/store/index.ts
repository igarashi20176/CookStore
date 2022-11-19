import { defineStore } from "pinia";
import { Recipe } from "../models/Recipe";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";


const axios_url = "http://localhost:8080"

interface State {
    recipes: Recipe[]
}

const options: AxiosRequestConfig = {
    url: `${axios_url}/api/v1/recipes`,
    method: "GET",
};

export const useRecipeStore = defineStore( "recipe", {
    state: (): State => ({
        recipes: []
    }),

    getters: {
        get_length_recipes( state ): number { 
            return state.recipes.length 
        },
        get_one_recipe( state ) {
            return (postId: number): object => { return state.recipes[postId] }
        },
        find_one_recipe_index( state ) {
            return (postId: number): number => state.recipes.findIndex( r => r.get_postId() === postId )      
        }
    },

    actions: {
        async get_Database_recipes() {
            this.recipes = [];

            axios(options)
            .then((res: AxiosResponse<object[]>) => {
                const { data, status } = res;
                                
                data.forEach( (d: any) => {
                    this.recipes.push(new Recipe(d.postId, d.post.authorId, d.create_at, d.title, d.description, d.ingredients, d.remarks));
                });
            })
            .catch((e: AxiosError<{ error: string }>) => {
              // エラー処理
              console.log(e.message);
            });
        }
    }
});

