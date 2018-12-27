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
  $('.todo-section').html(' ');
  $('#description').val('');
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
$('.filter-options button').on('click', (e) => {
  e.preventDefault;
  getAllTodos(e.currentTarget.id);
})

// Get all ToDos on page load

getAllTodos('all');
