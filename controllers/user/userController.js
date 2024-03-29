const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Parent = require('../../models/parent');
const Admin = require('../../models/admin');
const Instructor = require('../../models/instructor');
const Student = require('../../models/user');
const  {generateToken}   = require('../../utils/autorization/autorization');
const Agent = require('../../models/agent');
const catchAsync = require('../../utils/errorss/catchAsync');

// exports.registerUser = async (req, res) => {
//   const { email, phone, password, role, currentInstitute } = req.body;

//   try {
//     // Check if the provided email or phone already exists in the respective collections
//     let existingUser;
//     if (role === 'Parent') {
//       existingUser = await Parent.findOne({ $or: [{ email }, { phone }] });
//     } else if (role === 'Admin') {
//       existingUser = await Admin.findOne({ $or: [{ email }, { phone }] });
//     } else if (role === 'Instructor') {
//       existingUser = await Instructor.findOne({ $or: [{ email }, { phone }] });
//     } else if (role === 'Student') {
//       existingUser = await Student.findOne({ $or: [{ email }, { phone }] });
//     }

//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists.' });
//     }

//     // Hash the password
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user record in the User collection
//     const newUser = new User({
//       email,
//       phone,
//       password,
//       role,
//       currentInstitute
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

exports.registerUser= catchAsync (async (req, res) => {
    const { email, password, phone, role  } = req.body;

    // Check if the user exists in the relevant schema
    let existingUser;
    switch (lowerCase(role)) {
      case 'parent':
        existingUser = await Parent.findOne({ email });
        break;
      case 'student':
        existingUser = await Student.findOne({ email });
        break;
      case 'instructor':
        existingUser = await Instructor.findOne({ email });
        break;
      case 'agent':
        existingUser = await Agent.findOne({ email });
        break;
      default:
        // return res.status(400).json({ message: 'Invalid userType' });
       return  next(new AppErrors(400, 'Invalid userType'));
      }

    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist in the relevant schema' });
    }

    // User exists, proceed with registration
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password,
      phone,
      role,
      userId:existingUser._id,
      // address,
      // userType,
      // instituteIds,
      // userSchemaType: userType,
      // originalUserId: existingUser._id,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
 
})

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user based on the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Compare the provided password with the stored password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Generate a JWT token
      // const token = jwt.sign({ userId: user._id }, 'secretkey');
      const token = generateToken(user);
      // Determine the user role and find the corresponding document
      let userData;
      if (user.role === 'Parent') {
        userData = await Parent.findById(user.userId);
      } else if (user.role === 'Admin') {
        userData = await Admin.findById(user.userId);
      } else if (user.role === 'Instructor') {
        userData = await Instructor.findById(user.userId);
      } else if (user.role === 'Student') {
        userData = await Student.findById(user.userId);
      }
  
      if (!userData) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Return the user data and token
      res.status(200).json({ user: userData, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
