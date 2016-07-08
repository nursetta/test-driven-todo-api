// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
   { _id: 1, task: 'Laundry', description: 'Wash clothes' },
   { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
   { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  var newTodo = req.body;
  var nextId = (todos.length + 1);
    newTodo._id = nextId;
    todos.push(newTodo);
    res.json(newTodo);

});

app.get('/api/todos/:id', function show(req, res) {

  var id = parseInt(req.params.id);
  var todoWeWant = todos.filter(function(todo) {
      return (id === todo['_id']);
  })[0];

  res.json(todoWeWant);

});  

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var oneToUpdate = parseInt(req.params.id);
   var update = req.body;
        console.log(req.params);
     for( var i = 0; i<todos.length; i++){
       if (oneToUpdate === todos[i]._id){
       update._id = oneToUpdate;
       todos[i]= update;       
          console.log('this works');
        res.json(todos[i]);
    }
  }
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   var deleteTodoID = req.params.id;
     for( var i = 0; i<todos.length; i++){
       if (todos[i]._id == deleteTodoID){
           todos.splice(i, 1);
           res.json({todos: "delete"});
       }
     }

});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
