🚀 Node.js Query Handler & Email Automator
A robust Node.js backend server designed to handle user queries via POST requests, log data asynchronously, and automate email confirmations using Nodemailer and Custom Events.

📝 Project Overview
Is project ka main objective ek aisa server banana tha jo user se contact information (Name, Email, Message) receive kare, use local database (file) mein save kare, aur successfully process hone par ek automation mail trigger kare.

✨ Key Features
Custom HTTP Server: Built using the native http module to handle incoming POST requests on Port 5000.

Asynchronous File Logging: User queries are extracted and appended to a queries.txt file using the fs module without blocking the main thread.

Email Automation: Integrated Nodemailer to send instant confirmation emails to users upon query submission.

Event-Driven Architecture: Utilizes the EventEmitter class to emit a custom "mailSent" event, ensuring a decoupled and clean code structure.

🛠️ Tech Stack
Runtime: Node.js (ES6+ Modules)

Core Modules: http, fs (File System), events (EventEmitter)

Library: nodemailer

📋 Objectives Achieved
Implemented a Node.js server to handle POST requests.

Extracted and parsed JSON data from the request body.

Logged data asynchronously to maintain server performance.

Configured a secure SMTP transporter for email delivery.

Emitted a custom event to confirm delivery in the console logs.

🔧 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/node-email-query-handler.git
Install dependencies:

Bash
npm install
Add your credentials (App Password) in the transporter config.

Start the server:

Bash
npm start
