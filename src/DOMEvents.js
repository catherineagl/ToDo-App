import {Task} from './task';
import {Projects} from './projects';
//import {saveTaskToLocalStorage, clearLocalStorage} from './local_storage'
import {thisWeek, showAll, todayTask, filterByProject, searchBar} from './filter_todo'
const d = document;
let editing = false;
class UI {
    addTask(item) {
        const container = d.getElementById('task-container')
            const taskContainer = d.getElementById('cards');
            const card = d.createElement('div');
            card.innerHTML = `
                <div class="card-show">
                    <button class="check-btn"><i class="far fa-circle"></i></button>
                    <h3 class="task-el task-title" name="name">${item._title}</h3>
                    <h3 class="task-el task-date" name="date">${item._dueDate}</h3>
                <div class="card-btns">
                    <button class="btn-task btn-expand"><i class="fas fa-angle-double-down"></i></button>
                    <button class="btn-task btn-delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    </div>    
                <div class="card-hidden">
                    <h3 class="task-el task-project" name="project">Project: <b>${item._project}</b></h3>
                    <h3 class="task-el task-priority" name="priority">Priority: <b>${item._priority}</b></h3>
                    <button class="btn-task btn-edit"><i class="fas fa-edit"></i></button>
                </div>
            `;
            card.classList.add('card',  item._priority);
            taskContainer.appendChild(card);
            this.removeForm()
            if(editing) d.querySelector('.card.editing').remove();
            editing = false;
            if(!taskContainer.hasChildNodes()) {
                container.classList.remove('hide-bg')
            }else {
                container.classList.add('hide-bg')
            }
    }

    createForm() {
        const container = d.getElementById('task-container')
        const form = d.createElement('form');
        const select = d.createElement('select');
        const options = ['Inbox', ...d.getElementById('projects-list').children];
        options.forEach(op => {
            const option = d.createElement('option')
            option.value = op.textContent || op;
            option.textContent = op.textContent || op;
            select.appendChild(option);
        })

        form.innerHTML = `
            <div>
            <input type="text" id="title" placeholder="Task Info">
            <input type="text" id="dueDate" placeholder="Schedule" onfocus="(this.type='date')" onblur="(this.type='text')">
            <select id="project-select">
            ${select.innerHTML}</select>
            </div>
            <div>
            <select id="priority-select">
                <option value="none">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button class="btn addTaskFormBtn" id="addTaskFormBtn">add</button>
            <button class="btn cancelTaskFormBtn" id="cancelTaskFormBtn">cancel</button>
            </div>
    `;
    form.classList.add('form-task')
    container.classList.add('active');
    container.insertAdjacentElement('afterbegin', form);
    }

    removeForm() {
        const container = d.getElementById('task-container')
        const form = d.querySelector('.form-task');
        if(container.children[0] === form) {
            container.classList.remove('active');
            container.removeChild(form)
        }
    }

    removeTaskFormBtn() {
        const container = d.getElementById('task-container');

        container.classList.add('active')
    }
    showTaskFormBtn() {
        const container = d.getElementById('task-container');
        container.classList.remove('active')
    }

    resetForm(id) {
        d.querySelector(id).reset();
    }

    showMessage(msg, className) {
        const modal = d.createElement('div');
        modal.classList.add('show-msg-modal');
        modal.classList.add(className);
        modal.textContent = msg;
        document.body.appendChild(modal);
        setTimeout(() => document.body.removeChild(modal), 3000);
    }

    deleteTask(e) {
        const todo = e.parentElement.parentElement.parentElement;
        const container = d.getElementById('task-container');
        const tasks = d.getElementById('cards');
        todo.classList.add("fall");
        todo.remove();
        this.showMessage('Task removed Sucessfully', 'danger')
        //clearLocalStorage(e);
        if(!tasks.hasChildNodes()) {
            container.classList.remove('hide-bg')
        } else {
            container.classList.add('hide-bg')
        }
    }

    createNewProjectForm() {
        const container = d.querySelector('.menu');
        const btn = d.getElementById('create-new-project');

        const form = d.createElement('form');
        form.innerHTML = `
        <input type="text" placeholder="Project Name" name="name">
        <button class="btn-project" id="add-project">Add</button>
        <button class="btn-project" id="cancel-project">Cancel</button>
        
        `;
    
        form.classList.add('form-project');
        container.insertBefore(form, btn);
        btn.classList.add('none');
        //btn.style.display = "none"
    }

    addNewProject(item) {
        const menu = d.querySelector('.menu');
        const container = d.getElementById('projects-list');
        const btn = d.getElementById('create-new-project');
        const form = d.querySelector('.form-project');
        const project = d.createElement('button');
        project.classList.add('btn', 'project');
        project.innerHTML = `<i class="fas fa-tasks"></i>${item._title}
        <button class="btn-delete-project"><i class="fas fa-times"></i></button>`;
        container.appendChild(project);
        // menu.removeChild(form);
        if(menu.children[4].classList[0] === 'form-project') {
            form.remove();
        }
        btn.classList.remove('none');
    }

    cancelNewProject() {
        const btn = d.getElementById('create-new-project');
        const form = d.querySelector('.form-project');
        form.remove();
        btn.classList.remove('none');
    }

    changeSectionTitle(newTitle) {
        const title = d.getElementById('section-title');
        title.textContent = newTitle
    }

    changeActive(id) {
        d.querySelector('.menu .btn.active').classList.remove('active')
        id.classList.add('active');
    }

    deleteProject(id) {
       // const container = document.querySelector('#cards');
        const tasks = document.querySelectorAll('#cards .card .task-project');
        Array.from(tasks).forEach(task => {
            if(task.children[0].textContent.trim() === id.parentElement.textContent.trim()) {
                //container.removeChild(task.parentElement.parentElement);
                task.parentElement.parentElement.remove()
                //clearLocalStorage(id);
            }
        })
        
        if(id.parentElement.classList.contains('active')) {
            this.goToHome()
        }
        id.parentElement.remove();
        this.showMessage(`Project removed Succesfully`, 'danger');
    }

    goToHome() {
        if(d.querySelector('.menu .btn.active').textContent === "Inbox") return;
            this.changeActive(d.querySelector('#inbox'));
            this.changeSectionTitle('Inbox');
            this.showTaskFormBtn();
            showAll();
    }

    editTask(id) {
        this.removeForm();
        id.classList.add('editing');
        editing = true;
        this.goToHome();
        this.createForm();
        const title = id.children[0].children.name.textContent;
        const dueDate = id.children[0].children.date.textContent;
        const project = id.children[1].children.project.firstElementChild.textContent;
        const priority = id.children[1].children.priority.firstElementChild.textContent;
        d.getElementById('title').value = title;
        d.getElementById('dueDate').value = dueDate;
        d.getElementById('project-select').value = project;
        d.getElementById('priority-select').value = priority;
        id.style.display = "none";
    }
}


const DOM_EVENTS = () => {
    const ui = new UI();
    d.addEventListener('click', (e) => {
        if(e.target.matches('#addTaskFormBtn')) {
            e.preventDefault();
            //if(ui.editing()) d.querySelector('.card.editing').remove()
            const title = document.getElementById('title').value
            let dueDate = document.getElementById('dueDate').value
            let project = document.getElementById('project-select').value
            const priority = document.getElementById('priority-select').value
            if(title === "") return ui.showMessage('Task title can not be blank', 'alert');
            if(dueDate === "") dueDate = 'No due date';
            const task = new Task(title, dueDate, project, priority);
            ui.addTask(task);
            ui.showMessage('Task added Succesfully', 'success');
            //saveTaskToLocalStorage(task);
        }
        if(e.target.matches('#add-task')) {
            ui.createForm();
        };

        if(e.target.matches('.btn-delete')) {
            ui.deleteTask(e.target);
        };

        if(e.target.matches('#create-new-project')) {
            ui.createNewProjectForm();
        }
        if(e.target.matches('#add-project')) {
            e.preventDefault();
            const form = d.querySelector('.form-project');
            const title = form.name.value;
            if(title === "") return ui.showMessage('Project title can not be blank', 'alert');
            if(title.length > 15) return ui.showMessage('Project title can not be longer than 15 char', 'alert');
            const project = new Projects(title);
            //saveProjectToLocalStorage(project)
            ui.addNewProject(project);
            ui.removeForm();
            ui.showMessage('Project added Succesfully', 'success');

        }

        if(e.target.matches('#week')) {
            ui.changeActive(e.target)
            ui.changeSectionTitle('This Week Tasks')

            ui.removeForm()
            ui.removeTaskFormBtn()
            thisWeek()
        }
        if(e.target.matches('#inbox')) {
            ui.goToHome()
        }
        if(e.target.matches('#today')) {
            ui.changeActive(e.target)
            ui.changeSectionTitle('Today Tasks')
            ui.removeForm()
            ui.removeTaskFormBtn()
            todayTask()
        }
        if(e.target.matches('.project')) {
            ui.changeActive(e.target)
            ui.changeSectionTitle(e.target.textContent)
            filterByProject(e.target);
            ui.removeForm();
            ui.removeTaskFormBtn();
        }

        if(e.target.matches('.btn-delete-project')) {
            ui.deleteProject(e.target);
            ui.showMessage('Project removed Succesfully', 'danger');
           // clearLocalStorage(e.target)
        }

        if(e.target.matches('.cancelTaskFormBtn')) {
            e.preventDefault()
            if(editing) {
                d.querySelector('.card.editing').style.display = "flex";
                d.querySelector('.card.editing').classList.remove('editing')
            }
            ui.removeForm()
        }
        if(e.target.matches('.float-task-btn')) {
            ui.goToHome()
        }
        if(e.target.matches('.home')) {
            ui.goToHome()
        }
        if(e.target.matches('#cancel-project')) {
            e.preventDefault()
            ui.cancelNewProject()
        }
        if(e.target.matches('.btn-expand')) {
            e.target.parentElement.parentElement.parentElement.classList.toggle('show')
        }
        if(e.target.matches('.btn-edit')) {
            ui.editTask(e.target.parentElement.parentElement);
        }
        if(e.target.matches('.check-btn')) {
            if(e.target.children[0].classList.contains('fa-circle')) {
                e.target.children[0].classList.replace('fa-circle', 'fa-check-circle');
                e.target.parentElement.parentElement.classList.add('checked');
                return
            }
            if(e.target.children[0].classList.contains('fa-check-circle')) {
                e.target.children[0].classList.replace('fa-check-circle', 'fa-circle');
                e.target.parentElement.parentElement.classList.remove('checked');
                return
            }
        }

        if(e.target.matches('.collapse-menu')) {
            const content = d.getElementById('container');
            content.classList.toggle('collapse')
        }
    });

    d.addEventListener('keyup', (e) => {
        const search = d.getElementById('input-search')
        if(e.target.matches('#input-search')){
            e.preventDefault()
            searchBar(search.value);
            if(d.querySelector('.menu .btn.active').textContent === "Inbox") return;
            ui.changeActive(d.querySelector('#inbox'));
            ui.changeSectionTitle('Inbox');
            ui.showTaskFormBtn();
        };
    })
}

//export {saveToLocalStorage, getTasks}
export { DOM_EVENTS, UI }