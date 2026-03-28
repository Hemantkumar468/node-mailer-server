import http from "http";
import fs from "fs";
import EventEmitter from "events";
import nodemailer from "nodemailer";

// v) Custom Event Class
class CustomEvent extends EventEmitter {
  mailSent(email) {
    this.emit("mailSent", email);
  }
}

const customEvent = new CustomEvent();

// ii) Server Implementation
const server = http.createServer((req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj", // Note: Gmail security might still block this without App Password
    },
  });

  if (req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        // ii) Extract user's name, email, and message
        const { name, email, message } = JSON.parse(data);
        const queryString = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

        // iii) Append data asynchronously
        fs.appendFile("queries.txt", queryString, (err) => {
          if (err) {
            console.error("Error writing to queries.txt:", err);
          } else {
            console.log("Query successfully appended to queries.txt");
          }
        });

        // iv) Nodemailer mailOptions
        const mailOptions = {
          from: "codingninjas2k16@gmail.com",
          to: email,
          subject: "Query received",
          text: "We have received your query and will get back to you soon.",
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error.message);
          } else {
            // v) Emit "mailSent" event
            customEvent.mailSent(email);
          }
        });

        res.end("Query received");
      } catch (error) {
        res.statusCode = 400;
        res.end("Invalid JSON data");
      }
    });
  } else {
    res.end("Welcome to Coding Ninjas!");
  }
});

// Listener function
const Solution = () => {
  customEvent.addListener("mailSent", (email) => {
    console.log("custom event 'mailSent' emitted");
    console.log(
      `confirming that the email has been sent successfully to ${email}`
    );
  });
};

export default server;
export { server, CustomEvent, Solution };