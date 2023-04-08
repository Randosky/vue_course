<template>
    <button class="button"><slot /></button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style scoped>
.button {
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid #251288;
  margin-bottom: 15px;
  background: #fff;
  cursor: pointer;
}
</style>