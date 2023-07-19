const Agent = require('../../models/agent');
const catchAsync = require('../../utils/errorss/catchAsync');
const AppErrors = require('../../utils/errorss/appError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../utils/autorization/autorization')

// GET /agent
exports.getAgents = async (req, res) => {
  try {
    // Retrieve all agents from the database
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /agent/:id
exports.getAgentById = (async (req, res) => {
  try {
    const { id } = req.params;
    // Find a user by ID in the database
    const agent = await Agent.findById(id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /agent
// exports.createAgent = catchAsync( async (req, res, next) => {

//   //try {
//     const {
//       firstName,
//       middleName,
//       lastName,
//       email,
//       phone,
//       password,
//       isVerified,
//       isSuperAdmin,
//       address

//     } = req.body;

//     //Create a new agent record
//     const newAgent = new Agent({
//       firstName,
//       middleName,
//       lastName,
//       email,
//       phone,
//       password: bcrypt.hashSync(req.body.password, 8),
//       isVerified,
//       isSuperAdmin,
//       address
//     });

//     // Save the agent to the database
//   await newAgent.save()

//   res.status(200).json({ message: 'Agent Created successfully' });
//   // } catch (error) {
//   //   console.error(error);

//   //     res.status(409).json({ message: error.message });

//   // }
// });


exports.createAgent = catchAsync(async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    isVerified,
    isSuperAdmin,
    address
  } = req.body;

  const newAgent = new Agent({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    isVerified,
    isSuperAdmin,
    address
  });
  // password: bcrypt.hashSync(req.body.password, 8),
   const createdAgent = await newAgent.save();
   res.locals.createdAgent = { _id: createdAgent._id };
    // console.log("res.locals.createdAgent controller---------------", res.locals.createdAgent);
  res.status(200).json({ message: 'Agent Created successfully' });
});


// PUT /agent/:id
exports.updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
      isVerified,
      isSuperAdmin,
      address
    } = req.body;

    // Find the user by ID in the database
    const user = await Agent.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Update the user's data
    user.firstName = firstName;
    user.middleName = middleName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.isVerified = isVerified;
    user.isSuperAdmin = isSuperAdmin;
    user.address = address;

    // Save the updated user to the database
    await Agent.save();

    res.status(200).json({ message: 'Agent updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /agent/:id
exports.deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the agent by ID in the database and delete it
    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.updateAssignInstitutes = catchAsync( async (req, res) => {
  
  console.log("req.body",req.body);
    const { agentId, instituteIds } = req.body;
    console.log("agentId",agentId);
    console.log("instituteIds",instituteIds)
    // Update the assignInstitutes field of the agent document
    const result = await Agent.updateOne(
      { _id: agentId },
      { $push: { assignInstitutes: { $each: instituteIds } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ message: 'Assign institutes updated successfully' });
 
});


// PUT /agent/:id
// exports.assignInstituteToAgent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       firstName,
//       middleName,
//       lastName,
//       email,
//       phone,
//       password,
//       isVerified,
//       isSuperAdmin,
//       address
//     } = req.body;

//     // Find the user by ID in the database
//     const user = await Agent.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'Agent not found' });
//     }

//     // Update the user's data
//     user.firstName = firstName;
//     user.middleName = middleName;
//     user.lastName = lastName;
//     user.email = email;
//     user.phone = phone;
//     user.password = password;
//     user.isVerified = isVerified;
//     user.isSuperAdmin = isSuperAdmin;
//     user.address = address;

//     // Save the updated user to the database
//     await Agent.save();

//     res.status(200).json({ message: 'Agent updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



// @route POST /api/login
// @desc Login Agent
// @access Public
exports.login = catchAsync(async (req, res,next) => {
  const { email, password } = req.body;

  // Find the agent based on email
  const agent = await Agent.findOne({ email });

  // Check if agent exists
  // if (!agent) {
  //   return next(new AppErrors(400, 'Invalid Email'));  }

    if (!agent) return next(new AppErrors(400, 'Invalid Email'));

  // Compare the provided password with the hashed password in the database
  const isPasswordMatch = await bcrypt.compare(password, agent.password);

  if (!isPasswordMatch) {
    return next(new AppErrors(400, 'Invalid Password'));  }

  // Password is correct, generate a JWT token
  const token = generateToken(agent);

  // Return the token in the response
  res.status(200).json({ token });
 
});

