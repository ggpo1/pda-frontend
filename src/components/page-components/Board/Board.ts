import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { Board } })
export default class Board extends Vue {
    @Prop({ default: '' }) public title!: string;
    @Prop() public tasksList!: any[];

}
