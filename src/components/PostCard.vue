<template>
    <div class=post @click="isActive = !isActive" :class="{ post__active: isActive }">
        <p><strong>Название</strong><router-link class="post__link" :to="`/post/${post.id}`">{{ post.title }}</router-link></p>
        <p><strong>Описание</strong> {{ post.body }}</p>
        <my-button @click="removePost" class="button">Удалить</my-button>
    </div>
    <!-- В реакт posts.map(post => <div>...</div>) -->
</template>

<script>
export default {
    props: {
        post: { type: Object, required: true, default: null }
    },
    data() {
        return {
            isActive: false,
        };
    },
    methods: {
        removePost() {
            this.$emit("removePost", this.post.id);
        },
    },
}
</script>

<!-- scoped позволяет использовать стили локально и не распространять их глобально -->
<style scoped>
.post {
    padding: 30px 15px;
    border-radius: 15px;
    border: 1px solid #251288;
    margin-bottom: 10px;
}

.post p {
    margin-bottom: 5px;
}

.button {
    margin-bottom: 0 !important;
}

.post__active {
    background-color: #5e5efe;
    border: 1px solid #fff;
}

.post__link{
    color: #000;
    text-decoration: underline;
    margin-left: 7px;
}

</style>