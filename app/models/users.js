var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var Users= new Schema({
    github:{
        username: String,
        name: String,
        id: String
    },
    local:{
        username: String,
        password: String
    },
    current:{username: String,
             password:String
    }
})

module.exports = mongoose.model('User', Users);

