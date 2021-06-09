import { UI } from './DOMEvents'
import { Projects } from './projects'
const saveTaskToLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {    
        tasks = JSON.parse(localStorage.getItem('tasks'))   
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getTasks = () => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const ui = new UI();
    tasks.forEach(task => {
        ui.addTask(task)
        const project = new Projects(task._project);
            //saveProjectToLocalStorage(project)
        ui.addNewProject(project);
    })
}

const clearLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {  
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let index = task.parentElement.parentElement.children[1].textContent;
    for(let x in tasks) {
        if(tasks[x]._title === index) {
            tasks.splice(x,1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
/*==============projects local storage========*/
/*
const saveProjectToLocalStorage = (project) => {
    let projects;
    if(localStorage.getItem('projects') === null) {
        projects = [];
    } else {    
        projects = JSON.parse(localStorage.getItem('projects'))   
    }
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects))
}

const getProjects = () => {
    let projects;
    if(localStorage.getItem('projects') === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem('projects'));
    }
    const ui = new UI();
    projects.forEach(project => {
        ui.addNewProject(project);
    })
}

const clearLocalProjectStorage = (project) => {
    let projects;
    if(localStorage.getItem('projects') === null) {
        projects = [];
    } else {  
        projects = JSON.parse(localStorage.getItem('projects'))
    }
    let index = project.parentElement;
    console.log(index)
    //for(let x in projects) {
        // if(projects[x]._title === index) {
        //     projects.splice(x,1)
        // }
    //}
    localStorage.setItem('projects', JSON.stringify(projects))
}
*/
export {saveTaskToLocalStorage, getTasks, clearLocalStorage}