const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/student/studentRoutes');
const instituteRoutes = require('./routes/institute/instituteRoutes')
const instructorRoutes = require('./routes/instructor/instructorRoutes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

app.use(express.json());
connectDB()
// mongoose.connect(DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  
// })
//   .then(() => {
//     console.log('Connected to database');
//   })
//   .catch((error) => {
//     console.error(`Database connection error: ${error}`);
//   });

app.use('/api/students', studentRoutes);
app.use('/api/institute',instituteRoutes);
app.use('/api/instructor',instructorRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
