'use strict';
const siteLoader = document.getElementById('siteLoader');
function hideSiteLoader() {
  if (!siteLoader || siteLoader.classList.contains('is-hidden')) return;
  siteLoader.classList.add('is-hidden');
  setTimeout(()=>siteLoader.remove(),500);
}
if (siteLoader) {
  if (document.readyState === 'complete') setTimeout(hideSiteLoader,700);
  else addEventListener('load',()=>setTimeout(hideSiteLoader,700),{once:true});
  setTimeout(hideSiteLoader,3000);
}

const translations = {
  en: {
    skip:'Skip to content', closeGallery:'Close gallery', brand:'Firas Al Majd', brandSub:'CONSTRUCTION & DEVELOPMENT', mainNav:'Main navigation', mobileNav:'Mobile navigation', menu:'Open navigation', navHome:'Home', navAbout:'About us', navServices:'Services', navProjects:'Projects', navGallery:'Gallery', navCareers:'Careers', navApproach:'Our vision', navContact:'Contact', startProject:'Contact us',
    heroEyebrow:'FIRAS AL MAJD CONSTRUCTION', heroLine1:'Firas Al Majd Urban Company', heroDesc:'From the first foundation to the finishing touch. Your partner in construction and development, with integrated solutions for your vision.', exploreServices:'Explore our services', talkToUs:'Let’s talk', scroll:'Discover what we can build', locationShort:'Riyadh, Saudi Arabia', illustration:'Illustrative architectural concept', heroAlt:'Contemporary stone architecture with warm lighting — illustrative concept', courtyardAlt:'Contemporary landscaped courtyard — illustrative concept',
    value1:'Built on trust',value2:'Driven by vision',value3:'Crafted with care',value4:'Made to last',
    aboutLabel:'WHO WE ARE',aboutLine1:'Beyond construction.',aboutLine2:'Towards lasting value.',aboutLead:'At Firas Al Majd, every project is a responsibility. Every detail is an opportunity to build well.',aboutBody:'Firas Al Majd Urban Company brings together general contracting, fit-outs and infrastructure, alongside transport, material supply and landscaping. We connect the needs of your project through one coordinated workflow, from site preparation to handover.',qualityTitle:'Quality in execution',qualityText:'Considered materials. Careful details.',commitmentTitle:'Committed at every stage',commitmentText:'Clear coordination. Consistent follow-up.',discoverApproach:'Discover our vision',visualCaption:'The difference is in the details.',
    servicesLabel:'OUR EXPERTISE',servicesLine1:'Ambitious visions.',servicesLine2:'Integrated solutions.',servicesIntro:'From the groundworks to the finishing touches, we bring the disciplines your project needs together.',discussNeeds:'Discuss your requirements',
    approachLabel:'A CLEAR VISION',approachTitle:'Every step, considered.',approachIntro:'Good construction starts with understanding. We work with you through clear stages, keeping the full picture in view.',step1Title:'Listen & understand',step1Text:'We discuss your vision and site requirements to define the scope and priorities.',step2Title:'Plan with precision',step2Text:'We outline the execution, materials and schedule around your project’s requirements.',step3Title:'Build & coordinate',step3Text:'We coordinate teams and supply, with attention to quality and safety on site.',step4Title:'Deliver with care',step4Text:'We review the work with you and coordinate maintenance and follow-up needs.',
    contactLabel:'LET’S BUILD SOMETHING THAT MATTERS',contactLine1:'Your next project',contactLine2:'starts with a conversation.',contactIntro:'Tell us what you have in mind. We’ll discuss the details and the services that suit your project.',phone:'CALL US',email:'EMAIL',visit:'OUR OFFICE',address:'King Abdulaziz District, Ibn Katheer St.<br>Riyadh 12233, Saudi Arabia',formTitle:'Tell us about your project',nameLabel:'Your name',namePlaceholder:'Full name',phoneLabel:'Mobile number',serviceLabel:'Required service',messageLabel:'Project brief',messagePlaceholder:'Project type, location and the details that matter to you…',formNote:'Prepare your message, then send it yourself through WhatsApp.',sendWhatsapp:'Continue to WhatsApp',openWhatsapp:'Open your message in WhatsApp',footerSlogan:'Multiple disciplines. One vision.',backTop:'Back to top',copyright:'Firas Al Majd Urban Company. All rights reserved.',selectService:'Choose a service',formReady:'Your message is ready. Review and send it in WhatsApp.',pageTitle:'Firas Al Majd | Building today. Shaping tomorrow.',metaDescription:'Firas Al Majd Urban Company — integrated construction, fit-out, infrastructure, logistics and landscaping services in Riyadh.'
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
    document.querySelectorAll('main section > .container-wide > .row > div, .charter-grid > article, .method-row, .office-layout > div, .detail-grid > *, .section-heading, .partners-heading').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.service-card-grid, .certificates-grid, .charter-grid').forEach(grid => [...grid.children].forEach((el, index) => el.style.setProperty('--reveal-delay', `${(index % 4) * 80}ms`)));
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  }
}

document.getElementById('projectForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const form = event.currentTarget;
  if(!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get('name').trim();
  const email = (data.get('email') || '').trim();
  const brief = data.get('message').trim();
  if(!name || !brief){const field=!name?document.getElementById('fullName'):document.getElementById('message');field.setCustomValidity(language==='ar'?'يرجى كتابة تفاصيل صحيحة':'Please enter valid details.');field.reportValidity();field.addEventListener('input',()=>field.setCustomValidity(''),{once:true});return;}
  const service = services.find(item=>item.id===data.get('service'));
  const text = language === 'ar' ? `مرحبًا فراس المجد، أرغب في مناقشة مشروع.\nالاسم: ${name}\nالجوال: ${data.get('phone')}${email ? '\nالبريد الإلكتروني: '+email : ''}\nالخدمة: ${service.arName}\nتفاصيل المشروع: ${brief}` : `Hello Firas Al Majd, I would like to discuss a project.\nName: ${name}\nPhone: ${data.get('phone')}${email ? '\nEmail: '+email : ''}\nService: ${service.enName}\nProject brief: ${brief}`;
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

// Local, RTL-aware partner carousel: native touch scrolling plus mouse drag.
const partnersSlider = document.querySelector('.partners-slider');
if (partnersSlider) {
  const section = partnersSlider.closest('.partners');
  const pauseButton = section.querySelector('.partner-pause');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let lastInteraction = 0;
  const interacted = () => { lastInteraction = performance.now(); };
  let inView = false;
  let drag = null;
  const direction = () => document.documentElement.dir === 'rtl' ? -1 : 1;
  const maxScroll = () => partnersSlider.scrollWidth - partnersSlider.clientWidth;
  const step = () => partnersSlider.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(partnersSlider).gap);
  const move = delta => {
    const max = maxScroll();
    const current = Math.abs(partnersSlider.scrollLeft);
    let target = current + delta * step();
    if (delta > 0 && current >= max - 2) target = 0;
    else if (delta < 0 && current <= 2) target = max;
    partnersSlider.scrollTo({left: direction() * Math.max(0, Math.min(max, target)), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  };
  const dots = section.querySelector('.partner-dots');
  let positions = [];
  const updateProgress = () => {
    const max = maxScroll();
    const count = Math.max(1, Math.ceil((max - 1) / step()) + 1);
    positions = Array.from({length: count}, (_, i) => Math.min(max, i * step()));
    if (dots.children.length !== count) {
      dots.replaceChildren(...positions.map((_, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'partner-dot';
        button.setAttribute('aria-label', `المجموعة ${index + 1} / Group ${index + 1}`);
        button.addEventListener('click', () => partnersSlider.scrollTo({left: direction() * positions[index], behavior: reducedMotion.matches ? 'instant' : 'smooth'}));
        return button;
      }));
    }
    const current = Math.abs(partnersSlider.scrollLeft);
    const active = positions.reduce((best, position, i) => Math.abs(position - current) < Math.abs(positions[best] - current) ? i : best, 0);
    [...dots.children].forEach((dot, index) => dot.setAttribute('aria-current', String(index === active)));
  };
  const updatePause = () => {
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'تشغيل الحركة / Play autoplay' : 'إيقاف الحركة / Pause autoplay');
  };
  section.querySelector('.partner-next').addEventListener('click', () => move(1));
  section.querySelector('.partner-prev').addEventListener('click', () => move(-1));
  pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
  section.addEventListener('click', interacted);
  section.addEventListener('keydown', interacted);
  partnersSlider.addEventListener('pointerdown', interacted, {passive: true});
  partnersSlider.addEventListener('pointerup', interacted, {passive: true});
  partnersSlider.addEventListener('scroll', updateProgress, {passive: true});
  partnersSlider.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move((event.key === 'ArrowRight' ? 1 : -1) * direction());
  });
  partnersSlider.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = {x: event.clientX, scroll: partnersSlider.scrollLeft};
    partnersSlider.setPointerCapture(event.pointerId);
    partnersSlider.classList.add('is-dragging');
  });
  partnersSlider.addEventListener('pointermove', event => {
    if (drag) partnersSlider.scrollLeft = drag.scroll - (event.clientX - drag.x);
  });
  const endDrag = () => { drag = null; partnersSlider.classList.remove('is-dragging'); };
  partnersSlider.addEventListener('pointerup', endDrag);
  partnersSlider.addEventListener('pointercancel', endDrag);
  partnersSlider.addEventListener('lostpointercapture', endDrag);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, {threshold: .25}).observe(partnersSlider);
  else inView = true;
  setInterval(() => { if (!paused && !drag && inView && !document.hidden && performance.now() - lastInteraction >= 3500) move(1); }, 3500);
  reducedMotion.addEventListener('change', event => { paused = event.matches; updatePause(); });
  new ResizeObserver(updateProgress).observe(partnersSlider);
  updatePause(); updateProgress();
}

const certificateDialog = document.querySelector('.certificate-dialog');
if (certificateDialog) {
  document.querySelectorAll('[data-certificate]').forEach(card => card.addEventListener('click', () => {
    certificateDialog.querySelector('img').src = card.dataset.certificate;
    certificateDialog.showModal();
  }));
  certificateDialog.querySelector('.certificate-close').addEventListener('click', () => certificateDialog.close());
  certificateDialog.addEventListener('click', event => { if (event.target === certificateDialog) { const r = certificateDialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) certificateDialog.close(); } });
}
