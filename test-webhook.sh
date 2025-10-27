#!/bin/bash

# Test-Skript für den Escape Alert Webhook

echo "🧪 Teste Escape Alert Webhook..."
echo ""

# Webhook URL (nach Deployment anpassen)
WEBHOOK_URL="https://escape-alert-webhook.vercel.app/api/webhook"

# Test 1: Normale Benachrichtigung
echo "Test 1: Normale Benachrichtigung"
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Dies ist eine Test-Benachrichtigung vom Escape Alert System.",
    "title": "Test Benachrichtigung",
    "priority": "NORMAL"
  }'
echo -e "\n"

sleep 2

# Test 2: Kritischer Alarm
echo "Test 2: Kritischer Alarm"
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "message": "KRITISCHES EREIGNIS ERKANNT! Dies ist ein Test-Alarm.",
    "title": "🚨 KRITISCHER ALARM",
    "priority": "CRITICAL"
  }'
echo -e "\n"

sleep 2

# Test 3: Hohe Priorität
echo "Test 3: Hohe Priorität"
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Wichtige Nachricht mit hoher Priorität.",
    "title": "Wichtige Meldung",
    "priority": "HIGH"
  }'
echo -e "\n"

echo "✅ Tests abgeschlossen. Prüfe deine Telegram-Nachrichten!"

