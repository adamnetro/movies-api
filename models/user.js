const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        maxlength: 17
    },
    email: {
        type:String,
        required:true,
        maxlength: 40,
        unique:true,
        lowercase:true
    },
    password: {
        type:String,
        required:true,
    },
    watchList: [
        {
            movie : {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Movie'
            },
            watched: Boolean
        }
    ],
    isAdmin:{
        type: Boolean,
        default:false,
    }
    
})

var Model = mongoose.model('User', ModelSchema)

module.exports = Model