# 🚀 Schnellstart-Anleitung: Escape Alert System

## Übersicht

Diese Anleitung führt dich in **5 einfachen Schritten** zum fertigen Flucht-Alarm-System.

---

## ✅ Was du bereits hast

- ✅ Telegram Bot: `@EscapeAlert_bot`
- ✅ Bot Token: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
- ✅ Chat-ID: `464132580`
- ✅ Vercel-Projekt: `telegram-webhook-forwarder`
- ✅ GitHub Repository verbunden

---

## 📋 Die 5 Schritte zum fertigen System

### Schritt 1: Dateien auf GitHub hochladen ⏱️ 5 Minuten

1. **Entpacke die ZIP-Datei** `escape-alert-webhook.zip`
2. **Gehe zu deinem GitHub Repository:** [github.com](https://github.com) → `telegram-webhook-forwarder`
3. **Lösche alte Dateien** (falls vorhanden)
4. **Lade neue Dateien hoch:**
   - Klicke **Add file** → **Upload files**
   - Ziehe alle Dateien aus dem entpackten Ordner
   - **WICHTIG:** Erstelle den Ordner `api` und lade `webhook.js` dort hoch
5. **Commit:** `Update webhook implementation`

**Detaillierte Anleitung:** Siehe `GITHUB_UPLOAD_ANLEITUNG.md`

---

### Schritt 2: Umgebungsvariablen in Vercel setzen ⏱️ 2 Minuten

1. **Gehe zu:** [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Wähle dein Projekt:** `telegram-webhook-forwarder`
3. **Klicke:** Settings → Environment Variables
4. **Füge hinzu:**

   **Variable 1:**
   - Name: `TELEGRAM_TOKEN`
   - Value: `8356157424:AAGYGLCuRNgYj4phD7r6UZeFsv5AvSjZwO8`
   - Environment: Production, Preview, Development (alle auswählen)
   
   **Variable 2:**
   - Name: `CHAT_ID`
   - Value: `464132580`
   - Environment: Production, Preview, Development (alle auswählen)

5. **Klicke:** Save

---

### Schritt 3: Projekt neu deployen ⏱️ 2 Minuten

1. **Gehe zu:** Deployments
2. **Klicke:** Redeploy beim neuesten Deployment
3. **Warte** bis das Deployment abgeschlossen ist (grüner Haken ✅)
4. **Kopiere die URL** (z.B. `https://telegram-webhook-forwarder-xyz.vercel.app`)

---

### Schritt 4: Webhook testen ⏱️ 1 Minute

**Öffne ein Terminal** (Windows: PowerShell, Mac: Terminal) und führe aus:

```bash
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":"🧪 Test erfolgreich!","title":"Webhook Test","priority":"NORMAL"}'
```

**Ersetze `DEINE-VERCEL-URL` mit deiner echten Vercel-URL!**

**Erwartetes Ergebnis:** Du erhältst eine Telegram-Nachricht von `@EscapeAlert_bot`! 🎉

**Alternative ohne Terminal:** Siehe `WEBHOOK_TEST_ANLEITUNG.md` für Browser-Methoden.

---

### Schritt 5: Manus AI konfigurieren ⏱️ 10 Minuten

1. **Öffne Manus AI**
2. **Gehe zu:** Webhook-Einstellungen
3. **Trage ein:**
   - URL: `https://DEINE-VERCEL-URL.vercel.app/api/webhook`
   - Methode: POST
   - Content-Type: application/json
4. **Definiere Trigger:**
   - Keywords: "NATO Artikel 4", "Kriegserklärung", "Mobilmachung"
   - Quellen: Tagesschau, Reuters, BBC, NATO.int
   - Frequenz: Alle 5 Minuten
5. **Teste:** Sende einen Test-Trigger in Manus

**Detaillierte Anleitung:** Siehe `MANUS_INTEGRATION.md`

---

## 🎉 Fertig!

Dein Escape Alert System ist jetzt einsatzbereit!

### Was passiert jetzt?

1. **Manus AI überwacht** kontinuierlich Nachrichtenquellen
2. **Bei kritischen Ereignissen** sendet Manus einen Webhook-Aufruf
3. **Dein Webhook** empfängt die Nachricht und leitet sie an Telegram weiter
4. **Du erhältst sofort** eine Benachrichtigung auf deinem Handy

---

## 📊 Monitoring

### Tägliche Checks

- **Telegram:** Prüfe, ob Benachrichtigungen ankommen
- **Vercel Logs:** [vercel.com/dashboard](https://vercel.com/dashboard) → Logs

### Wöchentliche Tests

Sende einen manuellen Test-Webhook:

```bash
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":"Wöchentlicher Test","title":"Test","priority":"NORMAL"}'
```

### Monatliche Überprüfung

- Prüfe, ob alle Nachrichtenquellen in Manus noch erreichbar sind
- Aktualisiere Keywords bei Bedarf
- Prüfe Vercel-Logs auf Fehler

---

## 🛠️ Troubleshooting

### Problem: Keine Telegram-Nachricht beim Test

**Lösung:**
1. Prüfe Umgebungsvariablen in Vercel (Settings → Environment Variables)
2. Stelle sicher, dass beide Variablen gesetzt sind
3. Redeploy das Projekt
4. Teste erneut

### Problem: 404 Not Found

**Lösung:**
1. Stelle sicher, dass `api/webhook.js` im Repository existiert
2. Prüfe die URL (muss `/api/webhook` am Ende haben)
3. Warte 1-2 Minuten nach dem Deployment

### Problem: 500 Internal Server Error

**Lösung:**
1. Gehe zu Vercel → Logs
2. Prüfe die Fehlermeldung
3. Häufigste Ursache: Umgebungsvariablen fehlen

**Weitere Lösungen:** Siehe `WEBHOOK_TEST_ANLEITUNG.md`

---

## 📚 Weitere Dokumentation

| Dokument | Beschreibung |
|----------|--------------|
| `README.md` | Allgemeine Projekt-Dokumentation |
| `GITHUB_UPLOAD_ANLEITUNG.md` | Detaillierte Anleitung für GitHub-Upload |
| `DEPLOYMENT_ANLEITUNG.md` | Alternative Deployment-Methoden (CLI, etc.) |
| `WEBHOOK_TEST_ANLEITUNG.md` | Ausführliche Test-Szenarien und Fehlerbehebung |
| `MANUS_INTEGRATION.md` | Trigger-Konfiguration und Monitoring-Strategie |

---

## 🔒 Sicherheitshinweise

- **Webhook-URL geheim halten:** Teile sie nicht öffentlich
- **Bot Token schützen:** Niemals im Code oder öffentlich teilen
- **Regelmäßige Tests:** Stelle sicher, dass das System funktioniert
- **Logs überwachen:** Prüfe auf ungewöhnliche Aktivitäten

---

## 🎯 Kritische Trigger (Beispiele)

Diese Ereignisse solltest du in Manus AI überwachen:

### Höchste Priorität (CRITICAL)

- NATO Artikel 4 / Article 4 NATO
- Kriegserklärung / declaration of war
- Mobilmachung / general mobilization
- Atomalarm / nuclear alert
- Notstand ausgerufen / state of emergency

### Hohe Priorität (HIGH)

- Truppenverlegung / troop movement
- Grenzschließung / border closure
- Evakuierung / evacuation
- Luftraumsperrung / airspace closure

### Normale Priorität (NORMAL)

- Spannungen / tensions
- Konflikt / conflict
- Krise / crisis

---

## 📞 Support

Bei Fragen oder Problemen:

1. **Prüfe die Dokumentation** in den mitgelieferten Dateien
2. **Prüfe Vercel Logs** auf Fehlermeldungen
3. **Teste den Webhook manuell** mit curl
4. **Prüfe die Umgebungsvariablen** in Vercel

---

## ✅ Erfolgs-Checkliste

- [ ] Dateien auf GitHub hochgeladen
- [ ] Umgebungsvariablen in Vercel gesetzt
- [ ] Projekt neu deployt
- [ ] Webhook getestet (Telegram-Nachricht erhalten)
- [ ] Manus AI Webhook-URL konfiguriert
- [ ] Trigger in Manus AI definiert
- [ ] Wöchentliche Tests geplant

---

## 🎉 Glückwunsch!

Du hast erfolgreich ein automatisches Flucht-Alarm-System eingerichtet. Bei kritischen Ereignissen wirst du jetzt sofort per Telegram benachrichtigt!

**Deine Webhook-URL:**
```
https://DEINE-VERCEL-URL.vercel.app/api/webhook
```

Bleib sicher! 🛡️

