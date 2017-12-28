/**
 * Created by janghunlee on 2017. 12. 28..
 */
module.exports = game;

function game(app , gameModel , sortOn) {
    app.get('/game',(req,res)=>{
        "use strict";
        gameModel.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(404);
            }
            else{
                console.log(sortOn(model,el=>el.score));
                res.send(sortOn(model,el=>el.score));
            }
        });
    });

    app.post('/game',(req,res)=>{
        "use strict";
        var data = req.body;

        var saveGame = new gameModel({
            "name":data.name,
            "score":data.score,
        });

        saveGame.save((err)=>{
            if(err) throw err;

            res.send(200);
        });
    });
}