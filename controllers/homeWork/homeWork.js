const Course = require("../../models/courseSchema");
const Homework = require("../../models/homeWork");
const Institute = require("../../models/institute");
const Student = require("../../models/student");

exports.createHomework = async (req, res) => {
    try {
      const { title, description, deadline, courseId, instituteId } = req.body;
  
      // Check if the course and institute exist
      const course = await Course.findOne({ _id: courseId, institute: instituteId });
      const institute = await Institute.findOne({ _id: instituteId });
  
      if (!course || !institute) {
        return res.status(404).json({ success: false, message: 'Course or institute not found.' });
      }
  
      // Get the list of students who have taken the specified course in the given institute
      const students = await Student.find({ courseId, currentInstitute: instituteId });
  
      // Create the homework document
      const homework = new Homework({
        title,
        description,
        deadline,
        courseId,
        instituteId,
        submissions: [],
      });
  
      // Assign the homework to each student
      students.forEach(student => {
        homework.submissions.push({
          studentId: student._id,
          submissionDate: null, // Initialize submission date as null
          file: '',
          status: 'pending',
        });
      });
  
      // Save the homework document
      await homework.save();
  
      res.status(201).json({ success: true, message: 'Homework created and assigned successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  };
  

  exports.updateHomework = async (req, res) => {
    try {
      const { homeworkId, studentId, submissionDate, file } = req.body;
  
      // Check if the homework exists
      const homework = await Homework.findOne({ _id: homeworkId });
  
      if (!homework) {
        return res.status(404).json({ success: false, message: 'Homework not found.' });
      }
  
      // Find the submission for the specified student
      const submission = homework.submissions.find(sub => sub.studentId.toString() === studentId);
  
      if (!submission) {
        return res.status(404).json({ success: false, message: 'Submission not found.' });
      }
  
      // Update the submission details
      submission.submissionDate = submissionDate;
      submission.file = file;
      submission.status = 'completed';
  
      // Save the updated homework document
      await homework.save();
  
      res.status(200).json({ success: true, message: 'Homework submission updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  };
  