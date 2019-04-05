<template>
    <div class="btn btn-fa green" @click="$emit('add-object')">
        <div>
            {{ header }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        header: String
    }
}
</script>

<style scoped>
    .btn {
        box-sizing: border-box;
        min-width: 30px;
        height: 30px;

        background-color: #3f8fca;
        border-style: solid;
        border-width: 1px 1px 2px;
        border-color: #3f8fca #3f8fca #246da2;
        border-radius: 3px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        text-transform: lowercase;
        user-select: none;
        
    }

    .btn:hover {
        background-color:#4ea1df;
        border-color:#4ea1df #4ea1df #246da2;
    }

    .btn:active {
        background-color:#3f8fca;
        border-color:#246da2 #3f8fca #3f8fca;
        border-width: 1px;
    }

    .btn-fa {
        display: flex;
        justify-content: center;
        align-items: center;
        
        padding: 0 7px;
    }

    .btn-fa:active .fa {
        margin-top: 0;
    }

    .fa {
        margin-top: 1px;
        margin-left: -1px;
        width: 16px;
        height: 16px;
    }

    .fa + * {
        margin-left: 5px;
    }

    .green { 
        background-color: #00b191;
        border-color: #00b191 #00b191 #007e67;
    }

    .green:hover {
        background-color:#03bd9b;
        border-color:#03bd9b #03bd9b #0d9c83;
    }

    .green:active {
        background-color:#00b191;
        border-color:#007e67 #00b191 #00b191;
        border-width: 1px;
    }
</style>
