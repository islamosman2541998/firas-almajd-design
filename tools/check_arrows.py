from pathlib import Path
import sys
sys.path.insert(0,'tools/python_libs')
from bs4 import BeautifulSoup
for p in Path('.').glob('*.html'):
 text=p.read_text(encoding='utf-8')
 assert not any(x in text for x in ['↗','↑','↖']),p
 doc=BeautifulSoup(text,'html.parser')
 icons=doc.select('.arrow,.round-arrow,.card-open,.back-top>span:last-child')
 assert all(el.select_one('svg') for el in icons),p
 assert 'pages.css?v=20260927-arrows1' in text,p
 print(p.name,len(icons),'SVG icons OK')
