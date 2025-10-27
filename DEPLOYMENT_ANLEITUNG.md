# 🚀 Deployment-Anleitung für Escape Alert Webhook

## Übersicht

Diese Anleitung führt dich Schritt für Schritt durch das Deployment deines Webhooks auf Vercel.

## ✅ Was du bereits hast

- ✅ Telegram Bot: `@EscapeAlert_bot`
- ✅ Bot Token: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
- ✅ Chat-ID: `464132580`
- ✅ Webhook-Code (in diesem Ordner)

## 📦 Methode 1: Vercel CLI (Einfachste Methode)

### Schritt 1: Vercel CLI installieren

Öffne ein Terminal/Kommandozeile und führe aus:

```bash
npm install -g vercel
```

Falls du Node.js noch nicht installiert hast, lade es von [nodejs.org](https://nodejs.org/) herunter.

### Schritt 2: Bei Vercel anmelden

```bash
vercel login
```

Es öffnet sich ein Browser-Fenster. Melde dich mit deinem Vercel-Account an.

### Schritt 3: In das Projektverzeichnis wechseln

```bash
cd /pfad/zum/escape-alert-webhook
```

### Schritt 4: Projekt deployen

```bash
vercel
```

**Beantworte die Fragen:**
- `Set up and deploy "~/escape-alert-webhook"?` → **Y** (Enter)
- `Which scope do you want to deploy to?` → Wähle deinen Account
- `Link to existing project?` → **N** (Enter)
- `What's your project's name?` → **escape-alert-webhook** (Enter)
- `In which directory is your code located?` → **./** (Enter)

Vercel deployt jetzt dein Projekt und gibt dir eine URL.

### Schritt 5: Umgebungsvariablen setzen

```bash
vercel env add TELEGRAM_TOKEN production
```

Wenn gefragt, gib ein: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`

```bash
vercel env add CHAT_ID production
```

Wenn gefragt, gib ein: `464132580`

### Schritt 6: Production Deployment

```bash
vercel --prod
```

Fertig! Dein Webhook ist jetzt live unter:
```
https://escape-alert-webhook.vercel.app/api/webhook
```

---

## 🌐 Methode 2: GitHub + Vercel Dashboard

### Schritt 1: GitHub Repository erstellen

1. Gehe zu [github.com](https://github.com)
2. Klicke auf "New Repository"
3. Name: `escape-alert-webhook`
4. Klicke "Create repository"

### Schritt 2: Code zu GitHub hochladen

**Option A: Mit GitHub Desktop**
1. GitHub Desktop öffnen
2. "Add Local Repository" → Ordner auswählen
3. "Publish repository" klicken

**Option B: Mit Git Kommandozeile**
```bash
cd /pfad/zum/escape-alert-webhook
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN_USERNAME/escape-alert-webhook.git
git push -u origin main
```

### Schritt 3: Vercel mit GitHub verbinden

1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Klicke "Add New..." → "Project"
3. Klicke "Import Git Repository"
4. Wähle dein `escape-alert-webhook` Repository
5. Klicke "Import"

### Schritt 4: Umgebungsvariablen im Vercel Dashboard setzen

1. Im Projekt → "Settings" → "Environment Variables"
2. Füge hinzu:
   - **Name:** `TELEGRAM_TOKEN`  
     **Value:** `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
   - **Name:** `CHAT_ID`  
     **Value:** `464132580`
3. Klicke "Save"

### Schritt 5: Deployment

1. Gehe zu "Deployments"
2. Klicke "Redeploy" (damit die Umgebungsvariablen geladen werden)
3. Warte bis Deployment abgeschlossen ist

Fertig! Dein Webhook ist live.

---

## 🧪 Webhook testen

### Test 1: Mit curl (Terminal)

```bash
curl -X POST https://escape-alert-webhook.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test Nachricht vom Webhook",
    "title": "Test",
    "priority": "NORMAL"
  }'
```

### Test 2: Mit dem Test-Skript

```bash
./test-webhook.sh
```

### Test 3: Mit Postman oder Insomnia

1. Neue POST-Request erstellen
2. URL: `https://escape-alert-webhook.vercel.app/api/webhook`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "message": "Dies ist eine Test-Nachricht",
  "title": "Test Alarm",
  "priority": "CRITICAL"
}
```
5. Send klicken

**Erwartetes Ergebnis:** Du erhältst eine Nachricht in Telegram!

---

## 🔗 Manus AI Integration

### Schritt 1: Webhook in Manus einrichten

1. Öffne Manus AI
2. Gehe zu den Webhook-Einstellungen
3. Trage ein:
   - **URL:** `https://escape-alert-webhook.vercel.app/api/webhook`
   - **Methode:** POST
   - **Content-Type:** application/json

### Schritt 2: Trigger definieren

Erstelle in Manus AI Überwachungsregeln für:
- **Keywords:** "Artikel 4", "NATO", "Kriegserklärung", "Mobilmachung", etc.
- **Quellen:** Nachrichtenseiten, Twitter, offizielle Regierungsseiten
- **Frequenz:** Echtzeit oder alle 5 Minuten

### Schritt 3: Nachrichtenformat konfigurieren

Manus soll bei einem Trigger folgendes JSON senden:

```json
{
  "message": "Erkanntes Ereignis: [Details]",
  "title": "ALARM: [Trigger-Name]",
  "priority": "CRITICAL"
}
```

---

## 📊 Monitoring & Logs

### Vercel Logs ansehen

1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Wähle dein Projekt
3. Klicke auf "Logs"
4. Hier siehst du alle Webhook-Aufrufe und Fehler

### Telegram-Nachrichten prüfen

Öffne Telegram und prüfe den Chat mit `@EscapeAlert_bot`. Alle Alarme sollten dort ankommen.

---

## 🛠️ Fehlerbehebung

### Problem: "TELEGRAM_TOKEN oder CHAT_ID nicht gesetzt"

**Lösung:**
1. Gehe zu Vercel Dashboard → Settings → Environment Variables
2. Prüfe, ob beide Variablen existieren
3. Falls nicht: Füge sie hinzu
4. Redeploy das Projekt

### Problem: "Telegram API Error"

**Lösung:**
1. Prüfe, ob der Bot Token korrekt ist
2. Stelle sicher, dass du `/start` an den Bot gesendet hast
3. Prüfe die Chat-ID

### Problem: "Method Not Allowed"

**Lösung:**
- Stelle sicher, dass du POST-Requests sendest (nicht GET)

### Problem: Keine Nachrichten kommen an

**Lösung:**
1. Teste den Webhook manuell mit curl
2. Prüfe Vercel Logs auf Fehler
3. Stelle sicher, dass Manus die richtige URL verwendet

---

## ✅ Checkliste

- [ ] Vercel CLI installiert oder GitHub Repository erstellt
- [ ] Projekt auf Vercel deployt
- [ ] Umgebungsvariablen gesetzt (`TELEGRAM_TOKEN`, `CHAT_ID`)
- [ ] Webhook getestet (Nachricht in Telegram erhalten)
- [ ] Manus AI Webhook-URL konfiguriert
- [ ] Trigger in Manus AI definiert
- [ ] System läuft und überwacht

---

## 🎉 Fertig!

Dein Escape Alert System ist jetzt einsatzbereit. Bei kritischen Ereignissen wirst du sofort per Telegram benachrichtigt.

**Webhook-URL:** `https://escape-alert-webhook.vercel.app/api/webhook`

Bei Fragen oder Problemen: Prüfe die Logs in Vercel oder teste den Webhook manuell.

