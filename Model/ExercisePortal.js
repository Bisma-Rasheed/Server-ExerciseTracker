module.exports = (mongoose) => {
    const User = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        activityType: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    });

    return User;
}