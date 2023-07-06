const InstructorPayment = require('../../models/instructorPayment');

// Create or update instructor payment
exports.createOrUpdatePayment = async (req, res) => {
  try {
    const { instructor, amount, paymentDate } = req.body;
    
    // Check if the payment already exists for the instructor
    const existingPayment = await InstructorPayment.findOne({ instructor });

    if (existingPayment) {
      // If the payment exists, update the payment details
      existingPayment.amount = amount;
      existingPayment.paymentDate = paymentDate;

      await existingPayment.save();

      res.status(200).json({ success: true, message: 'Instructor payment updated successfully.' });
    } else {
      // If the payment does not exist, create a new payment
      const newPayment = new InstructorPayment({
        instructor,
        amount,
        paymentDate
      });

      await newPayment.save();

      res.status(201).json({ success: true, message: 'Instructor payment created successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
