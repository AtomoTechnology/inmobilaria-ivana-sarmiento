import{h as t}from"./index-3ed1fa78.js";import{u as n}from"./useQuery-6083f14c.js";const s=async()=>await t.get("/clients").then(e=>e.data),c=()=>n({queryKey:["clients"],queryFn:s,refetchOnWindowFocus:!1});export{c as u};
