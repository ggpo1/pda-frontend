<template>
    <div id="app" @click="closeHint">
        <Sidebar id="sidebar"/>
        <Header/>
        <div id="router-view-wrap">
            <router-view/>
        </div>
        <!-- <div class="hint" v-if="hint" :style="{left: hintPosition.x + 'px', top: hintPosition.y + 'px'}">
            <div class="hint-text">{{hint.text}}</div>
            <div class="hint-link" v-if="hint.link"><a :href="hint.link.href">{{hint.link.title}}</a></div>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import EventBus from '@/EventBus';
import { IHint } from '@/components/form-table/FormFields';

@Component({ components: { Header, Sidebar } })
export default class App extends Vue {
    private hint: IHint | null = null
    private hintPosition: {x: number, y: number} = {x: 0, y: 0}

    private created() {
        EventBus.$on("show-hint", this.openHint)
    }

    private beforeDestroy() {
        EventBus.$off('show-hint')
    }
    

    private openHint(hint: IHint, ev: MouseEvent) {
        ev.stopPropagation()
        this.hint = hint
        console.log(ev)
        this.hintPosition = { x: ev.pageX, y: ev.pageY }
    }

    private closeHint() { 
        this.hint = null
        EventBus.$emit('close-popup')
    }
}
</script>

<style>
#app {
    display: flex;
    flex-direction: column;

    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 400;
}

#sidebar {
    width: var(--sidebar-width);
}

#router-view-wrap {
    margin-left: var(--sidebar-width);
    margin-top: 100px;
    height: 100%;
}

.hint {
    position: absolute;
    z-index: 999999999999;
    display: flex;
    flex-direction: column;

    background: white;

    width: 300px;
    font-size: 12px;
    padding: 10px;
  
    border-radius: 3px;
    border-width: 1px 1px 1px;
    border-style: solid;
    border-color: #ccd1de #ccd1de #bbc1d0;

    box-shadow: 0 3.5px 10px 0px rgba(0, 0, 0, 50%);
}

.hint-link {
    margin-top: 10px;
    border-top: 1px solid #ccd1de;
    padding-top: 10px;
}
</style>
