import { makeAutoObservable } from "mobx";
import {getCookie} from "cookies-next";
class WorkspaceStore {
    availableSlug: boolean = false;
    availableSlugs: Array<string> = [];
    workspaces: Array<any> = [];
    constructor() {
        makeAutoObservable(this);
    }


    async getAllWorkspaces(userId: string) {
        const token = getCookie('token');

        const res = await fetch(`/api/workspace/${userId}`, {
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) throw new Error("Not found");

        const jsonResponse = await res.json()
        this.workspaces = jsonResponse.workspacesData

        return this.workspaces
    }

    async createWorkspace(userId: string, name: string, slug: string) {
        const token = getCookie('token');

        const res = await fetch("/api/workspace", {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, name, slug }),
        });

        if (!res.ok) throw new Error("Invalid credentials");

        const jsonResponse = await res.json()
        this.workspaces.push(jsonResponse.newWorkspace)

        return jsonResponse
    }

    async deleteWorkspace(id: string) {
        const token = getCookie('token');

        const res = await fetch(`/api/workspace/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) throw new Error("Delete Failed");

        this.workspaces = this.workspaces.filter(workspace => workspace._id !== id);

        return res.json()
    }


    async checkSlug(slug: string) {
        const token = getCookie('token');

        let response = await fetch(`/api/workspace/check-slug?slug=${slug}`, {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
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
