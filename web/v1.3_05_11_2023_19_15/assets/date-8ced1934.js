const g=a=>{let t=new Date(a);return t.setHours(t.getHours()-3),t.getUTCDate().toString().padStart(2,"0")+"-"+(t.getUTCMonth()+1).toString().padStart(2,"0")+"-"+t.getUTCFullYear().toString()+" "+t.getUTCHours().toString().padStart(2,"0")+":"+t.getUTCMinutes().toString().padStart(2,"0")},i=a=>{let t=new Date(a);return t.setHours(t.getHours()-3),t.getUTCFullYear().toString()+"-"+(t.getUTCMonth()+1).toString().padStart(2,"0")+"-"+t.getUTCDate().toString().padStart(2,"0")+" "+t.getUTCHours().toString().padStart(2,"0")+":"+t.getUTCMinutes().toString().padStart(2,"0")};function s(a){return a.toString().padStart(2,"0")}function d(a,t){return a.toString().padStart(t,"0")}function l(a){let t=new Date(a);return[s(t.getUTCDate()),s(t.getUTCMonth()+1),t.getUTCFullYear()].join("-")}const c=(a,t)=>{let r=new Date(a),n=new Date(t).getTime()-r.getTime();return Math.ceil(n/(1e3*3600*24))},u=(a,t)=>{let r=new Date(a),n=new Date(t).getTime()-r.getTime();return Math.ceil(n/(1e3*3600*24*365.25))},D=(a,t,r)=>{let e=new Date(a);switch(r){case"years":e.setFullYear(e.getFullYear()+t);break;case"months":e.setMonth(e.getMonth()+t);break;case"days":e.setDate(e.getDate()+t);break;case"hours":e.setHours(e.getHours()+t);break;case"minutes":e.setMinutes(e.getMinutes()+t);break;case"seconds":e.setSeconds(e.getSeconds()+t);break;case"milliseconds":e.setMilliseconds(e.getMilliseconds()+t);break}return e};export{g as a,i as b,D as c,c as d,u as e,l as f,d as g,s as p};