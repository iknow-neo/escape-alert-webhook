# 📤 GitHub Web-Upload Anleitung

## Schritt-für-Schritt: Dateien über GitHub Web-Oberfläche hochladen

### ✅ Voraussetzungen
- GitHub Account
- Bestehendes Repository: `telegram-webhook-forwarder`
- Vercel-Projekt verbunden mit GitHub

---

## 📋 Anleitung

### Schritt 1: Repository öffnen

1. Gehe zu [github.com](https://github.com)
2. Melde dich an
3. Öffne dein Repository `telegram-webhook-forwarder`

### Schritt 2: Alte Dateien löschen (optional)

Falls alte Dateien vorhanden sind, die nicht mehr gebraucht werden:

1. Klicke auf die Datei
2. Klicke auf das **Papierkorb-Symbol** (🗑️) oben rechts
3. Scrolle nach unten
4. Commit message: `Remove old files`
5. Klicke **Commit changes**

### Schritt 3: Neue Dateien hochladen

1. Gehe zurück zur Hauptseite deines Repositories
2. Klicke auf **Add file** → **Upload files**
3. **Ziehe alle Dateien** aus dem entpackten Ordner in das Upload-Feld:
   - `api/webhook.js` (erstelle zuerst den Ordner `api` wenn nötig)
   - `package.json`
   - `vercel.json`
   - `README.md`
   - `.gitignore`
   - `test-webhook.sh`
   - `DEPLOYMENT_ANLEITUNG.md`

**WICHTIG:** Der Ordner `api` muss erstellt werden!

#### So lädst du Dateien in Unterordner hoch:

**Option A: Ordner erstellen**
1. Klicke auf **Add file** → **Create new file**
2. Gib ein: `api/webhook.js`
3. GitHub erstellt automatisch den Ordner `api`
4. Füge den Inhalt von `webhook.js` ein
5. Commit

**Option B: Alle Dateien einzeln hochladen**
1. Lade zuerst alle Dateien im Hauptverzeichnis hoch
2. Dann erstelle den `api` Ordner wie in Option A
3. Lade `webhook.js` in den `api` Ordner

### Schritt 4: Commit bestätigen

1. Scrolle nach unten
2. Commit message: `Update webhook implementation`
3. Klicke **Commit changes**

### Schritt 5: Vercel prüfen

1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Wähle dein Projekt
3. Unter **Deployments** siehst du das neue Deployment
4. Warte bis es fertig ist (grüner Haken ✅)

### Schritt 6: Umgebungsvariablen setzen

1. Im Vercel-Projekt → **Settings** → **Environment Variables**
2. Füge hinzu (falls noch nicht vorhanden):
   
   **Variable 1:**
   - Name: `TELEGRAM_TOKEN`
   - Value: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
   - Environment: Production, Preview, Development (alle auswählen)
   
   **Variable 2:**
   - Name: `CHAT_ID`
   - Value: `464132580`
   - Environment: Production, Preview, Development (alle auswählen)

3. Klicke **Save**

### Schritt 7: Redeploy

1. Gehe zu **Deployments**
2. Klicke auf die **drei Punkte** (⋯) beim neuesten Deployment
3. Klicke **Redeploy**
4. Warte bis fertig

---

## 🧪 Testen

Teste den Webhook mit curl:

```bash
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test Nachricht",
    "title": "Test",
    "priority": "NORMAL"
  }'
```

Du solltest eine Nachricht in Telegram erhalten!

---

## 🛠️ Fehlerbehebung

### Problem: "404 Not Found"
- Stelle sicher, dass der `api` Ordner existiert
- Stelle sicher, dass `webhook.js` im `api` Ordner liegt

### Problem: "TELEGRAM_TOKEN nicht gesetzt"
- Gehe zu Vercel → Settings → Environment Variables
- Prüfe, ob beide Variablen existieren
- Redeploy das Projekt

### Problem: Vercel deployt nicht automatisch
- Gehe zu Vercel → Settings → Git
- Stelle sicher, dass "Auto-deploy" aktiviert ist
- Manuell redeploy auslösen

---

## ✅ Fertig!

Dein Webhook ist jetzt live und bereit, Benachrichtigungen von Manus AI zu empfangen!

**Webhook-URL:** `https://DEINE-VERCEL-URL.vercel.app/api/webhook`

