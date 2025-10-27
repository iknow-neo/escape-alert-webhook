# 🧪 Webhook Test-Anleitung

## Übersicht

Diese Anleitung zeigt dir verschiedene Methoden, um deinen Webhook nach dem Deployment zu testen und sicherzustellen, dass alles funktioniert.

---

## ✅ Voraussetzungen

- Webhook ist auf Vercel deployt
- Umgebungsvariablen sind gesetzt (`TELEGRAM_TOKEN`, `CHAT_ID`)
- Du kennst deine Webhook-URL (z.B. `https://telegram-webhook-forwarder-n7bi0nxgx-romans-projects-721cb41a.vercel.app/api/webhook`)

---

## 🔧 Methode 1: Mit curl (Terminal/Kommandozeile)

### Windows (PowerShell oder CMD)

Öffne PowerShell und führe aus:

```powershell
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook `
  -H "Content-Type: application/json" `
  -d '{\"message\":\"Test Nachricht vom Webhook\",\"title\":\"Test\",\"priority\":\"NORMAL\"}'
```

**Ersetze `DEINE-VERCEL-URL` mit deiner echten Vercel-URL!**

### Mac/Linux (Terminal)

```bash
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test Nachricht vom Webhook",
    "title": "Test",
    "priority": "NORMAL"
  }'
```

### Erwartetes Ergebnis

**Erfolgreiche Response (200 OK):**
```json
{
  "success": true,
  "message": "Nachricht erfolgreich an Telegram gesendet",
  "telegram_response": { ... }
}
```

**UND:** Du erhältst eine Nachricht in Telegram von `@EscapeAlert_bot`!

---

## 🌐 Methode 2: Mit dem Browser (Online-Tool)

Falls du kein Terminal verwenden möchtest, nutze ein Online-Tool:

### Option A: Reqbin.com

1. Gehe zu [reqbin.com](https://reqbin.com/)
2. Wähle **POST** als Methode
3. Gib deine URL ein: `https://DEINE-VERCEL-URL.vercel.app/api/webhook`
4. Klicke auf **Headers** → Füge hinzu:
   - **Key:** `Content-Type`
   - **Value:** `application/json`
5. Klicke auf **Content** → Wähle **JSON**
6. Füge ein:
```json
{
  "message": "Test Nachricht vom Browser",
  "title": "Browser Test",
  "priority": "NORMAL"
}
```
7. Klicke **Send**

### Option B: Hoppscotch.io

1. Gehe zu [hoppscotch.io](https://hoppscotch.io/)
2. Wähle **POST**
3. URL: `https://DEINE-VERCEL-URL.vercel.app/api/webhook`
4. **Headers:** `Content-Type: application/json`
5. **Body → Raw → JSON:**
```json
{
  "message": "Test von Hoppscotch",
  "title": "Test",
  "priority": "CRITICAL"
}
```
6. Klicke **Send**

---

## 📱 Methode 3: Mit Postman (Desktop-App)

Falls du Postman installiert hast:

### Schritt 1: Neue Request erstellen

1. Öffne Postman
2. Klicke **New** → **HTTP Request**
3. Wähle **POST** als Methode

### Schritt 2: URL eingeben

```
https://DEINE-VERCEL-URL.vercel.app/api/webhook
```

### Schritt 3: Headers setzen

- **Key:** `Content-Type`
- **Value:** `application/json`

### Schritt 4: Body konfigurieren

1. Wähle **Body** → **raw** → **JSON**
2. Füge ein:

```json
{
  "message": "Test Nachricht von Postman",
  "title": "Postman Test",
  "priority": "HIGH"
}
```

### Schritt 5: Send klicken

Du solltest eine 200 OK Response erhalten und eine Telegram-Nachricht bekommen.

---

## 🎯 Methode 4: Mit dem Test-Skript

Falls du die ZIP-Datei entpackt hast, gibt es ein fertiges Test-Skript.

### Mac/Linux

1. Öffne das Terminal
2. Navigiere zum Projekt-Ordner:
```bash
cd /pfad/zum/escape-alert-webhook
```
3. Öffne `test-webhook.sh` und ersetze die URL:
```bash
nano test-webhook.sh
```
Ändere `WEBHOOK_URL` zu deiner echten URL.

4. Speichern (Ctrl+O, Enter, Ctrl+X)
5. Skript ausführen:
```bash
./test-webhook.sh
```

### Windows (Git Bash)

1. Installiere [Git for Windows](https://git-scm.com/download/win) (falls noch nicht vorhanden)
2. Öffne Git Bash
3. Navigiere zum Projekt-Ordner
4. Führe aus:
```bash
./test-webhook.sh
```

---

## 🔍 Test-Szenarien

### Test 1: Normale Benachrichtigung

```json
{
  "message": "Dies ist eine normale Test-Benachrichtigung.",
  "title": "Test Benachrichtigung",
  "priority": "NORMAL"
}
```

**Erwartete Telegram-Nachricht:**
```
⚠️ **Benachrichtigung** ⚠️

**Test Benachrichtigung**

Dies ist eine normale Test-Benachrichtigung.

_27.10.25, 12:34_
```

### Test 2: Kritischer Alarm

```json
{
  "message": "KRITISCHES EREIGNIS ERKANNT! Dies ist ein Test-Alarm.",
  "title": "🚨 KRITISCHER ALARM",
  "priority": "CRITICAL"
}
```

**Erwartete Telegram-Nachricht:**
```
🚨 **ALARM** 🚨

**🚨 KRITISCHER ALARM**

KRITISCHES EREIGNIS ERKANNT! Dies ist ein Test-Alarm.

_27.10.25, 12:34_
```

### Test 3: Hohe Priorität

```json
{
  "message": "Wichtige Nachricht mit hoher Priorität.",
  "title": "Wichtige Meldung",
  "priority": "HIGH"
}
```

### Test 4: Nur Nachricht (ohne Titel)

```json
{
  "message": "Einfache Nachricht ohne Titel."
}
```

### Test 5: Lange Nachricht

```json
{
  "message": "Dies ist eine sehr lange Nachricht, um zu testen, ob der Webhook auch mit längeren Texten umgehen kann. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "title": "Langer Text Test",
  "priority": "NORMAL"
}
```

---

## 🛠️ Fehlerbehebung

### Problem: "404 Not Found"

**Ursache:** Die URL ist falsch oder der Webhook-Endpoint existiert nicht.

**Lösung:**
1. Prüfe die URL (muss `/api/webhook` am Ende haben)
2. Stelle sicher, dass `api/webhook.js` im Repository existiert
3. Prüfe Vercel Deployment-Status

### Problem: "500 Internal Server Error"

**Ursache:** Fehler im Webhook-Code oder fehlende Umgebungsvariablen.

**Lösung:**
1. Gehe zu Vercel Dashboard → Logs
2. Prüfe die Fehlermeldung
3. Stelle sicher, dass `TELEGRAM_TOKEN` und `CHAT_ID` gesetzt sind
4. Redeploy das Projekt

### Problem: "405 Method Not Allowed"

**Ursache:** Du sendest einen GET-Request statt POST.

**Lösung:**
- Stelle sicher, dass die Methode **POST** ist (nicht GET)

### Problem: Response ist OK, aber keine Telegram-Nachricht

**Ursache:** Bot Token oder Chat-ID falsch.

**Lösung:**
1. Prüfe die Umgebungsvariablen in Vercel:
   - `TELEGRAM_TOKEN`: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
   - `CHAT_ID`: `464132580`
2. Stelle sicher, dass du `/start` an den Bot gesendet hast
3. Teste den Bot manuell:
```bash
curl "https://api.telegram.org/bot8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8/sendMessage?chat_id=464132580&text=Test"
```

### Problem: "Telegram API Error"

**Ursache:** Problem mit der Telegram API.

**Lösung:**
1. Prüfe Vercel Logs für Details
2. Stelle sicher, dass der Bot nicht blockiert wurde
3. Prüfe, ob Telegram erreichbar ist

---

## 📊 Vercel Logs prüfen

### So siehst du die Logs:

1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Wähle dein Projekt
3. Klicke auf **Logs** (oder **Functions** → **Logs**)
4. Hier siehst du alle Webhook-Aufrufe und Fehler

### Was du in den Logs siehst:

**Erfolgreicher Request:**
```
POST /api/webhook 200 OK
Duration: 234ms
```

**Fehler:**
```
POST /api/webhook 500 Internal Server Error
Error: TELEGRAM_TOKEN nicht gesetzt
```

---

## ✅ Erfolgs-Checkliste

Nach einem erfolgreichen Test solltest du:

- [ ] Eine **200 OK Response** vom Webhook erhalten haben
- [ ] Eine **Telegram-Nachricht** von `@EscapeAlert_bot` erhalten haben
- [ ] Die Nachricht enthält den **richtigen Text** und **Titel**
- [ ] Die **Priorität** wird korrekt angezeigt (🚨 für CRITICAL, ⚠️ für andere)
- [ ] Der **Zeitstempel** ist korrekt
- [ ] **Keine Fehler** in den Vercel Logs

---

## 🎉 Nächste Schritte

Wenn alle Tests erfolgreich waren:

1. **Manus AI Integration einrichten** (siehe `MANUS_INTEGRATION.md`)
2. **Trigger definieren** für kritische Ereignisse
3. **Regelmäßige Tests** einplanen (z.B. wöchentlich)
4. **Monitoring aktivieren** (Vercel Logs regelmäßig prüfen)

---

## 📞 Schnell-Test (Copy & Paste)

Hier ist ein fertiger curl-Befehl zum Testen. **Ersetze nur die URL:**

```bash
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":"🧪 Webhook Test erfolgreich!","title":"Test","priority":"NORMAL"}'
```

Wenn du diese Nachricht in Telegram erhältst, funktioniert alles! 🎉

