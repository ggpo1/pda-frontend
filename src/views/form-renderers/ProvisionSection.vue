<template>
    <div class="provision-sec">
        <div class="total-sum" v-if="state === 'ENABLED'">
            Общая сумма закупки: <b>0,00 Российский рубль</b>
        </div>
        <Button color="white" title="Добавить финансовое обеспечение" class="add-provision-btn" @click="$emit('form-pick', 'provision')"
            v-if="state === 'ENABLED'"/>
        <DataTable
            v-if="readonly || source.object.financialSources.length"
            :headers="headers"
            :dataset="source.object.financialSources"
            :groupBy="groupBy"
            :canEdit="true"
            @edit="editItem"
            @delete="deleteItem"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISection } from '@/views/FormAbstractions'
import Button from '@/components/Button.vue'
import DataTable from '@/components/DataTable.vue'
import { IPurchaseObject } from '@/models/PurchaseObject'
import { ITableColumn, ITableGroup, ITableGroupConfig } from '@/components/TableAbstractions'
import { IFinancialSource, FinancialSourceType, IOwnFundsSource, ILimitSource, IFinancialActionSource, IUsedSource } from '@/models/FinancialSource'
import { IPurchaseObjectForm } from '@/form-declarations/purchaseObject44'
import { FieldState } from '@/components/form-table/FieldBase'

@Component({ components: { Button, DataTable } })
export default class extends Vue {
    @Prop() private source!: IPurchaseObjectForm
    @Prop({ default: false }) private readonly!: boolean
    @Prop() private state!: FieldState

    private headers: ITableColumn[] = [{
        title: 'Тип',
        filter: 'TEXT',
        getter(src: IUsedSource) { 
            switch (src.source.type) {
                case FinancialSourceType.OWN_FUNDS: 
                    return "Собственные средства"
                case FinancialSourceType.LIMIT:
                    return "???"
                case FinancialSourceType.FIN_ACTIONS:
                    return "ПФХД"
            }
        }
    }, {
        title: 'Код',
        filter: 'TEXT',
        getter(src: IUsedSource) { 
            switch (src.source.type) {
                case FinancialSourceType.OWN_FUNDS: 
                    const o = src.source as IOwnFundsSource
                    return o.name
                case FinancialSourceType.LIMIT:
                    const l = src.source as ILimitSource
                    return `КБК: ${l.chapterCode}-${l.sectionCode}-${l.targetExpenseAccount}-${l.expenseKind}-${l.govOperationClass}`
                case FinancialSourceType.FIN_ACTIONS:
                    const a = src.source as IFinancialActionSource
                    return `Код: ${a.expenseKind}-${a.govOperationClass}`
            }
        }
    }, {
        title: 'Лимит, руб. Всего / Остаток',
        filter: 'TEXT',
        getter(src: IUsedSource) { return src.source.total + " / " + (src.source.total - src.source.used) }
    }, {
        title: 'Сумма, руб.',
        filter: 'TEXT',
        getter(src: IUsedSource) { return src.amount + "" }
    }]

    private groupBy: ITableGroupConfig = {
        group(items: IUsedSource[]) {
            var groupMap = new Map<number, IUsedSource[]>()
            
            for (const item of items) {
                if (!groupMap.has(item.year)) groupMap.set(item.year, [])

                const arr = groupMap.get(item.year)!
                arr.push(item)
            }

            return [...groupMap.keys()].sort().map(x => ({ header: x + " год", items: groupMap.get(x)! }))
        }
    }

    private editItem(item: IUsedSource) {
        this.$emit('form-pick', 'provision', item)
    }

    private deleteItem(item: IUsedSource) {
        this.source.object.financialSources = this.source.object.financialSources.filter(x => x !== item)
    }
}
</script>

<style scoped>
.provision-sec {
    margin: 30px;
    display: flex;
    flex-direction: column;
}

.add-provision-btn {
    margin: 15px 0;
    align-self: flex-start;
}
</style>