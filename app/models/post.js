let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

let PostSchema = new Schema({
    'owner': { 
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    'postid' : { type: String },
    'posttitle' : { type: String },
    'postbody' : { type: String },
    'postedon' : { type: Date, default: new Date() },
    'postmedia' : {type: String},
    'comments' : {
        'commentowner' : { type: String },
        'comment': { type: String },
        'commentedon' : { type: Date, default: new Date() }
    }
});

module.exports = mongoose.model('Post', PostSchema);