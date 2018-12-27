const getAllTodos = async (filter) => {
  try {
    const response = await fetch(`https://cq31v4skne.execute-api.us-east-2.amazonaws.com/beta/todos?searchValue=${filter}`)
    const body = await response.json();
    displayAllTodos(body);
  } catch(error) {
    console.log(error.message)
  }
}

const displayAllTodos = (allTodos) => {
  debugger;
  $('.todo-section').html(' ');
  $('#description').val('');
  allTodos.forEach(todo => {
    let date = new Date(todo.created)
    $('.todo-section').append(`
      <tr>
        <td>${todo.todoDescription}</td>
        <td>${todo.tag}</td>
        <td>${date.getMonth() + 1}/${date.getDate()}</td>
      <tr>
      `)
  });
};

const addNewTodo = async (e) => {
  e.preventDefault;
  const newTodoDesc = $('#description').val();
  const newTodoTag = $('#tag').val();
  const createdAt = new Date();

  try {
    const response = await fetch('https://cq31v4skne.execute-api.us-east-2.amazonaws.com/beta/todos', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        todoDescription: newTodoDesc,
        tag: newTodoTag,
        created: createdAt
      })
    });
  } catch (error) {
    console.log(error.message)
  }
  getAllTodos('all');
}

$('#submit-todo').on('click', addNewTodo)
$('.filter-options button').on('click', (e) => {
  e.preventDefault;
  getAllTodos(e.currentTarget.id);
})
$('#date-sort').on('click', sortTodos);

getAllTodos('all');
