import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, query, where, orderBy, serverTimestamp, runTransaction } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig } from '/firebase-config.js';
import { DEFAULT_TUTORIALS } from '/tutorial-data.js';

const CATS={android:'أندرويد',windows:'ويندوز',kali:'لينكس وكالي',web:'تطوير الويب',troubleshoot:'حلول المشاكل'};
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let db=null,user=null,tutorials=[...DEFAULT_TUTORIALS];

function initTheme(){
  if(localStorage.getItem('hadoorTheme')==='dark')document.body.classList.add('dark');
  $('#themeToggle').textContent=document.body.classList.contains('dark')?'☀':'☾';
  $('#themeToggle').addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    const dark=document.body.classList.contains('dark');
    localStorage.setItem('hadoorTheme',dark?'dark':'light');
    $('#themeToggle').textContent=dark?'☀':'☾';
  });
}
function initMenu(){
  $('#menuToggle')?.addEventListener('click',()=>{
    const open=$('#mainNav').classList.toggle('open');
    $('#menuToggle').setAttribute('aria-expanded',String(open));
  });
}
async function initFirebase(){
  if(firebaseConfig.apiKey==='YOUR_FIREBASE_API_KEY'||firebaseConfig.projectId==='YOUR_PROJECT_ID')return;
  try{
    const app=initializeApp(firebaseConfig); const auth=getAuth(app); db=getFirestore(app);
    if(!auth.currentUser)await signInAnonymously(auth);
    user=auth.currentUser;
    const snap=await getDocs(collection(db,'tutorials'));
    if(!snap.empty)tutorials=snap.docs.map(d=>({id:d.id,...d.data()}));
  }catch(e){console.error('Firebase:',e);}
}
function articleId(){
  const parts=location.pathname.split('/').filter(Boolean);
  return parts[0]==='article' ? decodeURIComponent(parts.slice(1).join('/')) : '';
}
function normalizeVideo(url){
  if(!url)return '';
  try{
    const u=new URL(url);
    if(u.hostname.includes('youtu.be'))return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if(u.hostname.includes('youtube.com')&&u.pathname==='/watch')return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
    return url;
  }catch{return '';}
}
async function getArticleData(id){
  const t=tutorials.find(x=>String(x.id)===String(id));
  return t||null;
}
async function loadComments(id){
  if(!db)return [];
  try{
    const q=query(collection(db,'comments'),where('articleId','==',String(id)),orderBy('createdAt','desc'));
    const s=await getDocs(q);
    return s.docs.map(d=>({id:d.id,...d.data()}));
  }catch(e){console.error(e);return [];}
}
async function loadLiked(id){
  if(!db||!user)return false;
  try{return (await getDoc(doc(db,'likes',`${id}_${user.uid}`))).exists();}catch{return false;}
}
async function renderArticle(t){
  const comments=await loadComments(t.id), liked=await loadLiked(t.id);
  const paragraphs=String(t.articleContent||'').split(/\n+/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
  const video=normalizeVideo(t.videoUrl);
  const commentsHtml=comments.map(c=>`<div class="comment"><b>${esc(c.author||'زائر')}</b><p>${esc(c.body)}</p><small>${c.createdAt?.toDate?c.createdAt.toDate().toLocaleString('ar-IQ'):''}</small></div>`).join('');
  document.title=`${t.title} | حدور تك`;
  $('#articleContent').innerHTML=`
    <header class="article-head"><span class="section-kicker">${esc(CATS[t.category]||'دليل تقني')}</span><h1>${esc(t.title)}</h1><p>${esc(t.desc)}</p></header>
    ${t.imageUrl?`<img class="article-cover" src="${esc(t.imageUrl)}" alt="${esc(t.title)}">`:''}
    <div class="article-text">${paragraphs}${t.code?`<div class="code-box"><div><b>${esc(t.codeLabel||'CODE')}</b><button id="copyCode" type="button">نسخ الكود</button></div><pre><code>${esc(t.code)}</code></pre></div>`:''}${t.extra?`<p>${esc(t.extra)}</p>`:''}</div>
    ${t.downloadUrl?`<p><a class="btn btn-primary" href="${esc(t.downloadUrl)}" target="_blank" rel="noopener">تحميل الملفات والموارد ↗</a></p>`:''}
    ${video?`<h3>شاهد الشرح بالفيديو</h3><iframe class="article-video" src="${esc(video)}" title="${esc(t.title)}" loading="lazy" allowfullscreen></iframe>`:''}
    <div class="article-actions"><button class="article-action ${liked?'liked':''}" id="likeArticle">♥ <span>${Number(t.likes)||0}</span> إعجاب</button><button class="article-action" id="shareArticle">مشاركة الشرح ↗</button></div>
    <section class="article-comments"><h3>التعليقات <span>(${comments.length})</span></h3>
      <form class="comment-form" id="commentForm"><input name="author" maxlength="45" placeholder="اسمك الكريم" required><textarea name="body" rows="3" maxlength="1000" placeholder="اكتب تعليقك أو سؤالك..." required></textarea><button class="btn btn-primary" type="submit">إرسال التعليق</button></form>
      <div id="commentsList">${commentsHtml||'<p class="muted">كن أول من يترك تعليقاً.</p>'}</div>
    </section>`;
  $('#copyCode')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(t.code);$('#copyCode').textContent='تم النسخ ✓';}catch{}});
  $('#shareArticle').addEventListener('click',async()=>{
    const url=location.href;
    if(navigator.share)await navigator.share({title:t.title,url});
    else{try{await navigator.clipboard.writeText(url);$('#shareArticle').textContent='تم نسخ الرابط ✓';}catch{}}
  });
  $('#likeArticle').addEventListener('click',()=>toggleLike(t));
  $('#commentForm').addEventListener('submit',e=>{e.preventDefault();submitComment(t.id,e.currentTarget);});
}
async function toggleLike(t){
  if(!db||!user){alert('خدمة الإعجابات غير مهيأة حالياً.');return;}
  const id=String(t.id),ref=doc(db,'likes',`${id}_${user.uid}`),btn=$('#likeArticle');
  btn.disabled=true;
  try{
    let likedNow=false;
    await runTransaction(db,async tx=>{
      const s=await tx.get(ref);
      if(s.exists())tx.delete(ref);
      else{tx.set(ref,{articleId:id,userId:user.uid,createdAt:serverTimestamp()});likedNow=true;}
    });
    const q=await getDocs(query(collection(db,'likes'),where('articleId','==',id)));
    t.likes=q.size; $('#likeArticle span').textContent=String(q.size); btn.classList.toggle('liked',likedNow);
  }catch(e){console.error(e);alert('تعذر حفظ الإعجاب. حاول مرة أخرى.');}
  finally{btn.disabled=false;}
}
async function submitComment(articleId,form){
  if(!db||!user){alert('التعليقات غير متاحة حتى تكتمل إعدادات قاعدة البيانات.');return;}
  const fd=new FormData(form),author=String(fd.get('author')||'').trim(),body=String(fd.get('body')||'').trim(),button=form.querySelector('button');
  if(!author||!body)return;
  button.disabled=true;button.textContent='جارٍ الإرسال…';
  try{
    const banned=await getDoc(doc(db,'bannedUsers',user.uid));
    if(banned.exists()){alert('هذا الحساب غير مسموح له بإضافة التعليقات.');return;}
    await addDoc(collection(db,'comments'),{articleId:String(articleId),author,body,userId:user.uid,createdAt:serverTimestamp()});
    form.reset(); const t=await getArticleData(articleId); if(t)await renderArticle(t);
  }catch(e){console.error(e);alert('تعذر نشر التعليق. حاول مرة أخرى.');}
  finally{button.disabled=false;button.textContent='إرسال التعليق';}
}
async function main(){
  initTheme();initMenu();$('#year').textContent=new Date().getFullYear();
  const id=articleId();
  if(!id){location.replace('/');return;}
  await initFirebase();
  const t=await getArticleData(id);
  if(!t){
    document.title='الشرح غير موجود | حدور تك';
    $('#articleContent').innerHTML='<div class="article-loading"><h2>الشرح غير موجود</h2><p>تأكد من الرابط أو ارجع إلى قائمة الشروحات.</p><a class="btn btn-primary" href="/">العودة إلى الرئيسية</a></div>';
    return;
  }
  await renderArticle(t);
}
main();
