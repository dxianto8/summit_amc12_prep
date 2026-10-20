'use strict';
// Keep the bundled problems immutable. Removal is reversible and preserves study records.
function allProblems(){return [...PROBLEMS,...(window.SOURCED_PROBLEMS||[]),...state.customProblems];}
let managerTab='active',managerQuery='',managerPageNumber=1;
function emptyBankHTML(){return '<div class="empty"><h2>A fresh page for your ideas.</h2><p>This track has no active problems. Add a problem or restore one from Removed.</p><button class="btn" data-action="add-problem">＋ Add problem</button> <a class="quiet" href="#manage">Manage problems ↗</a></div>';}
function managerPage(){
  const matches=allProblems().filter(p=>p.mode===state.mode);
  const removed=matches.filter(p=>state.removedProblems.includes(p.id));
  const active=matches.length-removed.length;
  const list=matches.filter(p=>state.removedProblems.includes(p.id)===(managerTab==='removed')&&`${p.title} ${p.topic}`.toLowerCase().includes(managerQuery.toLowerCase()));
  return `${heading('Manage problems','Add your own problems or remove and restore existing ones.')}
    <div class="manager-toolbar"><div class="manager-tabs" aria-label="Problem collection"><button data-manager-tab="active" class="${managerTab==='active'?'active':''}" aria-pressed="${managerTab==='active'}">In the bank <span>${active}</span></button><button data-manager-tab="removed" class="${managerTab==='removed'?'active':''}" aria-pressed="${managerTab==='removed'}">Removed <span>${removed.length}</span></button></div><button class="btn" data-action="add-problem">＋ Add problem</button></div>
    <div class="manager-info">Changes save on this device. Removed problems can be restored.</div>
    <label class="manager-search">Find a problem<input class="field" id="manager-search" placeholder="Search titles or topics…" value="${esc(managerQuery)}"></label>
    <div id="manager-results">${managerResults(list)}</div>`;
}
function managerMatches(){return allProblems().filter(p=>p.mode===state.mode&&state.removedProblems.includes(p.id)===(managerTab==='removed')&&`${p.title} ${p.topic}`.toLowerCase().includes(managerQuery.toLowerCase()));}
function managerResults(list){const pages=Math.max(1,Math.ceil(list.length/25));managerPageNumber=Math.min(managerPageNumber,pages);const shown=list.slice((managerPageNumber-1)*25,managerPageNumber*25);return list.length?`<div class="manager-list">${shown.map(p=>`<article class="manager-row"><div><span class="badge ${p.custom?'orange':''}">${p.custom?'ADDED BY YOU':p.source?'CEMC · '+p.source:'STARTER BANK'}</span><h2>${esc(p.title)}</h2><p>${esc(p.topic)} · ${esc(p.level)} · ${esc(p.mode)}</p></div><div class="manager-row-actions">${managerTab==='removed'?`<button class="btn secondary" data-restore-problem="${p.id}" aria-label="Restore ${esc(p.title)}">Restore ↩</button>`:`<button class="quiet" data-open="${p.id}" aria-label="Practice ${esc(p.title)}">Practice ↗</button>${p.custom?`<button class="quiet" data-edit-problem="${p.id}" aria-label="Edit ${esc(p.title)}">Edit</button>`:''}<button class="quiet remove-link" data-remove-problem="${p.id}" aria-label="Remove ${esc(p.title)}">Remove</button>`}</div></article>`).join('')}</div>${paginationHTML(managerPageNumber,pages,'manager',list.length)}`:`<div class="empty"><h2>${managerQuery?'No matching problems.':managerTab==='removed'?'Nothing removed.':'Ready for a new problem?'}</h2><p>${managerTab==='removed'?'Problems you remove from this track will stay here, ready to restore.':'Add a problem to this track, or try a different search.'}</p></div>`;}
function editorHTML(p){
  const editing=!!p;
  p=p||{mode:state.mode,topic:'Algebra',level:'Core',title:'',text:'',choices:['','','','',''],answer:'',hints:[],steps:[],idea:''};
  return `<div class="modal-bar"><h2 id="editor-title">${editing?'Edit your problem':'Add a problem'}</h2><button type="button" class="close" data-action="close-editor" aria-label="Close problem editor">×</button></div>
  <form id="problem-editor" data-edit-id="${editing?p.id:''}" class="problem-editor">
    <p class="editor-intro">Use plain text or math symbols such as ², √, and π.</p>
    <div class="editor-grid"><label>Competition<select class="field" name="mode" id="editor-mode">${['AMC 12','AIME'].map(m=>`<option ${p.mode===m?'selected':''}>${m}</option>`).join('')}</select></label><label>Topic<select class="field" name="topic">${TOPICS.map(t=>`<option ${p.topic===t.name?'selected':''}>${t.name}</option>`).join('')}</select></label><label>Difficulty<select class="field" name="level">${['Foundation','Core','Stretch'].map(l=>`<option ${p.level===l?'selected':''}>${l}</option>`).join('')}</select></label></div>
    <label>Problem title<input name="title" class="field" required maxlength="120" value="${esc(p.title)}" placeholder="e.g. A different way to count"></label>
    <label>Problem statement<textarea name="text" class="field" required maxlength="6000" rows="4" placeholder="Write the full problem here…">${esc(p.text)}</textarea></label>
    <fieldset id="mc-fields" ${p.mode==='AIME'?'disabled hidden':''}><legend>Answer choices</legend><div class="choice-fields">${'ABCDE'.split('').map((c,i)=>`<label>${c}<input name="choice${i}" class="field" required maxlength="300" value="${esc(p.choices?.[i]||'')}" placeholder="Choice ${c}"></label>`).join('')}</div><label>Correct answer<select name="correctChoice" class="field">${'ABCDE'.split('').map((c,i)=>`<option value="${i}" ${p.choices?.indexOf(p.answer)===i?'selected':''}>${c}</option>`).join('')}</select></label></fieldset>
    <fieldset id="integer-fields" ${p.mode==='AMC 12'?'disabled hidden':''}><legend>Answer</legend><label>Correct integer (000–999)<input name="integerAnswer" class="field" required inputmode="numeric" pattern="[0-9]{1,3}" maxlength="3" value="${esc(p.mode==='AIME'?p.answer:'')}" placeholder="e.g. 042"></label></fieldset>
    <label>Hints <small>Optional · one hint per line</small><textarea name="hints" class="field" maxlength="6000" rows="2" placeholder="Start with a small nudge…">${esc(p.hints.join('\n'))}</textarea></label>
    <label>Worked solution <small>One step per line</small><textarea name="steps" class="field" required maxlength="12000" rows="4" placeholder="Explain how to reach the answer…">${esc(p.steps.join('\n'))}</textarea></label>
    <label>Key takeaway <small>Optional</small><textarea name="idea" class="field" maxlength="2000" rows="2" placeholder="What idea makes this problem useful?">${esc(p.idea)}</textarea></label>
    ${editing?'<p class="meta-text">Your existing attempts and notes will be kept.</p>':''}<p id="editor-error" class="editor-error" role="alert" hidden></p>
    <div class="editor-footer"><span class="meta-text">Saved on this device · included in progress exports</span><div><button type="button" class="btn secondary" data-action="close-editor">Cancel</button><button type="submit" class="btn">${editing?'Save changes':'Add to problem bank'} →</button></div></div>
  </form>`;
}
function showEditor(id){const p=id?state.customProblems.find(p=>p.id===id):null;if(id&&!p)return;$('#editor-modal').innerHTML=editorHTML(p);$('#editor-dialog').showModal();}
function parseProblemForm(fields){
  const get=k=>String(fields[k]??'').trim();
  const lines=k=>get(k).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const p={mode:get('mode'),topic:get('topic'),level:get('level'),title:get('title'),text:get('text'),hints:lines('hints'),steps:lines('steps'),idea:get('idea'),custom:true};
  if(!['AMC 12','AIME'].includes(p.mode)||!TOPICS.some(t=>t.name===p.topic)||!['Foundation','Core','Stretch'].includes(p.level))throw new Error('Choose a competition, topic, and difficulty.');
  if(!p.title||!p.text||!p.steps.length)throw new Error('Add a title, a problem statement, and a worked solution.');
  if(p.mode==='AMC 12'){
    p.choices=Array.from({length:5},(_,i)=>get('choice'+i));
    if(p.choices.some(c=>!c))throw new Error('Fill in all five answer choices.');
    if(new Set(p.choices).size!==5)throw new Error('Each answer choice must be different.');
    if(!/^[0-4]$/.test(get('correctChoice')))throw new Error('Choose the correct answer.');
    p.answer=p.choices[Number(get('correctChoice'))];
  }else{
    if(!/^\d{1,3}$/.test(get('integerAnswer')))throw new Error('The AIME answer must be an integer from 000 to 999.');
    p.answer=String(Number(get('integerAnswer')));
  }
  return p;
}
function saveProblemForm(form){
  try{
    const p=parseProblemForm(Object.fromEntries(new FormData(form)));
    const id=form.dataset.editId||'custom-'+crypto.randomUUID();p.id=id;
    const prior=state.customProblems;
    state.customProblems=prior.some(p=>p.id===id)?prior.map(q=>q.id===id?p:q):[...prior,p];
    if(!save()){state.customProblems=prior;throw new Error('This browser could not save your problem. Export your progress or enable site storage and try again.');}
    // A modified question must not reuse an answer check cached for an older version.
    for(const key of Object.keys(state.dailyViews))if(state.dailyViews[key].id===id)delete state.dailyViews[key];
    state.mode=p.mode;save();$('#editor-dialog').close();managerTab='active';managerQuery='';
    location.hash='manage';render();toast(form.dataset.editId?'Problem updated.':'Problem added to your bank.');
  }catch(error){$('#editor-error').textContent=error.message;$('#editor-error').hidden=false;$('#editor-error').scrollIntoView({block:'nearest'});}
}
function setProblemRemoved(id,remove){
  if(!allProblems().some(p=>p.id===id))return;
  const before=state.removedProblems;
  state.removedProblems=remove?[...new Set([...before,id])]:before.filter(x=>x!==id);
  if(!save()){state.removedProblems=before;return;}
  render();toast(remove?'Removed from the bank. Restore it anytime in Removed.':'Problem restored to your bank.');
}
document.addEventListener('submit',e=>{if(e.target.id==='problem-editor'){e.preventDefault();saveProblemForm(e.target);}});
document.addEventListener('change',e=>{if(e.target.id==='editor-mode'){const mc=e.target.value==='AMC 12';$('#mc-fields').hidden=!mc;$('#mc-fields').disabled=!mc;$('#integer-fields').hidden=mc;$('#integer-fields').disabled=mc;}});
document.addEventListener('input',e=>{if(e.target.id==='manager-search'){managerQuery=e.target.value;managerPageNumber=1;$('#manager-results').innerHTML=managerResults(managerMatches());}});
document.addEventListener('click',e=>{
  const el=e.target.closest('button');if(!el)return;
  const d=el.dataset;
  if(d.action==='add-problem')showEditor();
  if(d.action==='close-editor')$('#editor-dialog').close();
  if(d.editProblem)showEditor(d.editProblem);
  if(d.removeProblem)setProblemRemoved(d.removeProblem,true);
  if(d.restoreProblem)setProblemRemoved(d.restoreProblem,false);
  if(d.managerTab){managerTab=d.managerTab;managerPageNumber=1;render();}
  if(d.managerPage){managerPageNumber=Number(d.managerPage);render();window.scrollTo({top:0,behavior:'instant'});}
});
