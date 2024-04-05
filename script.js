// script.js

const ENTER_KEY_CODE = 13;

window.onload = function () {
  loadTasks();
  showCompletionPercentage();
};

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value;

  if (taskText.trim() !== '') {
    const newTask = document.createElement('li');

    // タスクテキストを span 要素に含める
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskTextSpan.classList.add('task-text');
    newTask.appendChild(taskTextSpan);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.addEventListener('change', function () {
      toggleTaskCompletion(checkBox, newTask);
      saveTasks(); // タスクの状態を保存
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('task-button'); // ボタンにクラスを追加
    deleteButton.addEventListener('click', function () {
      deleteTask(newTask);
      saveTasks(); // タスクの状態を保存
    });

    // 新しく追加したボタン要素にクラスを追加した後に、スタイルを適用
    deleteButton.style.textDecoration = 'none'; // ボタン要素に打ち消し線のスタイルを適用しないようにする

    newTask.appendChild(checkBox);
    newTask.appendChild(document.createTextNode(' '));
    newTask.appendChild(deleteButton);

    const taskList = document.getElementById('taskList');
    taskList.appendChild(newTask);

    taskInput.value = '';

    // タスクが追加された後に完了率を更新
    showCompletionPercentage();

    // タスクの追加後に保存
    saveTasks();
  }
}

function toggleTaskCompletion(checkBox, task) {
  if (checkBox.checked) {
    task.classList.add('completed'); // completedクラスを追加
  } else {
    task.classList.remove('completed'); // completedクラスを削除
  }

  // 完了率を更新
  showCompletionPercentage();
}

function deleteTask(task) {
  task.parentNode.removeChild(task);

  // 完了率を更新
  showCompletionPercentage();
}

function deleteAllTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // 完了率を更新
  showCompletionPercentage();

  // 全てのタスクを削除後に保存
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  // タスクリストの各要素をループして、タスクの状態を配列に保存
  taskList.childNodes.forEach(function (task) {
    const taskText = task.querySelector('.task-text').textContent;
    const isCompleted = task.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });

  // ローカルストレージに保存
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);

    // ローカルストレージから取得したタスクをリストに追加
    tasks.forEach(function (task) {
      const newTask = document.createElement('li');
      const taskTextSpan = document.createElement('span');
      taskTextSpan.textContent = task.text;
      taskTextSpan.classList.add('task-text');
      newTask.appendChild(taskTextSpan);

      // タスクの完了状態に応じてクラスを設定
      if (task.completed) {
        newTask.classList.add('completed');
      }

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.checked = task.completed;
      checkBox.addEventListener('change', function () {
        toggleTaskCompletion(checkBox, newTask);
        saveTasks(); // タスクの状態を保存
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      deleteButton.classList.add('task-button');
      deleteButton.addEventListener('click', function () {
        deleteTask(newTask);
        saveTasks(); // タスクの状態を保存
      });
      deleteButton.style.textDecoration = 'none';

      newTask.appendChild(checkBox);
      newTask.appendChild(document.createTextNode(' '));
      newTask.appendChild(deleteButton);

      const taskList = document.getElementById('taskList');
      taskList.appendChild(newTask);
    });

    // ロード後に完了率を更新
    showCompletionPercentage();
  }
}

function showCompletionPercentage() {
  const taskList = document.getElementById('taskList');
  const liの数 = taskList.getElementsByTagName('li').length;
  let 完了済のliの数 = 0; // 完了済のタスク数の初期値を0とする
  if (liの数 > 0) {
    // タスクがある場合のみ完了率を計算する
    完了済のliの数 = taskList.getElementsByClassName('completed').length;
  }
  const 完了済の割合 =
    liの数 > 0 ? Math.floor((完了済のliの数 / liの数) * 100) : 0; // タスクがある場合のみ完了率を計算する

  console.log('完了済の割合: ' + 完了済の割合 + '%');

  const 完了済率表示 = document.getElementById('completionPercentage');
  完了済率表示.textContent = '完了率: ' + 完了済の割合 + '%';

  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = 完了済の割合 + '%';
  }
}

// Enterキーでタスクを追加する機能を追加
const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress', function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    addTask();
  }
});
