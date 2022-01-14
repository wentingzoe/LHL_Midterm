const express = require('express');
const router  = express.Router();
const { addCategory } = require('../categories/addCategory')


module.exports = (db) => {

  router.post("/add", (req, res) => {
    console.log("test!");
    console.log(req.body);
    addCategory(req.body.task_title,req.body.task_description, (err, data) =>{
      let queryString = `
        INSERT INTO tasks (task_title, task_description, end_date, user_id, category_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;

      let queryParams = [req.body.task_title, req.body.task_description, req.body.task_end_date, 1, data];
      db.query(queryString, queryParams)
      .then((data) => {

        const tasks = data.rows;
        console.log(tasks);
        console.log("Successfully, inserted!");
        // res.json({ tasks });
        res.redirect("/tasks");
      })
      .catch(err => {
        console.log("I suck", err);
        res
          .status(500)
          .json({ error: err.message });
      });
    })
  });


  router.post("/:id/delete", (request, response) => {
    let queryString = (`DELETE FROM tasks WHERE id = $1 RETURNING *;`);
    let queryParams = [request.params.id];

    db.query(queryString, queryParams)
      .then(data => {
      response.redirect('/tasks');
      })
      .catch(err => {
      response
      .status(500)
      .json({ error: err.message });
    })
  });

  router.post("/:id", (request, response) => {

    const queryString = `UPDATE tasks
        SET task_title = $1, task_description = $2, end_date = $4
        WHERE id = $3;`;
        const values = [request.body.task_title, request.body.task_description, request.params.id, request.body.task_end];
    db.query(queryString,values)
      .then(res => res.rows)
      .catch(err => console.error(err.message));
    response.redirect("/tasks")
  });

  router.post("/delete", (req, res) => {
    console.log("test!");

      let queryString = `DELETE FROM tasks WHERE id = $1;`;
      let queryParams = [req.body.id];
      db.query(queryString, queryParams)
      .then((data) => {
        const tasks = data.rows;
        console.log("Successfully, deleted!");
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

  router.post("/edit", (req, res) => {
    console.log("test!");
    console.log(req.body);

      let queryString = `UPDATE tasks
      SET task_title = $1, task_description = $2, start_date = $3, end_date =$4
      WHERE id = $5;`;
      let queryParams = [req.body.task_title, req.body.task_desc, req.bodystart_date, req.body.end_date, req.body.id];

      db.query(queryString, queryParams)
      .then((data) => {
        const tasks = data.rows;
        console.log("Successfully, inserted!");
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

    router.post("/:id/checkbox", (request, response) => {
      let queryString = `
      UPDATE tasks
      SET completed = TRUE
      WHERE id = $1;
      `;
      let queryParams = [request.params.id];
      db.query(queryString, queryParams)
        .then((data) => {
          console.log("Successfully updated");
          response.json({message: "success"});
        });

    });

    router.post("/:id/category", (request, response) => {
      console.log(request.params.id)
      let queryString = `
      UPDATE tasks
      SET category_id = $2
      WHERE id = $1;
      `;
      let queryParams = [request.params.id, request.body.categoryId];
      db.query(queryString, queryParams)
        .then((data) => {
          response.redirect("/tasks/watch");
          console.log("Successfully changed the category.")
          response.json({message: "changed"});
        })

    });

  return router;
};



