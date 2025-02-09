import { makeAutoObservable } from "mobx";
import {getCookie} from "cookies-next";
class WorkspaceStore {
    availableSlug: boolean = false;
    availableSlugs: Array<string> = []
    constructor() {
        makeAutoObservable(this);
    }

    async createWorkspace(userId: string, name: string, slug: string) {
        const res = await fetch("/api/workspace", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, name, slug }),
        });

        if (!res.ok) throw new Error("Invalid credentials");
    }

    async checkSlug(slug: string) {
        const token = getCookie('token');

        let response = await fetch(`/api/workspace/check-slug?slug=${slug}`, {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                Caller: 'user'
            },
        })

        const jsonResponse =  await response.json()

        if (!jsonResponse.isSlugAvailable) {
            this.availableSlugs = jsonResponse.availableSlugs
            return this.availableSlug = false;
        }

        return this.availableSlug = true
    }
}


const workspaceStore = new WorkspaceStore();
export default workspaceStore;
