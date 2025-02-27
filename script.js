const taskList = document.querySelector('.list-task');
const noTask = document.querySelector('.no-task');
const taskInput = document.querySelector('.task');
const progressBar = document.querySelector('.progress div');
const progressText = document.querySelector('.progress span');
let tasksLocalStorage = [];

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = document.querySelectorAll('.list-task li:not(.no-task)');
    tasksLocalStorage = [];
    tasks.forEach(task => {
        tasksLocalStorage.push({
            text: task.querySelector('span').textContent,
            completed: task.querySelector('.check').checked
        });
    });
    localStorage.setItem('tasksLocalStorage', JSON.stringify(tasksLocalStorage));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    tasksLocalStorage = JSON.parse(localStorage.getItem('tasksLocalStorage')) || [];

    if (tasksLocalStorage.length > 0) {
        noTask.style.display = "none";
        tasksLocalStorage.forEach(task => {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <input class="check" onclick="changeProgress()" type="checkbox" ${task.completed ? 'checked' : ''}/>
                <span>${task.text}</span>
                <button class="btnEmoji" onclick="editTask()">✏️</button>
                <button class="btnEmoji" onclick="deleteTask(event)">🗑️</button>
            `;
            taskList.appendChild(newTask);
        });
    } else {
        noTask.style.display = "flex";
    }
    changeProgress();
}

// Função de inserção das tarefas na div de tarefas que inicialmente se encontra vazio
function insertTask() {
    if (taskInput.value.trim() !== "") {
        noTask.style.display = "none";
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input class="check" onclick="changeProgress()" type="checkbox" id=""/>
            <span>${taskInput.value}</span>
            <button class="btnEmoji" onclick="editTask()">✏️</button>
            <button class="btnEmoji" onclick="deleteTask()">🗑️</button>
        `;
        taskList.appendChild(newTask);
            changeProgress();
        saveTasks();
    }
}

// Função responsável por atualizar a barra de progresso de conclusão das tarefas
function changeProgress() {
    const tasks = document.querySelectorAll('.list-task li:not(.no-task)');
    const completedTasks = document.querySelectorAll('.list-task li .check:checked');
    const totalTasks = tasks.length;
    const totalCompleted = completedTasks.length;
    const percentage = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

    progressBar.style.width = `${percentage}%`;
    progressBar.style.backgroundColor = 'green';
    progressText.textContent = `${percentage}% Concluído`;
    saveTasks();
}


// Função responsável por esconder as tarefas concluídas
function hideCheckedTasks() {
    const tasks = document.querySelectorAll('.list-task li:not(.no-task)');
    tasks.forEach(task => {
        task.style.display = task.querySelector('.check').checked ? 'none' : 'flex';
    });
}

// Função responsável por deletar uma tarefa ao clicar no ícone de lixeira
function deleteTask(event) {
    const taskItem = event.target.closest('li');
    const confirmation = confirm('Você realmente deseja excluir esta tarefa?');
    
    if (confirmation) {
        taskItem.remove();
        saveTasks();
        if (taskList.children.length === 1) {
            noTask.style.display = "flex";
        }
        changeProgress();
    }
}

// Função responsável por editar uma tarefa ao clicar no ícone de lápis
function editTask() {
    const taskItem = event.target.closest('li');
    const taskSpan = taskItem.querySelector('span');
    const newTaskText = prompt('Edite sua tarefa:', taskSpan.textContent);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskSpan.textContent = newTaskText.trim();
        saveTasks();
    }
}

// Carregar tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);