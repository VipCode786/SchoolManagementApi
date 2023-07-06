const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/student/studentRoutes');
const instituteRoutes = require('./routes/institute/instituteRoutes')
const instructorRoutes = require('./routes/instructor/instructorRoutes');
const timeTableRoutes = require('./routes/timeTable/timeTableRoutes');
const leaveRequestRoutes = require('./routes/leaveRequest/leaveRequest')
const studentFeesRoutes = require('./routes/studentFees/studentFees')
const instructorPaymentRoutes = require('./routes/instructor/instructorPayement')
const homeWorkRoutes = require ('./routes/homeWork/homeWork')



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
app.use('/api/timetable',timeTableRoutes)
app.use('/api/leaveRequest',leaveRequestRoutes)
app.use('/api/studentFees',studentFeesRoutes)
app.use('/api/instructorPayment',instructorPaymentRoutes)
app.use('/api/assignWorkToStudent',homeWorkRoutes)


app.use('/', (req, res) => {
  res.send("Your Server is ready");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
