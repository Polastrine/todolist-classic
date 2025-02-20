function inserirTarefa(){
    const taskInput = document.querySelector('.task');
    const taskList = document.querySelector('.list-task');
    const noTask = document.querySelector('.no-task');

    if (taskInput.value.trim() !== "") {
        noTask.style.display = "none";
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input class="check" onclick="atualizarProgresso()" type="checkbox" id=""/>
            <span>${taskInput.value}</span>
            <button class="btnEmoji">✏️</button>
            <button class="btnEmoji">🗑️</button>
        `;
        taskList.appendChild(newTask);
        taskInput.value = "";
        atualizarProgresso();
    }
}

function atualizarProgresso() {
    const tasks = document.querySelectorAll('.list-task li:not(.no-task)');
    const completedTasks = document.querySelectorAll('.list-task li .check:checked');
    const progressBar = document.querySelector('.progress div');
    const progressText = document.querySelector('.progress span');

    const totalTasks = tasks.length;
    const totalCompleted = completedTasks.length;
    const percentage = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

    progressBar.style.width = `${percentage}%`;
    progressBar.style.backgroundColor = 'green';
    progressText.textContent = `${percentage}% Concluído`;
}