from PIL import Image
for name in ['index-ar-1440','index-en-1440','index-ar-390','index-en-390']:
 im=Image.open('qa/'+name+'.png')
 im.crop((0,0,im.width,min(1050,im.height))).save('qa/'+name+'-top.png')
 if im.width>1000:
  im.crop((0,1750,im.width,3300)).save('qa/'+name+'-services.png')
