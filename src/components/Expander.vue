<template>
    <div class="expander">
        <div class="expander-toggle" @click="isOpen = !isOpen">
            <div class="expander-icon" :class="[isOpen ? 'open' : 'closed']"></div>
            <div class="expander-text">{{isOpen ? openTitle : closedTitle}}</div>
        </div>
        <slot v-if="isOpen"/>
    </div>
</template>

<script>
    export default {
        data() {
            return { isOpen: false }
        },
        props: {
            closedTitle: String,
            openTitle: String
        }
    }
</script>

<style scoped>
    .expander {
        display: flex;
        flex-direction: column;
        background: white;

        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #bbc1d0;

        padding: 20px 20px 20px 38px;
    }

    .expander-toggle {
        display: flex;
        align-items: center;

        cursor: pointer;
        user-select: none;
    }
    
    .expander-icon {
        width: 12px;
        height: 12px;
        background: url("../assets/list_markers.png") no-repeat;
    }

    .expander-icon.open { background-position-y: -12px; }

    .expander-text {
        font-size: 12px;
        font-weight: 500;

        margin-left: 10px;
    }
</style>