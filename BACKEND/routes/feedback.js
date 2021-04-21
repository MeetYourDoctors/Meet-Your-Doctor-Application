const router = require('express').Router();
const Feedback = require('../models/feedback');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const Channeling = require('../models/channeling');
router.route('/add').post(async (req, res) => {
    try {
        const { comment, rate, patientId, doctorId } = req.body;
        var newFeedback = new Feedback({
            comment,
            rate,
            patientId,
            doctorId
        });

//Patient can also choose the most suitable doctor by their ratings

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            res.status(400).send('Invalid DoctorId!')
            return false;
        }

        const patient = await Patient.findById(patientId);

        if (!patient) {
            res.status(400).send('Invalid patientId!')
            return false;
        }

        const newTotalRate = doctor.rating * doctor.noOfRaters + parseInt(rate);
        const newTotalRaters = doctor.noOfRaters + 1;
        const newRating = newTotalRate / newTotalRaters;

        doctor.rating = newRating;
        doctor.noOfRaters = newTotalRaters;

        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, doctor);

        if (!updatedDoctor) {
            res.status(500).send('Doctor rating updating failed!')
            return false;
        }
//// give some feedback to their doctor and view the doctor's previous feedback to the patients
        const savedNewFeedback = await newFeedback.save();

        if (!savedNewFeedback) {
            res.status(500).send('Feedback adding failed!')
            return false;
        } else {
            res.json({state:true,message:"Feedback Added Successfully.",details:savedNewFeedback});
        }
    } catch (err) {
        res.status(500).json({state:false,message:err.message || 'Internal server error!'});
    }
})

router.route('/getByDoctorId/:doctorId').get((req, res) => {
    Feedback.find({ doctorId: req.params.doctorId }).then((feedbacks) => {
        res.json(feedbacks);
    }).catch((err) => {
        res.send(err);
    });
})

// router.route('/deleteAll').delete((req, res) => {
//     Feedback.deleteMany({}).then((feedbacks) => {
//         res.json(feedbacks);
//     }).catch((err) => {
//         res.send(err);
//     });
// })

router.route('/').get((req, res) => {
    Feedback.find().then((feedbacks) => {
        res.json(feedbacks);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/:id').get((req, res) => {
    var feedbackId = req.params.id;
    Feedback.findById(feedbackId).then((feedback) => {
        res.json(feedback);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/patient/:id').get(async(req,res)=>{
    var patientId = req.params.id;
    var docArray = []; 
    const appointments = await Appointment.find({patientId:patientId});
    for(var i=0;i<appointments.length;i++)
        docArray.push(appointments[i].doctorId);
    const docList = [...new Set(docArray)];
    if(!docList.length)
        res.json({state:false,message:"You are unauthorized to give feedbacks. because you have not obtained any services from the system."});
    else{
        var findArray = [];
        for(var k=0;k<docList.length;k++){
            findArray.push({_id:docList[k]})
        }
        const doctorsfound = await Doctor.find({
            $or:findArray
        });
        res.json({state:true,details:doctorsfound});
    }
})

module.exports = router;