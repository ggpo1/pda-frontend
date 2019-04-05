<template>
    <div class="container">
        <div class="type-name">{{typeName}}</div>
        <a class="name" href="#">{{name}}</a>
    </div>
</template>

<script>
    export default {
        props: {
            typeName: String,
            name: String
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        color: #2d3e50;
        
        box-sizing: border-box;
        width: 164px;
        padding: 10px 20px;
        border: 1px solid transparent;
        border-radius: 3px;
        font-weight: 500;
    }

    a, a:visited {
        color: #2d3e50;
    }

    .container:hover {
        background: #c9cfdc;
        border-color: #acb3c5;
    }

    .type-name {
        font-size: 14px;
        border-bottom: 1px dashed;
    }

    .name {
        font-size: 12px;
        
        margin-top: 10px;
        text-decoration: none;
        white-space: nowrap;

        max-width: 100%;
        overflow: hidden;
    }

    .container:hover .name {
        max-width: none;
        white-space: normal;
    }

    .name:visited {
        color: #2d3e50;
    }
</style>