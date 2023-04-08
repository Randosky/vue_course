<template>
    <div class="dialog" v-if="show" @click="show = !show">
        <div @click.stop class="dialog__content"><slot/></div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
    }
};
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background:  rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog__content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 500px;
    min-height: 150px;
    border-radius: 10px;
    background-color: #fff;
}

</style>