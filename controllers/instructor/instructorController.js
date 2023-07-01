const Instructor = require('../../models/instructor');

exports.createInstructor = async (req, res) => {
    try {
      const instructor = await Instructor.findOne({ email: req.body.email });

      if (instructor) {
        console.log("startdate",req.body.experiences[0].start_date)
        // If the instructor already exists, add the new experience to their previous ones
        instructor.experiences.push({
          institute: req.body.institute,
          start_date: new Date(req.body.start_date),
          end_date: new Date(req.body.end_date),
          current: req.body.current,
          subjects: req.body.subjects
        });

        await instructor.save();

        res.status(200).json({ success: true, message: 'Instructor experience added successfully.' });
      } else {

        console.log("startdate",req.body.experiences[0].start_date)
        // If the instructor does not exist, create a new one with the provided experience
        const newInstructor = new Instructor({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          experiences: [{
            institute: req.body.institute,
            start_date: new Date(req.body.start_date),
            end_date: new Date(req.body.end_date),
            current: req.body.current,
            subjects: req.body.subjects
          }]
        });

        await newInstructor.save();

        res.status(200).json({ success: true, message: 'Instructor registered successfully.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }



