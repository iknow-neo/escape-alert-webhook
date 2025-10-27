# Escape Alert Webhook

Ein Webhook-System, das Benachrichtigungen von Manus AI empfängt und automatisch an Telegram weiterleitet.

## 🎯 Zweck

Dieses System dient als Frühwarnsystem für kritische Ereignisse (z.B. NATO Artikel 4, Kriegserklärungen, etc.). Manus AI überwacht Nachrichtenquellen und sendet bei erkannten Triggern sofort eine Benachrichtigung an diesen Webhook, der sie dann an Telegram weiterleitet.

## 📋 Voraussetzungen

- Telegram Bot (bereits erstellt: @EscapeAlert_bot)
- Vercel Account
- Vercel CLI (optional, für lokales Deployment)

## 🚀 Deployment auf Vercel

### Option 1: Vercel CLI (Empfohlen)

1. **Vercel CLI installieren:**
   ```bash
   npm install -g vercel
   ```

2. **In das Projektverzeichnis wechseln:**
   ```bash
   cd escape-alert-webhook
   ```

3. **Bei Vercel anmelden:**
   ```bash
   vercel login
   ```

4. **Projekt deployen:**
   ```bash
   vercel
   ```
   
   Folge den Anweisungen:
   - Setup and deploy? → **Yes**
   - Which scope? → Wähle deinen Account
   - Link to existing project? → **No**
   - What's your project's name? → **escape-alert-webhook**
   - In which directory is your code located? → **./** (Enter drücken)

5. **Umgebungsvariablen setzen:**
   ```bash
   vercel env add TELEGRAM_TOKEN
   ```
   Wert eingeben: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
   
   ```bash
   vercel env add CHAT_ID
   ```
   Wert eingeben: `464132580`

6. **Erneut deployen mit Variablen:**
   ```bash
   vercel --prod
   ```

### Option 2: GitHub + Vercel Web Interface

1. **GitHub Repository erstellen**
2. **Code hochladen**
3. **Vercel mit GitHub verbinden**
4. **Umgebungsvariablen in Vercel Dashboard setzen:**
   - `TELEGRAM_TOKEN` = `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
   - `CHAT_ID` = `464132580`

## 🔧 Konfiguration

### Umgebungsvariablen

| Variable | Wert | Beschreibung |
|----------|------|--------------|
| `TELEGRAM_TOKEN` | `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8` | Bot Token von @EscapeAlert_bot |
| `CHAT_ID` | `464132580` | Deine persönliche Telegram Chat-ID |

### Webhook URL

Nach dem Deployment ist der Webhook erreichbar unter:
```
https://escape-alert-webhook.vercel.app/api/webhook
```

## 📡 API Verwendung

### Request Format

**Endpoint:** `POST /api/webhook`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "message": "Kritisches Ereignis erkannt!",
  "title": "NATO Artikel 4 aktiviert",
  "priority": "CRITICAL"
}
```

### Request Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `message` | string | Ja | Die Hauptnachricht |
| `title` | string | Nein | Titel der Benachrichtigung |
| `priority` | string | Nein | `CRITICAL`, `HIGH`, `NORMAL` (Standard) |

### Response Format

**Erfolg (200):**
```json
{
  "success": true,
  "message": "Nachricht erfolgreich an Telegram gesendet",
  "telegram_response": { ... }
}
```

**Fehler (400/500):**
```json
{
  "error": "Error Type",
  "message": "Fehlerbeschreibung"
}
```

## 🧪 Testen

### Mit curl:
```bash
curl -X POST https://escape-alert-webhook.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test Nachricht",
    "title": "Test Alarm",
    "priority": "CRITICAL"
  }'
```

### Mit Postman:
1. Neue POST-Request erstellen
2. URL: `https://escape-alert-webhook.vercel.app/api/webhook`
3. Body → raw → JSON
4. Test-Payload einfügen
5. Send klicken

## 🔗 Integration mit Manus AI

1. **In Manus AI Webhook-Einstellungen gehen**
2. **Webhook-URL eintragen:**
   ```
   https://escape-alert-webhook.vercel.app/api/webhook
   ```
3. **Trigger definieren** (z.B. Keywords wie "Artikel 4", "Kriegserklärung", etc.)
4. **Nachrichtenformat konfigurieren** (JSON mit `message`, `title`, `priority`)

## 📊 Monitoring

- Logs in Vercel Dashboard einsehen: https://vercel.com/dashboard
- Telegram-Nachrichten überprüfen
- Bei Problemen: Vercel Logs analysieren

## 🛠️ Fehlerbehebung

### Keine Nachrichten kommen an
- Umgebungsvariablen in Vercel prüfen
- Webhook-URL in Manus korrekt eingetragen?
- Vercel Logs prüfen

### Telegram API Fehler
- Bot Token korrekt?
- Chat-ID korrekt?
- Bot wurde gestartet (/start gesendet)?

## 📝 Lizenz

MIT

