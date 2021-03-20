"use strict"

//I import the libraries

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { rejects } = require('assert');

//I open the db

const db = new sqlite.Database('tasks.db', (err) => {if(err) throw err});



function Task(id, description, urgent = false, priv = true, deadline){
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.priv = priv;
    this.deadline = deadline;
}



function TaskList (){
    // creates an empty list
    this.list = [];

    //add method that adds a task to the list
    this.add = (task) =>{this.list.push(task)};

    //sortAndPrint
    this.sortAndPrint = () => {
        this.list.sort((task1,task2) => {
            if(task1.deadline == undefined){
                return 1;
            }
            if(task2.deadline == undefined){
                return -1;
            }
            return  ( task1.deadline.isAfter(task2.deadline) ? 1 : -1)
        })
        //i print the ordered task list
        console.log("task sorted");

        this.list.forEach((task) => console.log("ID: "+task.id+" description:"+task.description+" urgent: "+task.urgent+" private: "+task.priv+" deadline: "+task.deadline.format("YYYY-MM-DD")));

    }

    //I filter by the urgent field and print the list
    this.filterAndPrint = () => {
        this.list.filter((t) => {
            if(t.urgent == true)
                return true;
            else
                return false;
        });

         //i print the filtered task list
         console.log("task filtered");

         this.list.forEach((task) => console.log("ID: "+task.id+" description:"+task.description+" urgent: "+task.urgent+" private: "+task.priv+" deadline: "+task.deadline.format("YYYY-MM-DD")));
 
    }

}

//I create the list for the first query

let myTaskList2 = new TaskList();

const sql = 'SELECT * FROM TASKS';

db.all(sql, (err,rows)=>{
    if(err){
        reject(err);
    }
    for(let row of rows){
        let x =  new Task(row.id, row.description, row.urgent, row.private, row.deadline);
       
        myTaskList2.add(x);
    }
});


console.log("FIRST QUERY RESULT: ");
console.log(myTaskList2);

//I create the list for the second query

const myTaskList3 = new TaskList();

const sql2 = 'SELECT * FROM TASKS WHERE DEADLINE >= ?'

const promise = new Promise((resolve,reject)=> {
    db.all(sql2,['%Date("2020-03-16")%'], (err,rows)=>{
        if(err){
            reject(err);
        }
        else{
            for(let row of rows){
                let x =  new Task(row.id, row.description, row.urgent, row.private, row.deadline);
        
                myTaskList3.add(x);
            }
            resolve(myTaskList3);
        };
    });

});
console.log("SECOND QUERY RESULT: ");
promise.then((tl) => tl.list.forEach((el) => console.log(el)));


//I create the list for the third query

const myTaskList4 = new TaskList();

const sql3 = 'SELECT * FROM TASKS WHERE DESCRIPTION LIKE ?'

const promise2 = new Promise((resolve,reject)=> {
    db.all(sql3,["%'laundry'%"], (err,rows)=>{
        if(err){
            reject(err);
        }
        else{
            for(let row of rows){
                let x =  new Task(row.id, row.description, row.urgent, row.private, row.deadline);
        
                myTaskList4.add(x);
            }
            resolve(myTaskList4);
        };
    });

});

console.log("THIRD QUERY RESULT: ");
promise2.then((tl) => tl.list.forEach((el) => console.log(el)));


