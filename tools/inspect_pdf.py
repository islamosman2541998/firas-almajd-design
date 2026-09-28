from pathlib import Path
import fitz
root=Path('C:/Users/Islam/Downloads')
for name in ['logos.pdf','print.pdf']+ [p.name for p in root.glob('*هوية*')]:
 d=fitz.open(root/name)
 print('\nFILE',name,'PAGES',len(d))
 for i,p in enumerate(d):
  print('PAGE',i+1,p.rect, p.get_text()[:12000])
  p.get_pixmap(matrix=fitz.Matrix(.65,.65)).save(f'qa/{"brand" if "هوية" in name else name[:-4]}-{i+1}.png')
