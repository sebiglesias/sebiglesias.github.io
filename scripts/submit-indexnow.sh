#!/usr/bin/env bash
# Submit all sitemap URLs to the IndexNow API for instant indexing in Bing, Yandex, Seznam, and Naver.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
SITEMAP="${REPO_DIR}/sitemap.xml"

python3 -c "
import xml.etree.ElementTree as ET
import urllib.request
import json
import sys

sitemap_path = '${SITEMAP}'
tree = ET.parse(sitemap_path)
urls = [elem.text for elem in tree.getroot().findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]

payload = {
    'host': 'sebiglesias.com.ar',
    'key': 'c8ee494b1e923d002047ba36c2ebe321',  # gitleaks:allow
    'keyLocation': 'https://sebiglesias.com.ar/c8ee494b1e923d002047ba36c2ebe321.txt',  # gitleaks:allow
    'urlList': urls
}

print(f'📡 Submitting {len(urls)} URLs from sitemap.xml to IndexNow...')
req = urllib.request.Request(
    'https://api.indexnow.org/indexnow',
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json; charset=utf-8'},
    method='POST'
)

try:
    with urllib.request.urlopen(req) as resp:
        print(f'✅ IndexNow submission successful: {resp.status} {resp.reason}')
except urllib.error.HTTPError as e:
    print(f'❌ IndexNow error: {e.code} {e.reason}', file=sys.stderr)
    sys.exit(1)
"
