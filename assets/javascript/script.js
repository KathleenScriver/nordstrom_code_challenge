const getAllTodos = async () => {
  try {
    const response = await fetch('https://cq31v4skne.execute-api.us-east-2.amazonaws.com/beta/todos');

    const body = await response.json();
    displayAllTodos(body);
  } catch(error) {
    console.log(error.message)
  }
}

const displayAllTodos = (allTodos) => {
  $('.todo-section').html(' ');
  allTodos.forEach(todo => {
    $('.todo-section').append(`
      <tr>
        <td>${todo.todoDescription}</td>
        <td>${todo.tag}</td>
      <tr>
      `)
  });
};

const addNewTodo = async () => {
  const newTodoDesc = $('#description').val();
  const newTodoTag = $('#tag').val();

  try {
    const response = await fetch('https://cq31v4skne.execute-api.us-east-2.amazonaws.com/beta/todos', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        todoDescription: newTodoDesc,
        tag: newTodoTag
      })
    });
    getAllTodos();
  } catch (error) {
    console.log(error.message)
  }
}


$('#submit-todo').on('click', addNewTodo)

// Get all ToDos on page load

getAllTodos();
