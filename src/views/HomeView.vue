<template>
    <DialogModal :show="show">
        <form @submit.prevent class="form">
            <!-- Записали двустороннее связывание тремя способами -->
            <!-- Метод, стрелочная функция, упрощённая версия от vue -->
            <!-- <input type="text" :value="title" @input="setTitle" placeholder="Название" class="input" /> -->
            <!-- <input type="text" :value="body" @input="e => body = e.target.value" placeholder="Описание" class="input" /> -->
            <!-- <input type="text" v-model="body" placeholder="Описание" class="input"/> -->
            <my-input :value="title" v-model:mValue="title" placeholder="Название" class="input" />
            <my-input :value="body" v-model:mValue="body" placeholder="Описание" class="input" />

            <my-button @click="addPost">Добавить</my-button>
        </form>
    </DialogModal>

    <my-button class="button" @click="show = !show">Добавить пост</my-button>

    <select class="select" v-model="selectedSort">
        <option disabled selected>Выберите вариант сортировки</option>
        <option value="title">По названию</option>
        <option value="body">По содержимому</option>
    </select>

    <my-input v-model:mValue="searching" placeholder="Поиск"></my-input>

    <div v-if="sortedAndFilteredPosts.length">
        <PostCard
            v-for="post in [...sortedAndFilteredPosts, post].slice((activePage - 1) * limit, (activePage - 1) * limit + limit)"
            :key="post.id" :post="post" @removePost="removePost" />
    </div>
    <h2 v-else>Постов нет</h2>

    <div class="pagination" v-if="pagesCount > 1">
        <button class="pagination__btn" :class="{ pagination__active: activePage == page }" v-for="page in pagesCount"
            :key="page" @click="activePage = page">{{ page }}</button>
    </div>

    {{ $store.state.post }}
    {{ $store.getters.getPost }}

    {{ $store.state.auto }}
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import DialogModal from "@/components/DialogModal.vue";
import axios from "axios";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex"
import { usePostStore } from "@/pinia";
import { storeToRefs } from "pinia";

export default {
    components: {
        PostCard,
        DialogModal,
    },

    // НОВЫЙ ВАРИАНТ
    setup() {
        function addPost() {
            const newPost = {
                id: new Date(),
                title: title.value,
                body: body.value,
            };
            posts.data.push(newPost);
        }

        function removePost(id) {
            posts.data = posts.data.filter((el) => el.id != id)
        }

        async function getPosts() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                if (response.status == 200) {
                    posts.data = response.data
                }
            } catch (e) {
                console.log(e);
            }
        }

        const store = useStore()

        const title = ref("");
        const body = ref("");
        const show = ref(false);
        const selectedSort = ref("Выберите вариант сортировки");
        const searching = ref("");
        const limit = ref(10);
        const activePage = ref(1);
        const postStore = usePostStore();
        const {post} = storeToRefs(postStore);
        const {changePost} = postStore

        const posts = reactive(
            {
                data: [{ id: 1, title: "HTML", body: "Язык разметки" },
                { id: 2, title: "CSS", body: "Язык стилей" },
                { id: 3, title: "JS", body: "Язык скриптов" },
                { id: 4, title: "Vbnue", body: "Fros3vf-фреймворк" }],
            })

        const sortedPosts = computed(() => {
            if (selectedSort.value === "Выберите вариант сортировки") return posts.data
            return [...posts.data].sort((post1, post2) => {
                return post1[selectedSort.value].localeCompare(post2[selectedSort.value]);
            });
        });

        const sortedAndFilteredPosts = computed(() => {
            return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searching.value.trim().toLowerCase()));
        });

        const pagesCount = computed(() => {
            return Math.ceil([...sortedAndFilteredPosts.value, post].length / limit.value);
        });

        onMounted(async () => {
            await getPosts();
            store.dispatch("auto/setCar", "goveshka")
            changePost(104);
        });

        watch(searching, () => {
            activePage.value = 1
        });

        return {
            title, body, show, pagesCount, sortedAndFilteredPosts, removePost,
            addPost, selectedSort, searching, limit, activePage, post,
        }
    }

    // СТАРЫЙ ВАРИАНТ

    // data - просто данные, переменные
    // data() {
    //     return {
    //         title: "",
    //         body: "",
    //         show: false,
    //         selectedSort: "Выберите вариант сортировки",
    //         searching: "",
    //         limit: 10,
    //         activePage: 1,
    // posts: [
    //     { id: 1, title: "HTML", body: "Язык разметки" },
    //     { id: 2, title: "CSS", body: "Язык стилей" },
    //     { id: 3, title: "JS", body: "Язык скриптов" },
    //     { id: 4, title: "Vbnue", body: "Fros3vf-фреймворк" },
    // ]
    //     }
    // },
    // // methods - просто методы
    // methods: {
    //     setTitle(e) {
    //         this.title = e.target.value
    //     },
    //     addPost() {
    //         this.posts.push({
    //             id: new Date,
    //             title: this.title,
    //             body: this.body,
    //         });

    //         this.title = "";
    //         this.body = "";
    //         this.show = !this.show
    //     },
    //     removePost(id) {
    //         this.posts = this.posts.filter(el => el.id != id);
    //     },
    // async getPosts() {
    //     try {
    //         const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    //         if (response.status == 200) {
    //             this.posts = response.data
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // },
    // mounted() {
    //     this.getPosts();
    //     // Взаимодействие с action
    //     this.$store.dispatch("setId", 103)
    //     // Взаимодействие с mutations(так лучше не делать, к mutations лучше обращаться из action)
    //     this.$store.commit("changePost", {id: 102})

    //     this.$store.dispatch("auto/setCar", "goveshka")
    // },
    // // watch позволяет отслеживать изменение какой-то переменной
    // // watch: {
    // //   selectedSort(newValue) {
    // //     this.posts.sort((post1, post2) => {
    // //       return post1[newValue].localeCompare(post2[newValue]);
    // //     });
    // //   }
    // // },
    // watch: {
    //     searching() {
    //         this.activePage = 1
    //     }
    // },
    // // computed является результатом функции, будет обновляться, если обновляются зависимые от него значения
    // computed: {
    //     sortedPosts() {
    // if (this.selectedSort === "Выберите вариант сортировки") return this.posts;
    // return [...this.posts].sort((post1, post2) => {
    //     return post1[this.selectedSort].localeCompare(post2[this.selectedSort]);
    // });
    //     },
    //     sortedAndFilteredPosts() {
    //         return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searching.trim().toLowerCase()));
    //     },
    //     pagesCount() {
    //         return Math.ceil(this.sortedAndFilteredPosts.length / this.limit)
    //     },
    // }
}

</script>

<style scoped>
.input:not(:last-child) {
    margin-right: 15px;
}

.form {
    display: flex;
    flex-direction: column;
}

.select {
    border-radius: 10px;
    padding: 5px 10px;
    border: 1px solid #251288;
    margin-bottom: 15px;
    background: #fff;
    cursor: pointer;
    margin-right: 15px;
}

.button {
    margin-right: 15px;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
}

.pagination__btn {
    background: #fff;
    color: #333;
    padding: 10px;
    border: 1px solid #251288;
    border-radius: 5px;
    cursor: pointer;
}

.pagination__btn:not(:last-child) {
    margin-right: 10px;
}

.pagination__active {
    background-color: #251288;
    color: #fff;
    border: 1px solid #fff;
}
</style>