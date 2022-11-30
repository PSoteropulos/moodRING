const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/moodRING', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(( ) => {
    console.log('Connected to moodRING DB')
}).catch((err) => {
    console.log(err)
})