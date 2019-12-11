let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

let PostSchema = new Schema({
    'post' : {
        'owner': { type: String },
        'postid' : { type: String },
        'postedon' : { type: Date, default: new Date() },
        'photo' : {type: String},
        'comments' : [
            'owner': { type: String },
            'comment': { type: String },
            'commentedon' : {type: Date, default: new Date()}
        ]

    },
    'owner' : String,
    'createdon' : Date,

    'verified': { type: Boolean },
    'verifiedon': { type: Date, default: new Date() },
    'vcode': { type: String },
    'resetpasswordtoken': {type: String},
    'resetpasswordexpires': {type: Date},
});

module.exports = mongoose.model('Post', PostSchema);