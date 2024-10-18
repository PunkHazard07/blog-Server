const express = require('express');
const User = require('../models/User');
const router = express.Router();

//fetch all user endpoint
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users});
    } catch (error) {
        res.json({message: error})
    }
});
//create new user
router.post('/create-user', async (req, res) => {
    //create user using the model
    const {firstName, lastName, email, phoneNumber} = req.body;
    //creating the user
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber
        })
        const savedUser = await user.save();
        res.status(201).json({success: true, data: savedUser})
    } catch (error) {
        res.json({message: error})
    }
})

// router.post('/create-users', async (req, res) => {
//     const users = req.body; // Expecting an array of user objects

//     if (!Array.isArray(users) || users.length === 0) {
//         return res.status(400).json({ success: false, message: "No users provided or invalid data format" });
//     }

//     try {
//         // Use Promise.all to handle all asynchronous save operations
//         const savedUsers = await Promise.all(users.map(userData => {
//             const { firstName, lastName, email, phoneNumber } = userData;
//             const user = new User({ firstName, lastName, email, phoneNumber });
//             return user.save();
//         }));

//         return res.status(201).json({ success: true, data: savedUsers });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// });

//update User endpoint


//exporting the module
module.exports = router;