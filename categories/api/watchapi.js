const omdbApi = require('omdb-client');
const key = process.env.OMDB_API;



const checkMovie = function(taskTitle){
  taskTitle = taskTitle.toLowerCase().trim();
  // taskDesc = taskDesc.toLowerCase().trim();
  var params = {
    apiKey: key,
    query: taskTitle
    // type: taskDesc
  }
  return new Promise ((resolve,reject) => {
  omdbApi.search(params, function(err, data) {
    if(!err) {
      for (const movie of data.Search){
        let title = movie.Title.toLowerCase();
        let type = movie.Type.toLowerCase();
        if(title === taskTitle || type === 'movie'|| type === 'series'|| type === 'episode') {
          console.log(`Watch list found: ${movie.Title}`);
          return resolve(true);
        }
      }
    console.log(`No exact match found for: ${taskTitle}`)
    return resolve(false);
  } else {
    console.log(err);
    return resolve(false);
  }
  });

  })
}

module.exports = {checkMovie};
