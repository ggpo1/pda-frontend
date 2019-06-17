import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from '@/components/page-components/Board';
import router from '@/router';
import Goal from '@/Models/Goal';
import ApiGoal from '@/api/ApiGoal';


@Component({ components: { Board } })
export default class Boards extends Vue {
    private response: any;
    private todoTasks: Goal[] = [];
    public stats: any = {
        Total: '',
        Work: '',
        Done: '',
        TotalProgress: '',
        PersonalEfficiency: '',
    }
     
    public async mounted() {
        // let apiGoal = new ApiGoal();
        // let goals = apiGoal.getGoals();
        // console.log(goals)
        await fetch('https://localhost:5050/api/goals', { method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            // this.ser(data)
            // console.log(this.response)
            
            this.todoTasks = data;
            // console.log(this.todoTasks)
            
        })
        this.todoTasks[0].Progress = '41';
        this.todoTasks[1].Progress = '65';
        
    }
}
