import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedChannel: {
        type: String,
        required: true
    },
    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model('Subscriber', subscriberSchema)