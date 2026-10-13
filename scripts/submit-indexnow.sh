#!/usr/bin/env bash
# Submit all public URLs to the IndexNow API for instant indexing in Bing, Yandex, Seznam, and Naver.
set -euo pipefail

KEY="c8ee494b1e923d002047ba36c2ebe321"
HOST="sebiglesias.com.ar"
KEY_LOCATION="https://sebiglesias.com.ar/${KEY}.txt"

echo "📡 Submitting URLs to IndexNow (Bing / Yandex / DuckDuckGo ecosystem)..."

PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [
    "https://${HOST}/",
    "https://${HOST}/es/",
    "https://${HOST}/travel/",
    "https://${HOST}/juntadita/",
    "https://${HOST}/sushi-piece-counter/",
    "https://${HOST}/empanadin/",
    "https://${HOST}/exam-clock/",
    "https://${HOST}/asadin/",
    "https://${HOST}/pizzadita/",
    "https://${HOST}/ayce-counter/",
    "https://${HOST}/spool-scale/",
    "https://${HOST}/coin-flip/",
    "https://${HOST}/callsign/",
    "https://${HOST}/color-change/",
    "https://${HOST}/futbol/",
    "https://${HOST}/telekino/",
    "https://${HOST}/feriados/",
    "https://${HOST}/billeteras/"
  ]
}
EOF
)

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 202 ]; then
  echo "✅ IndexNow submission successful (HTTP $HTTP_CODE)!"
  echo "Bing and participating search engines have received the notification."
else
  echo "⚠️ IndexNow response HTTP $HTTP_CODE: $BODY"
  echo "Note: The key file must be live at ${KEY_LOCATION} before the first submission."
fi
