<template>
    <div class="card">
        <div class="card-header" :class="[!hasBorder ? 'no-border' : '']">
            <div class="card-header-title" :class="[isLargeHeader ? 'large-header' : '']">
                <div>
                    {{title}}
                    <span style="color: red" v-if="required">*</span>
                    <img v-if="hint" src="@/assets/question.png" class="question" @click="openHint(hint, $event)"/>
                </div>
                <div v-if="canAdd" class="btn btn-add" @click="$emit('add-object')"></div>
                <div v-if="hasCloseButton" @click="$emit('close')"></div>
                <div v-if="canFilter" class="btn btn-filter"></div>
                <div v-if="canSync" class="btn btn-fa"><fa-icon class="fa" icon="sync"/></div>
                <div v-if="canSearch" class="btn btn-fa green"><fa-icon class="fa" icon="search"/><div>Поиск</div></div>
            </div>

            <Button v-for="action in actions" :key="action.id" :title="action.title" color='green'/>
        </div>
        <div :style="{ padding: !!padding || padding === 0 ? padding + 'px' : '10px', flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }">
            <slot/>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue'
import EventBus from '@/EventBus';

export default {
    props: { 
        title: String, 
        actions: Array,
        padding: Number,
        isLargeHeader: Boolean,
        hasBorder: { type: Boolean, default: true },
        required: { type: Boolean, default: false },
        hasCloseButton: { type: Boolean, default: false },
        hint: Object,
        canFilter: Boolean,
        canSync: Boolean,
        canSearch: Boolean
    },
    components: { Button },
    methods: {
        openHint(hint, ev) {
            EventBus.$emit("show-hint", hint, ev)
        }
    }
}
</script>

<style scoped>
    .card {
        display: flex;
        flex-direction: column;
        background: white;

        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #bbc1d0;
        overflow: hidden;
    }

    .card + .card {
        margin-top: 15px;
    }

    .card-header {
        display: flex;
        align-items: center;

        background: #eef1f7;
        border-bottom: 1px solid #dadfea;
        padding: 20px 30px 20px;
    }

    .card-header.no-border { border-bottom: none; }

    .card-header-title {
        font-size: 20px;
        flex-grow: 1;
        display: flex;
    }

    .card-header-title > :first-child {
        flex-grow: 1;
    }

    .card-header-title > :nth-child(2) {
        font-family: 'EaistFont';
        padding-top: 3px;
        cursor: pointer;
        user-select: none;
    }

    .card-header-title.large-header {
        font-size: 24px;
        flex-grow: 1;
    }

    .question {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
    }

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

    .btn + .btn {
        margin-left: 10px;
    }

    .btn-filter { background-image: url("../assets/buttons.png"); background-position: -4px -2px; }
    .btn-add { background-image: url("../assets/buttons.png"); background-position: -3px -387px; }
</style>