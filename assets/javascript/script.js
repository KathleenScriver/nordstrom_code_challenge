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
  allTodos.forEach(todo => {
    $('#all-todos').append(`
      <tr>
        <td>${todo.todoDescription}</td>
        <td>${todo.tag}</td>
      <tr>
      `)
  });
};




// Get all ToDos on page load

getAllTodos();
