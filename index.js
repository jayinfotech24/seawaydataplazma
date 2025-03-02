import  fapp  from "./firebase.js"
import { getFirestore,collection,addDoc,Timestamp } from "firebase/firestore";
// import { getDatabase,ref,onValue } from "firebase/database";
import  express  from "express";
import cors from "cors";
import axios from "axios";

const cloudDb = getFirestore(fapp);

const collectContactUs = collection(cloudDb, "contactForm");

const my_email_api_key = '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'
const sender_email = 'jayinfotech24@gmail.com'
const receiver_email = 'seawayelectrotech@gmail.com'

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res) => {
    res.redirect("https://seawayelectrotech.com/");
})

// contact form
app.post('/contact', async (req, res) => {
    const { name, email, phone_number, company, message } = req.body;

    // Validate the incoming data
    if (!name || !email || !phone_number || !company || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Prepare the data to be added to Firestore
        const contactData = {
            name,
            email,
            phone_number,
            company,
            message,
            submitted: Timestamp.now(),
        };

        // Add the contact form data to Firestore
        await addDoc(collectContactUs, contactData);


        let html = `<div>
        <h1 style="text-align: center; color: #F25A23;">New Contact</h1>
        <div>
            <ul style="list-style-type: none;font-size: 15px;">
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone no:</strong> ${phone_number}</li>
                <li><strong>Company:</strong> <br> ${company}</li>
                <li><strong>Message:</strong> <br> ${message}</li>
            </ul>
        </div>

        <div style="margin-top: 100px;">
            <ul style="list-style-type: none;font-size: 15px;">
                <li>This is an Auto-generated email please don't replay this email!</li>
            </ul>
        </div>
    </div>`

        sendEmailToOwner(`NoReply: Seaway Electrotech: New Contact ${new Date().toISOString()}`,`${name} Has Submitted a Contact form on Your Website`,html)

        // Send success response
        res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ message: "An error occurred while submitting the contact form" });
    }
});


function sendEmailToOwner(emaiName,subject,html) {
    const data = {
        sender: { name: emaiName, email: sender_email},
        to: [{ email: receiver_email }],
        subject: subject,
        htmlContent: html,
      };
      
      axios.post('https://api.brevo.com/v3/smtp/email', data, {
        headers: { 'api-key': my_email_api_key },
      })
}

app.listen(3000,() => {
    console.log("Listning to port 3000")
})