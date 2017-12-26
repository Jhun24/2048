/**
 * Created by janghunlee on 2017. 12. 26..
 */
module.exports = route;

function route(app) {
    app.get('/',(req,res)=>{
        "use strict";
        res.render('index.html');
    });
}