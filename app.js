'use strict';
const films = [
 {id:'interstellar',title:'Interstellar',year:2014,track:'Cornfield Chase',tags:['space','emotional','wonder','organ','slow','family'],description:'A journey beyond the stars, anchored by love and an enormous pipe-organ sound.',clue:'A church organ, a patient pulse, and a sense of cosmic wonder.'},
 {id:'inception',title:'Inception',year:2010,track:'Time',tags:['mind','electronic','intense','piano','slow','dark'],description:'Layers of dreams and a slow-building score that makes every second matter.',clue:'A repeating piano figure builds into a towering orchestral crescendo.'},
 {id:'gladiator',title:'Gladiator',year:2000,track:'Now We Are Free',tags:['history','emotional','voice','epic','hero','warm'],description:'An epic of honor and loss, with a score co-composed by Lisa Gerrard.',clue:'Lisa Gerrard’s wordless vocals bring warmth and release to an ancient-world epic.'},
 {id:'dune',title:'Dune',year:2021,track:'Paul’s Dream',tags:['space','experimental','voice','epic','dark','world'],description:'A vast desert world shaped by strange textures, voices, and seismic percussion.',clue:'Otherworldly female vocals rise over deep, rumbling desert textures.'},
 {id:'darkknight',title:'The Dark Knight',year:2008,track:'Why So Serious?',tags:['hero','dark','intense','electronic','mind','city'],description:'A tense urban thriller with a score co-composed by James Newton Howard.',clue:'An unsettling, rising electronic tone stretches the tension almost to breaking point.'},
 {id:'lionking',title:'The Lion King',year:1994,track:'This Land',tags:['family','warm','voice','emotional','world','nature'],description:'A sweeping animated coming-of-age story with a rich orchestral score and choral textures.',clue:'Warm strings and majestic orchestral colors evoke a sweeping animated African landscape.'},
 {id:'pirates',title:'Pirates of the Caribbean: Dead Man’s Chest',year:2006,track:'Davy Jones',tags:['adventure','organ','epic','hero','world','intense'],description:'Swashbuckling adventure with haunted music boxes, pipe organ, and bold orchestral energy.',clue:'A delicate music box gives way to a thunderous pipe organ at sea.'},
 {id:'dunkirk',title:'Dunkirk',year:2017,track:'Supermarine',tags:['history','intense','experimental','electronic','slow','dark'],description:'A race against time, driven by an urgent, ticking, ever-rising score.',clue:'Ticking rhythms and an illusion of endlessly rising pitch create relentless wartime urgency.'},
 {id:'lastsamurai',title:'The Last Samurai',year:2003,track:'A Way of Life',tags:['history','emotional','nature','slow','hero','world'],description:'A reflective historical epic carried by expansive strings and Japanese instrumental colors.',clue:'Contemplative strings and Japanese instrumental colors accompany a historical warrior drama.'},
 {id:'holiday',title:'The Holiday',year:2006,track:'Maestro',tags:['warm','piano','family','city','emotional','slow'],description:'A cozy romantic escape, filled with bright melodies and gentle orchestral charm.',clue:'Light, romantic orchestral melodies give this house-swap comedy its warmth.'},
 {id:'sherlock',title:'Sherlock Holmes',year:2009,track:'Discombobulate',tags:['mind','adventure','experimental','city','intense','piano'],description:'A playful mystery with offbeat rhythms and a wonderfully unruly musical personality.',clue:'A battered-sounding piano and jaunty strings accompany a brilliant Victorian detective.'},
 {id:'spirit',title:'Spirit: Stallion of the Cimarron',year:2002,track:'Homeland (Main Title)',tags:['nature','adventure','family','warm','epic','emotional'],description:'An animated journey across the American West with a soaring instrumental score.',clue:'Expansive orchestral writing evokes the open plains in an animated tale of a wild horse.'}
];
const questions = [
 ['What kind of world are you drawn to?',['Beyond the stars|space','A world of dreams|mind','Another era|history','Somewhere full of life|nature']],
 ['How do you want the film to leave you feeling?',['Deeply moved|emotional','Full of wonder|wonder','On the edge of my seat|intense','Warm and hopeful|warm']],
 ['Which Zimmer sound pulls you in?',['A towering pipe organ|organ','Intimate piano|piano','Human voices|voice','Electronic textures|electronic']],
 ['Choose your ideal storytelling pace.',['A patient, unfolding journey|slow','Relentless momentum|intense','A sweeping epic|epic','A playful adventure|adventure']],
 ['What matters most in a story?',['The people we love|family','The choices of a hero|hero','A puzzle to untangle|mind','A world to get lost in|world']],
 ['Pick a setting for tonight.',['An endless desert planet|space','Rain-soaked city streets|city','Mountains and open plains|nature','An ancient empire|history']],
 ['Which musical moment would you replay?',['One melody growing and growing|slow','An explosive orchestral climax|epic','An unexpected new sound|experimental','A voice that gives me chills|voice']],
 ['How much tension are you in the mood for?',['Keep my heart racing|intense','Let the mystery simmer|mind','Give me a gentle escape|warm','Take me somewhere unsettling|dark']],
 ['Pick a journey.',['Exploring the unknown|space','Finding my way home|family','Fighting for something bigger|hero','Setting sail into danger|adventure']],
 ['Which instrument family feels closest to you?',['Piano and keys|piano','Synths and sound design|electronic','Organ and resonant pipes|organ','Voices and choir|voice']],
 ['Which visual would you frame?',['A tiny ship against the stars|space','A warrior on the horizon|history','A golden sun over the wild|nature','A city folding into itself|mind']],
 ['Choose a musical personality.',['Bold and monumental|epic','Unconventional and surprising|experimental','Tender and expressive|emotional','Bright and comforting|warm']],
 ['Who would you like to follow?',['A devoted parent|family','A complicated protector|hero','An eccentric problem-solver|mind','An unlikely explorer|adventure']],
 ['What kind of escape sounds right?',['A richly imagined universe|world','A charming city romance|city','A journey through the past|history','A return to the natural world|nature']],
 ['Which Zimmer listening mood is yours?',['Quiet reflection|slow','Big feelings|emotional','Adrenaline rush|intense','Atmospheric discovery|experimental']],
 ['Choose a theme that resonates.',['Love across impossible distances|space','Memory and perception|mind','Honor and sacrifice|hero','Belonging and growing up|family']],
 ['What should a soundtrack do?',['Surround me with a new world|world','Make the action unforgettable|adventure','Reveal a character’s feelings|emotional','Build a delicious sense of dread|dark']],
 ['Pick a color palette for your evening.',['Cosmic blue and black|space','Earth, sand, and bronze|history','Sunlight and green|warm','Neon and charcoal|city']],
 ['Which concert moment would you choose?',['A choir filling the room|voice','A huge orchestral finale|epic','A quiet piano solo|piano','A wall of electronic sound|electronic']],
 ['One last instinct: what do you need tonight?',['A sense of possibility|wonder','An unforgettable adventure|adventure','A story with heart|emotional','Something that challenges me|experimental']]
];
const storageKey='resonance-survey-v1';
let answers=[], step=0, resultCount=4;
try {const saved=JSON.parse(localStorage.getItem(storageKey));if(saved&&Array.isArray(saved.answers)){answers=saved.answers.slice(0,20).map((v,i)=>Number.isInteger(v)&&v>=0&&v<questions[i][1].length?v:null);step=Math.max(0,Math.min(20,Math.floor(Number(saved.step))||0));if(answers.slice(0,step).some(v=>v===null)||answers.length<step)step=0;}}catch{}
const panel=document.querySelector('#survey-panel');
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({answers,step}));}catch{}}
function rankedFilms(){const tags=answers.map((a,i)=>questions[i][1][a]?.split('|')[1]).filter(Boolean);return films.map((film,index)=>({...film,points:tags.reduce((n,tag)=>n+(film.tags.includes(tag)?1:0),0),index})).sort((a,b)=>b.points-a.points||a.index-b.index);}
function renderSurvey(focus=false){
 if(step===20){renderResults(focus);return;}
 const [question,options]=questions[step];
 panel.innerHTML=`<div class="progress-label"><span>YOUR CINEMATIC DNA</span><span>QUESTION ${String(step+1).padStart(2,'0')} / 20</span></div><div class="progress" role="progressbar" aria-label="Survey completion" aria-valuemin="0" aria-valuemax="20" aria-valuenow="${step}"><div style="width:${step*5}%"></div></div><h3 class="question" tabindex="-1">${question}</h3><div class="options" role="group" aria-label="${question}">${options.map((option,i)=>`<button class="option ${answers[step]===i?'selected':''}" aria-pressed="${answers[step]===i}" data-choice="${i}"><span>${String.fromCharCode(65+i)}</span>${option.split('|')[0]}</button>`).join('')}</div><div class="survey-actions"><button class="back" ${step===0?'disabled':''}>← Previous</button><button class="button next" ${answers[step]==null?'disabled':''}>${step===19?'Reveal my films':'Next question'} <span>→</span></button></div><p class="saved-note">Your progress is saved in this browser when local storage is available.</p>`;
 panel.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{answers[step]=Number(button.dataset.choice);persist();renderSurvey();panel.querySelector(`[data-choice="${answers[step]}"]`).focus();}));
 panel.querySelector('.back').onclick=()=>{step--;persist();renderSurvey(true);};
 panel.querySelector('.next').onclick=()=>{step++;persist();renderSurvey(true);};
 if(focus)panel.querySelector('.question').focus();
}
function listenUrl(track){return `https://www.youtube.com/results?search_query=${encodeURIComponent('Hans Zimmer '+track+' official soundtrack')}`;}
function renderResults(focus=false){
 const ranked=rankedFilms();
 panel.innerHTML=`<p class="eyebrow">YOUR NEXT GREAT WATCH STARTS HERE</p><h3 class="results-title" tabindex="-1">Your cinematic shortlist.</h3><p class="saved-note">Ranked by the moods, sounds, and stories you chose.</p><div class="result-controls"><label for="result-count">Films to discover</label><select id="result-count">${[3,4,5].map(n=>`<option ${n===resultCount?'selected':''}>${n}</option>`).join('')}</select></div><div class="result-list">${ranked.slice(0,resultCount).map((film,i)=>`<article class="film"><span class="film-number">0${i+1}</span><div><h4>${film.title} <small>(${film.year})</small></h4><p>${film.description}</p><p class="score-name">START WITH “${film.track}”</p><p>Shared tastes: ${[...new Set(answers.map((a,j)=>questions[j][1][a]?.split('|')[1]).filter(t=>film.tags.includes(t)))].slice(0,3).join(' · ')}</p><a class="listen" href="${listenUrl(film.track)}" target="_blank" rel="noopener noreferrer">Find the soundtrack on YouTube →</a></div></article>`).join('')}</div><button class="back restart">↺ Take the survey again</button>`;
 panel.querySelector('select').onchange=e=>{resultCount=Number(e.target.value);renderResults();panel.querySelector('select').focus();};
 panel.querySelector('.restart').onclick=()=>{answers=[];step=0;persist();renderSurvey(true);};
 if(focus)panel.querySelector('h3').focus();
}
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
let rounds=[],round=0,score=0,locked=false;
const game=document.querySelector('#game-panel');
function gameIntro(){game.innerHTML='<p class="eyebrow">FIVE ROUNDS. ONE COMPOSER.</p><h3>Every score tells a story.</h3><p>Match a real soundtrack title and musical clue to its film. Want to listen? Open the optional YouTube search in a new tab. No audio is played automatically.</p><p>1 point per correct answer. How many worlds will you recognize?</p><button class="button" id="start-game">Start the challenge <span>→</span></button>';game.querySelector('button').onclick=()=>{rounds=shuffle(films).slice(0,5);round=0;score=0;renderRound(true);};}
function renderRound(focus=false){locked=false;const film=rounds[round];const options=shuffle([film,...shuffle(films.filter(f=>f.id!==film.id)).slice(0,3)]);game.innerHTML=`<div class="game-top"><span>ROUND ${round+1} / 5</span><span>SCORE ${score} / 5</span></div><h3 tabindex="-1">“${film.track}”</h3><p>${film.clue}</p><a class="listen" href="${listenUrl(film.track)}" target="_blank" rel="noopener noreferrer">Optional: find this score on YouTube →</a><p class="saved-note">Listening links may reveal the film title. Use the clue alone for a tougher challenge.</p><div class="game-options">${options.map(f=>`<button class="answer" data-film="${f.id}">${f.title}</button>`).join('')}</div><p class="feedback" role="status"></p><button class="button advance" hidden>${round===4?'See my result':'Next round'} <span>→</span></button>`;
 const next=game.querySelector('.advance');next.style.display='none';
 game.querySelectorAll('.answer').forEach(button=>button.onclick=()=>{if(locked)return;locked=true;const correct=button.dataset.film===film.id;if(correct)score++;game.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.film===film.id)b.classList.add('correct');});if(!correct)button.classList.add('wrong');game.querySelector('.feedback').textContent=correct?`Correct! “${film.track}” is from ${film.title}.`:`The answer is ${film.title}. ${film.description}`;next.hidden=false;next.style.display='inline-flex';next.focus();});
 next.onclick=()=>{round++;if(round<5)renderRound(true);else{game.innerHTML=`<p class="eyebrow">THAT’S A WRAP</p><h3 tabindex="-1">${score} out of 5. ${score===5?'A true score connoisseur.':score>=3?'You know your cinema.':'More worlds to discover.'}</h3><p>Keep exploring the music behind the movies.</p><button class="button">Play again <span>↺</span></button>`;game.querySelector('h3').focus();game.querySelector('button').onclick=gameIntro;}};
 if(focus)game.querySelector('h3').focus();
}
renderSurvey();gameIntro();
