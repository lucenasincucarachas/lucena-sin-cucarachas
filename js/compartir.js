"use strict";
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll("#compartir-nativo,[data-compartir='nativo']").forEach(btn=>{
  btn.addEventListener("click",async()=>{
   const data={title:document.title,text:"Apoya la iniciativa vecinal «Lucena sin Cucarachas».",url:location.href};
   try{if(navigator.share){await navigator.share(data);return;}}catch(e){if(e?.name==="AbortError")return;}
   try{await navigator.clipboard.writeText(data.url);}catch(e){
    const t=document.createElement("textarea");t.value=data.url;t.style.position="fixed";t.style.left="-9999px";document.body.appendChild(t);t.select();try{document.execCommand("copy")}finally{t.remove()}
   }
   const old=btn.textContent;btn.textContent="Enlace copiado";setTimeout(()=>btn.textContent=old||"Compartir",2200);
  });
 });
});
