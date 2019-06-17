import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from '@/components/page-components/Board';
import router from '@/router';
import Goal from '@/Models/Goal';
import ApiGoal from '@/api/ApiGoal';


@Component({ components: { Board } })
export default class Boards extends Vue {
    private response: any;
    private todoTasks: Goal[] = [];
     
    public async mounted() {
        // let apiGoal = new ApiGoal();
        // let goals = apiGoal.getGoals();
        // console.log(goals)
        fetch('https://localhost:5050/api/goals', { method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            // this.ser(data)
            // console.log(this.response)
            
            this.todoTasks = data;
            // console.log(this.todoTasks)
        })
        // console.log(this.response)
    }
    public ser(data: any) {
        this.response = data;
    }
}
