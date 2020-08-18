const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://agilan-pro.firebaseio.com"
});

var db = admin.database();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'agilanvlr2001@gmail.com',
        pass: 'tlbehdowmlmiqsda'
    }
});


exports.sendMsg = functions.https.onRequest((req, res) => {
    db.ref("messages").push(req.body, function () {
        res.status(200).send("DONE");
    })

    var mailOptions = {
        from: 'agilanvlr2001@gmail.com',
        to: 'agilanvlr2001@gmail.com',
        subject: 'Agilan Pro MESSAGE NOTIFICATION',
        html: `${req.body.name || 'Someone'} has sent a Message.<br><br>
        Phone: ${req.body.tel}<br>
        Mail: ${req.body.mail}<br>
        Message: ${req.body.msg}`
    };
    transporter.sendMail(mailOptions);

});
