const express = require('express');
const router = express.Router();


const homepageRoute = (db) => {
    
    router.get("/", (request, response) => {
        db.query('SELECT * FROM tasks;')
          .then((task) => {
              //response.json(task.rows);
              response.send(createHTML(task.rows));
          });
    });

    router.get("/:id", (request, response) => {
        db.query('SELECT * FROM tasks WHERE id = $1;', [request.params.id])
          .then((task) => {
              //response.json(task.rows[0]);
              //console.log(task.row[0]);
              response.send(createHTML([task.rows[0]]));
          });
    });

    return router;
};

const createHTML = (data) => {
    let dataHTML = "<div>";
    for (let i=0; i<data.length;i++) {
        dataHTML += `<h4>${data[i].task_title}</h4>`;
        dataHTML += `<p>${data[i].task_description}</p>`;
        dataHTML += `<hr>`;
    }
    dataHTML += '</div>'
    return dataHTML;
}

module.exports = homepageRoute;