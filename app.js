const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/student/studentRoutes');
const instituteRoutes = require('./routes/institute/instituteRoutes')
const instructorRoutes = require('./routes/instructor/instructorRoutes');
const timeTableRoutes = require('./routes/timeTable/timeTableRoutes');
const leaveRequestRoutes = require('./routes/leaveRequest/leaveRequestRoutes')
const studentFeesRoutes = require('./routes/student/studentFeesRoutes')
const instructorPaymentRoutes = require('./routes/instructor/instructorPayementRoutes')
const assignmentRoutes = require ('./routes/assignment/assignmentRoutes')
const userRoutes = require('./routes/user/userRoutes')
const agentRoutes = require('./routes/agent/agentRoutes')
const swagger = require('./utils/swaggersApi/swaggerApi');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swaggersApi/swaggerApi'); 
var bodyParser = require("body-parser");
//const AppErrors = require('./utils/error/appError');
const {errorApp} = require('./config/errorController');
const AppErrors = require('./utils/errorss/appError')
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
// const DB_URI = process.env.DB_URI;

// app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json()); 

app.use('/api/students', studentRoutes);
app.use('/api/institute',instituteRoutes);
app.use('/api/instructor',instructorRoutes)
app.use('/api/timetable',timeTableRoutes)
app.use('/api/leaveRequest',leaveRequestRoutes)
app.use('/api/studentFees',studentFeesRoutes)
app.use('/api/instructorPayment',instructorPaymentRoutes)
app.use('/api/assignWorkToStudent',assignmentRoutes)
app.use('/api/user',userRoutes)
app.use('/api/agent',agentRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorApp);
app.use('/', (req, res) => {
  res.send("Your Server is ready ");
});
app.listen(PORT, () => {
  console.log(`Server is listening http://localhost:${PORT}`);
});


//All umhandled routes

app.all('*', (req, res, next) => {
  next(new AppErrors(400, `Can't find ${req.originalUrl}`));
});


// handeling the unhandled Exceptions
process.on('uncaughtException', (err) => {
  console.log(`Unhandaled Exception. shutting down server`);
  console.log(`${err.name}, ${err.message}`);

  process.exit(1);
});


// handeling the unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Unhandaled rejection. shutting down server`);
  console.log(`${err.name}, ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

