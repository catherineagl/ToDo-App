//import { compareDesc, compareAsc, format } from 'date-fns';
export const showingTaskForm = () => {
    const btn = document.getElementById('add-task');
    const createForm = () => {
        const container = document.getElementById('task-container')
        const form = document.createElement('form');
        const inputTitle = document.createElement('input');
        const inputDate = document.createElement('input');
        const projectsSelection = document.createElement('select');
        const optionPriority = document.createElement('select');
        const selectProjects = document.createElement('option')
        const addBtn = document.createElement('button');
        let options = ['Priority 1', 'Priority 2', 'Priority 3'];
        options.forEach(op => {
            const select = document.createElement('option')
            select.value = op.toLowerCase();
            select.textContent = op
            optionPriority.appendChild(select)
        })

        container.classList.add('active');
        
        addBtn.classList.add('addTaskBtn');
        addBtn.setAttribute('id', 'addTaskFormBtn');
        addBtn.textContent = 'Add Task';

        form.classList.add('taskForm');
        
        inputTitle.setAttribute('placeholder', 'task name');
        inputTitle.setAttribute('type', 'text');
        
        inputDate.setAttribute('type', 'text');
        inputDate.setAttribute('placeholder', 'Schedule');
        inputDate.setAttribute('onfocus', `(this.type='date')`);
        inputDate.setAttribute('onblur', `(this.type='text')`);
        
        selectProjects.textContent = 'Project';
        selectProjects.setAttribute('disabled', "")
        selectProjects.setAttribute('hidden', '')
        selectProjects.setAttribute('selected', '')

        projectsSelection.appendChild(selectProjects);
        form.appendChild(inputTitle);
        form.appendChild(inputDate);
        form.appendChild(projectsSelection)
        form.appendChild(optionPriority);
        form.appendChild(addBtn);

        container.appendChild(form);
        return container 
    }
    

    btn.addEventListener('click', createForm)

}