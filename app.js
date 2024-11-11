const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB Atlas connection URI - replace <username>, <password>, and <dbname> with your MongoDB credentials.
const mongoURI = 'mongodb+srv://vanganataraj787:sC40DzgcZylet3aB@ex-pro.3x3dv.mongodb.net/?retryWrites=true&w=majority&appName=ex-pro';

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Middleware to parse JSON data
app.use(express.json());

// Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model('User', userSchema);

// GET endpoint to retrieve users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all documents in the "users" collection
        res.json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// POST endpoint to add a new user
app.post('/users', async (req, res) => {
    try {
        // Create a new user with the data from the request body
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        });
        
        // Save the new user document in MongoDB
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
