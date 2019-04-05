<template>
    <div class="radio-component">
        <input type="radio" :checked="selected" :class="[hideRadio ? 'hidden' : '']"
            :value="radioValue" :name="radioGroup" @click="$emit('radio-select', radioGroup, radioValue)"/>
        <div><slot :selected="selected"/></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop() private selected!: boolean
    @Prop() private radioGroup!: string
    @Prop() private radioValue!: string
    @Prop({default: false}) private hideRadio!: boolean
}
</script>

<style scoped>
.radio-component {
    display: flex;
    align-items: flex-start;
}

.radio-component > div {
    flex-grow: 1;
}

input {
    margin: 0;
}

.hidden {
    visibility: hidden;
}
</style>