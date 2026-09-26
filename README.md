Hermes Slack Bot

A lightweight custom Slack bot built with Node.js and @slack/bolt running in Socket Mode.

Tech Stack
* Node.js
* @slack/bolt (Socket Mode)
* axios
* pm2
* Hack Club Nest

Commands
* /hermes_by-shyam-ping: Checks bot latency. Example: /hermes_by-shyam-ping
* /hermes_by-shyam-catfact: Fetches a random cat fact. Example: /hermes_by-shyam-catfact
* /hermes_by-shyam-factcheck: Generates a Google search link to fact-check text. Example: /hermes_by-shyam-factcheck earth is round
* /hermes_by-shyam-find: Finds the latest channel message matching a query. Example: /hermes_by-shyam-find hello
* /hermes_by-shyam-help: Displays available commands and usage instructions. Example: /hermes_by-shyam-help

Environment Variables

Create a .env file in the root folder with the following keys:

SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
SLACK_SIGNING_SECRET=your-signing-secret

Setup and Deployment

Local Development
* Install dependencies: npm install
* Run the bot: node index.js

Production Deployment
* Install dependencies: npm install
* Install PM2 globally: npm install -g pm2
* Start the bot with PM2: pm2 start index.js --name "slack-bot"
* Save the PM2 process list: pm2 save
