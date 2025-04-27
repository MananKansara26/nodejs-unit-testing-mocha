const mongoose = require('mongoose');
const app = require('./app');

const port = 3000;

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://127.0.0.1:27017/testdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
