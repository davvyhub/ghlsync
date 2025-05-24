📦 GoHighLevel Contact Sync Bot
This Node.js app syncs contacts from all GoHighLevel sub-accounts (locations) under an agency, and pushes new contacts to a NoCodeBackend database. It's designed to run automatically on a schedule via a cron job.

🚀 Features
🔐 OAuth 2.0 and Agency Token authentication with GoHighLevel

📥 Fetch contacts from all sub-accounts (locations)

🔍 Detect newly added contacts using a local cache

📤 Push new contacts to a NoCodeBackend table via REST API

⏱️ Runs on a schedule with node-cron

💾 Uses .env file for secure credential management

📁 Folder Structure
bash
Copy
Edit
gohighlevel-cron-sync/
│
├── config/                # Environment variable wrapper
├── services/              # API logic for GHL and NoCodeBackend
├── database/              # JSON cache for last synced contacts
├── jobs/                  # Scheduled cron job logic
├── utils/                 # Logger (optional)
├── .env                   # (Ignored) Your sensitive tokens
├── .env.example           # Safe to share - sample .env
├── .gitignore             # Git exclusions
├── index.js               # App entry point
└── README.md              # This file
⚙️ Setup Instructions
Clone the repo

bash
Copy
Edit
git clone https://github.com/davvyhub/ghlsync.git
cd ghlsync
Install dependencies

bash
Copy
Edit
npm install
Create your .env file

Duplicate the example:

bash
Copy
Edit
cp .env.example .env
Then, edit .env and fill in:

env
Copy
Edit
GHL_CLIENT_ID=your-ghl-client-id
GHL_CLIENT_SECRET=your-ghl-client-secret
GHL_REDIRECT_URI=https://your-redirect-uri.com
GHL_AGENCY_TOKEN=your-ghl-agency-token
NOCODEBACKEND_API_URL=https://api.nocodebackend.com/create/contact_details
NOCODEBACKEND_API_KEY=your-nocodebackend-token
🔐 Important: Do not share your .env. It is ignored by Git automatically.

Run the app

bash
Copy
Edit
npm start
You should see messages every few minutes when the cron job runs.

🛠 How It Works
The cron job runs every 10 minutes (*/10 * * * *) by default.

Each run:

Lists all GHL locations under your agency

Fetches all contacts per location

Compares them to the last synced cache

Pushes only the new ones to NoCodeBackend

✅ Requirements
Node.js 16+

A GoHighLevel Agency Account

A developer app in GHL with the correct scopes

A NoCodeBackend database and table created with the proper schema

✍️ Contributing
Feel free to fork and PR improvements.

Add webhook support for real-time sync

Add email alerting on sync failures

Extend custom field mapping

📄 License
MIT © 2025 [Your Name or Company]