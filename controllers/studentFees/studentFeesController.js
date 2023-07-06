const StudentFees = require('../../models/studentFees');

// Create student fees
exports.createStudentFees = async (req, res) => {
  try {
    const { student, course, amount } = req.body;

    const newStudentFees = new StudentFees({
      student,
      course,
      amount
    });

    await newStudentFees.save();

    res.status(201).json({ success: true, message: 'Student fees created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Update student fees
exports.updateStudentFees = async (req, res) => {
  try {
    const { student, course, amount, paid, paymentDate } = req.body;

    const updatedFees = await StudentFees.findByIdAndUpdate(req.params.id, {
      student,
      course,
      amount,
      paid,
      paymentDate
    });

    if (!updatedFees) {
      return res.status(404).json({ success: false, message: 'Student fees not found.' });
    }

    res.json({ success: true, message: 'Student fees updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
