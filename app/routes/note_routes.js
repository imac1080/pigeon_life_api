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

    app.post("/GetRankingUser",  async (req, res) => {
        console.log(req.body.username);
        db.collection('RankingCollection').findOne({ username: req.body.username}).then(result => {
            res.send(result);
        })
    });

    app.post("/UpdateRankingUser",  async (req, res) => {
        console.log(req.body.username);
        db.collection('RankingCollection').update({ username: req.body.username}, {$set:{ranking:req.body.ranking}}).then(result => {            
            res.send("update ok");
        })
    });

    app.post("/InsertRanking", async (req, res) => {        
		const user = {'username': req.body.username,'ranking':req.body.ranking };
        db.collection('RankingCollection').insert(user, (err, result) => {
			res.send("insert ranking ok");
		});
    });

    app.get("/Ranking",  async (req, res) => {        
        var mysort = { ranking: -1 };
        db.collection('RankingCollection').find({}).sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
          });
    });
    
}