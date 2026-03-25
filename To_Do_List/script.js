// Array para armazenar as tarefas (Simulando um banco de dados em memória)
let tasks = [];

// Elementos do DOM
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filterCategory = document.getElementById('filter-category');
const sortTasks = document.getElementById('sort-tasks');
const countPendentes = document.getElementById('count-pendentes');
const countConcluidas = document.getElementById('count-concluidas');
const emptyMessage = document.getElementById('empty-message');
const themeToggle = document.getElementById('theme-toggle');

// Event Listeners
taskForm.addEventListener('submit', addTask);
filterCategory.addEventListener('change', renderTasks);
sortTasks.addEventListener('change', renderTasks);
themeToggle.addEventListener('click', toggleTheme);

// Função para adicionar tarefa
function addTask(e) {
    e.preventDefault();

    const name = document.getElementById('task-name').value;
    const category = document.getElementById('task-category').value;
    const priority = document.getElementById('task-priority').value;
    const date = document.getElementById('task-date').value;

    const newTask = {
        id: Date.now(), // Gera um ID único baseado no timestamp
        name,
        category,
        priority,
        date,
        completed: false
    };

    tasks.push(newTask);
    taskForm.reset();
    renderTasks();
}

// Função para deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Função para alternar status (concluída/pendente)
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

// Formatar data para exibição (DD/MM/YYYY)
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Lógica de Ordenação
function getSortedTasks(tasksToRender) {
    const sortValue = sortTasks.value;
    
    if (sortValue === 'priority') {
        const priorityWeight = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
        return tasksToRender.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    } else if (sortValue === 'date') {
        return tasksToRender.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return tasksToRender; // Retorna normal se for 'default'
}

// Função principal de renderização e atualização
function renderTasks() {
    taskList.innerHTML = '';
    
    // Filtro de Categoria
    const categoryFilter = filterCategory.value;
    let filteredTasks = tasks;
    
    if (categoryFilter !== 'Todas') {
        filteredTasks = tasks.filter(task => task.category === categoryFilter);
    }

    // Ordenação
    filteredTasks = getSortedTasks(filteredTasks);

    // Renderizar Cards
    filteredTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'concluida' : ''}`;
        
        card.innerHTML = `
            <div>
                <div class="task-header">
                    <span class="task-category">${task.category}</span>
                    <span class="task-priority prio-${task.priority}">${task.priority}</span>
                </div>
                <h3>${task.name}</h3>
                <p class="task-date">📅 ${formatDate(task.date)}</p>
            </div>
            <div class="task-actions">
                <button class="btn-concluir" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Desfazer' : 'Concluir'}
                </button>
                <button class="btn-excluir" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(card);
    });

    updateCountersAndUI();
}

// Atualiza contadores e mensagem de vazio
function updateCountersAndUI() {
    const pendentes = tasks.filter(t => !t.completed).length;
    const concluidas = tasks.filter(t => t.completed).length;

    countPendentes.textContent = pendentes;
    countConcluidas.textContent = concluidas;

    if (tasks.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
}