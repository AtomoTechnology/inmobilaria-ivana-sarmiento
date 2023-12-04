import{h as w,r as c,f as D,j as r,L as U,a as o,F as he}from"./index-3ed1fa78.js";import{u as fe,H as be,D as ge,C as u,a as ye}from"./HeaderData-f8341142.js";import{B as M}from"./Box-2f3a3966.js";import{E as xe}from"./EditIcon-72ee5f20.js";import{D as ke}from"./DeleteIcon-e6cc714b.js";import{C as we,F as ve}from"./FormActionBtns-c23092d4.js";import{C as k}from"./CustomInput-6ca7ad9c.js";import{u as Ce,F as Ne}from"./FormError-a3fab181.js";import{R as Ae,D as K}from"./RequestError-ce21148f.js";import{F as _}from"./FieldsetGroup-13ce1fee.js";import{u as Ee}from"./useQuery-6083f14c.js";import{C as Pe}from"./CustomTextArea-ed7f84a9.js";import{c as De,d as Me,f as Se}from"./date-8ced1934.js";import{v as Fe}from"./form-3a2308eb.js";import{E as Ie}from"./EmptyData-5a33961e.js";import{C as Te}from"./CloseOnClick-54123682.js";import{u as Be}from"./useProperties-3ec06d0b.js";import{B as Le}from"./BoxContainerPage-d81583a3.js";const Ve=async()=>await w.get("/eventualities").then(y=>y.data),qe=()=>Ee({queryKey:["eventualities"],queryFn:Ve}),tr=()=>{var O,j,$,G,H;const[y,h]=c.useState(!1),[S,v]=c.useState(!1),{description:W,clientAmount:F,expiredDate:J,ownerAmount:I,PropertyId:C,values:f,handleInputChange:b,reset:N,updateAll:X}=Ce({PropertyId:0,clientAmount:0,ownerAmount:0,description:"",expiredDate:De(new Date().toISOString(),1,"days").toISOString().slice(0,10)}),[T,p]=c.useState(!1),[s,B]=c.useState(),[A,L]=c.useState(!1),[Z,V]=c.useState(""),[q,z]=c.useState({global:{value:null,matchMode:D.CONTAINS},description:{value:null,matchMode:D.STARTS_WITH},PropertyId:{value:null,matchMode:D.EQUALS}}),m=c.useRef(),{showAndHideModal:i}=fe(),{data:a,isError:ee,isLoading:re,error:te,isFetching:ae,refetch:oe}=qe(),x=Be(),se=e=>{X({...e}),h(!0),L(!0),m.current=e},le=e=>{v(!S),m.current=e},ne=e=>{V("");const l=e;let t={...q};t.global.value=l,z(t),V(l)},ie=async e=>{var l;try{p(!0);const t=await w.delete("/eventualities/"+e);t.data.ok?(a!=null&&a.data&&(a.data=a==null?void 0:a.data.filter(d=>d.id!==e)),v(!1),i("Borrado",t.data.message)):i("Error",t.data.message||"Algo malo ocurrío.","red")}catch(t){t.response&&i("Error",((l=t.response.data)==null?void 0:l.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},de=async e=>{var d,g,Q;e.preventDefault();const{error:l,ok:t}=Fe({...f},["clientPaid","ownerPaid","isReverted","paymentId"]);if(B(l),!t)return!1;if(A)try{p(!0);const n=await w.put(`/eventualities/${(d=m.current)==null?void 0:d.id}`,{...f});n.data.ok?(a!=null&&a.data&&(a.data=a==null?void 0:a.data.map(P=>{var R,Y;return P.id===((R=m.current)==null?void 0:R.id)&&(P={...f,Contract:(Y=x.data)==null?void 0:Y.data.find(pe=>pe.id===f.PropertyId)}),P})),N(),h(!1),i("Editado",n.data.message)):i("Error",n.data.message||"Algo malo ocurrío.","red")}catch(n){n.response&&i("Error",((g=n.response.data)==null?void 0:g.message)||"Algo malo ocurrío.","red")}finally{p(!1)}else try{p(!0);const n=await w.post("/eventualities",{...f});n.data.ok?(oe(),N(),h(!1),i("Guardado",n.data.message)):i("Error",n.data.message||"Algo malo ocurrío.","red")}catch(n){n.response&&i("Error",((Q=n.response.data)==null?void 0:Q.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},E=()=>{N(),h(!1),B({})},ce=e=>o("div",{className:"flex gap-x-3 items-center justify-center",children:[r(xe,{action:()=>se(e)}),r(ke,{action:()=>le(e)})]}),ue=()=>{L(!1),m.current=null,h(!0)},me=e=>{var l;return r(M,{className:"!m-0 !p-0",children:r(K,{value:e.value,onChange:t=>e.filterApplyCallback(t.value),options:(l=x.data)==null?void 0:l.data,optionLabel:"id",showClear:!0,filterPlaceholder:"Busca propiedad",optionValue:"id",filterBy:"street,number,dept,floor",placeholder:"Elije una propiedad",filter:!0,valueTemplate:(t,d)=>t?o("span",{children:[t.street," ",t.number," ",t.floor,"-",t.dept]}):d.placeholder,itemTemplate:t=>o("span",{children:[" ",t.street," ",t.number," ",t.floor,"-",t.dept," "]}),className:"h-[42px] items-center w-full sm:w-80 !border-gray-200 shadow"})})};return re?r(U,{}):ee?r(Ae,{error:te}):o(Le,{children:[r(be,{action:ue,text:"Eventualidades"}),a.data.length>0?o(he,{children:[r(M,{className:"filter-box border-none shadow-none !bg-transparent p-0  sm:!m-0 flex flex-col sm:flex-row items-center gap-6 justify-start",children:r(k,{onChange:e=>ne(e),className:"mx-2 w-full !m-0 sm:mx-0 sm:w-96",initialValue:Z,name:"search",placeholder:"Buscar eventualidad por descripcion",fieldsetClassName:"w-full sm:w-fit",type:"search"})}),r(M,{className:"!p-0 !overflow-hidden !border-none sm:mx-0  mb-4 ",children:o(ge,{size:"small",emptyMessage:"No hay eventualidad para ese filtro",className:"!overflow-hidden   !border-none",value:a==null?void 0:a.data,filters:q,globalFilterFields:["Property.street","description","PropertyId"],dataKey:"id",responsiveLayout:"scroll",children:[r(u,{field:"PropertyId",body:e=>{var l,t,d,g;return o("span",{children:[(l=e.Property)==null?void 0:l.street," ",(t=e.Property)==null?void 0:t.number," ",(d=e.Property)==null?void 0:d.floor," ",(g=e.Property)==null?void 0:g.dept]})},header:"Propiedad",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0,filter:!0,filterMenuClassName:"!bg-gray-100 dark:!bg-slate-700 dark:!text-slate-400 dark:!border-slate-600",showClearButton:!1,showFilterMatchModes:!1,showApplyButton:!1,filterElement:me}),r(u,{field:"clientAmount",body:e=>o("span",{children:["$ ",e.clientAmount]}),sortable:!0,header:"Monto inquilino",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(u,{field:"ownerAmount",body:e=>o("span",{children:["$ ",e.ownerAmount]}),sortable:!0,header:"Monto Propietario",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(u,{field:"description",body:e=>o("span",{title:e.description,className:"",children:[e.description.slice(0,30)," ",e.description.length>30?"...":""]}),header:"Descripción",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(u,{field:"clientPaid",body:e=>r("span",{className:` ${e.clientPaid||e.clientAmount===0?"text-green-500":"text-red-400"} `,children:e.clientAmount===0?"--":e.clientPaid?"Si":"No"}),header:"Inquilino Pago",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(u,{field:"ownerPaid",body:e=>r("span",{className:` ${e.ownerPaid||e.ownerAmount===0?"text-green-500":"text-red-400"} `,children:e.ownerAmount===0?"--":e.ownerPaid?"Si":"No"}),header:"Propietario Pago",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(u,{field:"expiredDate",sortable:!0,body:e=>r("span",{className:` ${Me(e.expiredDate,new Date().toISOString().slice(0,10))<0?"text-green-500":"text-red-500"} `,children:Se(e.expiredDate)}),header:"Fecha Vencimiento",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(u,{body:ce,headerClassName:"!border-none dark:!bg-gray-800",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",exportable:!1,style:{width:90}})]})})]}):r(Ie,{text:"Aún no hay eventualidad"}),ae&&r(U,{h:40,w:40}),r(ye,{savingOrUpdating:T,show:S,setShow:v,destroy:()=>{var e;return ie((e=m.current)==null?void 0:e.id)},text:`${(O=m.current)==null?void 0:O.description}`}),o(we,{show:y,closeModal:E,overlayClick:!1,titleText:"Agregar  eventualidad",className:"shadow-none border-0 max-w-[500px]",children:[r(Te,{action:E}),o("form",{onSubmit:de,children:[r(_,{children:o("fieldset",{className:"",children:[r("label",{htmlFor:"PropertyId",children:"Propiedad"}),r(K,{value:C,onChange:e=>b(e.value,"PropertyId"),options:(j=x.data)==null?void 0:j.data,optionLabel:"street",showClear:!0,filterPlaceholder:"Busca propiedad",optionValue:"id",filterBy:"street,number,dept,floor",placeholder:"Elije una propiedad",filter:!0,valueTemplate:(e,l)=>e?o("span",{children:[e.street," ",e.number," ",e.floor,"-",e.dept]}):l.placeholder,itemTemplate:e=>o("span",{children:[" ",e.street," ",e.number," ",e.floor,"-",e.dept," "]}),className:"h-[42px] items-center !border-gray-200 shadow"}),C>0&&o("span",{className:"text-blue-600 dark:text-blue-400 text-sm ",children:["Propietario :  ",(H=(G=($=x.data)==null?void 0:$.data.find(e=>e.id===C))==null?void 0:G.Owner)==null?void 0:H.fullName]}),(s==null?void 0:s.PropertyId)&&r(Ne,{text:"La propiedad es obligatoria."})]})}),o(_,{children:[r(k,{placeholder:"0.00",type:"number",initialValue:F||"",onChange:e=>b(e,"clientAmount"),label:"Monto Inquilino",disabled:F===0&&A,required:!0,hasError:s==null?void 0:s.clientAmount,errorText:"El monto del cliente es obligatorio."}),r(k,{placeholder:"0.00",type:"number",initialValue:I||"",onChange:e=>b(e,"ownerAmount"),label:"Monto propietario",disabled:I===0&&A,required:!0,hasError:s==null?void 0:s.ownerAmount,errorText:"El monto del propietario es obligatorio."})]}),r(k,{placeholder:"",initialValue:J||"",type:"date",onChange:e=>b(e,"expiredDate"),label:"Fecha Vencimiento",required:!0,hasError:s==null?void 0:s.expiredDate,errorText:"La fecha de vencimiento es obligatorio."}),r(Pe,{placeholder:"Escribe una breve descripción ...",initialValue:W||"",onChange:e=>b(e,"description"),maxLength:255,label:"Descripción",required:!0,hasError:s==null?void 0:s.description,errorText:"La descripción es obligatoria."}),r(ve,{savingOrUpdating:T,onClose:E})]})]})]})};export{tr as default};
