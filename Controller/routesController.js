const route = require('express').Router();
const mongoose = require('mongoose');

const exerciseSchema = require('../Model/ExercisePortal.js')(mongoose);
const exerciseTracker = new mongoose.model('exercisetracker', exerciseSchema);

route.get('/', (req, res) => {
    res.send({ message: 'hello from server' });
});


route.get('/getactivities', async (req, res) => {
    var activities = await exerciseTracker.find();
    res.send({ data: activities });
});


route.post('/addactivity', async (req, res) => {
    const addActivity = new exerciseTracker({
        name: req.body.name,
        description: req.body.description,
        activityType: req.body.activityType,
        duration: req.body.duration,
        date: req.body.date
    });

    const result = await addActivity.save();
    res.send({ message: 'data added' });
});

route.post('/updateactivity', async (req, res) => {
    const _id = req.body._id;
    const updateactivity = await exerciseTracker.findByIdAndUpdate({ _id },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                activityType: req.body.activityType,
                duration: req.body.duration,
                date: req.body.date
            }
        },
        { new: true });
    res.send({message: 'activity updated'});

});

route.delete('/deleteactivity', async (req, res) => {
    const _id = req.body._id;
    var user = await exerciseTracker.deleteOne({ _id });
    res.send({ message: "activity deleted successfully" });
})

route.delete('/deleteall', async (req, res) => {
    var user = await exerciseTracker.deleteMany();
    res.send({ message: "all activities deleted successfully" });
});

module.exports = route;