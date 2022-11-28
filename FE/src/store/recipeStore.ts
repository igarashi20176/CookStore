import { defineStore } from "pinia";
import { Recipe } from "../models/Recipe";
import { AddRecipeInfo, Mypage, Comment } from "../models/Types";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { v4 as uuidv4 } from 'uuid';

import { getDownloadURL , deleteObject, ref as fsRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";


const FOLDER_NAME = "recipe_images";
const base_url = "http://localhost:8080";

// type RECIPE = typeof Recipe

interface State {
    recipes: Recipe[];
    // レシピに対応するコメントを保持
    comments: Array<{ postId: number, comments: Comment[] }>;
}

export const useRecipeStore = defineStore( "recipe", {
    state: (): State => ({
        recipes: [],
        comments: []
    }),

    getters: {
        get_length_recipes( state ): number { 
            return state.recipes.length 
        },
        find_one_recipe( state ) {
            return ( postId: number ): any => state.recipes.find( r => r.get_postId() === postId )      
        },
        // c: { postId: number, comments: Comment[] }を型指定してもエラーが出る → anyで代用
        find_recipe_comments( state ) {
            return ( postId: number ): Comment[] => { 
                const c: any = state.comments.find( (c: any) => c.postId === postId )
                return c.comments;
            }
        }
    },

    actions: {
        get_all_recipes() {
            return new Promise<boolean>((resolve, reject) => {
                this.recipes = [];
                this.comments = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/recipes`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse<object[]>) => {
                    const { data, status } = res;
                                                  
                    data.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name, d.category, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
                        this.comments.push({
                            postId: d.postId,
                            comments: d.post.comment.map( (c: { user: { name: string }, body: string, created_at: string }) => {
                                    return { name: c.user.name, body: c.body, createdAt: c.created_at }  
                                })
                        });
                    });
                    
                    this.get_recipes_images();
                    resolve(false);
                })
                .catch((e: AxiosError<{ error: string }>) => {
                    // エラー処理
                    console.log(e.message);
                    reject(true);
                });
            });
        },

        get_popular_recipes() {
            return new Promise<boolean>((resolve, reject) => {
                this.recipes = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/popular`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse<object[]>) => {
                    const { data, status } = res;
                                    
                    data.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name ,d.category, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
                    });
                    
                    this.get_recipes_images();
                    resolve(false);
                })
                .catch((e: AxiosError<{ error: string }>) => {
                // エラー処理
                    console.log(e.message);
                    reject(true);
                });
            });
        },

        get_recipes_by_category( category_id: number ) {
            return new Promise<boolean>((resolve, reject) => {
                this.recipes = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/category/${category_id}`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse<object[]>) => {
                    const { data, status } = res;
                                    
                    data.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name, d.category, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
                    });
                    
                    this.get_recipes_images();
                    resolve(false);
                })
                .catch((e: AxiosError<{ error: string }>) => {
                // エラー処理
                    console.log(e.message);
                    reject(true);
                });
            });
        },

        get_my_recipes( author_id: string ) {
            return new Promise<Mypage>((resolve, reject) => {
                this.recipes = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/mypage/${author_id}`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse) => {
                    const { data, status } = res;
                    
                    console.log(data);
                    data.my_recipes.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name, d.category, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
                    });
                    
                    this.get_recipes_images
                    
                    resolve({ posts: data.posts, likes: data.likes, comments: data.comments});
                })
                .catch((e: AxiosError<{ error: string }>) => {
                // エラー処理
                    console.log(e.message);
                    reject({ posts: 0, likes: 0, comments: 0});
                });
            });
        },

        post_my_recipe( uid: string ,recipe: AddRecipeInfo ) {
            return new Promise<void>((resolve, reject) => {
                const img_url = `${FOLDER_NAME}/${String(uuidv4()).substring(0,8)}.${recipe.file.type.substring(6)}`
                let storageRef = fsRef(storage, img_url);

                // firebase storageに画像を格納
                uploadBytes(storageRef, recipe.file)
                .then( () => {
                    delete recipe.file;
                    const post_opt: AxiosRequestConfig = {
                        url: `${base_url}/api/v1/recipe`,
                        method: "POST",
                        data: { uid: uid, ...recipe, img_url: img_url }
                    };

                    axios(post_opt)
                    .then((res: AxiosResponse<object[]>) => {
                        console.log(res);
                        resolve();
                    })
                    .catch( e => console.log(e)); 
                        reject();
                })
                .catch(err => console.log(err)) 
            })
        },

        delete_my_recipe( post_id: number, img_url: string ) {
            let storageRef = fsRef(storage, img_url);

            // firebase storageに画像を格納
            deleteObject(storageRef)
            .then( () => {
                const delete_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/recipe`,
                    method: "delete",
                    data: { post_id: post_id }
                };

                axios(delete_opt)
                .then((res: AxiosResponse<object>) => {
                    console.log(res);
                })
                .catch( e => console.log(e)); 
            })
            .catch(err => console.log(err)) 
        },

        toggle_fav(uid: string, post_id: number, is_fav: boolean) {  
            const fav_opt: AxiosRequestConfig = {
                url: `${base_url}/api/v1/fav`,
                method: is_fav ? "DELETE" : "POST",
                data: { user_id: uid, post_id: post_id }
            };

            axios(fav_opt)
            .then( res => {
                console.log(res);
            })
            .catch( e => console.log(e)); 
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
    }
});

