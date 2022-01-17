const books = require('google-books-search');

const checkBook = function (taskTitle, taskDesc) {
    taskTitle = taskTitle.toLowerCase().trim();
    // taskDesc = taskDesc.toLowerCase().trim();

    return new Promise ((resolve,reject) => {
        books.search(taskTitle, function(error, results) {
            if ( ! error ) {
                for (const book of results) {
                    let googleBooks = book.title.toLowerCase();
                    console.log(results);
                    if (googleBooks === taskTitle) {
                      console.log (`Book found: ${googleBooks}`);
                      return resolve(true);
                    }
                  }
                  console.log (`No exact match for '${taskTitle}'.`)
                  return resolve(false);
                } else {
                  console.log(`No book found by that name: ${taskTitle}`);
                  return resolve(false);
                }

        });
    })
}


module.exports = {checkBook};





//HAVE FILE FOR HELPER FUNCTIONS
// add category func?
//fuctions for books, movies/shows, eating, buying
