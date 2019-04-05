<template>
    <div 
        @click="onClick"
        class="btn"
        :class="[color, 
            orientation === 'VERTICAL' ? 'v' : 'h', 
            !!icon && icon.type === 'CLASS' ? 'btn-' + icon.name : '',
            disabled ? 'btn-disabled' : '']">
        <fa-icon class="fa" v-if="!!icon && icon.type === 'FONT'" :icon="icon.name"/>
        <div v-if="!!title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        props: { color: String, title: String, icon: Object, orientation: String, disabled: { type: Boolean, default: false } },
        methods: {
            onClick(ev) { 
                if (!this.disabled) 
                    this.$emit('click', ev)
            }
        }
    }
</script>

<style scoped>
    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        
        padding: 0 7px;

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

    .btn:hover, .btn-disabled {
        background-color:#4ea1df;
        border-color:#4ea1df #4ea1df #246da2;
    }

    .btn:not(.btn-disabled):active {
        background-color:#3f8fca;
        border-color:#246da2 #3f8fca #3f8fca;
        border-width: 1px;
    }

    .green { 
        background-color: #00b191;
        border-color: #00b191 #00b191 #007e67;
    }

    .green:hover, .green.btn-disabled {
        background-color:#03bd9b;
        border-color:#03bd9b #03bd9b #0d9c83;
    }

    .green:not(.btn-disabled):active {
        background-color:#00b191;
        border-color:#007e67 #00b191 #00b191;
        border-width: 1px;
    }

    .red { 
        background-color: #e84c3d;
        border-color: #e84c3d #e84c3d #7e1b00;
    }

    .red:hover, .red.btn-disabled {
        background-color:#f66456;
        border-color:#f66456 #f66456 #a52f0f;
    }

    .red:not(.btn-disabled):active {
        background-color:#e84c3d;
        border-color:#7e1b00 #e84c3d #e84c3d;
        border-width: 1px;
    }

    .white {
        color: #6a788d;
        border-color: #c4cbd4;
        background-color: white;
    }

    .white:hover, .white.btn-disabled {
        background-color:#eaedf0;
        border-color: #c4cbd4;
    }

    .white:not(.btn-disabled):active {
        border-color: #a5adb9 #d2d7df #d2d7df;
        background-color: #d2d7df;
        border-width: 1px;
    }

    .v + .v {
        margin-top: 10px;
    }

    .h + .h {
        margin-left: 10px;
    }

    .btn-add { background-image: url("../assets/buttons.png"); background-position: -3px -387px; background-repeat: no-repeat; }
    .btn-filter { background-image: url("../assets/buttons.png"); background-position: -4px -2px; background-repeat: no-repeat; }
    .btn-close { background-image: url("../assets/buttons.png"); background-position: -3px -99px; background-repeat: no-repeat; }
    .btn-save { background-image: url("../assets/buttons.png"); background-position: -3px -35px; background-repeat: no-repeat; }
    .btn-save-thin { background-image: url("../assets/buttons.png"); background-position: -3px -67px; background-repeat: no-repeat; }
    .btn-edit { background-image: url("../assets/buttons.png"); background-position: -3px -419px; background-repeat: no-repeat; }
    .btn-delete { background-image: url("../assets/buttons.png"); background-position: -3px -131px; background-repeat: no-repeat; }
    .btn-clone { background-image: url("../assets/buttons.png"); background-position: -4px -450px; background-repeat: no-repeat; }

    .btn-add > div, .btn-filter > div { padding-left: 19px;}

    .btn:active > div {
        margin-top: -1px;
    }

    .btn:active > .fa {
        margin-top: 0px;
    }

    .fa {
        margin-top: 1px;
        margin-left: -1px;
        margin-right: -1px;
        width: 16px;
        height: 16px;
    }

    .fa + * {
        margin-left: 5px;
    }
</style>