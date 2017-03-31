var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var Polls= new Schema({
    user: String,
    id: Number,
    pollname:String,
    polloptions: {type: Array, default:[]}
})

module.exports = mongoose.model('Polls', Polls);

