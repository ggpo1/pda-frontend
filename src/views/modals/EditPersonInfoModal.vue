<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" title="Выбор контактного лица">
        <div class="selection">
            <div class="prov-selection">
                <DataTable class="table"
                    :headers="tableHeaders"
                    :dataset="persons"
                    :enableSelection="true"
                    :selected="source.selectedSource"
                    @selected="selectSource"/>
            </div>
            <div class="modal-footer">
                <Button title="Выбрать"
                    color="green" 
                    @click="selectItemAndExit"/>
                <div class="actions-spacing"/>
                <Button color="red" :icon="{ type: 'CLASS', name: 'close'}" @click="$emit('close-modal')"/>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import TreeView from '@/components/TreeView.vue'
import FormTable from '@/components/FormTable.vue'
import DataTable from '@/components/DataTable.vue'
import { IColumn, ISetValueEvent } from '@/components/form-table/FormFields'
import { ILimitSource, IOwnFundsSource, IFinancialActionSource, IFinancialSource, FinancialSourceType, IUsedSource } from '@/models/FinancialSource'
import { ITableColumn } from '@/components/TableAbstractions';


interface IPerson {
    isGeneral: boolean
    firstName: string
    middleName: string
    lastName: string
    email: string
    cellPhone: string
}

@Component({ components: { Modal, Button, TreeView, FormTable, DataTable }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop({default: null}) private selected!: IUsedSource | null

    private source: IPerson = {
        isGeneral: true,
        firstName: 'Матерова',
        middleName: 'Елена',
        lastName: 'Викторовна',
        email: 'sp11@zdrav.mos.ru',
        cellPhone: '+7 (495) 685-38-04 (3)'
    }

    public persons = [{
        isGeneral: this.source.isGeneral ? 'Да' : 'Нет',
        firstName: this.source.firstName,
        middleName: this.source.middleName,
        lastName: this.source.lastName,
        email: this.source.email,
        cellPhone: this.source.cellPhone
    }]

    private selectSource(src: IFinancialSource) {
        // this.source.selectedSource = src
    }

    private tableHeaders: ITableColumn[] = [{
        title: 'Основной',
        filter: 'TEXT',

        getter(row: IPerson) { return row.isGeneral ? "Да" : "Нет" },
        setter(row: IPerson) { return "" } 
    }, {
        title: 'Фамилия',
        filter: 'TEXT',
        getter(row: IPerson) { return row.firstName },
        setter(row: IPerson) { return "" }
    }, {
        title: 'Имя',
        filter: 'TEXT',
        getter(row: IPerson) { return row.middleName },
        setter(row: IPerson) { return "" }
    }, {
        title: 'Отчество',
        filter: 'TEXT',
        getter(row: IPerson) { return row.lastName },
        setter(row: IPerson) { return "" }
    }, {
        title: 'E-mail',
        filter: 'TEXT',
        getter(row: IPerson) { return row.email },
        setter(row: IPerson) { return "" }
    }, {
        title: 'Телефон',
        filter:'TEXT',
        getter(row: IPerson) { return row.cellPhone },
        setter(row: IPerson) { return "" }
    }]
    
    public selectItemAndExit() {
        this.$emit('close-modal')
    }

    public setFormValue(e: ISetValueEvent) { 
        e.row.setter(this.source, e.value)
    }
}
</script>

<style scoped>
.selection {
    display: flex;
    flex-direction: column;
}

.prov-selection {
    margin: 30px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 100000; /* костыль для хрома */
}

.prov-selection > * {
    flex-shrink: 0;
}

.table {
    margin: 15px 0 0 0;
}

.modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
}

.modal-footer .actions-spacing { flex-grow: 1; }
</style>