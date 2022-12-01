import { defineStore } from "pinia";
import { Recipe } from "../models/Recipe";
import { AddRecipeInfo, Mypage, Comment } from "../models/Types";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { v4 as uuidv4 } from 'uuid';

import { getDownloadURL , deleteObject, ref as fsRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";


const FOLDER_NAME = "recipe_images";
const base_url = "http://localhost:8080";


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
                const c: any = state.comments.find( (c: any) => c.postId === postId );
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
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name, d.categoryId, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
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
                this.comments = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/recipes/popular`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse<object[]>) => {
                    const { data, status } = res;
                                    
                    data.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name ,d.categoryId, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
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

        get_recipes_by_category( category_id: number ) {
            return new Promise<boolean>((resolve, reject) => {
                this.recipes = [];
                this.comments = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/recipes/category/${category_id}`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse<object[]>) => {
                    const { data, status } = res;
                                    
                    data.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name, d.categoryId, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
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

        get_my_recipes( author_id: string ) {
            return new Promise<Mypage>((resolve, reject) => {
                this.recipes = [];
                this.comments = [];
                
                const get_recipes_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/recipes/mypage/${author_id}`,
                    method: "GET",
                };

                axios(get_recipes_opt)
                .then((res: AxiosResponse) => {
                    const { data, status } = res;
                    
                    data.my_recipes.forEach( (d: any) => {
                        this.recipes.push(new Recipe(d.id, d.postId, d.post.authorId, d.post.author.name, d.categoryId, d.create_at, d.title, d.description, d.ingredients, d.remarks, d.image, d.post._count.like, d.nutrition ? d.nutrition : null));
                        this.comments.push({
                            postId: d.postId,
                            comments: d.post.comment.map( (c: { user: { name: string }, body: string, created_at: string }) => {
                                    return { name: c.user.name, body: c.body, createdAt: c.created_at }  
                                })
                        });
                    });
                    
                    this.get_recipes_images();
                    
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
            return new Promise<boolean>((resolve, reject) => {
                const img_url = `${FOLDER_NAME}/${String(uuidv4()).substring(0,8)}.${recipe.file.type.substring(6)}`
                let storageRef = fsRef(storage, img_url);

                // firebase storageに画像を格納
                uploadBytes(storageRef, recipe.file)
                .then( () => {
                    delete recipe.file;
                    const post_opt: AxiosRequestConfig = {
                        url: `${base_url}/api/v1/recipes`,
                        method: "POST",
                        data: { uid: uid, ...recipe, img_url: img_url }
                    };

                    axios(post_opt)
                    .then((res: AxiosResponse<object[]>) => {
                        resolve(true);
                    })
                    .catch( e => {
                        console.log(e);
                        deleteObject(storageRef);
                        reject(false);
                    });
                })
                .catch(err => console.log(err)) 
            })
        },

        delete_my_recipe( token: string , post_id: number, img_url: string ) {
            return new Promise<boolean>((resolve, reject) => {

                let storageRef = fsRef(storage, img_url);
                
                // firebase storageの画像を削除
                deleteObject(storageRef)
                .then( () => {
                    const delete_opt: AxiosRequestConfig = {
                        url: `${base_url}/api/v1/recipes`,
                        method: "delete",
                        data: { post_id: post_id },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }, 
                    };

                    axios(delete_opt)
                    .then((res: AxiosResponse<object>) => {
                        // 現在保持しているレシピから削除
                        this.recipes.splice(this.recipes.findIndex( r => r.get_postId() === post_id ), 1);
                        resolve(true);
                    })
                    .catch( e => {
                        reject(false);
                    }); 
                })
                .catch(err => console.log(err)) 
            });
        },

        toggle_fav(uid: string, post_id: number, is_fav: boolean) {  
            return new Promise<boolean>(( resolve, reject ) => {
                const fav_opt: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/fav`,
                    method: is_fav ? "DELETE" : "POST",
                    data: { user_id: uid, post_id: post_id }
                };
                
                axios(fav_opt)
                .then( res => {
                    resolve(true);
                })
                .catch( e => reject(false) ); 
            });
        },

        post_comment(  uid: string, name: string, postId: number, comment: string ) {
            
            const com_opt: AxiosRequestConfig = {
                url: `${base_url}/api/v1/comment`,
                method: "POST",
                data: { uid: uid, postId: postId, body: comment }
            };

            axios(com_opt)
            .then( res => {
                const c = this.comments.find( c => c.postId === postId );
                c?.comments.push({ 
                    body: comment,
                    createdAt: new Date().toISOString().substring(0, 10),
                    name: name
                 });
            } )
            .catch( err => console.log( err ));
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
        
        get_app_images() {
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

