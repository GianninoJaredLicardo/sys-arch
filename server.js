const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

// This line is why your images and CSS work. 
// It tells Express to look inside the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

// FIX 1: Root Route (Home/Login)
// This makes http://localhost:3000/ work.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// FIX 2: Simple Register Route
// This makes the <a href="/register"> in your navbar work.
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Handle the Form Submission
app.post('/register', (req, res) => {
    const { id_number, first_name, course } = req.body;
    
    // Kept your log so you can see the data in your terminal
    console.log(`New Student: ${first_name} (${id_number})`);

    // ADDED: This sends the user back to the login page automatically
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));