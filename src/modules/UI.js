import {Task} from './task'

const DOM_CONTENT = () => {
    const container = document.getElementById('container');

    const createHeader = (() => {
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
        <div class="logo">ToDo App</div>
        <nav class="nav">
            <button class="btn"><i class="fas fa-bars"></i></button>
            <button class="btn"><i class="fas fa-home"></i></button>
            <form autocomplete="off">
                <input type="text" name="" id="input-search">
                <i class="fas fa-search btn"></i>
            </form>
        </nav>
        `;
        container.appendChild(header)
    })();

    const createMenu = (() => {
        const main = document.createElement('main');
        main.innerHTML = `
        <section class="menu">
            <button class="btn active"><i class="fas fa-inbox"></i>Inbox</button>
            <button class="btn"><i class="fas fa-calendar-day"></i>Today</button>
            <button class="btn"><i class="fas fa-calendar-week"></i>Upcoming</button>
            <h3 class="project-title">Projects</h3>
            <button class="btn"><i class="fas fa-plus"></i>Create New Project</button>
        </section>
        <section class="task-container" id="task-container">
            <button class="btn" id="add-task"><i class="fas fa-plus"></i>Add a task</button>
        </section>
        `;
        container.appendChild(main)
    })();

    const createForm = () => {
        const btn = document.getElementById('add-task')
        const container = document.getElementById('task-container')
        const form = document.createElement('form');
        form.innerHTML = `

            <input type="text" id="title" placeholder="Task Info">
            <textarea name="textarea" rows="3" cols="50" id="description" placeholder="task description"></textarea>
            <input type="text" id="dueDate" placeholder="Schedule" onfocus="(this.type='date')" onblur="(this.type='text')">
            <select id="project-select">
                <option value="inbox">Inbox</option>
            </select>
            <select id="priority-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button class="btn addTaskFormBtn" id="addTaskFormBtn">add task</button>

    `;
    container.classList.add('active');
    form.setAttribute('id', 'form');

    container.replaceChild(form, btn)
    };

    const taskContainer = (() => {
        const container = document.getElementById('task-container')
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.setAttribute('id', 'card-container')
        container.appendChild(cardContainer);
    })();

    const formTask = document.getElementById('add-task');

    formTask.addEventListener('click', createForm);
}

class UI {
    addTask(item) {
            const taskContainer = document.getElementById('task-container');
            const element = document.getElementById('card-container');
            const card = document.createElement('div');
            card.classList.add('card')
            card.innerHTML = `
                <div class="card">
                    <h3 class="task-title">${item.title}</h3>
                    <p class="task-description">${item.description}</p>
                    <h3 class="task-title">${item.dueDate}</h3>
                    <h3 class="task-title">${item.project}</h3>
                    <h3 class="task-title">${item.priority}</h3>
                    <a href="#" class="btn" name="delete">Delete</a>
                </div>
            `;
            element.appendChild(card)

    }

    resetForm() {
        document.getElementById('form').reset();
    }

    deleteTask(element) {
        if(element.name === 'delete') {
            element.parentElement.remove();
            this.showMessage('Task removed Succesfully', 'danger')
        }
    }
}
const DOM_EVENTS = () => {
    document.addEventListener('click', (e) => {
        if(e.target.id === "addTaskFormBtn") {
            const title = document.getElementById('title').value
            const description= document.getElementById('description').value
            const dueDate = document.getElementById('dueDate').value
            const project = document.getElementById('project-select').value
            const priority = document.getElementById('priority-select').value

            console.log(title,description,dueDate, project, priority)
            const task = new Task(title, description, dueDate, project, priority);
            e.preventDefault()
            console.log(task.dueDate)
            console.log(new Date(task.dueDate))
            const ui = new UI();
            ui.addTask(task);
            ui.resetForm();
        } else return
        
    });
}

export {DOM_CONTENT, DOM_EVENTS} 