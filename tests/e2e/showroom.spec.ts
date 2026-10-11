import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { products } from '../../src/content/products';
const routes=['/','/gemstones/','/privacy-policy/',...products.map(p=>`/gemstones/${p.slug}/`)];
for (const route of routes) {
 test(`route, SEO and media: ${route}`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  const response=await page.goto(route);expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.{30,}/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://tz-gems-editorial.syedmukhtar-patan.chatgpt.site${route}`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await page.evaluate(async()=>{await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));});
  expect(await page.locator('img').evaluateAll(images=>images.every(i=>(i as HTMLImageElement).naturalWidth>0&&i.getAttribute('alt')))).toBe(true);
  expect(errors).toEqual([]);
 });
}
for(const width of [360,390,768,1024,1440]) {
 for(const route of ['/','/gemstones/','/gemstones/oval-blue-violet-study/']) {
  test(`no overflow: ${width}px ${route}`,async({page})=>{
   await page.setViewportSize({width,height:900});await page.goto(route);await page.waitForLoadState('networkidle');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const buttons=page.getByRole('button',{name:'Open WhatsApp enquiry'});await expect(buttons).toBeVisible();
  });
 }
}
test('catalogue combines search, facets, URL history, sorting and reset',async({page})=>{
 await page.goto('/gemstones/');const status=page.locator('.result-heading [role="status"]');
 await expect(status).toContainText('6 gemstones');
 await page.getByRole('searchbox',{name:'Search gemstones'}).fill('oval');await expect(status).toContainText('2 gemstones');
 await page.getByLabel('Category',{exact:true}).selectOption('rough');await expect(status).toContainText('0 gemstones');await expect(page.getByRole('heading',{name:'No gemstones match this view.'})).toBeVisible();
 await page.getByRole('button',{name:'Reset filters',exact:true}).click();await expect(status).toContainText('6 gemstones');
 await page.getByLabel('Category',{exact:true}).selectOption('cut-polished');
 await page.getByRole('radio',{name:'Deep blue',exact:true}).click();await expect(page.getByRole('radio',{name:'Deep blue',exact:true})).toBeChecked();
 await page.getByLabel('Shape',{exact:true}).selectOption('Emerald');
 await page.getByLabel('Availability',{exact:true}).selectOption('demonstration');
 await page.getByLabel('Sort by',{exact:true}).selectOption('name');await expect(status).toContainText('2 gemstones');
 await expect(page).toHaveURL(/category=cut-polished.*colour=deep-blue.*shape=Emerald.*availability=demonstration.*sort=name/);
 await page.reload();await expect(status).toContainText('2 gemstones');
 await expect(page.locator('.catalogue-results h3').first()).toHaveText('Emerald Deep Blue');
 await page.getByLabel('Treatment',{exact:true}).selectOption('unheated');await expect(status).toContainText('0 gemstones');
 await page.goBack();await expect(status).toContainText('2 gemstones');
 await page.getByRole('button',{name:'Reset all',exact:true}).click();await expect(status).toContainText('6 gemstones');await expect(page).toHaveURL(/\/gemstones\/$/);
 await page.getByLabel('Carat weight',{exact:true}).selectOption('5-plus');await expect(status).toContainText('0 gemstones');
});
test('product demo message, copy fallback, modal focus and image enlargement',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await page.goto('/gemstones/oval-blue-violet-study/');
 const trigger=page.getByRole('button',{name:'Enquire about Oval Blue-Violet (DEMO-001)',exact:true});await trigger.click();
 const dialog=page.getByRole('dialog',{name:'Let’s talk Tanzanite.'});await expect(dialog).toBeVisible();
 await expect(page.getByRole('textbox',{name:'Your prepared enquiry'})).toHaveValue(/Oval Blue-Violet demonstration \(Ref: DEMO-001\).*genuine/);
 await expect(page.getByRole('button',{name:'Close enquiry'})).toBeFocused();
 await page.keyboard.press('Shift+Tab');await expect(page.getByRole('link',{name:'Visit Instagram'})).toBeFocused();
 await page.getByRole('button',{name:'Copy enquiry',exact:true}).click();await expect(dialog.getByRole('status')).toHaveText('Enquiry copied.');
 expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('DEMO-001');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();
 await page.getByRole('button',{name:'Enlarge Oval Blue-Violet'}).click();await expect(page.getByRole('dialog',{name:'Oval Blue-Violet image viewer'})).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Enlarge Oval Blue-Violet'})).toBeFocused();
});
test('clipboard refusal leaves a selectable message and guidance',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw new Error('Permission denied');}}}));
 await page.goto('/');await page.getByRole('button',{name:'Open WhatsApp enquiry'}).click();await page.getByRole('button',{name:'Copy enquiry',exact:true}).click();
 await expect(page.getByRole('dialog').getByRole('status')).toHaveText('Select and copy the message above.');
 await expect(page.getByRole('textbox',{name:'Your prepared enquiry'})).toBeFocused();
});
test('mobile menu traps focus, supports Escape, and closes on anchor navigation',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const menu=page.getByRole('button',{name:'Open navigation menu'});await menu.click();
 const dialog=page.getByRole('dialog',{name:'Navigation menu'});await expect(dialog).toBeVisible();await expect(menu).toHaveAttribute('aria-expanded','true');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(menu).toBeFocused();
 await menu.click();await dialog.getByRole('link',{name:/Our Story/}).click();await expect(page).toHaveURL(/#our-story$/);await expect(dialog).not.toBeVisible();
 await page.goto('/gemstones/?category=rough');await expect(page.locator('.catalogue-results .product-card')).toHaveCount(2);
 await page.getByRole('button',{name:/^Filters/}).click();await expect(page.getByLabel('Category',{exact:true})).toBeVisible();
});
test('testimonial placeholder carousel supports buttons, keyboard and reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await page.getByRole('button',{name:'Next testimonial'}).click();await expect(page.locator('.testimonial-quote')).toHaveText('Words, shared with permission.');
 await page.locator('.testimonial-carousel').press('ArrowRight');await expect(page.locator('.testimonial-quote')).toHaveText('A conversation worth having.');
 await page.getByRole('button',{name:'Previous testimonial'}).click();await expect(page.locator('.testimonial-quote')).toHaveText('Words, shared with permission.');
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
test('custom 404 and indexing safeguards',async({page,request})=>{
 const response=await page.goto('/not-an-inventory-item/');expect(response?.status()).toBe(404);await expect(page.getByRole('heading',{name:'A little off the facet.'})).toBeVisible();
 await page.getByRole('link',{name:'Explore the collection'}).click();await expect(page).toHaveURL(/\/gemstones\/$/);
 expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
 expect(await (await request.get('/sitemap.xml')).text()).not.toContain('<loc>');
});
for(const route of ['/','/gemstones/','/gemstones/oval-blue-violet-study/','/privacy-policy/','/not-an-inventory-item/']) {
 test(`automated accessibility: ${route}`,async({page})=>{
  await page.goto(route);await page.waitForLoadState('networkidle');
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
 });
}
test('mobile dialog accessibility',async({page})=>{
 await page.setViewportSize({width:360,height:800});await page.goto('/');await page.getByRole('button',{name:'Open WhatsApp enquiry'}).click();
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});
