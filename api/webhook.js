// Telegram Webhook Handler für Escape Alert System
// Empfängt Nachrichten von Manus AI und leitet sie an Telegram weiter

export default async function handler(req, res) {
  // Nur POST-Requests erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Nur POST-Requests werden akzeptiert' 
    });
  }

  try {
    // Telegram Bot Konfiguration aus Umgebungsvariablen
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    // Prüfen ob Umgebungsvariablen gesetzt sind
    if (!TELEGRAM_TOKEN || !CHAT_ID) {
      console.error('Fehlende Umgebungsvariablen');
      return res.status(500).json({ 
        error: 'Configuration Error',
        message: 'TELEGRAM_TOKEN oder CHAT_ID nicht gesetzt' 
      });
    }

    // Nachricht aus dem Request-Body extrahieren
    const { message, title, priority } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Keine Nachricht im Request-Body gefunden' 
      });
    }

    // Nachricht formatieren
    let telegramMessage = '';
    
    if (priority === 'CRITICAL' || priority === 'HIGH') {
      telegramMessage += '🚨 **ALARM** 🚨\n\n';
    } else {
      telegramMessage += '⚠️ **Benachrichtigung** ⚠️\n\n';
    }

    if (title) {
      telegramMessage += `**${title}**\n\n`;
    }

    telegramMessage += message;
    
    // Zeitstempel hinzufügen
    const timestamp = new Date().toLocaleString('de-DE', { 
      timeZone: 'Europe/Berlin',
      dateStyle: 'short',
      timeStyle: 'short'
    });
    telegramMessage += `\n\n_${timestamp}_`;

    // Nachricht an Telegram senden
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API Fehler:', data);
      return res.status(500).json({ 
        error: 'Telegram API Error',
        details: data 
      });
    }

    // Erfolgreiche Antwort
    return res.status(200).json({ 
      success: true,
      message: 'Nachricht erfolgreich an Telegram gesendet',
      telegram_response: data
    });

  } catch (error) {
    console.error('Webhook Fehler:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}

