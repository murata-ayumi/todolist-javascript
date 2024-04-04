const ENTER_KEY_CODE = 13;

// ページ読み込み時に初期化処理を実行する
window.onload = function () {
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
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('task-button'); // ボタンにクラスを追加
    deleteButton.addEventListener('click', function () {
      deleteTask(newTask);
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
  }
}

function handleKeyPress(event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    addTask();
  }
}

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress', handleKeyPress);
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
  完了済率表示.textContent = '完了済の割合: ' + 完了済の割合 + '%';

  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = 完了済の割合 + '%';
  }
}
