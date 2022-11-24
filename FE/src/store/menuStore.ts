import { defineStore } from "pinia";
import { Menu } from "../models/Menu";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import { ref as fsRef, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase";


const base_url = "http://localhost:8080"

interface State {
    menus: Menu[]
}

export const useMenuStore = defineStore( "menu", {
    state: (): State => ({
        menus: []
    }),

    getters: {
        get_length_menus( state ): number { 
            return state.menus.length 
        },
        get_all_menus( state ): object[] {
            return state.menus;
        },
        get_one_menu( state ) {
            return (postId: number): object => {
                return state.menus[postId]
            }
        },
        find_one_menu_index( state ) {
            return (postId: number): number => state.menus.findIndex( r => r.get_postId() === postId )      
        }
    },

    actions: {
        get_from_database_menus() {
            return new Promise<boolean>((resolve, reject) => {
                this.menus = [];

                const get_menus_option: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/menus`,
                    method: "GET",
                };

                axios(get_menus_option)
                .then((res: AxiosResponse<object[]>) => {
                    const { data, status } = res;
                                    
                    data.forEach( (d: any) => {                    
                        this.menus.push(new Menu(d.id, d.postId, d.post.authorId, d.create_at, d.title, d.description, d.remarks, d.staple, d.main, d.sub, d.soup ));
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
        get_recipes_images() {
            if ( this.get_length_menus > 0 ) {
                this.menus.forEach( r => {
                    
                    [r.get_staple_image(), r.get_main_image(), r.get_sub_image(), r.get_soup_image()].forEach((i, idx) => {
                        getDownloadURL(fsRef(storage, i))
                        .then((url: string) => {const xhr = new XMLHttpRequest()
                            xhr.responseType = 'blob'
                            xhr.onload = (event) => {
                            }
                            xhr.open('GET', url)
                            xhr.send();

                            if ( idx === 0 ) r.set_staple_image(url);
                            if ( idx === 1 ) r.set_main_image(url);
                            if ( idx === 2 ) r.set_sub_image(url);
                            if ( idx === 3 ) r.set_soup_image(url);

                        }).catch((error: any) => {
                            console.log('画像の取得に失敗しました')
                            console.log(error);
                        });

                    });
                });
            }
        },
        post_database_menu( recipe: any ) {
            console.log(recipe);
        }
    }
});

