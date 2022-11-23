import { defineStore } from "pinia";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";


const base_url = "http://localhost:8080";

interface State {
    user: {
        uid: string,
        token: string,
        name: string
    };
}

export const useUserStore = defineStore( "user", {
    state: (): State => ({
        user: {
            uid: "",
            token: "",
            name: ""
        }
    }),

    getters: {
        is_user_login( state ): boolean { 
            return state.user.token ? true : false;
        },
        get_uid( state ): string {
            return state.user.uid
        },
        get_user_token( state ): string | boolean {
            return state.user.token ? state.user.token : false
        },
        get_user_name( state ): string {
            return state.user.name
        },
    },

    actions: {
        get_database_user( uid: string, token: string ) {
            const requestParam: AxiosRequestConfig = {
                method: "GET",
                url: `${base_url}/api/v1/user`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },  
                params: { uid }
            };
            axios(requestParam)
            .then( (res: AxiosResponse<{ id: string, name: string }> ) => {
                this.user.uid = res.data.id;   
                this.user.token = token;   
                this.user.name = res.data.name;   
            })
        },
        logout_user_info() {
            this.user = {
                uid: "",
                token: "",
                name: ""
            }
        }
    }
});


