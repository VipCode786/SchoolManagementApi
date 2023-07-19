const Institute = require('../../models/institute');
const AppErrors = require('../../utils/errorss/appError');
const catchAsync = require('../../utils/errorss/catchAsync');

exports.createInstitute = catchAsync(async (req, res,next) => {

  const {
    instituteName,
    email,
    phone,
    password,
    address
  } = req.body
   
        // Check if an institute with the same name and address exists
        const existingInstitute = await Institute.findOne({
          $or: [
            { instituteName: instituteName,},
            { phone: phone },
            { email: email,
            }
          ]
        });

        console.log("Existing existingInstitute ", (existingInstitute))
        if (existingInstitute) {
           return next(new AppErrors(300, 'Institute Already Registered'));
          // return next(new AppErrors(400, 'Invalid Email')); 
        //  return res.status(400).json({ message: 'An institute with the same name, address, phone or email already exists.' });
        }
    else{
        // Create a new institute
        const institute = new Institute({
          instituteName,
          email,
          phone,
          password,
          address
         
        });
    
        // Save the institute to the database
        await institute.save();
        res.status(201).json({message:"Institute Created"});
    }
     
})

exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.json(institute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInstitute = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    institute.name = req.body.name;
    institute.address = req.body.address;
    institute.phone = req.body.phone;
    institute.email = req.body.email;
    // institute.courses = req.body.courses;
    await institute.save();
    res.json(institute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteInstitute = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    await institute.remove();
    res.json({ message: 'Institute deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
