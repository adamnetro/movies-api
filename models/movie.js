const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
    name: {
        type:String,
        rerquired:true,
        maxlenght: 17
    },
    category: {
        type:String,
        rerquired:true,
    },
    description: {
        type:String,
        rerquired:true,
    },
    rate: {
        type:Number,
        default:0,
    },
    reviews : {
        type: [{
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            comment: String,
            rate:Number
        }],
        default: []
    }
    
}, {
    timestamps: true
})


ModelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

var Model = mongoose.model('Movie', ModelSchema)

module.exports = Model