const Student = require('../../models/student.js');
const Parent = require('../../models/parent.js');

// Controller function to create a new student with parent info
const createStudent = async (req, res) => {
    const { firstName, lastName, address, className, classTeacher, parent } = req.body;
 

    Student.find({
      "firstName":firstName,
      "lastName":lastName,
    }).populate({path:"parent", match:{ $or: [{ email: parent.email }, { phone: parent.phone }] }}).then((foundStudents) => {
      // Filtered Student check exists or not
      const filteredStudent = foundStudents.filter((student) => student.parent !== null);
        console.log("foundStudent",filteredStudent)
        if (filteredStudent.length > 0) {
          res.status(409).json({
            status: 'error',
            message: 'This student is already registered',
          });
        } else {
          // Check if the parent exists in the database
          Parent.findOne({ $or: [{ email: parent.email }, { phone: parent.phone }] })
            .then((foundParent) => {
              if (foundParent) {
                // If the parent exists, create a new student record
                const newStudent = new Student({
                  firstName,
                  lastName,
                  address,
                  className,
                  classTeacher,
                  parent: foundParent._id,
                });
                newStudent.save()
                  .then((savedStudent) => {
                    res.status(201).json({ status: 'success', data: savedStudent });
                  })
                  .catch((err) => {
                    res.status(500).json({ status: 'error', message: err.message });
                  });
              } else {
                // If the parent does not exist, create a new parent record and then create a new student record
                const newParent = new Parent({
                  firstName: parent.firstName,
                  lastName: parent.lastName,
                  email: parent.email,
                  phone: parent.phone,
                  address: parent.address,
                  school: parent.school,
                });
                newParent.save()
                  .then((savedParent) => {
                    const newStudent = new Student({
                      firstName,
                      lastName,
                      address,
                      className,
                      classTeacher,
                      parent: savedParent._id,
                    });
                    newStudent.save()
                      .then((savedStudent) => {
                        res.status(201).json({ status: 'success', data: savedStudent });
                      })
                      .catch((err) => {
                        res.status(500).json({ status: 'error', message: err.message });
                      });
                  })
                  .catch((err) => {
                    res.status(500).json({ status: 'error', message: err.message });
                  });
              }
            })
            .catch((err) => {
              res.status(500).json({ status: 'error', message: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ status: 'error', message: err.message });
      });
    
};

const updateStudent = async(req, res) => {
  const id = req.params.id;
  const update = req.body;
  
  Student.findOneAndUpdate({ _id: id }, update, { new: true })
    .populate('parent')
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student updated', data: student });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};


module.exports = { createStudent,updateStudent };
