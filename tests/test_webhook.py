# -*- coding: utf-8 -*-
import urllib.request, json

url = 'https://script.google.com/macros/s/AKfycbzLgr3QjxaKx7Vv9xxF1ELDSh7acdySX9Na5TWHUN8gQ4oVmlbazINuR69cRlSvsAc/exec'

payload = {
    'id': 'AZ-TEST-CI',
    'formType': 'CI Automated Test',
    'formTypeArabic': 'اختبار تلقائي',
    'timestamp': '2026-08-22',
    'data': {
        'assocName': 'CI Test Runner',
        'assocPhone': '01026847508',
        'assocGov': 'Beheira',
        'assocCity': 'Kafr El-Dawar',
        'partnerScope': 'Testing Azolla Egypt Google Sheet Webhook',
        'notes': 'All systems green'
    }
}

try:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        assert resp.getcode() == 200, f"Expected 200, got {resp.getcode()}"
        print("Webhook Test Passed! Status: 200 OK")
except Exception as e:
    print("Webhook Test Error:", str(e))
