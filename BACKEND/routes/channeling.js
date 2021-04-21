const router = require('express').Router();
const Channeling = require('../models/channeling');
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
router.route('/add').post(async (req, res) => {
    const { appointmentId } = req.body;
    try {
        const appoint = await Appointment.findById(appointmentId);
        const approve = true;
        const patientId = appoint.patientId;
        const doctorId = appoint.doctorId;
        const zoomLink = req.body.zoomLink;
        var newChanneling = new Channeling({
            appointmentId,
            approve,
            patientId,
            doctorId,
            zoomLink,
        });
        await newChanneling.save().then((channeling) => {
            res.json({ state: true, message: "Channeling adeded successfully completed.", details: channeling });
        }).catch((err) => {
            res.json({ state: false, message: "Something's wrong with adding the channel! Please Try again later.", err: err });
        });
    } catch {
        res.json({ state: false, message: "Internal server error! Try again later." })
    }
})

router.route('/').get((req, res) => {
    Channeling.find().then((channelings) => {
        res.json({ state: true, details: channelings });
    }).catch((err) => {
        res.json({ state: false, err: err });
    });
})



router.route('/delete/:id').delete((req, res) => {
    var channelingId = req.params.id;
    Channeling.findByIdAndDelete(channelingId).then((channeling) => {
        res.json({ state: true, message: "Channeling successfully deleted.", details: channeling });
    }).catch((err) => {
        res.json({ state: false, message: "Something's wrong with deleting the channel! Please Try again later.", err: err });
    });
})

router.route('/:id').get((req, res) => {
    var channelingId = req.params.id;
    Channeling.findById(channelingId).then((channeling) => {
        res.json({ state: true, details: channeling });
    }).catch((err) => {
        res.json({ state: false, err: err });
    });
})

router.route('/doctor/:id').get(async(req, res) => {
    var doctorId = req.params.id;
    var channels =[];
    const channelings = await Channeling.find({doctorId:doctorId});
    if(!channelings.length)
        res.json({state:false,message:"No any channelings available!"});
    else{
        for(var i=0;i<channelings.length;i++){
        var appointments = await Appointment.findById(channelings[i].appointmentId);
            channels.push({id:channelings[i]._id,date:appointments.date,time:appointments.time,approve:channelings[i].approve});
        }
        res.json({state:true,details:channels});
    }
})

router.route('/patient/:id').get(async(req, res) => {
    var patientId = req.params.id;
    var channels = [];
    const channelings = await Channeling.find({
        $and:[
            {patientId:patientId},
        ]
    });
    if(!channelings.length)
        res.json({state:false,message:"You have not channelings available!"});
    else{
        for(var i=0;i<channelings.length;i++){
            var appointments = await Appointment.findById(channelings[i].appointmentId);
            var doctors = await Doctor.findById(channelings[i].doctorId);
            channels.push({doctorName:doctors.name,date:appointments.date,time:appointments.time,zoomLink:channelings[i].zoomLink,channelId:channelings[i]._id,appointmentId:appointments._id});
        }
        res.json({state:true,details:channels});
    }
})

router.route('/appointment/:id').get(async (req, res) => {
    var patientId = req.params.id;
    const appoints = [];
    const appointments = await Appointment.find({ patientId: patientId });
    if (!appointments.length)
        res.json({ state: false, message: "You have to make appointment before channeling doctor!" });
    else {
        for (var i = 0; i < appointments.length; i++) {
            var doctors = await Doctor.findById(appointments[i].doctorId);
            appoints.push({ appointmentId: appointments[i]._id, doctorName: doctors.name, date: appointments[i].date, time: appointments[i].time });
        }
            res.json({state:true,details:appoints});
    }
})

module.exports = router;