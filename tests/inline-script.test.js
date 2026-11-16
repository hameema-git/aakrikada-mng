const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
test('inline website scripts parse',()=>{
  const files=['index.html','setup.html','verify.html'];let count=0;
  for(const file of files){const html=fs.readFileSync(path.join(__dirname,'..','public',file),'utf8');const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(x=>x.trim());for(const [i,script] of scripts.entries()){count++;assert.doesNotThrow(()=>new Function(script),`${file} inline script ${i+1}`)}}
  assert.ok(count>=4);
});
