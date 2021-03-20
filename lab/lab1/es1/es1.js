"use strict"

const dayjs = require("dayjs");

//I include the library dayjs

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

//I create the first object

let t1 = new Task(1,"First Task", false,false,dayjs("2021-07-01"));

//i create the task list

let myTaskList = new  TaskList();

//I add the first element to the tasklist

myTaskList.add(t1);

//i add new tasks at the tasklist
myTaskList.add(new Task(2,"Second Task", true, false, dayjs()));
myTaskList.add(new Task(3,"Third task",false,  false, dayjs("2021-08-24")));

//I order by date and print the taskList

myTaskList.sortAndPrint();

//I filter by urgent field and print the taskList

myTaskList.filterAndPrint();
