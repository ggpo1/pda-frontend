<template>
    <div class="field">
        <label v-if="!isRequired">{{fieldTitle}}</label>
        <label v-else>{{fieldTitle}} <span class="redStar">*</span> </label>
        <input type="text" class="form-field-input">
    </div>
</template>

<script lang="ts">
export default {
    props: {
        fieldTitle: String,
        isRequired: Boolean
    }
}
</script>

<style scoped>
    .field{
        display: flex;
        flex-direction: column;
        padding: 15px;
    }
    .redStar{
        color: red;
    }
    .form-field-input{
        width: 100%;
    }
</style>

