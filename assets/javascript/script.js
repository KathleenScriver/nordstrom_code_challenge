const getAllTodos = async (filter) => {
  try {
    const response = await fetch(`https://cq31v4skne.execute-api.us-east-2.amazonaws.com/beta/todos?searchValue=${filter}`)
    const body = await response.json();
    displayAllTodos(body);
  } catch (error) {
    console.log(error.message)
  }
}

const displayAllTodos = (todoInfo) => {
  let allTodos = todoInfo
  $('.todo-section').html(' ');
  $('#description').val('');
  if (document.activeElement.id === 'date-sort') {
    allTodos = sortByDate(todoInfo);
  }
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

const sortByDate = (todos) => {
  sortedTodos = todos.sort((a,b) => {
    return (new Date(a.created) - new Date(b.created))
  })
  return sortedTodos
}

$('#submit-todo').on('click', addNewTodo)
$('.filter-options .filter').on('click', (e) => {
  e.preventDefault;
  getAllTodos(e.currentTarget.id);
})

$('#date-sort').on('click', () => {
  getAllTodos('all');
});


getAllTodos('all');
