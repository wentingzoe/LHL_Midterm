$(document).ready(() => {

    $(".edit_button").on("click", function() {
        const taskContent = $(this).siblings(".task_content")
        taskContent.empty()
        const form = createEditForm(taskContent.attr("data-id"), taskContent.attr("data-title"), taskContent.attr("data-description"), taskContent.attr("task-end"))
        taskContent.append($(form));
    });

    $(".checkbox").on("click", function () {
      console.log($(this).attr("id"));
      const id = $(this).attr("id");
        $.ajax({
          url:`tasks/${id}/checkbox`, 
          type:"POST",
          success:function(data) {
            console.log(data.message)
          },
          error:function(err) {
            console.log(err)
          }
        })
    })

    const createEditForm =  function(tasksId, task_title, task_description, task_end_date) {
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
        <label for="start">End date:</label>

        <input type="date" id="enddate" name="task-end"
          value="${task_end_date}" >
        <button type="submit">Save</button>
        </div>
        </form>`
    }
});