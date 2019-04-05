<template>
    <div>
        <SingleTableView
            header="Объекты закупок"
            :canAdd="true" 
            :headers="headers"
            :dataset="dataset"
            @add-object="addObject"
            @change-page="load"
            :itemActions="itemActions"
            @item-action="onItemAction"
            :pages="pages"
            :activePage="activePage"/>
        <Modal @close-modal="isAddObjectModalVisible = false" :visible="isAddObjectModalVisible" title="Выбор закона-основания">
            <div>
                <div class="subj-law-selection">
                    <div>Закон-основание:</div>
                    <label>
                        <input type="radio" name="selectedLawType" value="44" v-model="selectedLaw"/>
                        44-ФЗ
                    </label>
                    <label>
                        <input type="radio" name="selectedLawType" value="223" v-model="selectedLaw" disabled/>
                        223-ФЗ
                    </label>
                </div>
                <div class="subj-modal-footer">
                    <Button title="Создать"
                            color="green" 
                            @click="confirmAdd"/>
                </div>
            </div>
        </Modal>
        <ObjectDeletionModal @close-modal="isDeleteConfirmationModalVisible = false" :visible="isDeleteConfirmationModalVisible"
            @confirm-delete="confirmDelete"
            title="Удаление"
            description="При удалении объекта закупки будут удалены все связанные с ним детализированные объекты закупок и лоты, продолжить?"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SingleTableView from '@/components/SingleTableView.vue'
import { ITableColumn } from '@/components/TableAbstractions'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import ObjectDeletionModal from '@/views/modals/ObjectDeletionModal.vue'
import router from '@/router'

const statusTexts: { [index: string]: string } = {
    CREATING: "Формирование",
    PUBLISHED: "Опубликован",
    APPROVED: "Утвержден"
}

type PaginationRequest = 'TO_START' | 'TO_PREVIOUS' | 'TO_NEXT' | 'TO_END' | number

@Component({ components: { SingleTableView, Modal, Button, ObjectDeletionModal } })
export default class PlanObjects extends Vue {
    private isAddObjectModalVisible: boolean = false
    private isDeleteConfirmationModalVisible: boolean = false
    private selectedLaw: string = "44"

    private itemActions: any[] = [{
        id: 'delete', 
        title: 'Удалить'
    }, {
        id: 'edit',
        title: 'Редактировать'
    }, {
        id: 'detail',
        title: 'Детализировать'
    }]

    private headers: ITableColumn[] = [{
        title: 'Реестровый номер',
        getter: (x: any) => x.regNumber,
        url: (x: any) => `/plan-objects/${x.id}`,
        filter: 'TEXT'
    }, {
        title: 'Закон-основание', 
        getter: (x: any) => x.law === 'F44' ? '44-ФЗ' : '223-ФЗ',
        filter: 'SELECT'
    }, {
        title: 'ИКЗ', 
        getter: (x: any) => x.purchaseId,
        filter: 'TEXT'
    }, {
        title: 'Предмет закупки',
        getter: (x: any) => x.subject,
        filter: 'TEXT'
    }, {
        title: 'КПГЗ',
        getter: (x: any) => x.subjectClass ? x.subjectClass.code + ' ' + x.subjectClass.description : "",
        filter: 'TEXT'
    }, {
        title: 'Код финансирования', 
        getter: (x: any) => x.fundingCode,
        filter: 'TEXT'
    }, {
        title: 'Объем финансирования', 
        getter: (x: any) => x.purchaseSize,
        filter: 'TEXT'
    }, {
        title: 'Свободный объем',
        getter: (x: any) => x.remainingValue,
        filter: 'TEXT'
    }, {
        title: 'Статус',
        getter: (x: any) => statusTexts[x.status],
        filter: 'TEXT'
    }]

    private dataset: any = {from: -20, totalCount: 1}
    private pages: number[] = []
    private activePage: number = -1

    private deletingObject: any | null = null
    
    private mounted() { this.load(0) }

    private doLoadRequest(page: number) {
        fetch(`http://192.168.10.20:5000/api/purchaseObjects?from=${page * 20}&count=20`)
            .then(response => response.json())
            .then(response => {
                this.dataset = response
                this.activePage = (response.from / 20) | 0

                if (this.dataset.totalCount === 0) {
                    this.pages = [0]
                    return
                }
                
                const maxPages = 5
                const endPage = ((this.dataset.totalCount / 20) | 0) - (this.dataset.totalCount % 20 > 0 ? 0 : 1)
                let lPages = Math.min(this.activePage, maxPages - 1)
                let rPages = Math.min(endPage - this.activePage, maxPages - 1)
                if (lPages < rPages) {
                    rPages = maxPages - lPages - 1
                } else if (rPages < lPages) {
                    lPages = maxPages - rPages - 1
                } else {
                    const total = Math.min(maxPages - 1, lPages + rPages)
                    rPages = lPages = total / 2
                }
                this.pages = []
                for (let i = 0; i < lPages; i++) {
                    this.pages.push(this.activePage - (lPages - i))
                }
                this.pages.push(this.activePage)
                for (let i = 0; i < rPages; i++) { 
                    this.pages.push(this.activePage + i + 1)
                }
            })
    }

    private load(page: PaginationRequest, force: boolean = true) {
        const currentPage = (this.dataset.from / 20) | 0
        let actualPage

        const endPage = ((this.dataset.totalCount / 20) | 0) - (this.dataset.totalCount % 20 > 0 ? 0 : 1)
        
        switch (page) {
            case 'TO_START': actualPage = 0; break
            case 'TO_END': actualPage = endPage; break
            case 'TO_NEXT': actualPage = currentPage + 1; break
            case 'TO_PREVIOUS': actualPage = currentPage - 1; break
            default: actualPage = page; break
        }

        if (actualPage >= 0 && actualPage <= endPage && (force || actualPage !== currentPage)) {
            this.doLoadRequest(actualPage)
        }
    }

    private addObject() {
        this.selectedLaw = "44"
        this.isAddObjectModalVisible = true
    }

    private confirmAdd() {
        if (this.selectedLaw === "44") {
            router.push("/plan-objects/create44")
        }

        this.isAddObjectModalVisible = false
    }

    private onItemAction(item: any, action: string) {
        switch (action) {
            case 'edit':
                router.push(`/plan-objects/${item.id}/edit`)
                break
            case 'detail':
                router.push(`/plan-objects/${item.id}/new-detailed`)
                break
            case 'delete':
                this.deletingObject = item
                this.isDeleteConfirmationModalVisible = true
                break
        }
    }

    private confirmDelete() {
        // delete object request
        this.isDeleteConfirmationModalVisible = false
        fetch(`http://192.168.10.20:5000/api/purchaseObjects/${this.deletingObject.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this.load(0, true))
    }
}
</script>

<style scoped>
.subj-modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}

.subj-law-selection {
    display: flex;
    align-items: center;
    margin: 30px;
}

.subj-law-selection :first-child {
    font-weight: 500;
}

.subj-law-selection :nth-child(n + 2) {
    margin-left: 30px;
}
</style>