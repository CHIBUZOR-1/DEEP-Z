const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: function() { return !this.googleId; }
    },
    lastname: {
        type: String,
        required: function() { return !this.googleId; }
    },
    username: {
        type: String,
        required: function() { return !this.googleId; }
    },
    phoneNumber: {
        type: String,
        required: function() { return !this.googleId; }
    },
    email: {
        type: String,
        unique: true,
        required: function() { return !this.googleId; }
    },
    profileImg: {
        type: String,
        default: 'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'
    },
    role: {
        type: String,
        default: "GENERAL"
    },
    password: {
        type: String,
        required: function() { return !this.googleId; }
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true // Allows for multiple null values 
    }
}, {
    timestamps: true,
    minimize: false
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;