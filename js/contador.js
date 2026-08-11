"use strict";
const RUTA_ESTADISTICAS="https://script.google.com/macros/s/AKfycbx_NE09LUceS6clM1-km9txgkh6YjBL3qQnPPhdmytxRdsPf7-xejyTD0n9lck_mV6bPA/exec";
document.addEventListener("DOMContentLoaded",async()=>{
 const a=document.querySelector("#contador-apoyos"),c=document.querySelector("#contador-calles"),u=document.querySelector("#contador-actualizado");
 if(!a||!c||!u)return;
 try{
  const r=await fetch(RUTA_ESTADISTICAS+"?t="+Date.now(),{cache:"no-store"});
  if(!r.ok)throw Error("HTTP "+r.status);
  const d=await r.json();
  if(d.ok!==true||!Number.isFinite(d.FIRMAS)||!Number.isFinite(d.CALLES_UNICAS))throw Error("Respuesta no válida");
  a.textContent=new Intl.NumberFormat("es-ES").format(d.FIRMAS);
  c.textContent=new Intl.NumberFormat("es-ES").format(d.CALLES_UNICAS);
  const f=d.actualizado?new Date(d.actualizado):null;
  u.textContent=f&&!Number.isNaN(f.getTime())?"Actualizado: "+new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(f):"Datos actualizados periódicamente.";
 }catch(e){console.warn("Estadísticas no disponibles:",e);a.textContent="—";c.textContent="—";u.textContent="Datos temporalmente no disponibles.";}
});
