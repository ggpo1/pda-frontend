<template>
    <select class="select-field" @change="$emit('set-value', { row, value: $event.target.value })">
        <option v-for="opt in selectOptions" :key="opt.key" :value="opt.key" :selected="evaluatedKey === opt.key">
            {{opt.desc}}
        </option>
    </select>

</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop() private selectOptions!: any[]
}
</script>

<style scoped>
    .select-field {
        width: 100%; box-sizing: border-box;
    }
</style>
