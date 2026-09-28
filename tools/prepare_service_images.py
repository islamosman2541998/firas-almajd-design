from pathlib import Path
from PIL import Image

root=Path('C:/Users/Islam/.codex/generated_images/01a0e42c-74f1-72e1-85df-13bcf025f7b9')
assets=Path(__file__).resolve().parent.parent/'assets'
sources={
 'construction':'exec-370cb785-5520-46c0-a670-e45746d15202.png',
 'cafe':'exec-49db09df-e5d5-47bc-a7ab-1c4c5ecc9bbe.png',
 'logistics':'exec-acadb0a7-3bbd-4ea9-ac59-ebca9f1b0778.png',
 'materials':'exec-3ba66634-3ae3-40b0-8a96-11271eb60ede.png',
 'maintenance':'exec-0c2e6288-2070-4ae0-a2e1-0b011eb06966.png'
}
for name,filename in sources.items():
    image=Image.open(root/filename).convert('RGB')
    image.save(assets/f'{name}.webp',quality=87,method=6)
    print(name, (assets/f'{name}.webp').stat().st_size)
