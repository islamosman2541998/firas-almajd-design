import fitz
p=fitz.open('C:/Users/Islam/Downloads/logos.pdf')[2]
p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(490,249,780,467)).save('assets/logo-stacked.png')
