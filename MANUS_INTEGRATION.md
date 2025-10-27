# 🤖 Manus AI Integration - Escape Alert System

## Übersicht

Diese Anleitung zeigt dir, wie du Manus AI so konfigurierst, dass es automatisch kritische Ereignisse überwacht und dich per Telegram benachrichtigt.

---

## 🎯 Ziel

Manus AI soll:
1. **Nachrichtenquellen überwachen** (News-Websites, Twitter, offizielle Kanäle)
2. **Kritische Trigger erkennen** (z.B. "NATO Artikel 4", "Kriegserklärung", "Mobilmachung")
3. **Sofort Alarm schlagen** via Webhook → Telegram

---

## 📡 Webhook-Konfiguration in Manus

### Schritt 1: Webhook in Manus einrichten

1. Öffne Manus AI
2. Gehe zu **Einstellungen** oder **Integrationen**
3. Wähle **Webhook hinzufügen**
4. Konfiguriere:

**Webhook-URL:**
```
https://DEINE-VERCEL-URL.vercel.app/api/webhook
```

**Methode:** POST

**Content-Type:** application/json

**Body-Format:**
```json
{
  "message": "{{event_description}}",
  "title": "{{event_title}}",
  "priority": "{{priority_level}}"
}
```

### Schritt 2: Authentifizierung (optional)

Falls du zusätzliche Sicherheit möchtest, kannst du einen API-Key hinzufügen:

1. Generiere einen geheimen Key (z.B. `manus-secret-key-12345`)
2. Füge ihn als Header hinzu:
   - **Header:** `X-API-Key`
   - **Value:** `manus-secret-key-12345`
3. Passe den Webhook-Code an, um den Key zu prüfen

---

## 🔍 Monitoring-Strategie

### Kritische Trigger definieren

Erstelle in Manus AI Überwachungsregeln für folgende Ereignisse:

#### 🚨 Höchste Priorität (CRITICAL)

**Keywords:**
- "NATO Artikel 4"
- "Article 4 NATO"
- "Kriegserklärung"
- "declaration of war"
- "Mobilmachung"
- "general mobilization"
- "Atomalarm"
- "nuclear alert"
- "Notstand ausgerufen"
- "state of emergency declared"

**Quellen:**
- NATO.int (offizielle NATO-Website)
- Tagesschau.de
- Reuters.com
- BBC.com/news
- Twitter: @NATO, @bundesregierung, @POTUS

**Frequenz:** Echtzeit oder alle 5 Minuten

**Aktion bei Trigger:**
```json
{
  "message": "KRITISCHES EREIGNIS: [Details des Ereignisses]",
  "title": "🚨 FLUCHT-ALARM",
  "priority": "CRITICAL"
}
```

#### ⚠️ Hohe Priorität (HIGH)

**Keywords:**
- "Truppenverlegung"
- "troop movement"
- "Grenzschließung"
- "border closure"
- "Evakuierung"
- "evacuation"
- "Luftraumsperrung"
- "airspace closure"

**Quellen:**
- Nachrichtenseiten
- Regierungs-Websites
- Twitter: Offizielle Accounts

**Frequenz:** Alle 15 Minuten

**Aktion bei Trigger:**
```json
{
  "message": "Wichtiges Ereignis erkannt: [Details]",
  "title": "⚠️ WARNUNG",
  "priority": "HIGH"
}
```

#### ℹ️ Normale Priorität (NORMAL)

**Keywords:**
- "Spannungen"
- "tensions"
- "Konflikt"
- "conflict"
- "Krise"
- "crisis"

**Quellen:**
- Nachrichtenseiten

**Frequenz:** Stündlich

**Aktion bei Trigger:**
```json
{
  "message": "Ereignis zur Beobachtung: [Details]",
  "title": "ℹ️ Information",
  "priority": "NORMAL"
}
```

---

## 🛠️ Manus AI Konfiguration

### Beispiel-Konfiguration für Manus

```yaml
monitoring:
  - name: "NATO Artikel 4 Überwachung"
    sources:
      - "https://www.nato.int"
      - "https://www.tagesschau.de"
      - "https://www.reuters.com"
    keywords:
      - "NATO Artikel 4"
      - "Article 4"
    priority: CRITICAL
    frequency: "5m"
    webhook: "https://DEINE-VERCEL-URL.vercel.app/api/webhook"
    
  - name: "Kriegserklärung Überwachung"
    sources:
      - "https://www.tagesschau.de"
      - "https://www.bbc.com/news"
      - "https://www.reuters.com"
    keywords:
      - "Kriegserklärung"
      - "declaration of war"
      - "declares war"
    priority: CRITICAL
    frequency: "5m"
    webhook: "https://DEINE-VERCEL-URL.vercel.app/api/webhook"
    
  - name: "Mobilmachung Überwachung"
    sources:
      - "https://www.tagesschau.de"
      - "https://www.bundesregierung.de"
    keywords:
      - "Mobilmachung"
      - "Einberufung"
      - "general mobilization"
    priority: CRITICAL
    frequency: "5m"
    webhook: "https://DEINE-VERCEL-URL.vercel.app/api/webhook"
```

---

## 🧪 Test-Szenarien

### Test 1: Manueller Webhook-Test

Teste den Webhook direkt, um sicherzustellen, dass er funktioniert:

```bash
curl -X POST https://DEINE-VERCEL-URL.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Dies ist ein Test-Alarm. NATO Artikel 4 wurde aktiviert.",
    "title": "🚨 TEST ALARM",
    "priority": "CRITICAL"
  }'
```

**Erwartetes Ergebnis:** Du erhältst eine Telegram-Nachricht mit dem Alarm.

### Test 2: Manus AI Trigger simulieren

1. Erstelle in Manus einen Test-Trigger
2. Setze ein einfaches Keyword (z.B. "Test")
3. Veröffentliche einen Artikel mit diesem Keyword
4. Prüfe, ob Manus den Webhook aufruft

### Test 3: Echtzeit-Überwachung

1. Aktiviere die Überwachung für ein häufiges Ereignis
2. Warte auf einen echten Trigger
3. Prüfe, ob die Benachrichtigung ankommt

---

## 📊 Monitoring & Wartung

### Logs überprüfen

**Vercel Logs:**
1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Wähle dein Projekt
3. Klicke auf **Logs**
4. Hier siehst du alle Webhook-Aufrufe

**Manus AI Logs:**
- Prüfe in Manus, ob Trigger erkannt werden
- Prüfe, ob Webhook-Aufrufe erfolgreich waren

### Regelmäßige Tests

**Wöchentlicher Test:**
- Sende manuell einen Test-Webhook
- Prüfe, ob Telegram-Benachrichtigung ankommt

**Monatliche Überprüfung:**
- Prüfe, ob alle Quellen noch erreichbar sind
- Aktualisiere Keywords bei Bedarf
- Prüfe Vercel-Logs auf Fehler

---

## 🔒 Sicherheit & Datenschutz

### Best Practices

1. **Webhook-URL geheim halten**
   - Teile die URL nicht öffentlich
   - Verwende optional einen API-Key

2. **Umgebungsvariablen schützen**
   - Bot Token niemals im Code speichern
   - Nur über Vercel Environment Variables

3. **Rate Limiting**
   - Begrenze Webhook-Aufrufe (z.B. max. 10 pro Minute)
   - Verhindert Spam und Missbrauch

4. **Logging**
   - Protokolliere alle Webhook-Aufrufe
   - Prüfe regelmäßig auf ungewöhnliche Aktivitäten

---

## 🚀 Erweiterte Funktionen (Optional)

### 1. Mehrere Chat-IDs unterstützen

Sende Alarme an mehrere Personen:

```javascript
const CHAT_IDS = [464132580, 123456789, 987654321];

for (const chatId of CHAT_IDS) {
  await sendTelegramMessage(chatId, message);
}
```

### 2. Telegram-Buttons hinzufügen

Füge interaktive Buttons hinzu:

```javascript
reply_markup: {
  inline_keyboard: [
    [
      { text: "✅ Gelesen", callback_data: "read" },
      { text: "🚨 Alarm bestätigen", callback_data: "confirm" }
    ]
  ]
}
```

### 3. Eskalationsstufen

Bei kritischen Alarmen mehrfach benachrichtigen:

```javascript
if (priority === 'CRITICAL') {
  await sendTelegramMessage(chatId, message);
  await sleep(60000); // 1 Minute warten
  await sendTelegramMessage(chatId, "⚠️ ERINNERUNG: " + message);
}
```

### 4. Standort-basierte Alarme

Sende Alarme nur, wenn Ereignisse in bestimmten Regionen auftreten:

```javascript
if (event.location === 'Europa' || event.location === 'Deutschland') {
  await sendTelegramMessage(chatId, message);
}
```

---

## ✅ Checkliste

- [ ] Webhook-URL in Manus eingetragen
- [ ] Kritische Trigger definiert (NATO Artikel 4, Kriegserklärung, etc.)
- [ ] Nachrichtenquellen konfiguriert
- [ ] Überwachungsfrequenz eingestellt (5 Minuten für kritische Events)
- [ ] Webhook getestet (Test-Nachricht erhalten)
- [ ] Logs überprüft (keine Fehler)
- [ ] Wöchentliche Tests geplant

---

## 🎉 Fertig!

Dein Escape Alert System ist jetzt vollständig konfiguriert und überwacht kritische Ereignisse in Echtzeit!

Bei Fragen oder Problemen: Prüfe die Logs in Vercel oder teste den Webhook manuell.

