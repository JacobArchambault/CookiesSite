/*    cookies   */
var express = require('express');
var app = express();

var exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser')
app.use(cookieParser());

var jokes = [];
	jokes.push("What is orange and sounds like a parrot? A carrot.")
	jokes.push("What is the Australian word for a boomerang that will not come back? A stick.")
	jokes.push("Arnold Swartzeneger and Sylvester Stallone are making a movie about the lives of the great composers. Stallone says 'I want to be Mozart.' Swartzeneger says: 'In that case... I'll be Bach.' ")


app.get('/', function(req, res) {  
     res.render('welcomeForm'); 
});


app.post('/getUserData', function(req, res){  
	   
	name = req.body.name;   
	years = req.body.age;
	
	// set cookies                               
	res.cookie('user_name', name, {maxage: Date.now() + 1000 * 60 * 60 * 24});   //  cookies expires in 24 hours
	res.cookie('age', years, {maxage: Date.now() + 1000 * 60 * 60 * 24});   
	
	console.log("Cookies :  ", req.cookies);   // log cookies
	res.render('landingPage', {user: name});
});

app.get('/jokeOfDay', function(req, res) {   // displays login form
						   
	var name = req.cookies.user_name;
	var age = req.cookies.age;
	
	if(!name) {
		return res.redirect('/');
	}
	
	var d = new Date();
	var n = d.getTime();  // number of milliseconds since 1970/01/01
	var index = n % 3;    // returns either 0, 1, or 2
	
	console.log("Cookies :  ", req.cookies);   // log cookies
    res.render('jokePage', {joke: jokes[index], user: name, age: age} ); 
});


app.get('/fargo', function(req, res) {   // displays login form
						   
	var name = req.cookies.user_name;
	var age = req.cookies.age;
	
	if(!name) {
		return res.redirect('/');
	}
	
	console.log("Cookies :  ", req.cookies);   // log cookies
    res.render('fargoPage', {user: name} ); 
});


app.post('/logout', function(req, res) {   // cancels cookies
						   
	res.clearCookie("user_name");
	res.clearCookie("age");
	res.send("Bye, thanks for visiting.");
});


app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
