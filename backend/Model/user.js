const mongoose = require('mongoose');

// Define BusStation schema
const  userSchema = new mongoose.Schema({
    Usr_name:{type:"string",required:"true"},
    Usr_email:{type:"string",required:"true"},
    Usr_phone:{type:"number",required:"true"},
    Usr_address:{type:"string",required:"true"},
    Usr_pass:{type:"string",required:"true"},
    role:{type:"string",required:"true"},

},
{
  collection: 'user',timestamps: true,
});

// Create BusStation model
const User= mongoose.model('user', userSchema);

module.exports = User
