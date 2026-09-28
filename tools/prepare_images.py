from PIL import Image
from pathlib import Path
root=Path('C:/Users/Islam/.codex/generated_images/01a0e42c-74f1-72e1-85df-13bcf025f7b9')
for src,dest in [('exec-5ea6a4ca-7ae8-4f0d-8597-d70e5f94e20c.png','hero'),('exec-b50396a0-a6b9-41f5-8a0e-40afabd2c5c4.png','courtyard')]:
 im=Image.open(root/src)
 im.save(f'assets/{dest}.webp',quality=90,method=6)
 print(dest, im.size, Path(f'assets/{dest}.webp').stat().st_size)
