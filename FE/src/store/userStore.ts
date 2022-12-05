import { defineStore } from "pinia";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { AddUserInfo } from "../models/Types";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://authcloudrun-x3e22bo5za-an.a.run.app";

interface State {
    user: {
        uid: string,
        token: string,
        name: string,
        favs: Array<number>
    };
}

export const useUserStore = defineStore( "user", {
    state: (): State => ({
        user: {
            uid: "",
            token: "",
            name: "",
            favs: []
        }
    }),

    getters: {
        is_user_login( state ): boolean { 
            return state.user.token ? true : false;
        },
        is_fav_recipe( state ) {
            return (post_id: number): boolean => state.user.favs.some( f => f === post_id );
        },
        get_uid( state ): string {
            return state.user.uid
        },
        get_user_token( state ): string {
            return state.user.token ? state.user.token : ""
        },
        get_user_name( state ): string {
            return state.user.name
        },
    },

    actions: {
        get_user_account( uid: string, token: string ) {
            return new Promise<boolean>((resolve, reject) => {
                const get_user_option: AxiosRequestConfig = {
                    method: "GET",
                    url: `${BASE_URL}/v1/users/${uid}/account`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },  
                };
                axios(get_user_option)
                .then( (res: AxiosResponse<{ id: string, name: string, like: [] }> ) => {
                    this.user.uid = res.data.id;   
                    this.user.token = token;   
                    this.user.name = res.data.name;  
                    this.user.favs = res.data.like.map( (l: any) => l.postId )
                    resolve(this.is_user_login) ;
                }).catch( e => {
                    console.log(e);
                    reject(this.is_user_login);
                });
            });
        },
        
        register_user_account( uid: string, token: string, user_info: AddUserInfo ) {
            return new Promise<void>((resolve, reject) => {
                
                const post_user_option: AxiosRequestConfig = {
                    url: `${BASE_URL}/v1/users/account`,
                    method: "POST",
                    data: { uid: uid, name: user_info.name, age: Number(user_info.age), gender: Number(user_info.gender) },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },  
                };
                axios(post_user_option)
                .then( res => {
                    resolve();
                })
                .catch( e => {
                    alert("登録に失敗しました。もう一度お試しください")
                    reject();
                })
            })
        },

        // お気に入りの登録/解除をリアクティブに対応
        user_toggle_favs( postId: number, is_fav: boolean ) {
            if ( is_fav ) { 
                const i = this.user.favs.indexOf(postId);
                this.user.favs.splice(i, 1);
            } else {
                this.user.favs.push(postId);
            }
        },

        logout_user() {
            this.user = {
                uid: "",
                token: "",
                name: "",
                favs: []
            }
        }
    }
});


