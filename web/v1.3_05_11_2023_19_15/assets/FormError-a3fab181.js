import{r as o,j as n}from"./index-3ed1fa78.js";const p=r=>{const[e,t]=o.useState(r);return{values:e,handleInputChange:(s,a)=>{t({...e,[a]:s})},reset:()=>{t(s=>r)},...e,updateAll:s=>{t(a=>({...a,...s}))}}},h=({text:r,className:e=""})=>n("div",{className:e,children:n("span",{className:"text-red-500 dark:text-red-300  p-1",children:r})});export{h as F,p as u};
