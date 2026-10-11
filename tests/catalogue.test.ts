import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaultFilters, filterProducts, parseFilters, serializeFilters, activeFilters } from '../src/lib/catalogue.ts';
import { products } from '../src/content/products.ts';
import type { Product } from '../src/content/types.ts';
const filtered = (query:string) => filterProducts(products,parseFilters(new URLSearchParams(query)));
test('default catalogue shows six unique demonstration references without inventing specs',()=>{
 assert.equal(filtered('').length,6);
 assert.equal(new Set(products.map(p=>p.reference)).size,products.length);
 assert.equal(new Set(products.map(p=>p.slug)).size,products.length);
 assert.ok(products.every(p=>p.demonstration && p.availability==='demonstration' && p.carats===undefined && p.treatment===undefined && !p.certificateIds?.length));
});
test('search supports references, names and case-insensitive shape matching',()=>{
 assert.deepEqual(filtered('q=demo-002').map(p=>p.reference),['DEMO-002']);
 assert.equal(filtered('q=%20OVAL%20').length,2);
 assert.equal(filtered('q=Tanzanite').length,6);
});
test('combined filters intersect instead of broadening results',()=>{
 assert.equal(filtered('category=cut-polished&colour=deep-blue&shape=Emerald&availability=demonstration').length,2);
 assert.equal(filtered('category=rough&shape=Oval').length,0);
});
test('missing measurements and treatments never masquerade as verified values',()=>{
 assert.equal(filtered('carats=5-plus').length,0);
 assert.equal(filtered('treatment=unheated').length,0);
 assert.equal(filtered('treatment=heated').length,0);
 assert.equal(filtered('availability=available').length,0);
});
test('query parser rejects invalid facets and limits long search input',()=>{
 const filters=parseFilters(new URLSearchParams('category=wrong&carats=-1&sort=unknown&q='+ 'x'.repeat(200)));
 assert.equal(filters.category,''); assert.equal(filters.carats,''); assert.equal(filters.sort,'curated'); assert.equal(filters.q.length,120);
});
test('filter URLs round-trip spaces, punctuation and Unicode without raw interpolation',()=>{
 const filters={...defaultFilters,q:'Blue & violet / 蓝',shape:'Natural crystal',availability:'demonstration'};
 assert.deepEqual(parseFilters(new URLSearchParams(serializeFilters(filters))),filters);
 assert.equal(serializeFilters(defaultFilters),'');
 assert.deepEqual(activeFilters(filters),['q','shape','availability']);
});
// Synthetic measurements exist only here to exercise future real inventory.
const fixtures:Product[]=[undefined,0.9,1,2.99,3,4.99,5,9].map((carats,index)=>({...products[0],slug:`fixture-${index}`,reference:`TEST-${index}`,carats,order:index}));
test('carat ranges are non-overlapping and exact at their boundaries',()=>{
 for(const [range,expected] of [['under-1',[.9]],['1-3',[1,2.99]],['3-5',[3,4.99]],['5-plus',[5,9]]] as const) {
  assert.deepEqual(filterProducts(fixtures,{...defaultFilters,carats:range}).map(p=>p.carats),expected);
 }
});
test('weight sorting places unknown values last in both directions without changing source order',()=>{
 const before=fixtures.map(p=>p.reference);
 assert.deepEqual(filterProducts(fixtures,{...defaultFilters,sort:'weight-asc'}).map(p=>p.carats),[.9,1,2.99,3,4.99,5,9,undefined]);
 assert.deepEqual(filterProducts(fixtures,{...defaultFilters,sort:'weight-desc'}).map(p=>p.carats),[9,5,4.99,3,2.99,1,.9,undefined]);
 assert.deepEqual(fixtures.map(p=>p.reference),before);
});
test('alphabetical and curated sorting remain deterministic',()=>{
 assert.equal(filtered('sort=name')[0].name,'Emerald Deep Blue');
 assert.equal(filtered('sort=curated')[0].reference,'DEMO-001');
});
