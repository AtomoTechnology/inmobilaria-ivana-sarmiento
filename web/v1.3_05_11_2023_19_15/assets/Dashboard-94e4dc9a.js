import{r as t,j as a}from"./index-3ed1fa78.js";const d=()=>{const[n,o]=t.useState({}),[u,r]=t.useState({});return t.useEffect(()=>{const e=getComputedStyle(document.documentElement),s={labels:["A","B","C"],datasets:[{data:[300,50,100],backgroundColor:[e.getPropertyValue("--blue-500"),e.getPropertyValue("--yellow-500"),e.getPropertyValue("--green-500")],hoverBackgroundColor:[e.getPropertyValue("--blue-400"),e.getPropertyValue("--yellow-400"),e.getPropertyValue("--green-400")]}]},l={cutout:"60%"};o(s),r(l)},[]),a("div",{className:"dashboard",children:a("h3",{className:"text-slate-400",children:"En desarrollo..."})})};export{d as default};