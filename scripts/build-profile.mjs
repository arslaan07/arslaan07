import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

// All panels share one coordinate system so GitHub can scale them as a strip.
const WIDTH = 1120;
const OUTPUT = 'assets/rebel';
const PAPER = '#f4efdf';
const INK = '#111210';
const YELLOW = '#ffe329';
const RED = '#e44332';
const FONT_DIRECTORY = process.env.PROFILE_FONT_DIR ?? '/System/Library/Fonts/Supplemental';
const fonts = ['Impact.ttf', 'Arial Bold Italic.ttf', 'Arial Bold.ttf', 'Courier New Bold.ttf'];
const fontFiles = fonts.map((name) => `${FONT_DIRECTORY}/${name}`);
for (const path of fontFiles) {
  if (!existsSync(path)) throw new Error(`Missing font: ${path}. Set PROFILE_FONT_DIR; see docs/profile-design.md.`);
}
mkdirSync(OUTPUT, { recursive: true });
mkdirSync('.build/frames', { recursive: true });

const escapeXml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
function text(x, y, value, size = 24, fill = INK, family = 'Arial', extra = '') {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="bold" ${extra}>${escapeXml(value)}</text>`;
}
function polygon(points, fill, stroke = INK, width = 3) {
  return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="miter"/>`;
}
function shell(height, title, content, width = WIDTH) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${escapeXml(title)}</title><defs><pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.6" fill="${INK}"/></pattern><pattern id="fine" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.7" fill="${INK}" opacity=".2"/></pattern></defs><rect width="${width}" height="${height}" fill="${INK}"/>${content}</svg>`;
}
function save(name, height, title, content, width = WIDTH) {
  const svg = shell(height, title, content, width);
  writeFileSync(`${OUTPUT}/${name}.svg`, svg);
  writeFileSync(`${OUTPUT}/${name}.png`, new Resvg(svg, { font: { fontFiles, loadSystemFonts: false } }).render().asPng());
  return svg;
}

// Deterministic artwork: city silhouettes, manga perspective lines and halftone ink.
function city() {
  let result = '';
  const buildings = [[0,375,55,125],[48,337,62,163],[103,399,62,101],[151,365,53,135],[198,421,60,79],[866,414,58,86],[918,372,54,128],[967,337,62,163],[1024,393,49,107],[1068,301,52,199]];
  for (const [x,y,w,h] of buildings) {
    result += `<path d="M${x},500 V${y} l${w},-12 V500" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`;
    for (let row=y+12; row<490; row+=16) {
      for (let col=x+8; col<x+w-4; col+=12) result += `<path d="M${col},${row}v7" stroke="${INK}" stroke-width="4"/>`;
    }
  }
  return result;
}
function speedLines(phase = 0) {
  let lines = '';
  for (let index=0; index<62; index++) {
    const angle = (index / 62) * Math.PI * 2;
    const radius = 480 + (index % 5) * 37 + phase;
    const x=560+Math.cos(angle)*radius;
    const y=250+Math.sin(angle)*radius*.65;
    const endX=560+Math.cos(angle)*950;
    const endY=250+Math.sin(angle)*620;
    lines += `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${endX.toFixed(1)},${endY.toFixed(1)}" stroke="${INK}" stroke-width="${index%4===0?5:1.5}"/>`;
  }
  return lines;
}
function cursor(blink = false) {
  return `<g transform="translate(944 229) rotate(-10)">${polygon('0,0 0,80 21,62 39,92 56,82 38,53 66,51', PAPER, INK, 6)}${blink ? '<path d="M85,-21v28m-14,-14h28" stroke="#e44332" stroke-width="5"/>' : ''}</g>`;
}
function hero({ phase = 0, impact = 0, blink = false, reveal = 1 } = {}) {
  const title = `<g transform="translate(${impact} ${-impact / 2})"><g transform="rotate(-5 560 155)">${text(54,226,'ARSLAAN',192,INK,'Impact','letter-spacing="2" textLength="1000" lengthAdjust="spacingAndGlyphs" stroke="#111210" stroke-width="12" paint-order="stroke" transform="translate(6 8)"')}${text(54,226,'ARSLAAN',192,PAPER,'Impact','letter-spacing="2" textLength="1000" lengthAdjust="spacingAndGlyphs" stroke="#111210" stroke-width="5" paint-order="stroke"')}</g>${cursor(blink)}</g>`;
  const revealed = reveal < 1 ? `<defs><clipPath id="reveal"><polygon points="0,0 ${WIDTH*reveal},0 ${WIDTH*reveal-110},288 0,288"/></clipPath></defs><g clip-path="url(#reveal)">${title}</g>` : title;
  return `<rect x="7" y="7" width="1106" height="486" fill="${PAPER}" stroke="${PAPER}" stroke-width="3"/><rect x="10" y="10" width="1100" height="480" fill="url(#fine)"/>${speedLines(phase)}${city()}${polygon('16,93 1062,23 1030,184 1100,166 1063,239 28,298 72,245 17,258',YELLOW,INK,4)}<path d="M49,90L1090,21" stroke="${INK}" stroke-width="3"/>${revealed}${polygon('205,273 902,253 884,305 190,326',PAPER)}${text(230,302,'@arslaan07 / theLazyProgramR',28,INK,'Arial','font-style="italic"')}${polygon('145,334 980,313 958,379 124,400',INK)}${text(175,377,'AI FULL-STACK ENGINEER',43,YELLOW,'Arial','font-style="italic"')}${polygon('227,404 907,386 888,436 211,454',PAPER)}${text(264,432,'From interface to inference.',28,INK,'Arial','font-style="italic"')}<path d="M751 449l90-9-48 14 78-5" fill="none" stroke="${RED}" stroke-width="3"/><path d="M19,459h245v25H19zM850,459h244v25H850z" fill="${PAPER}"/>${text(28,477,'ISSUE 07 / CODE WITH INTENT',13,INK,'Courier New')}${text(862,477,'WEB × APPLIED AI',13,INK,'Courier New')}`;
}
save('hero',500,'Arslaan — AI Full-Stack Engineer. From interface to inference.',hero());
const timeline = [];
function frame(options, duration) {
  const index = timeline.length;
  const svg=shell(500,'Arslaan anime opening',hero(options));
  writeFileSync(`.build/frames/${String(index).padStart(3,'0')}.png`,new Resvg(svg,{font:{fontFiles,loadSystemFonts:false}}).render().asPng());
  timeline.push({file:`${String(index).padStart(3,'0')}.png`,duration});
}
// A long settled interval keeps the loop calm; no full-screen flashes.
for (let index=0; index<12; index++) frame({reveal:(index+1)/12,phase:index*2},70);
for (const impact of [6,-4,2,-1,0]) frame({impact,blink:true},80);
frame({},1200);
frame({blink:true},160);
frame({},1400);
frame({blink:true},160);
frame({},2000);
writeFileSync('.build/timeline.json',JSON.stringify(timeline,null,2));

save('about',150,'About Arslaan: thoughtful interfaces, reliable systems, useful AI.',`
${polygon('8,14 1111,4 1103,134 8,143',PAPER)}
${polygon('21,29 205,20 193,78 11,87',YELLOW)}
${text(42,65,'ABOUT',34,INK,'Impact','font-style="italic"')}
${text(232,58,'Thoughtful interfaces. Reliable systems. Useful AI.',30,INK,'Arial','font-style="italic"')}
${text(232,94,'I build production-grade products where modern web',23)}
${text(232,124,'engineering meets applied AI.',23)}
<path d="M1041,96l32,-8-15,24 32,-8" fill="none" stroke="${RED}" stroke-width="4"/>`);

save('stack',212,'Stack: TypeScript, Next.js, React, NestJS, PostgreSQL, Python, LangChain, RAG and LLM applications.',`
${polygon('8,10 1111,2 1106,201 8,209',PAPER)}
${polygon('20,23 205,14 193,70 11,80',YELLOW)}
${text(42,59,'STACK',34,INK,'Impact','font-style="italic"')}
${text(238,49,'WEB',17,RED,'Courier New')}${text(430,51,'TypeScript / Next.js / React / Tailwind CSS',24)}
<path d="M234,72H1067" stroke="${INK}"/>
${text(238,104,'BACKEND',17,RED,'Courier New')}${text(430,106,'NestJS / PostgreSQL',24)}
<path d="M234,128H1067" stroke="${INK}"/>
${text(238,161,'APPLIED AI',17,RED,'Courier New')}${text(430,162,'Python / LangChain / RAG',24)}
${text(430,190,'LLM applications built for real user problems.',18)}
<rect x="25" y="109" width="155" height="70" fill="url(#dots)"/>`);

save('builds',88,'Featured builds — select a project.',`
${polygon('8,10 846,1 817,77 2,86',YELLOW)}
${text(32,61,'FEATURED BUILDS',49,INK,'Impact','font-style="italic"')}
<path d="M856,32h251M846,58h261" stroke="${PAPER}" stroke-width="2"/>
${text(891,78,'SELECT A BUILD →',16,PAPER,'Courier New')}`);

function project(name, description, number, icon) {
  const artwork = icon === 'link'
    ? `<g transform="translate(83,50) rotate(-30 40 30)" fill="none" stroke="${INK}" stroke-width="8"><rect width="58" height="34" rx="17"/><rect x="30" y="26" width="58" height="34" rx="17"/><path d="M31,24l26,29"/></g>`
    : `<g transform="translate(88,28) rotate(-8 42 50)" fill="none" stroke="${INK}" stroke-width="5"><rect width="80" height="94" fill="${PAPER}"/><path d="M15,-7v19m24,-19v19m24,-19v19M17,32h48M17,51h48M17,70h32"/></g>`;
  return `${polygon('8,7 1111,2 1105,145 3,151',PAPER)}${polygon('9,8 238,6 207,149 4,150',YELLOW)}<path d="M19,21l42,33M26,100l39,-15M159,20l-21,22M183,130l-21,-27" stroke="${INK}" stroke-width="2"/><rect x="17" y="15" width="48" height="20" fill="${INK}"/>${text(24,30,number,13,YELLOW,'Courier New')}${artwork}<path d="M254,35l-14,72" stroke="${RED}" stroke-width="5"/>${text(277,66,name,43,INK,'Arial','font-style="italic"')}${text(277,108,description,24)}${polygon('876,51 1081,45 1068,103 862,108',YELLOW)}${text(890,84,'VIEW REPO →',22,INK,'Arial','font-style="italic"')}`;
}
save('spark-app',155,'spark-app — influencer link management platform. View repository.',project('spark-app','Influencer link management platform.','01','link'));
save('pocket-notes',155,'pocket-notes — notes, without the noise. View repository.',project('pocket-notes','Notes, without the noise.','02','notes'));

// Separate image links keep the contact strip clickable without image maps.
for (const [name,label,number] of [['github','GITHUB','01'],['linkedin','LINKEDIN','02'],['leetcode','LEETCODE','03']]) {
  save(name,108,`${label} — connect with Arslaan.`,`${polygon('8,10 366,2 358,97 2,105',YELLOW)}${text(20,65,number,18,INK,'Courier New')}${text(72,72,label,37,INK,'Impact','font-style="italic"')}<path d="M307,55h36m-13,-14 14,14-14,14" fill="none" stroke="${INK}" stroke-width="4"/>`,373);
}
save('outro',68,'Let’s build something useful. Code with intent.',`<path d="M12,18h1096" stroke="${YELLOW}" stroke-width="2"/>${text(20,51,'LET’S BUILD SOMETHING USEFUL.',24,PAPER,'Arial','font-style="italic"')}${text(919,49,'END / ISSUE 07',15,YELLOW,'Courier New')}`);
console.log('Built editable SVGs, PNG panels and 22 hero frames.');
