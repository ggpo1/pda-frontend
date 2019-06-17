import Goal from '@/Models/Goal';

export default class ApiGoal {
    public response: any;
    public async getGoals() {
        // let httpHeaders = new Headers();

        // httpHeaders.append('Content-Type', 'application/json');
        // httpHeaders.append('Accept', 'application/json');

        // httpHeaders.append('Access-Control-Allow-Origin', '*');
        // https://localhost:5050/api/goals
        // fetch(`https://localhost:5050/api/goals`, { method: 'GET' })
        // .then(function(response) {
        //     // alert(response)
        //     return response.text();
        // })
        // let myImage = ''

        // fetch('https://localhost:5050/api/goals').then(function(response) {
        // return response.blob();
        // }).then(function(myBlob) {
        //     var objectURL = URL.createObjectURL(myBlob);
        //     myImage = objectURL;
        // });
        // return myImage;


        // var req = new XMLHttpRequest();
        // req.open('GET', 'https://localhost:5050/api/goals', false); 
        // req.send(null);
        // // if(req.status == 200)
        // //     console.log(req.response)
        // req.response.then(function(text: any) {
        //     return text;
        // })


        
        // return this.response;
        // console.log(req.response);
        // return JSON.parse(req.response._v);
        // dump(req.responseText);
    }

    // public async getGoal(id: string): Goal {

    // }
}