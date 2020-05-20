const express     = require ('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
require('dotenv').config({path: 'variables.env'});

const app		  = express();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8000;


app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(process.env.DB_URL, (err, database) => {
	const myAwesomeDB = database.db('RankingDB')
	if (err) return console.log(err)
	require('./app/routes')(app, myAwesomeDB);
	app.listen(port, () => {
		console.log("We are live on " + port);
	})

})