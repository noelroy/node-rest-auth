var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required :true
    }
});

module.exports = mongoose.model('Note', NoteSchema);