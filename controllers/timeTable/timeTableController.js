const Timetable = require('../../models/timeTable');

// Create a new timetable
exports.createTimetable = async (req, res) => {
  try {
    const { institute, day, periods } = req.body;
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
      for (let dayOfMonth = 1; dayOfMonth <= getDaysInMonth(month, currentYear); dayOfMonth++) {
        const date = new Date(currentYear, month, dayOfMonth);

        const newTimetable = new Timetable({
          institute,
          day,
          date,
          periods,
        });

        await newTimetable.save();
      }
    }

    res.status(201).json({ status: 'success', message: 'Timetable saved for each day and month of the current year' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Helper function to get the number of days in a specific month of a year
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
