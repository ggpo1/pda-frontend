import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';
import Goal from '@/Models/Goal';
import Task from '@/models/Task';

@Component({ components: { Board } })
export default class Board extends Vue {
    @Prop({ default: '' }) public title!: string;
    @Prop() public tasksList!: Goal[];
    @Prop() public todoList!: Task[];
    @Prop() public doneTodoList!: Task[];
    @Prop() public boardType!: string;
    @Prop() public goalId!: string;
    
    public maxTaskNum!: string;
    public newTask: any = {
        Title: 'Задача ',
        Description: '',
        Priority: '',
    }

    public stats: any = {
        Total: '',
        Work: '',
        Done: '',
        TotalProgress: '',
        PersonalEfficiency: '',
    }

    public get getPrettyEfficiency() {
        return Number.parseFloat(this.stats.PersonalEfficiency).toFixed(2);
    }

    public get getTotalProgress() {
        return (this.stats.TotalProgress*100).toFixed(0)
    }

    public get getMaxTitle():string {
        
        let id = Number.parseInt(this.maxTaskNum)+1;
        return this.newTask.Title+id;
    }

    public goalPush() {
        router.push("/")
    }

    public isAddGoalBlock: boolean = false;
    public isAddTaskBlock: boolean = false;
    public isStatBlock: boolean = false;

    public clickGoals(goal: Goal) {
        router.push(`/goals/${goal.Id}`);
        // alert(a.id);
    }

    public async setDoneTask(task: Task) {
        await fetch(`https://localhost:5050/api/tasks/putdone/${task.Id}`, { 
            method: 'PUT',
        })
        fetch(`https://localhost:5050/api/tasks/taskstatus/${this.goalId}/work`, { method: 'GET' })
            .then(response => response.json())
            .then((data) => {
                    // this.ser(data)
                    // console.log(this.response)
                // console.log(data)    
                this.todoList = data;
                    // console.log(this.todoTasks)
            })
        fetch(`https://localhost:5050/api/tasks/taskstatus/${this.goalId}/done`, { method: 'GET' })
            .then(response => response.json())
            .then((data) => {
                    // this.ser(data)
                    // console.log(this.response)
                // console.log(data)    
                this.doneTodoList = data;
                    // console.log(this.tod
            })
    }

    public async addTaskBlockOpen() {
        await fetch(`https://localhost:5050/api/tasks/getmaxid/${this.goalId}`, { 
            method: 'GET',
        })
        .then(response => response.json())
        .then((body) => {
            // this.ser(data)
            // console.log(this.response)
            
            // console.log(body);
            this.maxTaskNum = body;
            this.isAddTaskBlock = true;
            // console.log(this.todoTasks)
        })
    }

    public async addTask() {
        
        await fetch('https://localhost:5050/api/tasks', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.newTask)
        })
        .then(response => response.text())
        .then((body) => {
            // this.ser(data)
            // console.log(this.response)
            
            console.log(body);
            // console.log(this.todoTasks)
        })


        // .then(response => response.json())
        // .then((data) => {
            // this.ser(data)
            // console.log(this.response)
            
            // this.todoTasks = data;
            // console.log(this.todoTasks)
        // })
    }

    public async goalStatistic() {
        await fetch(`https://localhost:5050/api/tasks/statistic/${this.goalId}`, { 
            method: 'GET',
        })
        .then(response => response.json())
        .then((body) => {
            // this.ser(data)
            // console.log(this.response)
            
            // console.log(body);
            this.stats = body;
            this.stats.TotalProgress = this.stats.Done/this.stats.Total;
            // console.log(this.stats)
            // console.log(this.todoTasks)
        })
        this.isStatBlock = true;
    }

    public clickTasks(a: any) {
        // Task viewer
    }
}
