<template>
    <div>
        <div class="tree-el" v-for="{ item, actualIndex, collapsed, hasChildren } in filteredDataset" :key="actualIndex" :style="{ paddingLeft: (item.level * 10) + 'px' }">
            <div class="toggle" 
                 @click="$emit('toggle-item', actualIndex)" 
                 :class="[collapsed ? 'collapsed' : '']"
                 :style="[hasChildren ? {} : {visibility: 'hidden'}]"/>
            <slot :item="item" :actualIndex="actualIndex"/>
        </div>
    </div>
</template>

<script>
export default { 
    props: { dataset: Array, filterArg: String, predicate: Function },
    computed: {
        filteredDataset() {
            if (this.dataset === undefined) { return [] }

            const ordered = []
            const preFiltered = []
            const preFailedFilter = []

            const state = { count: 0, curLevel: 0, prev: undefined }
            for (const v of this.dataset) {
                let item
                
                if (state.curLevel < v.level) {
                    if (v.level - state.curLevel > 1) { console.error('wat') }

                    item = { item: v, actualIndex: state.count, prev: state.prev, collapsed: v.collapsed, children: [] }
                    if (state.prev !== undefined) {
                        state.prev.children.push(item)
                    }

                    state.count++
                    state.curLevel = v.level
                    state.prev = item
                } else {
                    let validPrev = state.prev
                    for (let i = 0; i < state.curLevel - v.level + 1; i++) {
                        validPrev = validPrev ? validPrev.prev : undefined
                    }

                    item = { item: v, actualIndex: state.count, prev: validPrev, collapsed: v.collapsed, children: [] }
                    if (validPrev !== undefined) {
                        validPrev.children.push(item)
                    }

                    state.count++
                    state.curLevel = v.level
                    state.prev = item
                }

                ordered.push(item)
                if (this.predicate(item.item, this.filterArg)) {
                    preFiltered.push(item)
                } else {
                    preFailedFilter.push(item)
                }
            }

            function recursiveCollapseCheck(x) { 
                return x === undefined ? true : !(x.prev ? x.prev.collapsed : false) && recursiveCollapseCheck(x.prev)
            }

            const filtered = []
            const filteredNonCollapsed = []

            function recursiveCheck(x, noCollapseCheck) { 
                if (x === undefined) {
                    return false
                } else {
                    if (preFiltered.length > preFailedFilter.length) {
                        let failed = false
                        for (const p of preFailedFilter) {
                            if (p === x) { 
                                failed = true
                                break
                            }
                        }
                        if (!failed) {
                            return true
                        }
                    } else {
                        for (const p of preFiltered) {
                            if (p === x) {
                                return true
                            }
                        }
                    }

                    for (const o of x.children) {
                        if (recursiveCheck(o)) { return true }
                    }

                    return false
                }
            }

            for (const v of ordered) {
                if (recursiveCheck(v)) {
                    filteredNonCollapsed.push(v);
                    if (recursiveCollapseCheck(v)) {
                        filtered.push(v)
                    }
                }
            }

            const result = filtered.map(x => ({...x, hasChildren: !!filteredNonCollapsed.find(o => o.prev === x) }))
            return result
        }
    }
}
</script>

<style scoped>
    .tree-el {
        display: flex;
        align-items: center;
    }

    .toggle {
        transform: translateY(1px);
    }

    .toggle:before {        
        font-size: 20px;
        font-family: "EaistFont";

        content: '';
    }

    .toggle.collapsed {
        transform: rotate(270deg);
    }
</style>