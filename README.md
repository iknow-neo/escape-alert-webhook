# Telegram Webhook Forwarder (Manus AI -> Telegram)

This small project is a template to receive webhooks (e.g., from Manus AI) and forward them to a Telegram bot.
It is designed to be deployed on **Vercel** (Serverless) but can be adapted to other Node.js hosts.

## Files
- `api/webhook.js` — Serverless endpoint that accepts POST JSON and sends a Telegram message.
- `vercel.json` — Minimal Vercel configuration for routing (optional).
- `.gitignore` — ignores node_modules and env files.

## How to use (quick)

### Option A — Deploy on Vercel (recommended)
1. Create a Vercel account (https://vercel.com) and install the Vercel CLI or use the web UI.
2. Create a new project and import this repository (zip upload or GitHub).
3. In Project Settings -> Environment Variables, add:
   - `TELEGRAM_TOKEN` = your Telegram bot token (from @BotFather)
   - `TELEGRAM_CHAT_ID` = your chat id (getUpdates or userinfobot)
4. Deploy. Your webhook URL will be:
   `https://<your-vercel-project>.vercel.app/api/webhook`
5. In Manus AI, configure the agent to `Send Webhook` to that URL. Payload example:
   ```json
   {
     "level": "high",
     "title": "NATO invokes Article 4",
     "excerpt": "North Atlantic Council convenes emergency session...",
     "url": "https://www.nato.int/..",
     "source": "nato.int"
   }
   ```

### Option B — Run locally (for testing)
1. Install Node.js (v18+ recommended).
2. `npm init -y && npm i node-fetch@2` (or use built-in fetch in Node 18+).
3. Use a small Express wrapper to host the `api/webhook.js` logic locally.
4. Use `ngrok` to expose `http://localhost:3000/api/webhook` to the internet and configure Manus to send to the ngrok URL.

## Security notes
- **Do NOT** commit your `TELEGRAM_TOKEN` into GitHub.
- Use Vercel environment variables or a `.env` file locally.
- Optionally add a simple secret header check: Manus can include a secret token in the webhook header and you verify it in `webhook.js`.

## Troubleshooting
- If Telegram replies with an error, check `getUpdates` to ensure the bot was started by the chat/user (press /start in the chat).
- If messages don't arrive, inspect Vercel function logs.

