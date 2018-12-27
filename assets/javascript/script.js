const getAllToDos = async () => {
  try {
    const response = await fetch('dummy_url');

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
        <td>${todo.description}</td>
        <td>${todo.tags}</td>
      <tr>
      `)
  });
};




// Get all ToDos on page load

getAllTodos();
