// Test Script To Print User Names

// 1. Function to create a single task element
const createTaskElement = function(data) {

  const $output = $('<article class="tasks lined thick">'); // Output is a tasks class article

  // Checkbox
  const $checkbox = $(`<button class="checkbox" onClick="checkTask(this, ${data.id})"></button>`);

  // Task Content Container
  const $taskContent = $('<div class="taskContent">');

  // Task Header Tags
  const $taskHeader = $('<header class="taskHeader">'); // Set task header tag
  const $taskTitle = $('<p class="taskTitle">').text(data.task_title); // Set p tag in task header

  //delete
  const $deleteTask = $(`<button class="deleteTask btn btn-danger" onClick="deleteTask(${data.id})">`).text('❌')


  // Append Header Tags

  $taskHeader.append($taskTitle).append($deleteTask);

  // Task Body Tags
  const $taskBody = $('<div class="taskBody">'); // Set div with task body class
  const $taskDescription = $('<p class="taskDescription">').text(data.task_description); // Set p with taskDescription class
  const $editButtons = $('<div class="editButtons">') // Set div with editButtons class
  const $editButton = $(`<button class="btn btn-outline-secondary" onClick="editTask(this, ${data.id})">`).html('<i class="far fa-edit"></i>'); // Edit button

  // Append Body Tags
  $editButtons.append($editButton);
  $taskBody.append($taskDescription).append($editButtons);

  // Task Footer
  const $taskFooter = $('<footer class="taskFooter">'); // Set footer tag with taskFooter class


    const $categoryContainer = $('<div class="categoryContainer">'); // Set div with class categoryContainer

    let currentCat = false;
    if(data.category_name) {
      // For the real script, there should be a loop here for each category including the append step!
      const $removeCategories = $(`<button class="removeCategories thin line ${data.category_name}" id="currentCategory" onClick="deleteCategoryFromTask(${data.id},${data.category_id})">`).text(`❌ ${data.category_name}`);
      $categoryContainer.append($removeCategories);
      currentCat = true;
    }


    let $addCategory = $(`<button class="btn btn-outline-secondary" id="addCategory${data.id}" onClick="showCategories(${data.id})" style="border: none;">`).html('<i class="fas fa-plus-square"></i>'); // Set addCategory button
    if(currentCat) {
      $addCategory = $(`<button class="btn btn-outline-secondary" id="addCategory${data.id}" onClick="showCategories(${data.id})" style="border: none; display:none;">`).html('<i class="fas fa-plus-square"></i>'); // Set addCategory button
    }
    // Append Footer tags
    $taskFooter.append($categoryContainer).append($addCategory);

  // Append $output
  $taskContent.append($taskHeader).append($taskBody).append($taskFooter);
  $output.append($checkbox).append($taskContent);

  return $output;
};

// 2. Function to loop through example data set and render all tasks
const renderTasks = function(data) {
  $('#allTasks').html(''); // Clears default text

  // Code for custom number of columns
  const columns = 3; // Change this number to adjust number of columns.
  const rows = Math.ceil(data.length/columns);
  let counter = 0;

  for (let i = 0; i < rows; i++) {
    let $row = $('<div class="row">');
    for (let j = 0; j < columns; j++) {
      let $column = $('<div class="column">');
      if (data[counter] && data[counter].status_id === 1) {
        $task = createTaskElement(data[counter]); // calls createTaskElement for each task
        $column.prepend($task); // takes return value and prepends (ensures order) it to the tasks container
      }
      $row.append($column);
      $('#allTasks').append($row);
      counter ++;
    }
  }
};

// 3. Create a function to do this directly from the database API
const loadTasks = function() {
  $.getJSON('/api/tasks', function(data) {
    renderTasks(data.tasks);
  });
};

$(document).ready(function() {
  // 4. Call load function
  loadTasks()
});
