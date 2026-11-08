const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8000');
 for(let i=0;i<20;i++){
  await page.locator(`[data-choice="${i%4}"]`).click();
  await page.locator('.next').click();
  if(i===2){await page.reload();assert.match(await page.locator('.question').innerText(),/storytelling pace/);}
 }
 assert.equal(await page.locator('.film').count(),4);
 await page.locator('select').selectOption('3');assert.equal(await page.locator('.film').count(),3);
 await page.locator('select').selectOption('5');assert.equal(await page.locator('.film').count(),5);
 await page.reload();assert.equal(await page.locator('.film').count(),4);
 await page.locator('.restart').click();assert.equal(await page.locator('.option').count(),4);
 // A different answer profile must produce a different ranking.
 const rankings=await page.evaluate(()=>{
  answers=Array(20).fill(0);const a=rankedFilms().map(f=>f.id).join();
  answers=Array(20).fill(3);const b=rankedFilms().map(f=>f.id).join();answers=[];return [a,b];
 });assert.notEqual(...rankings);
 await page.locator('#start-game').click();
 for(let i=0;i<5;i++){
  const correct=await page.evaluate(()=>rounds[round].id);
  await page.locator(`[data-film="${correct}"]`).click();
  assert.match(await page.locator('.feedback').innerText(),/Correct!/);
  assert.equal(await page.locator('.answer:disabled').count(),4);
  await page.locator('.advance').click();
 }
 assert.match(await page.locator('#game-panel h3').innerText(),/5 out of 5/);
 await page.getByRole('button',{name:/Play again/}).click();
 await page.locator('#start-game').click();
 const wrong=await page.evaluate(()=>films.find(f=>document.querySelector(`[data-film="${f.id}"]`)&&f.id!==rounds[round].id).id);
 await page.locator(`[data-film="${wrong}"]`).click();assert.match(await page.locator('.feedback').innerText(),/The answer is/);
 await page.screenshot({path:'/tmp/resonance-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:8000');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow');
 await page.screenshot({path:'/tmp/resonance-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 // Project-subdirectory asset resolution, as used by GitHub Pages.
 await page.goto('http://127.0.0.1:8001/Hanszimmer/');
 assert.equal(await page.locator('.option').count(),4);
 assert.equal(await page.locator('h1').evaluate(el=>getComputedStyle(el).fontFamily), 'Georgia, "Times New Roman", serif');
 console.log('PASS: 20 questions, persistence, 3–5 results, differing rankings, reset, five correct rounds, wrong answer, replay, mobile layout, project paths, no JS errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
