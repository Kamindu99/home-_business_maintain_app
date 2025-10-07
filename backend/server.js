const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());

const PORT = 8000;
const DB_URL = 'mongodb+srv://Kamindu_99:123@mernapp.ffeez.mongodb.net/home_app_db?retryWrites=true&w=majority&appName=mernApp';
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('DataBase Connected Successful');
    })
    .catch((err) => console.log('DataBase Connection Error', err));

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

const teaDaluRoute = require('./routes/TeaDaluRoutes');
app.use("/api/v1/home-business-management/tea-collection", teaDaluRoute);

const userAuth = require('./routes/UserRoutes');
app.use("/api/v1/home-business-management/auth", userAuth);

// const category = require('./routes/CategoryRoutes');
// app.use("/api/v1/parameter-management/category", category);

// const sendMail = require('./routes/SendMailRoutes');
// app.use("/api/v1/home-business-management/send-mail", sendMail);

// const holidayCalandar = require('./routes/SystemCalandarRoutes');
// app.use("/api/v1/parameter-management/holiday", holidayCalandar);

// const cronJobs = require('./cronJobs');
// app.use("/api/v1/cron-jobs", cronJobs);