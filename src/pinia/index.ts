import { State } from "@/store";
import {defineStore} from "pinia";

interface IPost {
    id: number;
    title: string;
    body: string;
}

export const usePostStore = defineStore("postStore", {
    state: (): State => {
        return {
            post: {
                id: 103,
                title: "Pinia Post",
                body: "Pinia Description"
            }
        }
    },
    getters: {
        getPost(): IPost {
            return {...this.post, title: "Pinia Global Post"}
        }
    },
    actions: {
        changePost(newId: number) {
            this.post.id = newId;
        }
    },
})