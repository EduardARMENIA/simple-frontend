import { makeAutoObservable } from "mobx";
import {setCookie, getCookie, deleteCookie} from "cookies-next";
class AuthStore {
    user: any = [];

    constructor() {
        makeAutoObservable(this);
    }

    async login(email: string, password: string) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Invalid credentials");

        const data = await res.json();
        const token = data.token;

        setCookie("token", token);
        // @ts-ignore
        await this.retrieveUser()
    }

    async register(email: string, password: string) {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Invalid credentials");
    }

    async retrieveUser() {
        const token = getCookie('token');

        let response = await fetch("/api/auth/profile", {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        })

        let user = await response.json()
        this.user.push(user)
    }

    async logout() {
        deleteCookie("token");
        this.user = []
    }

}

const authStore = new AuthStore();
export default authStore;
