<template>
    <div>
        <HeadTitle header="Федеральные средства" />

        <SingleTableView
            :canAdd="true"
            :canFilter="true"
            :notNeedHeader="true"
            :greenAddButton="true"
            :headers="[{title: 'foo', property: 'foo', filter: { type: 'TEXT' }}, 
                       {title: 'bar', property: 'bar', filter: { type: 'SELECT', options: [{key: 'a', value: 'a-value'}, {key: 'b', value: 'b-value'}] }},
                       {title: 'baz', property: 'baz', filter: { type: 'DATE' }}]"
            :dataset="[{foo: 1, bar: 'barbar'}, {foo: 2, bar: 'barbar'}]"
            @add-object="addObject"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import HeadTitle from '@/components/HeadTitle.vue'
import SingleTableView from '@/components/SingleTableView.vue'

import router from '@/router'

@Component({ components: { SingleTableView, HeadTitle } })
export default class MoscowBudget extends Vue {
    


}
</script>

<style>

</style>
