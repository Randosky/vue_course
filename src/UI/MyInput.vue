<template>
    <input type="text" :value="mValue" @input="$emit('update:mValue', $event.target.value)" class="input" />
</template>

<script>
export default {
    name: 'my-input',
    props: {
        mValue: String,
    },
}
</script>

<style>
.input {
    border-radius: 10px;
    padding: 5px 10px;
    border: 1px solid #251288;
    margin-bottom: 15px;
}
</style>