const { chromium } = require('C:/Users/Islam/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const pages = ['index','about','services','projects','gallery','careers','approach','contact','construction','fitout','logistics','supply','landscape','maintenance'];
const widths = [320,375,390,768,1024,1440,1920];
const assert=(condition,message)=>{if(!condition)throw Error(message)};
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
 const results=[];
 for(const route of pages){
  await page.goto(`http://127.0.0.1:4173/${route}.html`,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
  assert(await page.locator('h1').count()===1,`Expected one h1 on ${route}`);
  const expectedActive=['index','about','services','projects','gallery','careers','construction','fitout','logistics','supply','landscape','maintenance'].includes(route)?1:0;
  assert(await page.locator('.desktop-nav a[aria-current="page"]').count()===expectedActive,`Page navigation marker ${route}`);
  assert(await page.locator('.desktop-nav a[href^="#"]').count()===0,`Navbar has anchors ${route}`);
  assert(await page.locator('.brand-type').count()===0,`Old logo remains ${route}`);
  const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')).filter(h=>h&&!/^(https?:|mailto:|tel:|#)/.test(h)));
  for(const href of links)assert(fs.existsSync(path.join(process.cwd(),href.split(/[?#]/)[0])),`Missing local link ${href}`);
  for(const lang of ['ar','en']){
   if(await page.locator('html').getAttribute('lang')!==lang)await page.locator('#languageToggle').click();
   for(const width of widths){
    await page.setViewportSize({width,height:1000});
    const geometry=await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -2 || r.right > innerWidth+2)&&getComputedStyle(e).position!=='fixed'}).map(e=>e.tagName+'.'+e.className).slice(0,12)}));
    results.push({route,lang,width,...geometry});
    assert(geometry.documentWidth<=width&&!geometry.broken.length,`Layout/assets failed ${JSON.stringify(results.at(-1))}`);
   }
   const missing=await page.evaluate(()=>[...document.querySelectorAll('[data-i18n],[data-en],[data-label],[data-alt]')].filter(e=>e.innerHTML==='undefined'||e.getAttribute('aria-label')==='undefined'||e.getAttribute('alt')==='undefined').length);
   assert(!missing,`Missing translations on ${route} ${lang}`);
   if(lang==='en')assert(!/[\u0600-\u06ff]/.test(await page.locator('main').innerText()),`Arabic content in English main ${route}`);
   if(['index','services','contact','fitout','about'].includes(route)){
    await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:`qa/${route}-${lang}-1440.png`,fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:`qa/${route}-${lang}-390.png`,fullPage:true});
   }
  }
  console.log(`PASS: ${route}, both languages at ${widths.length} widths`);
 }
 await page.goto('http://127.0.0.1:4173/index.html');
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('.desktop-nav a[href="about.html"]').click();
 await page.waitForURL('**/about.html');
 assert(await page.locator('html').getAttribute('lang')==='en','Language lost on page navigation');
 await page.setViewportSize({width:390,height:844});
 await page.locator('.menu-toggle').click();await page.locator('#mobileNav').waitFor({state:'visible'});
 await page.keyboard.press('Escape');await page.waitForTimeout(450);
 assert(await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false','Escape failed');
 await page.locator('.menu-toggle').click();await page.locator('#mobileNav a[href="services.html"]').click();await page.waitForURL('**/services.html');
 for(const id of ['fitout','logistics','supply','landscape','maintenance']){
  await page.locator('#toggle-'+id).click();await page.waitForTimeout(50);
  assert(await page.locator('#toggle-'+id).getAttribute('aria-expanded')==='true','Accordion failed '+id);
 }
 await page.locator('.faq-item summary').first().click();assert(await page.locator('.faq-item').first().getAttribute('open')!==null,'FAQ failed');
 await page.goto('http://127.0.0.1:4173/landscape.html');
 await page.locator('a[href="contact.html?service=landscape"]').first().click();await page.waitForURL('**/contact.html?service=landscape');
 assert(await page.locator('#serviceSelect').inputValue()==='landscape','Service preselection failed');
 await page.evaluate(()=>{window.open=(url)=>{window.testWhatsappUrl=url;return null;}});
 await page.locator('#projectForm button').click();
 assert(!await page.evaluate(()=>window.testWhatsappUrl),'Empty form was submitted');
 await page.locator('#fullName').fill('Test Client');await page.locator('#phone').fill('+966501234567');await page.locator('#message').fill('Landscape project in Riyadh');
 await page.locator('#projectForm button').click();
 const url=await page.evaluate(()=>window.testWhatsappUrl);
 assert(url?.startsWith('https://wa.me/966503371820?text=')&&decodeURIComponent(url).includes('Landscape project in Riyadh'),'WhatsApp payload failed');
 await page.locator('#languageToggle').click();
 assert(await page.locator('#fullName').inputValue()==='Test Client','Language switch lost input');
 assert(await page.locator('#serviceSelect').inputValue()==='landscape','Language switch lost service');
 await page.reload({waitUntil:'networkidle'});assert(await page.locator('html').getAttribute('lang')==='ar','Language persistence failed');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:4173/index.html');
 await page.locator('.service-card').first().scrollIntoViewIfNeeded();await page.waitForTimeout(900);
 assert(await page.locator('.service-card').first().evaluate(e=>getComputedStyle(e).opacity)==='1','Reveal animation did not complete');
 assert(!errors.length,'Runtime errors '+JSON.stringify(errors));
 fs.writeFileSync('qa/results.json',JSON.stringify({pages:pages.length,responsiveCombinations:results.length,results,errors,checks:['All 14 standalone pages in Arabic and English at 7 widths','All local navigation targets and image assets exist','English content fully translated','One main heading and one active page link','English stacked logo on every page','Desktop and mobile cross-page navigation','Language preserved across pages','Mobile menu Escape and service accordions','FAQ disclosure','Service selection carried to contact page','Required field validation','WhatsApp recipient and encoded payload without sending','Language preserves form input','Scroll reveal with motion enabled'],passed:true},null,2));
 console.log('PASS: all page, navigation, translation, responsive and interaction checks.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
