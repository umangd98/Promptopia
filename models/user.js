import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'Email already exists'],
    },
    username: {
        type: String,
        required: [true, 'Please provide an username'],
        unique: [true, 'username already exists'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
       
    },
    }
)

/**
 * Creates a User model if it doesn't exist, or returns the existing User model.
 * @param {Object} models - The models object.
 * @param {Object} userSchema - The user schema.
 * @returns {Object} - The User model.
 */
const User = models.User || model('User', userSchema)

export default User