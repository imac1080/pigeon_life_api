 var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('usuarios').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
    });
    
    app.post("/newUser", async (req, res) => {        
		const user = {'username': req.body.username,'password':req.body.password };
        db.collection('usuarios').insert(user, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		});
    });

    app.post("/getUser",  async (req, res) => {
        console.log(req.body.username);
        db.collection('usuarios').findOne({ username: req.body.username}).then(result => {
            res.send(true);
        })
    });
    
}