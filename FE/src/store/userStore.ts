import { defineStore } from "pinia";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { AddUserInfo } from "../models/Types";

const base_url = "http://localhost:8080";

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
            return (post_id: number) => state.user.favs.some( f => f === post_id );
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
        get_from_database_user( uid: string, token: string ) {
            return new Promise<boolean>((resolve, reject) => {
                const get_user_option: AxiosRequestConfig = {
                    method: "GET",
                    url: `${base_url}/api/v1/user/${uid}`,
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
        
        register_database_user( uid: string, user_info: AddUserInfo ) {
            return new Promise<void>((resolve, reject) => {
                const post_user_option: AxiosRequestConfig = {
                    url: `${base_url}/api/v1/user`,
                    method: "POST",
                    data: { uid: uid, name: user_info.name, age: Number(user_info.age), gender: Number(user_info.gender) }
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

        user_toggle_favs( postId: number, is_fav: boolean ) {
            if ( is_fav ) { 
                const i = this.user.favs.indexOf(postId);
                this.user.favs.splice(i, 1);
            } else {
                this.user.favs.push(postId);
            }
        },

        logout_user_info() {
            this.user = {
                uid: "",
                token: "",
                name: "",
                favs: []
            }
        }
    }
});


