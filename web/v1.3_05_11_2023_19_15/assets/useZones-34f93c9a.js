import{h as s}from"./index-3ed1fa78.js";import{u as o}from"./useQuery-6083f14c.js";const t=async()=>await s.get("/zones?sort=name").then(e=>e.data),u=()=>o({queryKey:["zones"],queryFn:t});export{u};
