"""Build plain HTML pages from shared sections. No build step is needed to view the site."""
from pathlib import Path
from html import escape
import json
import re
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent/'python_libs'))
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
base = BeautifulSoup((ROOT/'tools/templates/home-base.html').read_text(encoding='utf-8-sig'), 'html.parser')
for node in list(base.find_all(string=True)):
    if re.search(r'[\u0600-\u06ff]', str(node)):
        node.replace_with(str(node).replace('.', ''))
for tag in base.find_all(True):
    for attr, value in list(tag.attrs.items()):
        if isinstance(value, str) and re.search(r'[\u0600-\u06ff]', value):
            tag[attr] = value.replace('.', '')
services = json.loads((ROOT/'tools/services.json').read_text(encoding='utf-8'))
images = {'construction':'construction','fitout':'cafe','logistics':'logistics','supply':'materials','landscape':'courtyard','maintenance':'maintenance'}

def t(ar, en, tag='span', cls=''):
    ar = ar.replace('.', '')
    return f'<{tag} class="{cls}" data-ar="{escape(ar,quote=True)}" data-en="{escape(en,quote=True)}">{ar}</{tag}>'

def link(url, ar='اكتشف التفاصيل', en='Explore the details', cls='dark-link'):
    return f'<a href="{url}" class="{cls}">{t(ar,en)}<span class="arrow" aria-hidden="true">↗</span></a>'

def photo(name, ar, en, cls='', eager=False):
    return f'<img class="{cls}" src="assets/{name}.webp" alt="{ar}" data-alt-ar="{ar}" data-alt-en="{en}" loading="{"eager" if eager else "lazy"}" width="1500" height="1000">'

def label(ar,en,num=''):
    return f'<div class="eyebrow">{f"<span>{num} /</span>" if num else ""}{t(ar,en)}</div>'

def heading(ar,en,desc_ar='',desc_en='',num='',eyear='',eyeen=''):
    return f'<div class="section-heading reveal"><div>{label(eyear,eyeen,num)}{t(ar,en,"h2")}</div>{t(desc_ar,desc_en,"p") if desc_ar else ""}</div>'

def pic_note():
    return ''

def section(name):
    return str(base.find('section',id=name))

about = section('about').replace('href="#approach"','href="about.html"').replace('data-i18n="discoverApproach">تعرّف على رؤيتنا','data-ar="تعرّف علينا أكثر" data-en="More about us">تعرّف علينا أكثر')
process = section('approach').replace('03 /','08 /')
process = process.replace('</section>', '<div class="container-wide section-end">'+t('تعرّف على ما تتضمنه كل مرحلة.','Explore what each stage involves.','p')+link('approach.html','رؤيتنا بالتفصيل','Our vision in detail')+'</div></section>')
contact = section('contact').replace('04 /','11 /').replace('[+0-9 ()\\-]{7,25}',r'[+0-9 \(\)\-]{7,25}')
home_contact_tree = BeautifulSoup(contact, 'html.parser')
home_contact_tree.select_one('#projectForm').replace_with(BeautifulSoup('<div class="contact-map"><iframe title="خريطة منطقة المقر — Office area map" src="https://www.google.com/maps?q=King+Abdulaziz+District+Ibn+Katheer+Riyadh+12233&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a href="https://www.google.com/maps/search/?api=1&amp;query=King+Abdulaziz+District+Ibn+Katheer+Riyadh+12233" target="_blank" rel="noopener noreferrer" data-ar="عرض المنطقة على Google Maps" data-en="View the area on Google Maps">عرض المنطقة على Google Maps</a></div>', 'html.parser'))
home_contact = str(home_contact_tree)
hero = section('home').replace('href="#services"','href="services.html"').replace('href="#contact"','href="contact.html"')
values = str(base.find('div',class_='values-band'))

def service_gallery():
    cards=[]
    for i,s in enumerate(services):
        cards.append(f'''<a href="{s['id']}.html" class="service-card reveal"><div class="service-card-photo">{photo(images[s['id']],s['arName']+' — صورة تعبيرية',s['enName']+' — illustrative image')}{pic_note()}<span class="card-open" aria-hidden="true">↗</span></div><div class="service-card-title"><span class="card-number">0{i+1}</span>{t(s['arName'],s['enName'],'h3')}</div>{t(s['arDesc'],s['enDesc'],'p')}</a>''')
    return f'''<section class="service-gallery section-space" id="expertise"><div class="container-wide"><div class="section-heading reveal"><div>{t('مجالات عملنا','OUR DISCIPLINES','h2')}{t('تخصصات عدة ورؤية واحدة','Multiple disciplines. One vision','p','disciplines-subtitle')}</div></div><div class="service-card-grid">{''.join(cards)}</div><div class="section-end">{link('services.html','جميع الخدمات بالتفصيل','All services in detail')}</div></div></section>'''

def partners_section():
    partners=json.loads((ROOT/'tools/partners.json').read_text(encoding='utf-8'))
    cards=''.join(f'<div class="partner-card"><img src="assets/partners/{p["image"]}" alt="{escape(p["name"],quote=True)}" loading="lazy" draggable="false" width="400" height="220"></div>' for p in partners)
    arrow='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'
    return f'''<section class="partners section-space" id="partners" aria-labelledby="partners-title"><div class="container-wide"><div class="partners-heading reveal"><div><span class="partners-kicker">OUR PARTNERS</span>{t('شركاء النجاح','Our partners','h2','partners-title').replace('<h2 ','<h2 id="partners-title" ')}{t('معًا نبني علاقات تدوم','Building lasting relationships, together','p')}</div></div><div class="partners-carousel reveal"><button type="button" class="partner-arrow partner-prev" aria-label="السابق / Previous">{arrow}</button><div class="partners-slider" tabindex="0" role="region" aria-label="شعارات الشركاء / Partner logos">{cards}</div><button type="button" class="partner-arrow partner-next" aria-label="التالي / Next">{arrow}</button></div><div class="partners-pagination"><div class="partner-dots" role="group" aria-label="التنقل بين الشعارات / Navigate partner logos"></div><button type="button" class="partner-pause" aria-label="إيقاف الحركة / Pause autoplay" aria-pressed="false">Ⅱ</button></div></div></section>'''


def certificates_page():
    cards=''.join(f'''<button type="button" class="certificate-card reveal" data-certificate="assets/certificates/certificate-{i}.svg" aria-label="عرض الشهادة {i} / View certificate {i}"><span class="certificate-paper"><img src="assets/certificates/certificate-{i}.svg" alt="شهادة / Certificate {i}" width="800" height="1100" loading="lazy"></span><span class="certificate-caption"><span class="certificate-number">0{i}</span>{t('عرض الشهادة','View certificate')}<span aria-hidden="true">↗</span></span></button>''' for i in range(1,5))
    return f'''<section class="certificates-intro"><div class="container-wide"><nav class="breadcrumb-nav" aria-label="Breadcrumb">{link('index.html','الرئيسية','Home','breadcrumb-home')}<span>/</span>{t('الشهادات المعتمدة','Certifications')}</nav><div class="certificates-intro-inner"><div class="reveal"><span class="partners-kicker">FIRAS AL MAJD</span>{t('الشهادات المعتمدة','Certifications','h1')}</div></div></div></section><section class="certificates-section section-space"><div class="container-wide"><div class="certificates-grid">{cards}</div></div></section><dialog class="certificate-dialog" aria-label="عرض الشهادة / Certificate viewer"><button type="button" class="certificate-close" aria-label="إغلاق / Close">×</button><img alt="شهادة / Certificate" width="800" height="1100"></dialog>'''

def cafe_feature():
    return f'''<section class="cafe-feature" id="cafe"><div class="feature-photo">{photo('cafe','تجهيز مقهى بأعمال خشبية وحجرية — صورة تعبيرية','Café fit-out with wood and stone craftsmanship — illustrative image')}{pic_note()}</div><div class="feature-copy reveal">{label('تجهيز المقاهي والمساحات التجارية','CAFÉS & COMMERCIAL SPACES','03')}{t('من مساحة فارغة،<br>إلى تجربة لها روح.','From an empty space<br>to a place with character.','h2')}{t('نرتّب تفاصيل تجهيز المقهى من البداية: التشطيبات، النجارة، الأرضيات، وأعمال الكهرباء والسباكة. لتتكامل الوظيفة مع شكل المكان.','We coordinate your café fit-out from the start: finishes, joinery, flooring, electrical and plumbing works. Bringing the purpose of a space together with its character.','p')}<div class="feature-tags">{t('تجهيز متكامل','Complete fit-out')}{t('نجارة وديكور','Joinery & interiors')}{t('تسليم مفتاح','Turnkey delivery')}</div>{link('fitout.html','اكتشف خدمات التشطيبات','Explore fit-out services','text-link')}</div></section>'''

def groundwork():
    return f'''<section class="groundwork section-space"><div class="container-wide"><div class="groundwork-top reveal">{label('المقاولات والبنية التحتية','CONSTRUCTION & INFRASTRUCTURE','04')}{t('الأساس الصحيح.<br>لبداية أقوى.','A solid foundation.<br>A stronger beginning.','h2')}{link('construction.html','نطاق أعمال المقاولات','Explore construction scope')}</div><div class="groundwork-image">{photo('construction','أعمال هيكل خرساني وتجهيز مواقع — صورة تعبيرية','Concrete structure and site preparation — illustrative image')}{pic_note()}<div class="groundwork-caption">{t('من تجهيز الموقع إلى الهيكل الإنشائي','From site preparation to structure','p')}<span lang="en">GROUNDWORK / STRUCTURE / INFRASTRUCTURE</span></div></div><div class="scope-strip">{t('حفر وردم','Excavation & backfill')}{t('أعمال خرسانية','Concrete works')}{t('Post-Tension','Post-tension slabs')}{t('أسفلت وبنية تحتية','Asphalt & infrastructure')}</div></div></section>'''

def landscape_feature():
    items=[('زراعة تناسب المكان','Planting suited to the place','نجيل طبيعي، أشجار معمرة ونخيل، مع مراعاة المناخ وطبيعة التربة.','Natural turf, mature trees and palms selected with climate and soil conditions in mind.'),('ريّ مدروس','Considered irrigation','تمديد الشبكات، المحابس والصمامات، Timers وأنظمة التحكم.','Network installation, valves, timers and irrigation controls.'),('عناية تستمر','Care that continues','صيانة زراعية ومتابعة للمسطحات الخضراء ومعالجة الملوحة.','Landscape maintenance, green-space follow-up and salinity treatment.')]
    rows=''.join(f'<div class="landscape-row"><span>0{i+1}</span><div>{t(a,b,"h3")}{t(c,d,"p")}</div></div>' for i,(a,b,c,d) in enumerate(items))
    return f'''<section class="landscape-feature section-space"><div class="container-wide"><div class="landscape-layout"><div class="landscape-photo reveal">{photo('courtyard','تنسيق فناء بالنخيل والنباتات — صورة تعبيرية','A palm-lined landscaped courtyard — illustrative image')}{pic_note()}</div><div class="landscape-copy reveal">{label('تنسيق المواقع والزراعة','LANDSCAPE & IRRIGATION','05')}{t('مساحة تتنفس.<br>وتفاصيل تنمو.','Room to breathe.<br>Space to grow.','h2')}{rows}{link('landscape.html','تعرّف على خدمات الLandscape','Explore landscaping')}</div></div></div></section>'''

def site_support():
    return f'''<section class="site-support section-space"><div class="container-wide">{heading('خلف كل إنجاز،<br>موقع جاهز للعمل.','Behind every build,<br>a site ready to work.','نقل وتوريد وتأجير معدات؛ خدمات تسند التنفيذ وتربط بين احتياجات الموقع ومراحل العمل.','Transport, supplies and equipment rental: the support that connects a site’s needs with each stage of execution.','06','دعم المشروعات','PROJECT SUPPORT')}<div class="support-grid"><article class="support-story reveal"><div class="support-photo">{photo('logistics','نقل مواد ومياه للمواقع — صورة تعبيرية','Material and water transport for sites — illustrative image')}{pic_note()}</div><div class="support-text">{label('01','01')}{t('المواد تصل.<br>والعمل يستمر.','Materials arrive.<br>Work moves forward.','h3')}{t('سطحات، قلابات، نقل المياه والمواد والركام؛ نناقش معك وسيلة النقل وطبيعة الحمولة واحتياجات الموقع.','Flatbeds, tippers, water, materials and aggregates. We discuss transport, load requirements and site access with you.','p')}{link('logistics.html','خدمات النقل','Transport services')}</div></article><article class="support-story reveal"><div class="support-photo">{photo('materials','مواد بناء وتشطيب — صورة تعبيرية','Construction and finishing materials — illustrative image')}{pic_note()}</div><div class="support-text">{label('02','02')}{t('الخامة المناسبة.<br>في مكانها الصحيح.','The right material.<br>In the right place.','h3')}{t('مواد بناء، حجر ديكوري، ركام، أدوات كهربائية وسباكة وتأجير معدات. توريد يُنسّق مع متطلبات التنفيذ.','Building materials, decorative stone, aggregates, electrical and plumbing supplies, and equipment rental coordinated with execution needs.','p')}{link('supply.html','التوريد وتأجير المعدات','Materials & equipment')}</div></article></div></div></section>'''

def maintenance_feature():
    return f'''<section class="maintenance-feature"><div class="container-wide maintenance-layout"><div class="reveal">{label('العناية بما تم بناؤه','CARING FOR WHAT’S BUILT','07')}{t('للمبنى عمر.<br>وللعناية أثر.','Buildings have a life.<br>Care makes a difference.','h2')}{t('من كشف التسربات ومعالجة الرطوبة إلى عزل الأسطح والخزانات وأعمال الكهرباء والسباكة. خدمات صيانة حسب احتياج المكان.','From leak detection and damp treatment to roof and tank waterproofing, electrical and plumbing work. Maintenance around the needs of the place.','p')}{link('maintenance.html','اكتشف خدمات الصيانة','Explore maintenance','text-link')}</div><figure class="maintenance-photo">{photo('maintenance','فحص وصيانة مرافق المباني — صورة تعبيرية','Building facilities inspection and maintenance — illustrative image')}{pic_note()}</figure></div></section>'''

faq_items=[
 ('هل يمكن تنفيذ أكثر من خدمة في نفس المشروع؟','Can one project include several services?','نعم، يمكن مناقشة نطاق متكامل يشمل الإنشاء والتشطيبات والتوريد والنقل وتنسيق الموقع، أو اختيار خدمة مستقلة حسب احتياجك.','Yes. We can discuss an integrated scope spanning construction, fit-out, supplies, transport and landscaping, or a single service suited to your needs.'),
 ('ما المعلومات المطلوبة لمناقشة المشروع؟','What information helps us discuss your project?','ابدأ بنوع المشروع وموقعه ونطاق الأعمال المطلوب. المخططات والكميات والمواصفات، إن توفرت، تساعد على مناقشة المتطلبات بشكل أدق.','Start with the project type, location and required scope. Drawings, quantities and specifications, when available, help us discuss the requirements more precisely.'),
 ('هل تقدمون تجهيز المقاهي من الصفر؟','Do you provide complete café fit-outs?','تشمل خدماتنا تجهيز المقاهي من الصفر حتى تسليم المفتاح، مع أعمال التشطيبات والنجارة والديكور والأرضيات والأعمال المرتبطة بها وفق النطاق المتفق عليه.','Our services include turnkey café fit-outs, with finishes, joinery, interiors, flooring and related works within the agreed scope.'),
 ('هل تشمل خدمات الLandscape شبكات الري؟','Does landscaping include irrigation?','نعم، تشمل الزراعة وتوريد النباتات والنخيل، وتمديد شبكات الري والمحابس والصمامات وأنظمة التحكم، والصيانة الزراعية والمتابعة.','Yes. Services cover planting, plants and palms, irrigation networks, valves, controls, landscape maintenance and follow-up.'),
 ('كيف أطلب مناقشة أو عرضًا للمشروع؟','How can I request a project discussion or quotation?','املأ نموذج التواصل لتجهيز رسالة WhatsApp، أو تواصل معنا هاتفيًا أو بالبريد الإلكتروني. نراجع تفاصيل الطلب معك لتحديد الخطوة التالية.','Use the contact form to prepare a WhatsApp message, or reach us by phone or email. We review the details with you to identify the next step.')]

def faq():
    rows=''.join(f'<details class="faq-item"><summary>{t(a,b)}<span aria-hidden="true">+</span></summary>{t(c,d,"p")}</details>' for a,b,c,d in faq_items)
    return f'''<section class="faq-section section-space"><div class="container-wide faq-layout"><div class="reveal">{label('قبل أن نبدأ','BEFORE WE BEGIN')}{t('تفاصيل تهمّك.','A few useful details.','h2')}{t('إجابات مختصرة على أسئلة البداية. ولتفاصيل مشروعك، يسعدنا أن نتحدث معك.','A few answers to get started. For your project’s details, we’d be happy to talk.','p')}</div><div class="faq-list reveal">{rows}</div></div></section>'''

def sectors():
    rows=[('01','المساحات السكنية','Residential spaces','أعمال إنشاء وتشطيب وصيانة للمباني ومرافقها.','Construction, finishes and maintenance for buildings and their facilities.'),('02','المساحات التجارية','Commercial spaces','تجهيز المقاهي، التشطيبات، النجارة والأعمال الكهروميكانيكية.','Café fit-outs, finishes, joinery and MEP works.'),('03','المواقع والمساحات الخارجية','Sites & outdoor spaces','تجهيز الأرض، النقل، تنسيق المواقع وشبكات الري.','Ground preparation, transport, landscaping and irrigation.')]
    return f'''<section class="sectors section-space"><div class="container-wide">{heading('لكل مساحة، متطلباتها.','Every space has its own needs.','','','08','أين تتكامل خدماتنا','WHERE OUR SERVICES CONNECT')}<div class="sector-rows">{''.join(f'<div class="sector-row reveal"><span>{n}</span>{t(a,b,"h3")}{t(c,d,"p")}</div>' for n,a,b,c,d in rows)}</div></div></section>'''

def cta():
    return f'''<section class="page-cta"><div class="container-wide">{t('لديك مشروع في ذهنك؟<br>لنضع له بداية واضحة.','Have a project in mind?<br>Let’s give it a clear beginning.','h2')}{link('contact.html','تحدث معنا عن مشروعك','Tell us about your project','button button-dark')}</div></section>'''

def page_intro(ar,en,desc_ar,desc_en,img='',kicker=''):
    crumb=f'<nav class="breadcrumb-nav" aria-label="Breadcrumb">{link("index.html","الرئيسية","Home","breadcrumb-home")}<span>/</span>{t(ar,en)}</nav>'
    if img:
        return f'''<section class="page-intro with-photo">{photo(img,ar+' — صورة تعبيرية',en+' — illustrative image','intro-image',True)}<div class="intro-overlay"></div><div class="container-wide">{crumb}{label(kicker or 'فراس المجد',kicker or 'FIRAS AL MAJD')}{t(ar,en,'h1')}{t(desc_ar,desc_en,'p')}</div>{pic_note()}</section>'''
    return f'''<section class="page-intro"><div class="container-wide">{crumb}{label('فراس المجد','FIRAS AL MAJD')}{t(ar,en,'h1')}{t(desc_ar,desc_en,'p')}</div></section>'''

def about_page():
    intro=page_intro('البناء مسؤولية.<br>والتفاصيل وعد.','Building is a responsibility.<br>Details are a promise.','نحن شركة فراس المجد ونربط تخصصات البناء بخدمات الموقع','We connect construction disciplines with site services','hero')
    charter=f'''<section class="company-charter section-space"><div class="container-wide"><div class="charter-heading">{label('ما الذي يوجّه عملنا؟','WHAT GUIDES OUR WORK')}{t('نفهم الصورة الكبيرة.<br>ونعتني بأصغر التفاصيل.','We understand the big picture.<br>And care about the smallest detail.','h2')}</div><div class="charter-grid">{''.join(f'<article class="reveal"><span>0{i+1}</span>{t(a,b,"h3")}{t(c,d,"p")}</article>' for i,(a,b,c,d) in enumerate([('رؤية مترابطة','A connected view','ننظر إلى علاقة كل تخصص بالآخر، من أعمال الأرض إلى التشطيبات والمرافق.','We consider how each discipline connects, from groundworks to finishes and facilities.'),('وضوح في النطاق','Clarity of scope','نبدأ بمناقشة المتطلبات والمواصفات والأولويات قبل تحديد أعمال التنفيذ.','We start by discussing requirements, specifications and priorities before defining the work.'),('عناية في التنفيذ','Care in execution','نهتم بالتفاصيل وتنسيق الموقع، مع مراعاة الجودة والسلامة واحتياجات المتابعة.','We care about details and site coordination, considering quality, safety and follow-up needs.')]) )}</div></div></section>'''
    about_detail = about.replace('href="about.html"','href="approach.html"').replace('تعرّف علينا أكثر','تعرّف على رؤيتنا').replace('More about us','Discover our vision')
    return intro+about_detail+charter+sectors()+cta()

def services_page():
    gallery=service_gallery().replace('href="services.html"','href="#services"').replace('جميع الخدمات بالتفصيل','نطاق الخدمات بالتفصيل').replace('All services in detail','Explore each service scope')
    return page_intro('من الأرض،<br>إلى آخر تفصيلة.','From the ground up.<br>To the final detail.','استكشف خدماتنا واختر ما يناسب مشروعك','Explore our services and choose what fits your project','construction')+gallery+section('services').replace('href="#contact"','href="contact.html"')+faq()+cta()

def approach_page():
    steps=[('نفهم قبل أن نبدأ','Understand before starting','نحدد نوع المشروع والموقع والأولويات','We define the project type, location and priorities','بيانات الموقع · نطاق أولي · متطلبات الاستخدام','Site information · Initial scope · Intended use'),('نحوّل المتطلبات إلى خطة','Turn requirements into a plan','نراجع المخططات والمواد وتسلسل التنفيذ','We review drawings, materials and work sequencing','مواصفات واضحة · تنسيق تخصصات · جدول يناسب النطاق','Clear specifications · Discipline coordination · Scope-based schedule'),('نربط بين الفرق والموقع','Connect teams and site','ننسّق الأعمال والفرق ونتابع الجودة','We coordinate the work and teams while monitoring quality','متابعة أعمال · تنسيق توريد · مراجعة التفاصيل','Work follow-up · Supply coordination · Detail review'),('نراجع ثم نسلّم','Review, then hand over','نراجع الأعمال ونرتب التسليم والمتابعة','We review the work and arrange handover and follow-up','مراجعة نطاق الأعمال · ملاحظات التسليم · احتياجات المتابعة','Scope review · Handover observations · Follow-up needs')]
    rows=''.join(f'<article class="method-row reveal"><span class="method-number">0{i+1}</span><div>{t(a,b,"h2")}{t(c,d,"p")}{t(e,f,"small")}</div></article>' for i,(a,b,c,d,e,f) in enumerate(steps))
    return page_intro('وضوح من البداية.<br>عناية حتى التسليم.','Clear from the start.<br>Care through handover.','نبدأ بفهم المشروع ثم ننسّق كل مرحلة','We understand the project first, then coordinate each stage','materials')+f'<section class="section-space"><div class="container-wide method-layout"><aside>{label("رؤيتنا","OUR VISION")}{t("من الفكرة<br>إلى التنفيذ.","From the idea<br>to execution.","h2")}{photo("construction","أعمال إنشاء — صورة تعبيرية","Construction works — illustrative image")}</aside><div>{rows}</div></div></section>'+process+cta()

def contact_page():
    directions=f'''<section class="office-section section-space"><div class="container-wide office-layout"><div>{label('تواصل بالطريقة الأنسب لك','REACH US YOUR WAY')}{t('الرياض.<br>هنا نبدأ الحديث.','Riyadh.<br>Let’s start here.','h2')}{t('حي الملك عبدالعزيز، شارع ابن كثير، الرياض 12233، المملكة العربية السعودية.','King Abdulaziz District, Ibn Katheer Street, Riyadh 12233, Saudi Arabia.','p')}{link('https://www.google.com/maps/search/?api=1&query=King+Abdulaziz+District+Ibn+Katheer+Riyadh+12233','عرض المنطقة على الخريطة','View the area on a map')}</div><div class="contact-options"><a href="tel:+966503371820">{t('مكالمة مباشرة','A direct conversation','h3')}<span dir="ltr">+966 50 337 1820</span></a><a href="mailto:FIRAS-CH@FIRASALMAJD.COM">{t('المخططات والتفاصيل','Drawings & details','h3')}<span>FIRAS-CH@FIRASALMAJD.COM</span></a><a href="https://wa.me/966503371820" target="_blank" rel="noopener noreferrer">{t('ابدأ عبر WhatsApp','Start on WhatsApp','h3')}{t('تواصل مع فريقنا','Talk to our team')}</a></div></div></section>'''
    return page_intro('دعنا نسمع فكرتك.','Let’s hear your vision.','شاركنا احتياجك ونحدد معك الخطوة التالية','A new build, fit-out, supply or maintenance: share the details and let’s discuss the next step.')+contact+directions+faq()

requirements={
 'construction': [('نوع المنشأة وموقعها','Building type & location'),('المخططات الإنشائية والكميات إن توفرت','Structural drawings & quantities, if available'),('حالة الموقع والأعمال المطلوبة','Site condition & required works')],
 'fitout': [('مساحة المكان والاستخدام المطلوب','Space area & intended use'),('المخططات والتصور التصميمي إن توفرا','Drawings & design concept, if available'),('الخامات والتشطيبات المطلوبة','Required materials & finishes')],
 'logistics': [('نوع الحمولة والكميات','Load type & quantities'),('موقع التحميل والتفريغ','Loading & unloading locations'),('مواعيد النقل وإمكانية دخول الموقع','Transport schedule & site access')],
 'supply': [('أسماء المواد والمواصفات','Material names & specifications'),('الكميات أو نوع المعدات المطلوبة','Quantities or required equipment type'),('موقع التوريد والفترة المطلوبة','Delivery site & required period')],
 'landscape': [('مساحة الموقع وحالة التربة','Site area & soil conditions'),('مصدر المياه والزراعة المطلوبة','Water source & planting needs'),('نطاق شبكة الري والصيانة','Irrigation & maintenance scope')],
 'maintenance': [('نوع المبنى والمشكلة القائمة','Building type & current issue'),('صور أو وصف تفصيلي للحالة','Photos or a detailed description'),('موقع الأعمال وإمكانية المعاينة','Work location & inspection access')]
}

def detail_page(s):
    sid=s['id']
    scope=''.join(f'<li><span>0{i+1}</span>{t(a,b)}</li>' for i,(a,b) in enumerate(zip(s['arItems'],s['enItems'])))
    needs=''.join(f'<li>{t(a,b)}</li>' for a,b in requirements[sid])
    related_ids={'construction':['supply','logistics','maintenance'],'fitout':['supply','maintenance','landscape'],'logistics':['supply','construction','landscape'],'supply':['construction','fitout','logistics'],'landscape':['supply','logistics','maintenance'],'maintenance':['construction','fitout','landscape']}
    siblings=[next(x for x in services if x['id']==item) for item in related_ids[sid]]
    related=''.join(f'<a href="{x["id"]}.html">{t(x["arName"],x["enName"],"h3")}<span class="arrow" aria-hidden="true">↗</span></a>' for x in siblings)
    return page_intro(s['arName'],s['enName'],s['arDesc'],s['enDesc'],images[sid])+f'''<section class="detail-scope section-space"><div class="container-wide detail-grid"><div class="reveal">{label('نطاق الخدمة','SERVICE SCOPE')}{t('أعمال متكاملة.<br>وتفاصيل واضحة.','A connected scope.<br>Clear details.','h2')}{t(s['arDesc'],s['enDesc'],'p')}{link('contact.html?service='+sid,'ناقش هذه الخدمة معنا','Discuss this service','button button-gold')}</div><ul class="scope-list reveal">{scope}</ul></div></section><section class="request-prep section-space"><div class="container-wide prep-grid"><div>{label('خطوتك الأولى','YOUR FIRST STEP')}{t('ما الذي يساعدنا<br>على فهم طلبك؟','What helps us<br>understand your request?','h2')}{t('ابدأ بالمعلومات المتاحة ونكمل التفاصيل معًا','Start with what you have and we will complete the details together','p')}</div><div><ul>{needs}</ul>{link('contact.html?service='+sid,'ابدأ من هنا','Start the conversation')}</div></div></section><section class="related-section section-space"><div class="container-wide">{heading('خدمات تكمل الصورة.','Services that complete the picture.','','','','قد يحتاج مشروعك أيضًا','YOUR PROJECT MAY ALSO NEED')}<div class="related-links">{related}</div>{link('services.html','العودة لجميع الخدمات','Back to all services')}</div></section>'''+cta()

def projects_page():
    projects=[
      ('project-villa.png','فيلا سكنية معاصرة','Contemporary private villa','الرياض','Riyadh','مقاولات وتشطيبات خارجية','Construction and exterior finishes'),
      ('project-cafe.png','تجهيز مساحة تجارية','Commercial space fit-out','الرياض','Riyadh','تشطيبات وJoinery وأعمال MEP','Fit-out, joinery and MEP works'),
      ('project-landscape.png','تنسيق فناء سكني','Residential courtyard landscape','الرياض','Riyadh','Landscape وشبكات ري','Landscape and irrigation')]
    cards=''.join(f'''<article class="project-card reveal"><div class="project-card-image"><img src="assets/{image}" alt="{ar_title}" data-alt-ar="{ar_title}" data-alt-en="{en_title}" loading="lazy" width="1536" height="1024"></div><div class="project-card-copy"><div class="project-meta">{t(location_ar,location_en)}<span>—</span>{t(scope_ar,scope_en)}</div>{t(ar_title,en_title,'h2')}</div></article>''' for image,ar_title,en_title,location_ar,location_en,scope_ar,scope_en in projects)
    return page_intro('مشاريعنا','Our projects','نماذج مختارة من مجالات التنفيذ والتجهيز','Selected work across construction and fit-out','hero')+f'''<section class="projects-showcase section-space"><div class="container-wide"><div class="section-heading reveal"><div>{label('أعمال مختارة','SELECTED WORK')}{t('تفاصيل تصنع الفرق','Details make the difference','h2')}</div></div><div class="project-card-grid">{cards}</div></div></section>'''+cta()

def gallery_page():
    images=[
      ('project-villa.png','فيلا سكنية معاصرة','Contemporary private villa','wide'),
      ('project-cafe.png','تجهيز مساحة تجارية','Commercial fit-out','tall'),
      ('project-landscape.png','تنسيق فناء سكني','Residential courtyard landscape',''),
      ('construction.webp','أعمال إنشاء وتجهيز مواقع','Construction and site preparation',''),
      ('cafe.webp','تفاصيل تشطيبات داخلية','Interior fit-out details','wide'),
      ('courtyard.webp','Landscape ومساحات خارجية','Landscape and outdoor spaces','tall'),
      ('maintenance.webp','أعمال صيانة وتجهيز مرافق','Maintenance and facility works','')]
    items=''.join(f'''<button class="portfolio-item {size} reveal" type="button" data-gallery-src="assets/{image}" data-gallery-alt-ar="{ar_alt}" data-gallery-alt-en="{en_alt}"><img src="assets/{image}" alt="{ar_alt}" data-alt-ar="{ar_alt}" data-alt-en="{en_alt}" loading="lazy"><span>{t(ar_alt,en_alt)}</span></button>''' for image,ar_alt,en_alt,size in images)
    return page_intro('معرض الصور','Gallery','لقطات من مجالات البناء والتشطيبات وLandscape','A visual selection across construction, fit-out and landscape','courtyard')+f'''<section class="portfolio-section section-space"><div class="container-wide"><div class="portfolio-grid">{items}</div></div></section><dialog class="gallery-lightbox" id="galleryLightbox"><button class="gallery-close" type="button" aria-label="إغلاق" data-label="closeGallery">×</button><img id="galleryLightboxImage" src="assets/project-villa.png" alt="فيلا سكنية معاصرة"></dialog>'''

def careers_page():
    jobs=[
      ('site-engineer','مهندس موقع','Site engineer','دوام كامل','Full time','الرياض','Riyadh','إدارة أعمال الموقع ومتابعة التنفيذ والتنسيق اليومي','Manage site execution and daily coordination'),
      ('mep-engineer','مهندس MEP','MEP engineer','دوام كامل','Full time','الرياض','Riyadh','متابعة الأعمال الكهربائية والميكانيكية والسباكة','Coordinate electrical, mechanical and plumbing works'),
      ('procurement-officer','مسؤول مشتريات','Procurement officer','دوام كامل','Full time','الرياض','Riyadh','إدارة طلبات المواد والتوريد ومتابعة الموردين','Manage material requests, supply and vendor follow-up')]
    cards=''.join(f'''<article class="career-card reveal"><div class="career-meta">{t(type_ar,type_en)}<span>—</span>{t(location_ar,location_en)}</div>{t(title_ar,title_en,'h2')}{t(desc_ar,desc_en,'p')}<button class="button button-dark career-apply" type="button" data-job="{job_id}">{t('قدّم الآن','Apply now')}<span class="arrow" aria-hidden="true">↗</span></button></article>''' for job_id,title_ar,title_en,type_ar,type_en,location_ar,location_en,desc_ar,desc_en in jobs)
    options=''.join(f'''<option value="{job_id}" data-ar="{title_ar}" data-en="{title_en}">{title_ar}</option>''' for job_id,title_ar,title_en,*_ in jobs)
    return page_intro('الوظائف','Careers','انضم إلى فريق يعمل بوضوح واهتمام بالتفاصيل','Join a team focused on clarity and care','construction')+f'''<section class="career-board section-space"><div class="container-wide"><div class="section-heading reveal"><div>{label('الفرص المتاحة','OPEN ROLES')}{t('اختر الفرصة المناسبة','Choose your next opportunity','h2')}</div></div><div class="career-grid">{cards}</div></div></section><section class="career-application section-space" id="applicationSection" hidden><div class="container-wide application-layout"><div>{label('طلب التوظيف','APPLICATION')}{t('سجّل بياناتك','Tell us about yourself','h2')}{t('سنراجع بياناتك ونتواصل عند توافق الخبرة مع الوظيفة','We will review your details and contact matching candidates','p')}</div><form class="career-form" id="careerForm"><div class="career-form-grid"><label>{t('الاسم الكامل','Full name')}<input class="form-control" name="name" autocomplete="name" required maxlength="100"></label><label>{t('رقم الجوال','Mobile number')}<input class="form-control" name="phone" type="tel" autocomplete="tel" required maxlength="25"></label><label>{t('البريد الإلكتروني','Email')}<input class="form-control" name="email" type="email" autocomplete="email" required maxlength="160"></label><label>{t('الوظيفة','Position')}<select class="form-select" name="job" id="careerJob" required>{options}</select></label><label class="full">{t('سنوات الخبرة','Years of experience')}<input class="form-control" name="experience" type="number" min="0" max="50" required></label><label class="full">{t('نبذة مختصرة','Short profile')}<textarea class="form-control" name="summary" rows="4" maxlength="1000" required></textarea></label></div><button class="button button-gold" type="submit">{t('إرسال الطلب عبر WhatsApp','Send application via WhatsApp')}<span class="arrow" aria-hidden="true">↗</span></button><p class="form-status" id="careerFormStatus" role="status" aria-live="polite"></p></form></div></section>'''
def upcoming_page(ar, en, desc_ar, desc_en, image):
    return page_intro(ar,en,desc_ar,desc_en,image)+cta()

header=BeautifulSoup(str(base.header),'html.parser')
for brand in header.select('.brand'):
    brand['href']='index.html'
    brand.clear()
    brand.append(BeautifulSoup('<img class="stacked-logo" src="assets/logo-stacked.png" width="145" height="109" alt="Firas Al Majd — Construction & Development">','html.parser'))
for a in header.select('a[href^="#"]'):
    a['href']={'#home':'index.html','#about':'about.html','#services':'services.html','#projects':'projects.html','#gallery':'gallery.html','#careers':'careers.html','#approach':'approach.html','#contact':'contact.html'}.get(a['href'],a['href'])
head=str(base.head).replace('</head>','<link rel="stylesheet" href="pages.css?v=20260929-footer23">\n</head>')

def footer():
    return (ROOT/'tools/templates/footer.html').read_text(encoding='utf-8')

pages={
 'index':('نبني اليوم. نصنع الأثر.','Building today. Shaping tomorrow.',hero+about+service_gallery()+partners_section()+home_contact),
 'certificates':('الشهادات المعتمدة','Certifications',certificates_page()),
 'about':('من نحن','About us',about_page()),
 'services':('خدماتنا','Our services',services_page()),
 'approach':('رؤيتنا','Our vision',approach_page()),
 'contact':('تواصل معنا','Contact us',contact_page()),
 'projects':('المشاريع','Projects',projects_page()),
 'gallery':('معرض الصور','Gallery',gallery_page()),
 'careers':('الوظائف','Careers',careers_page())
}
for s in services: pages[s['id']]=(s['arName'],s['enName'],detail_page(s))
for name,(ar,en,content) in pages.items():
    content_tree=BeautifulSoup(content,'html.parser')
    crumb=content_tree.select_one('.breadcrumb-nav>span:last-child')
    if crumb:
        crumb.string=ar
        crumb['data-ar']=ar
        crumb['data-en']=en
    for image in content_tree.select('img[data-alt-ar]'):
        image['alt']=image['alt'].replace('<br>',' ')
        image['data-alt-ar']=image['data-alt-ar'].replace('<br>',' ')
        image['data-alt-en']=image['data-alt-en'].replace('<br>',' ')
    # Number the main narrative in the order it is read.
    if name=='index':
        for selector,number in [('.sectors .eyebrow>span:first-child','09 /')]:
            el=content_tree.select_one(selector)
            if el: el.string=number
    if name!='index':
        for intro in content_tree.select('.page-intro, .certificates-intro'):
            intro.decompose()
        page_heading=BeautifulSoup(t(ar,en,'h1','visually-hidden'),'html.parser')
        content_tree.insert(0,page_heading)
    content=str(content_tree)
    page_head=BeautifulSoup(head,'html.parser')
    page_head.title.string=f'فراس المجد | {ar}'
    page_head.select_one('meta[name="description"]')['content']=f'شركة فراس المجد العمرانية — {ar}. خدمات المقاولات والتشطيبات والنقل والتوريد والLandscape والصيانة في الرياض.'
    page_header=BeautifulSoup(str(header),'html.parser')
    active='services.html' if name in images else name+'.html'
    for a in page_header.select('.desktop-nav a, .mobile-nav a'):
        a.attrs.pop('class',None)
        if a['href']==active:
            a['class']='active'; a['aria-current']='page'
    loader='<div class="site-loader" id="siteLoader" role="status" aria-label="Loading"><img src="assets/logo-stacked.png" width="320" height="240" alt="Firas Al Majd"></div>' if name=='index' else ''
    output=f'''<!doctype html><html lang="ar" dir="rtl">{page_head}<body id="top" data-page="{name}" data-title-en="Firas Al Majd | {escape(en)}">{loader}<a class="skip-link" href="#main" data-i18n="skip">انتقل إلى المحتوى</a>{page_header}<main id="main">{content}</main>{footer()}<script src="assets/vendor/bootstrap.bundle.min.js"></script><script src="app.js?v=20260929-modal13"></script></body></html>'''
    # Inline vectors avoid iOS emoji presentation of Unicode arrow characters.
    diagonal_svg='<svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg>'
    up_svg='<svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>'
    output=output.replace('↗',diagonal_svg).replace('↑',up_svg)
    final_tree=BeautifulSoup(output,'html.parser')
    for node in list(final_tree.find_all(string=True)):
        if re.search(r'[\u0600-\u06ff]', str(node)):
            node.replace_with(str(node).replace('.', ''))
    for tag in final_tree.find_all(True):
        for attr, value in list(tag.attrs.items()):
            if isinstance(value, str) and re.search(r'[\u0600-\u06ff]', value):
                tag[attr] = value.replace('.', '')
    output=str(final_tree)
    (ROOT/f'{name}.html').write_text(output,encoding='utf-8')
print(f'Built {len(pages)} bilingual static pages.')
