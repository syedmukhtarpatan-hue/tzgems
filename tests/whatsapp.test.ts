import { test } from 'node:test';
import assert from 'node:assert/strict';
import { brand } from '../src/content/brand.ts';
import { enquiryMessage, whatsappHref } from '../src/lib/whatsapp.ts';
test('demo configuration never produces an outbound WhatsApp destination',()=>{
 assert.equal(brand.whatsappNumber,null);
 assert.equal(brand.demoMode,true);
 assert.equal(whatsappHref(brand.whatsappNumber,enquiryMessage()),null);
});
test('unset and malformed numbers fail closed',()=>{
 for(const value of [null,'','demo','123','0000000000','+1234567abc','https://wa.me/12345678']) assert.equal(whatsappHref(value,'hello'),null);
});
test('product enquiry identifies its exact reference and demonstration status',()=>{
 const message=enquiryMessage({name:'Oval Blue-Violet',reference:'DEMO-001',demonstration:true});
 assert.match(message,/Oval Blue-Violet/);assert.match(message,/DEMO-001/);assert.match(message,/demonstration/);assert.match(message,/genuine/);
});
test('genuine-product wording asks for information and availability',()=>{
 const message=enquiryMessage({name:'Verified test specimen',reference:'TEST-001'});
 assert.match(message,/TEST-001/);assert.match(message,/availability/);assert.doesNotMatch(message,/demonstration/);
});
test('encoding round-trips international text and reserved URL characters',()=>{
 // Reserved fictional NANP number, test fixture only. Never used in site config.
 const message='Hello TZ GEMS! Blue & violet? Ref: TEST/001 — 蓝';
 const href=whatsappHref('+1 (202) 555-0100',message);
 assert.ok(href);
 const url=new URL(href);
 assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/12025550100');assert.equal(url.searchParams.get('text'),message);
});
