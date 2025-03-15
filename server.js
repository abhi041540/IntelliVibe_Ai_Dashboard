import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import fs from "fs";
import ejs, { name } from "ejs";
import crypto from "crypto";
const key = process.env.KEY || "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";
const dburl = "mongodb+srv://abhi:ltsgo952102@ltsgo.664dq.mongodb.net/intellivibe?retryWrites=true&w=majority&appName=ltsgo"
function connectDb() {
    try {
        mongoose.connect(dburl);
    }
    catch (e) {
        console.error(e);
    }

}
connectDb();
const dbschima = new mongoose.Schema({
    email: String,
    password: String,
    key: String,
    name:String
});
const userapi = mongoose.model("intellivibe_users", dbschima);
const app = express();
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"], // Allow data URIs for images
        frameSrc: ["'self'"], // Prevent framing from other origins
        connectSrc: ["'self'"], // Restrict allowed origins for XMLHttpRequest and Fetch
    },
}));

app.use(helmet.xssFilter()); // Enable XSS protection
app.use(helmet.frameguard({ action: 'deny' })); // Prevent clickjacking
app.use(helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Optional: include subdomains
    preload: true, // Optional: enable HSTS preload
}));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.dnsPrefetchControl({ policy: 'off' }));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/intellivibe/chat", async (req, res) => {
    const text = await req.body.chat;

    fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "google/gemini-2.0-pro-exp-02-05:free",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": `${text}`
                        }
                    ]
                }
            ]
        })
    })
        .then(response => response.json())
        .then(data => {
            res.status(200).json(data.choices[0].message.content.replaceAll("by Google", "by Abhishek Jain")?.replaceAll("Google के","Intellivibe के")?.replaceAll("गूगल के","Intellivibe के")?.replaceAll("large language", "IntelliVibe Ai")?.replaceAll("at Google", "of InteliVibe(Founder: Abhishek jain)")?.replaceAll("Google dwara", "Abhishek Jain dwara")?.replaceAll("google dwara", "Abhishek Jain dwara")?.replaceAll("Google AI", "IntelliVibe AI")?.replaceAll("jise Google", "jise Abhishek Jain")?.replaceAll("Google is my", "Abhishek Jain is my")?.replaceAll("mujhe Google ne", "mujhe Abhishek Jain ne")?.replaceAll("bada bhasha model", "IntelliVibe Ai model")?.replaceAll("mujhe google ne", "mujhe Abhishek Jain ne")?.replaceAll("google द्वारा", "Abhishek Jain द्वारा")?.replaceAll("गूगल द्वारा", "Abhishek Jain द्वारा")?.replaceAll("गूगल वालों","Intellivibe वालों (abhishek jain)")?.replaceAll("Google वालों","Intellivibe वालों (abhishek jain)")?.replaceAll("गूगल वाले","IntelliVibe वाले")?.replaceAll("Google वाले","IntelliVibe वाले")?.replaceAll("गूगल के ज़बरदस्त","IntelliVibe के ज़बरदस्त")?.replaceAll("naam gemini", "naam IntelliVibe AI")?.replaceAll("मेरा नाम गूगल द्वारा प्रशिक्षित ", "mera naam  Abhishek jain द्वारा प्रशिक्षित IntelliVibe Ai modal")?.replaceAll("गूगल असिस्टेंट", "IntelliVibe AI")?.replaceAll("बड़ा भाषा मॉडल", "IntelliVibe AI model")?.replaceAll("गूगल ने बनाया", "Abhishek jain ने बनाया")?.replaceAll("गूगल (Google)", "Intellivibe")?.replaceAll("गूगल ने", "Abhishek Jain ने")?.replaceAll("Google's servers", "IntelliVibe's servers")?.replaceAll("google ने", "Abhishek Jain ने")?.replaceAll("Google ने", "Abhishek Jain ने"));
        })
        .catch(error => {
          
            res.status(200).json("I'd really like to help, but it seems this topic is off-limits for me. Sorry about that!");
        });
});

app.put("/login/api", async (req, res) => {
    const email = await req.body.email;
    const password = await req.body.password;
    await userapi.find({ email: email, password: password }).then((resp) => {
        if (resp.length != 0) {
            res.send(resp[0].key);
        }
        else {
            res.send("No User Found!");
        }
    });

});
app.post("/signup/api/email", async (req, res) => {
    const email = await req.body.email;
    const otp = req.body.otp;
    const name = req.body.name;
    await userapi.find({ email: email }).then((resp) => {
        if (resp.length == 0) {


            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tellyking15@gmail.com',
                    pass: 'mnwbweyfpbojwhdt'
                }
            });
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const templatePath = path.join(__dirname, "views", "email.ejs");
            const template = fs.readFileSync(templatePath, 'utf-8');
            const htmlContent = ejs.render(template, { name: name, otp: otp, year: new Date().getFullYear() });

            const mailOptions = {
                from: 'tellyking15@gmail.com',
                to: email,
                subject: 'IntelliVibe AI OTP Verification',
                html: htmlContent
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.send("Issue In Sending Email!");
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
                res.send("otp sent");
            });

        }
        else {

            res.send("User Exist Try To Login!");

        }
    })

});
app.post("/signup/savedata", async (req, res) => {
   const type=req.body.type;
   if(type==1)
   {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const key = crypto.randomBytes(32).toString("hex");

        await new userapi({ email, name, password, key }).save();
        res.send("Signup Successfully");
    } catch (err) {
        console.error("Error:", err); 
        res.send("Signup Failed");
    }
   }
   else
   {
    try {
        const email = req.body.email;
        const password = req.body.password;

       userapi.updateOne({email:email},{$set:{password:password}}).exec();
        res.send("Password Changed Successfully");
    } catch (err) {
        console.error("Error:", err); 
        res.send("Request Failed");
    }
   }
});

app.post("/change/api/email", async (req, res) => {
    const email = await req.body.email;
    const otp = req.body.otp;
    const name = req.body.name;
    await userapi.find({ email: email }).then((resp) => {
        if (resp.length != 0) {


            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tellyking15@gmail.com',
                    pass: 'mnwbweyfpbojwhdt'
                }
            });
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const templatePath = path.join(__dirname, "views", "email.ejs");
            const template = fs.readFileSync(templatePath, 'utf-8');
            const htmlContent = ejs.render(template, { name: name, otp: otp, year: new Date().getFullYear() });

            const mailOptions = {
                from: 'tellyking15@gmail.com',
                to: email,
                subject: 'IntelliVibe AI OTP Verification',
                html: htmlContent
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.send("Issue In Sending Email!");
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
                res.send("otp sent");
            });

        }
        else {

            res.send("No User Found Try To Signup!");

        }
    })

});
const port = process.env.PORT || "3001";
app.listen(`${port}`, () => { console.log("intellivibe server started") });
