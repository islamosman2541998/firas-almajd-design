import fitz
from pathlib import Path
d=fitz.open('C:/Users/Islam/Downloads/logos.pdf')
d[3].get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(238,175,323,296)).save('assets/brand-mark.png')
d[3].get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(234,171,575,298)).save('assets/logo-dark.png')
d[3].get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(234,405,575,536)).save('assets/logo-light.png')
