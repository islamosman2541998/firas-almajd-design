'use strict';
const siteLoader = document.getElementById('siteLoader');
function hideSiteLoader() {
  if (!siteLoader || siteLoader.classList.contains('is-hidden')) return;
  siteLoader.classList.add('is-hidden');
  try { sessionStorage.setItem('fam-loader-seen','1'); } catch {}
  setTimeout(()=>siteLoader.remove(),500);
}
let loaderSeen = false;
try { loaderSeen = sessionStorage.getItem('fam-loader-seen') === '1'; } catch {}
if (loaderSeen) {
  siteLoader?.remove();
} else {
  if (document.readyState === 'complete') setTimeout(hideSiteLoader,300);
  else addEventListener('load',()=>setTimeout(hideSiteLoader,300),{once:true});
  setTimeout(hideSiteLoader,3000);
}

const translations = {
  en: {
    skip:'Skip to content', closeGallery:'Close gallery', brand:'Firas Al Majd', brandSub:'CONSTRUCTION & DEVELOPMENT', mainNav:'Main navigation', mobileNav:'Mobile navigation', menu:'Open navigation', navHome:'Home', navAbout:'About us', navServices:'Services', navProjects:'Projects', navGallery:'Gallery', navCareers:'Careers', navApproach:'Our vision', navContact:'Contact', startProject:'Contact us',
    heroEyebrow:'FIRAS AL MAJD CONSTRUCTION', heroLine1:'Building today.', heroLine2:'Shaping tomorrow.', heroDesc:'From the first foundation to the finishing touch. Your partner in construction and development, with integrated solutions for your vision.', exploreServices:'Explore our services', talkToUs:'Let’s talk', scroll:'Discover what we can build', locationShort:'Riyadh, Saudi Arabia', illustration:'Illustrative architectural concept', heroAlt:'Contemporary stone architecture with warm lighting — illustrative concept', courtyardAlt:'Contemporary landscaped courtyard — illustrative concept',
    value1:'Built on trust',value2:'Driven by vision',value3:'Crafted with care',value4:'Made to last',
    aboutLabel:'WHO WE ARE',aboutLine1:'Beyond construction.',aboutLine2:'Towards lasting value.',aboutLead:'At Firas Al Majd, every project is a responsibility. Every detail is an opportunity to build well.',aboutBody:'Firas Al Majd Construction brings together general contracting, fit-outs and infrastructure, alongside transport, material supply and landscaping. We connect the needs of your project through one coordinated workflow, from site preparation to handover.',qualityTitle:'Quality in execution',qualityText:'Considered materials. Careful details.',commitmentTitle:'Committed at every stage',commitmentText:'Clear coordination. Consistent follow-up.',discoverApproach:'Discover our vision',visualCaption:'The difference is in the details.',
    servicesLabel:'OUR EXPERTISE',servicesLine1:'Ambitious visions.',servicesLine2:'Integrated solutions.',servicesIntro:'From the groundworks to the finishing touches, we bring the disciplines your project needs together.',serviceHelp:'Need more than one specialty? Let’s coordinate the complete solution.',discussNeeds:'Discuss your requirements',
    approachLabel:'A CLEAR VISION',approachTitle:'Every step, considered.',approachIntro:'Good construction starts with understanding. We work with you through clear stages, keeping the full picture in view.',step1Title:'Listen & understand',step1Text:'We discuss your vision and site requirements to define the scope and priorities.',step2Title:'Plan with precision',step2Text:'We outline the execution, materials and schedule around your project’s requirements.',step3Title:'Build & coordinate',step3Text:'We coordinate teams and supply, with attention to quality and safety on site.',step4Title:'Deliver with care',step4Text:'We review the work with you and coordinate maintenance and follow-up needs.',
    contactLabel:'LET’S BUILD SOMETHING THAT MATTERS',contactLine1:'Your next project',contactLine2:'starts with a conversation.',contactIntro:'Tell us what you have in mind. We’ll discuss the details and the services that suit your project.',phone:'CALL US',email:'EMAIL',visit:'OUR OFFICE',address:'King Abdulaziz District, Ibn Katheer St.<br>Riyadh 12233, Saudi Arabia',formTitle:'Tell us about your project',nameLabel:'Your name',namePlaceholder:'Full name',phoneLabel:'Mobile number',serviceLabel:'Required service',messageLabel:'Project brief',messagePlaceholder:'Project type, location and the details that matter to you…',formNote:'Prepare your message, then send it yourself through WhatsApp.',sendWhatsapp:'Continue to WhatsApp',openWhatsapp:'Open your message in WhatsApp',footerSlogan:'Built on trust. Made to last.',backTop:'Back to top',copyright:'Firas Al Majd Construction. All rights reserved.',selectService:'Choose a service',formReady:'Your message is ready. Review and send it in WhatsApp.',pageTitle:'Firas Al Majd | Building today. Shaping tomorrow.',metaDescription:'Firas Al Majd Construction — integrated construction, fit-out, infrastructure, logistics and landscaping services in Riyadh.'
  }, ar: {}
};
document.querySelectorAll('[data-i18n]').forEach(el => { translations.ar[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-placeholder]').forEach(el => { translations.ar[el.dataset.placeholder] = el.placeholder; });
document.querySelectorAll('[data-alt]').forEach(el => { translations.ar[el.dataset.alt] = el.alt; });
document.querySelectorAll('[data-label]').forEach(el => { translations.ar[el.dataset.label] = el.getAttribute('aria-label'); });
Object.assign(translations.ar, { selectService:'اختر الخدمة المناسبة',formReady:'رسالتك جاهزة راجعها وأرسلها في WhatsApp',pageTitle:document.title,metaDescription:document.querySelector('meta[name="description"]').content });

const services = [
  {id:'construction', enName:'Construction & infrastructure', arName:'المقاولات والبنية التحتية', arDesc:'تنفيذ الإنشاءات وتجهيز المواقع وفق نطاق المشروع', enDesc:'Construction and site preparation tailored to the project scope', arItems:['الإنشاءات والأعمال الخرسانية','أسقف Post-Tension','الحفر والردم والهدم والترحيل','الأسفلت وأعمال البنية التحتية'], enItems:['Structural and concrete works','Post-tensioned slabs','Excavation, backfilling & demolition','Asphalt & infrastructure']},
  {id:'fitout', enName:'Fit-out & interior works', arName:'التشطيبات والتجهيز الداخلي', arDesc:'تشطيبات وتجهيز متكامل لمساحات جاهزة للاستلام', enDesc:'Complete fit-out for spaces ready for handover', arItems:['تجهيز المقاهي وتسليم مفتاح','أعمال Joinery والأثاث والديكور','تركيب الأرضيات والمطابخ','الدهانات وتشطيب الواجهات'], enItems:['Turnkey café fit-outs','Joinery, furniture & interiors','Flooring & kitchen installation','Painting & façade finishes']},
  {id:'logistics', enName:'Transport & logistics', arName:'النقل والخدمات اللوجستية', arDesc:'نقل المياه والمواد بما يناسب احتياجات الموقع', enDesc:'Water and material transport suited to site needs', arItems:['نقل المياه للمشروعات','Flatbed Trailers والقلابات','تناكر Fire Truck','نقل مواد البناء والركام'], enItems:['Project water transport','Flatbed trailers & tipper trucks','Fire truck water tankers','Building materials & aggregate transport']},
  {id:'supply', enName:'Materials & equipment', arName:'توريد المواد وتأجير المعدات', arDesc:'توريد مواد وأدوات ومعدات المشروعات', enDesc:'Materials, tools and equipment for project sites', arItems:['مواد البناء والحجر الديكوري','Base Course وSubbase وCrushed Sand','الأدوات الكهربائية والسباكة','تأجير معدات المشروعات'], enItems:['Building materials & decorative stone','Base course, sub-base & crushed sand','Electrical & plumbing supplies','Project equipment rental']},
  {id:'landscape', enName:'Landscape & irrigation', arName:'تنسيق المواقع وشبكات الري', arDesc:'أعمال Landscape وشبكات ري تناسب الموقع والمناخ', enDesc:'Green spaces suited to site conditions and Riyadh’s climate, from soil preparation and planting to irrigation and maintenance.', arItems:['توريد وزراعة النجيل والنباتات','الأشجار المعمرة وأنواع النخيل','شبكات الري والتحكم وTimers','معالجة الملوحة والصيانة الزراعية'], enItems:['Turf & plant supply and planting','Mature trees & palm varieties','Irrigation networks, controls & timers','Salinity treatment & landscape care']},
  {id:'maintenance', enName:'Maintenance & MEP', arName:'الصيانة والأعمال الكهروميكانيكية', arDesc:'صيانة للمباني والمرافق حسب احتياج الموقع', enDesc:'Building and facility maintenance tailored to site needs', arItems:['أعمال الكهرباء والميكانيكا والسباكة','كشف تسربات المياه','معالجة التشققات والرطوبة','عزل الأسطح والخزانات'], enItems:['Electrical, mechanical & plumbing works','Water leak detection','Crack & damp treatment','Roof & tank waterproofing']}
];
let language = 'ar';
try { if(localStorage.getItem('fam-language') === 'en') language = 'en'; } catch { /* Preferences are optional. */ }
function renderServices() {
  const expanded = document.querySelector('.service-panel.show')?.id || 'service-construction';
  const accordion = document.getElementById('servicesAccordion');
  if (accordion) accordion.innerHTML = services.map((service, index) => {
    const open = expanded === `service-${service.id}`;
    return `<div class="service-item"><h3 class="m-0"><button class="service-toggle${open?'':' collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#service-${service.id}" aria-expanded="${open}" aria-controls="service-${service.id}" id="toggle-${service.id}"><span class="service-number">0${index+1}</span><span class="service-name">${service[language+'Name']}</span><span class="service-en" lang="en" aria-hidden="true">${service.enName}</span><span class="service-plus" aria-hidden="true"></span></button></h3><div id="service-${service.id}" class="service-panel collapse${open?' show':''}" data-bs-parent="#servicesAccordion" role="region" aria-labelledby="toggle-${service.id}"><div class="service-content"><p>${service[language+'Desc']}</p><ul>${service[language+'Items'].map(item=>`<li>${item}</li>`).join('')}</ul></div></div></div>`;
  }).join('');
  const select = document.getElementById('serviceSelect');
  if (!select) return;
  const selected = select.value;
  select.innerHTML = `<option value="">${translations[language].selectService}</option>`+services.map(service=>`<option value="${service.id}">${service[language+'Name']}</option>`).join('');
  select.value = selected;
}
function setLanguage(next) {
  language = next;
  const strings = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=strings[el.dataset.i18n];});
  document.querySelectorAll('[data-placeholder]').forEach(el=>{el.placeholder=strings[el.dataset.placeholder];});
  document.querySelectorAll('[data-alt]').forEach(el=>{el.alt=strings[el.dataset.alt];});
  document.querySelectorAll('[data-label]').forEach(el=>{el.setAttribute('aria-label',strings[el.dataset.label]);});
  document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.innerHTML=el.dataset[language];});
  document.querySelectorAll('[data-alt-en]').forEach(el=>{el.alt=language==='ar'?el.dataset.altAr:el.dataset.altEn;});
  document.getElementById('languageText').textContent = language === 'ar' ? 'EN' : 'عربي';
  document.getElementById('languageToggle').setAttribute('aria-label',language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = language === 'en' && document.body.dataset.titleEn ? document.body.dataset.titleEn : strings.pageTitle;
  document.querySelector('meta[name="description"]').content = strings.metaDescription;
  if (document.getElementById('formStatus')?.textContent) document.getElementById('formStatus').textContent = strings.formReady;
  renderServices();
  try {localStorage.setItem('fam-language',language);} catch { /* Site remains usable without storage. */ }
}
document.getElementById('languageToggle').addEventListener('click',()=>setLanguage(language==='ar'?'en':'ar'));
setLanguage(language);
const requestedService = new URLSearchParams(location.search).get('service');
if (services.some(service=>service.id===requestedService) && document.getElementById('serviceSelect')) document.getElementById('serviceSelect').value=requestedService;
document.getElementById('year').textContent = new Date().getFullYear();

const mobileNav = document.getElementById('mobileNav');
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>bootstrap.Collapse.getOrCreateInstance(mobileNav,{toggle:false}).hide()));
document.addEventListener('keydown',event=>{if(event.key!=='Escape'||document.querySelector('.menu-toggle').getAttribute('aria-expanded')!=='true')return;const collapse=bootstrap.Collapse.getOrCreateInstance(mobileNav,{toggle:false});const close=()=>{collapse.hide();document.querySelector('.menu-toggle').focus();};if(mobileNav.classList.contains('collapsing'))mobileNav.addEventListener('shown.bs.collapse',close,{once:true});else close();});
const desktopMedia = matchMedia('(min-width: 992px)');
desktopMedia.addEventListener('change',event=>{if(event.matches)bootstrap.Collapse.getOrCreateInstance(mobileNav,{toggle:false}).hide();});

if ('IntersectionObserver' in window) {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('js-motion');
    const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  }
}

document.getElementById('projectForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const form = event.currentTarget;
  if(!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get('name').trim();
  const brief = data.get('message').trim();
  if(!name || !brief){const field=!name?document.getElementById('fullName'):document.getElementById('message');field.setCustomValidity(language==='ar'?'يرجى كتابة تفاصيل صحيحة':'Please enter valid details.');field.reportValidity();field.addEventListener('input',()=>field.setCustomValidity(''),{once:true});return;}
  const service = services.find(item=>item.id===data.get('service'));
  const text = language === 'ar' ? `مرحبًا فراس المجد، أرغب في مناقشة مشروع.\nالاسم: ${name}\nالجوال: ${data.get('phone')}\nالخدمة: ${service.arName}\nتفاصيل المشروع: ${brief}` : `Hello Firas Al Majd, I would like to discuss a project.\nName: ${name}\nPhone: ${data.get('phone')}\nService: ${service.enName}\nProject brief: ${brief}`;
  const url = 'https://wa.me/966503371820?text='+encodeURIComponent(text);
  const fallback = document.getElementById('whatsappFallback');
  fallback.href=url;fallback.hidden=false;
  document.getElementById('formStatus').textContent=translations[language].formReady;
  window.open(url,'_blank','noopener,noreferrer');
});

const galleryDialog = document.getElementById('galleryLightbox');
const galleryImage = document.getElementById('galleryLightboxImage');
document.querySelectorAll('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{
  galleryImage.src=button.dataset.gallerySrc;
  galleryImage.alt=language==='ar'?button.dataset.galleryAltAr:button.dataset.galleryAltEn;
  galleryDialog.showModal();
}));
document.querySelector('.gallery-close')?.addEventListener('click',()=>galleryDialog.close());
galleryDialog?.addEventListener('click',event=>{if(event.target===galleryDialog)galleryDialog.close();});

const applicationSection = document.getElementById('applicationSection');
const careerJob = document.getElementById('careerJob');
document.querySelectorAll('.career-apply').forEach(button=>button.addEventListener('click',()=>{
  applicationSection.hidden=false;
  careerJob.value=button.dataset.job;
  applicationSection.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  setTimeout(()=>applicationSection.querySelector('input')?.focus(),450);
}));
document.getElementById('careerForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const job=careerJob.options[careerJob.selectedIndex].text;
  const message=language==='ar'
    ?`مرحبًا فراس المجد، أرغب في التقديم على وظيفة\nالوظيفة: ${job}\nالاسم: ${data.get('name')}\nالجوال: ${data.get('phone')}\nالبريد: ${data.get('email')}\nسنوات الخبرة: ${data.get('experience')}\nنبذة: ${data.get('summary')}`
    :`Hello Firas Al Majd, I would like to apply for a position\nPosition: ${job}\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nYears of experience: ${data.get('experience')}\nProfile: ${data.get('summary')}`;
  document.getElementById('careerFormStatus').textContent=language==='ar'?'طلبك جاهز للإرسال عبر WhatsApp':'Your application is ready to send via WhatsApp';
  window.open('https://wa.me/966503371820?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
});
// Keep navigation page-based. The small progress line reflects reading position only.
const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden','true');
document.getElementById('header').append(progress);
let scrollQueued = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1,scrollY/distance) : 0})`;
  scrollQueued = false;
}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress);}}, {passive:true});
addEventListener('resize',updateProgress);
updateProgress();
