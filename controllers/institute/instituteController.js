const Institute = require('../../models/institute');

exports.createInstitute = async (req, res) => {

    
    try {
        // Check if an institute with the same name and address exists
        const existingInstitute = await Institute.findOne({
          $or: [
            { name: req.body.name, address: req.body.address },
            { phone: req.body.phone },
            { email: req.body.email }
          ]
        });
        if (existingInstitute) {
          return res.status(400).json({ message: 'An institute with the same name, address, phone or email already exists.' });
        }
    else{
        // Create a new institute
        const institute = new Institute({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
          courses: req.body.courses
        });
    
        // Save the institute to the database
        await institute.save();
        res.status(201).json(institute);
    }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
};

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
    institute.courses = req.body.courses;
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
