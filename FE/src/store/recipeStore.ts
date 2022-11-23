import { defineStore } from "pinia";
import { Recipe } from "../models/Recipe";
import { AddInfo } from "../models/Types";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { v4 as uuidv4 } from 'uuid';

import { getDownloadURL , deleteObject, ref as fsRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";


const FOLDER_NAME = "recipe_images"
const axios_url = "http://localhost:8080";

// type RECIPE = typeof Recipe

interface State {
    recipes: Recipe[];
}

export const useRecipeStore = defineStore( "recipe", {
    state: (): State => ({
        recipes: []
    }),

    getters: {
        get_length_recipes( state ): number { 
            return state.recipes.length 
        },
        get_all_recipes( state ) {
            return (postId: number): object[] => { return state.recipes }
        },
        get_one_recipe( state ) {
            return (postId: number): object => { return state.recipes[postId] }
        },
        find_one_recipe_index( state ) {
            return (postId: number): number => state.recipes.findIndex( r => r.get_postId() === postId )      
        }
    },

    actions: {
        get_database_recipes() {
            this.recipes = [];

            const get_options: AxiosRequestConfig = {
                url: `${axios_url}/api/v1/recipes`,
                method: "GET",
            };

            axios(get_options)
            .then((res: AxiosResponse<object[]>) => {
                const { data, status } = res;
                                
                data.forEach( (d: any) => {
                    this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.category, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image));
                });
                
                this.get_recipes_images();
            })
            .catch((e: AxiosError<{ error: string }>) => {
              // エラー処理
              console.log(e.message);
            });
        },

        get_recipes_images() {
            if ( this.get_length_recipes > 0 ) {
                this.recipes.forEach( r => {
                    getDownloadURL(fsRef(storage, r.get_image()))
                    .then((url: string) => {const xhr = new XMLHttpRequest()
                        xhr.responseType = 'blob'
                        xhr.onload = (event) => {
                        // const blob = xhr.response
                        }
                        xhr.open('GET', url)
                        xhr.send();

                        r.set_image(url);
                    }).catch((error: any) => {
                        console.log('画像の取得に失敗しました')
                        console.log(error);
                    })
                })
            }
        },

        post_database_recipe( recipe: AddInfo ) {
            const img_url = `${FOLDER_NAME}/${String(uuidv4()).substring(0,8)}.${recipe.file.type.substring(6)}`
            let storageRef = fsRef(storage, img_url);

            // firebase storageに画像を格納
            uploadBytes(storageRef, recipe.file)
            .then( () => {
                delete recipe.file;
                const post_options: AxiosRequestConfig = {
                    url: `${axios_url}/api/v1/recipe`,
                    method: "POST",
                    data: { uid: "jui221", ...recipe, img_url: img_url }
                };

                axios(post_options)
                .then((res: AxiosResponse<object[]>) => {
                    console.log(res);
                })
            }).catch(err => console.log(err)) 
        }
    }
});

