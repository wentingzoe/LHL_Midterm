$(document).ready(() => {
    $(".edit_button").on("click", function() {
        const taskContent = $(this).siblings(".task_content")
        taskContent.empty()
        const form = createEditForm(taskContent.attr("data-id"), taskContent.attr("data-title"), taskContent.attr("data-description"))
        taskContent.append($(form));
    });

    const createEditForm =  function(tasksId, task_title, task_description) {
        return `
        <form action="/tasks/${tasksId}" method="POST" class="new-task">
        <label class="input">
          <input name="task_title" class="input__field" type="text" placeholder=" " value="${task_title}"/>
          <span class="input__label">Task Title</span>
        </label>
        <label class="input">
          <input name="task_description" class="input__field" type="text" placeholder=" " value="${task_description}" />
          <span class="input__label">Task description</span>
        </label>
    
        <div class="button-group">
          <button type="submit">Save</button>
        </div>
        </form>`
    }
});