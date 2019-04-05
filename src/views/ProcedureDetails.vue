<template>
    <div class="details">
        <div ref="dynamic-header" class="dynamic-header" :style="[isScrolledOverPanel ? {} : {display: 'none'}]">
            <NavPanel :sections="navSections"
                :actions="[{title: 'Подробные сведения'}, {title: 'Внести изменения'}, {icon: { type: 'CLASS', name: 'close' }, color: 'red', isRightAligned: true}]"
                :isPageHeader="true"
                @section-selected='selectSection'/>
        </div>
        <div class="page-content">
            <Expander closedTitle="Показать статистику" openTitle="Скрыть статистику"/>
            <div class="related-objects">
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
                <RelatedObject typeName="Лот" name="Договоры - СДК223 - 50"/>
            </div>
            <Card :title="'Электронный аукцион ' + (procedureId + '').padStart(11, '0')" :padding="0" :isLargeHeader="true"/>
            <NavPanel ref="in-page-panel"
                :sections="navSections"
                :forceInactiveSections="true"
                :actions="[{title: 'Подробные сведения'}, {title: 'Внести изменения'}, {icon: { type: 'CLASS', name: 'close' }, isRightAligned: true}]"
                @section-selected='selectSection'/>
            <Card ref="sec-info" title="Сведения о закупке" :padding="30">
                <KeyValueTable :rows="[
                    {columns: [{key: 'Реестровый номер', value: (procedureId + '').padStart(11, '0')}]},
                    {columns: [{key: 'Организатор', value: 'Государственное автономное учреждение здравоохранения города Москвы «Стоматологическая поликлиника № 11 Департамента здравоохранения города Москвы»'}]},
                    {columns: [{key: 'Наименование', value: 'Договоры - СДК223 - 50'}]},
                    {columns: [{key: 'Сумма', value: '10 000,00 Российский рубль'}]}]"/>
            </Card>
            <Card ref="sec-lots" title="Лоты закупки" :padding="30">
                <DataTable
                    :headers="[{title: 'foo', property: 'foo'}, {title: 'bar', property: 'bar'}, {title: 'baz', property: 'baz'}]"
                    :dataset="[{foo: 1, bar: 'barbar'}, {foo: 2, bar: 'barbar'}]"/>
            </Card>
            <Card ref="sec-protocols" title="Протоколы закупки" :padding="30" :actions="[{id: 'get-protocol', title: 'Получить протоколы'}]">
                <DataTable
                    :headers="[{title: 'foo', property: 'foo'}, {title: 'bar', property: 'bar'}, {title: 'baz', property: 'baz'}]"
                    :dataset="[]"/>
            </Card>
            <Card ref="sec-results" title="Результаты закупки" :actions="[{id: 'confirm', title: 'Подтвердить завершение торгов'}]" :padding="30">
                <Hint>
                    Необходимо подтвердить наличие полного набора протоколов по закупке. Для этого нажмите на кнопку "Завершить торги".
                    <br/>
                    В случае отсутствия протоколов в блоке "Протоколы закупки" необходимо их получить с помощью кнопки "Получить протоколы".
                </Hint>
            </Card>
            <Card ref="sec-gf-exchange" title="Обмен с АСУ ГФ" :padding="30">
                <DataTable
                    :headers="[{title: 'foo', property: 'foo'}, {title: 'bar', property: 'bar'}, {title: 'baz', property: 'baz'}]"
                    :dataset="[]"/>
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import KeyValueTable from '@/components/KeyValueTable.vue'
import DataTable from '@/components/DataTable.vue'
import RelatedObject from '@/components/RelatedObject.vue'
import Expander from '@/components/Expander.vue'
import Hint from '@/components/Hint.vue'
import NavPanel from '@/components/NavPanel.vue'

interface IFormBase { navAnchors: string[] }

@Component({ components: { Card, KeyValueTable, DataTable, RelatedObject, Expander, Hint, NavPanel } })
export default class extends Vue {
    @Prop() private procedureId!: number

    constructor() {
        super()
    }
}
</script>

<style scoped>
    .related-objects {
        display: flex;
        flex-wrap: wrap;
    }

    .related-objects > * {
        margin: 15px 0; 
    }

    .page-content {
        margin: 30px;
    }

    .dynamic-header {
        position: fixed;
        width: calc(100% - var(--sidebar-width));

        margin-top: -30px;
    }
</style>