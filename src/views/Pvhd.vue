<template>
    <div>
        <HeadTitle header="ПФХД" />

        <SingleTableView
            header="Дата обновления информации из АСУ ГФ: ДАТА"
            :canFilter="true"
            :headers="[{title: 'foo', property: 'foo', filter: { type: 'TEXT' }}, 
                       {title: 'bar', property: 'bar', filter: { type: 'SELECT', options: [{key: 'a', value: 'a-value'}, {key: 'b', value: 'b-value'}] }},
                       {title: 'baz', property: 'baz', filter: { type: 'DATE' }}]"
            :dataset="[{foo: 1, bar: 'barbar'}, {foo: 2, bar: 'barbar'}]"
            @add-object="addObject"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SingleTableView from '@/components/SingleTableView.vue'
import HeadTitle from '@/components/HeadTitle.vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import router from '@/router'

@Component({ components: { SingleTableView, HeadTitle, Modal, Button } })
export default class Pvhd extends Vue {
    
}
</script>

<style scoped>
.header {
        display: flex;
        align-items: center;
        padding: 9px 15px;

        background: white;
        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #dadfea;

        font-size: 30px;
        color: #6e7c90;
}
</style>
