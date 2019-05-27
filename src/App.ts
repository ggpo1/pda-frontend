import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Sidebar from '@/components/page-components/Sidebar';
import router from '@/router';


@Component({ components: { Sidebar } })
export default class App extends Vue {

}
