

var Polls= require("../models/polls.js");

function getPolls(){
    Polls.find({}, function(err, data){
        if(err){
            throw err;
        }
        return data;
    })
}

module.exports.getPolls=getPolls;