<template>
    <div v-if="post">
        <h1>Страница поста</h1>
        <p>Название поста</p>
        <p>{{ post.title }}</p>
        <p>Описание поста</p>
        <p>{{ post.body }}</p>
    </div>
    <h2 v-else>Идёт загрузка...</h2>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            post: null,
        }
    },
    async mounted() {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
            if (response.status == 200) {
                this.post = response.data;
            }
        } catch (e) {
            console.log(e)
        }
    }
 }
</script>