 var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
    
    
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
            if(result!=null){
                res.send(true);
            }else{                
                res.send(false);
            }
        })
    });

    app.post("/LoginUser",  async (req, res) => {
        console.log(req.body.username);
        db.collection('usuarios').findOne({ username: req.body.username}).then(result => {
            if(result!=null){
                if(req.body.password==result.password){
                    res.send("ok");
                }    else{
                    res.send("no");
                }            
            }else{
                res.send("null");
            }
        })
    });
    
}