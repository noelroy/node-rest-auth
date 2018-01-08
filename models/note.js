var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title : {
        type : string,
        required : true
    },
    body : {
        type : string,
        required :true
    }
});

module.exports = mongoose.model('Note', NoteSchema);