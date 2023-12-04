import{h as x,j as r,r as f,L as ee,a as t,F as Fe}from"./index-3ed1fa78.js";import{u as Pe,H as Se,D as Ie,C as y,a as Te}from"./HeaderData-f8341142.js";import{B as Le}from"./Box-2f3a3966.js";import{E as Be}from"./EditIcon-72ee5f20.js";import{D as re}from"./DeleteIcon-e6cc714b.js";import{C as L,F as ae}from"./FormActionBtns-c23092d4.js";import{u as te,F as oe}from"./FormError-a3fab181.js";import{R as je,D as se}from"./RequestError-ce21148f.js";import{u as qe}from"./useQuery-6083f14c.js";import{C as le}from"./CustomTextArea-ed7f84a9.js";import{u as Re}from"./useProperties-3ec06d0b.js";import{a as He}from"./index.esm-ed5d81e4.js";import{f as Oe,a as $e}from"./date-8ced1934.js";import{C as Qe}from"./CloseOnClick-54123682.js";import{v as Ve}from"./form-3a2308eb.js";import{E as Ye}from"./EmptyData-5a33961e.js";import{F as Ge}from"./FieldsetGroup-13ce1fee.js";import{D as Ke}from"./DropDownIcon-494d3a2b.js";const Ue=async()=>await x.get("/claims").then(b=>b.data),_e=()=>qe({queryKey:["claims"],queryFn:Ue}),Je=({action:b,color:g="",size:M=25})=>r(He,{title:"Agregar comentario",color:g,size:M,onClick:b}),br=()=>{var H,O,$,Q,V,Y,G,K,U,_,J,W,X;const[b,g]=f.useState(!1),[M,B]=f.useState(!1),[de,F]=f.useState(!1),[j,P]=f.useState(!1),{description:ne,PropertyId:C,state:ie,details:We,values:N,handleInputChange:S,reset:I,updateAll:ce}=te({description:"",state:"",details:[],PropertyId:0}),{comment:A,values:Xe,handleInputChange:me,reset:ue}=te({comment:""}),[m,v]=f.useState(),[k,q]=f.useState(!1),o=f.useRef(),{showAndHideModal:i}=Pe(),[E,p]=f.useState(!1),{data:a,isError:pe,isLoading:he,error:fe,refetch:Ze,isFetching:ge}=_e(),D=Re(),be=e=>{ce({...e,details:e.details}),g(!0),q(!0),o.current=e},ye=e=>{P(!j),o.current=e},xe=async e=>{var s;try{p(!0);const d=await x.delete("/claims/"+e);d.data.ok?(a!=null&&a.data&&(a.data=a==null?void 0:a.data.filter(c=>c.id!==e)),P(!1),i("Borrado",d.data.message)):i("Error",d.data.message||"Algo malo ocurrío.","red")}catch(d){d.response&&i("Error",((s=d.response.data)==null?void 0:s.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},Ce=()=>{let e=!0,s={};return A.trim().length||(e=!1,s.comment=!0),v(s),e},ke=async e=>{var c,n,h,u;e.preventDefault();const{error:s,ok:d}=Ve({...N},["state","details"]);if(v(s),!d)return!1;if(k)try{p(!0);const l=await x.put(`/claims/${(c=o.current)==null?void 0:c.id}`,{...N});l.data.ok?(a!=null&&a.data&&(a.data=a==null?void 0:a.data.map(w=>{var Z,z;return w.id===((Z=o.current)==null?void 0:Z.id)&&(w={...N,Property:(z=D.data)==null?void 0:z.data.find(Me=>Me.id===C)}),w})),I(),g(!1),i("Editado",l.data.message)):i("Error",l.data.message||"Algo malo ocurrío.","red")}catch(l){l.response&&i("Error",((n=l.response.data)==null?void 0:n.message)||"Algo malo ocurrío.","red")}finally{p(!1)}else try{p(!0);const l=await x.post("/claims",{...N});l.data.ok?(a==null||a.data.unshift({...l.data.data,Property:(h=D.data)==null?void 0:h.data.find(w=>w.id===C)}),I(),g(!1),i("Guardado",l.data.message)):i("Error",l.data.message||"Algo malo ocurrío.","red")}catch(l){l.response&&i("Error",((u=l.response.data)==null?void 0:u.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},R=()=>{I(),g(!1),v({})},T=()=>{ue(),B(!1),v({})},we=e=>{o.current=e,B(!0)},Ne=e=>{o.current=e,F(!0)},Ae=async e=>{var s,d,c;if(e.preventDefault(),Ce())try{p(!0);const n=await x.put("/claims/"+((s=o.current)==null?void 0:s.id),{details:[...(d=o.current)==null?void 0:d.details,{comment:A,date:new Date}]});n.data.ok?(a!=null&&a.data&&(a.data=a==null?void 0:a.data.map(h=>{var u,l;return h.id===((u=o.current)==null?void 0:u.id)&&(h.details=[...(l=o.current)==null?void 0:l.details,{comment:A,date:new Date}]),h})),T(),i("Agregado",n.data.message)):i("Error",n.data.message||"Algo malo ocurrío.","red")}catch(n){n.response&&i("Error",((c=n.response.data)==null?void 0:c.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},ve=async e=>{var s,d,c;try{p(!0);let n=(s=o.current)==null?void 0:s.details.filter(u=>u.date!==e);const h=await x.put("/claims/"+((d=o.current)==null?void 0:d.id),{details:n});h.data.ok?(a!=null&&a.data&&(a.data=a==null?void 0:a.data.map(u=>{var l;return u.id===((l=o.current)==null?void 0:l.id)&&(u.details=n),u})),i("Borrado",h.data.message)):i("Error",h.data.message||"Algo malo ocurrío.","red")}catch(n){n.response&&i("Error",((c=n.response.data)==null?void 0:c.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},Ee=e=>t("div",{className:"flex gap-x-3 items-center justify-end",children:[e.state==="Abierto"&&r(Je,{action:()=>we(e)}),r(Be,{action:()=>be(e)}),r(re,{action:()=>ye(e)})]}),De=()=>{q(!1),o.current=null,g(!0)};return he?r(ee,{}):pe?r(je,{error:fe}):t("div",{className:"container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center",children:[r(Se,{action:De,text:"Reclamos"}),a.data.length>0?r(Fe,{children:r(Le,{className:"!p-0 !overflow-hidden !border-none sm:mx-0    mb-4 ",children:t(Ie,{size:"small",emptyMessage:"Aún no hay reclamo",className:"!overflow-hidden   !border-none",value:a==null?void 0:a.data,dataKey:"id",responsiveLayout:"scroll",children:[r(y,{field:"Property.street",sortable:!0,body:e=>{var s,d,c,n;return t("span",{children:[(s=e.Property)==null?void 0:s.street," ",(d=e.Property)==null?void 0:d.number," ",(c=e.Property)==null?void 0:c.floor,"-",(n=e.Property)==null?void 0:n.dept]})},header:"Propiedad",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(y,{field:"description",header:"Descripción",body:e=>t("span",{title:e.description,children:[e.description.slice(0,60)," ",e.description.length>60?"...":""]}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(y,{field:"state",header:"Estado",sortable:!0,body:e=>t("span",{className:`font-bold ${e.state==="Abierto"?"text-green-500":"text-red-400"}`,children:[e.state," "]}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(y,{field:"date",header:"Fecha Inicio",body:e=>r("span",{children:Oe(e.createdAt)}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),r(y,{field:"details.length",header:"Comentarios",sortable:!0,body:e=>t("button",{disabled:e.details.length===0,onClick:()=>Ne(e),className:" border-brand border rounded-full shadow px-2  py-1 text-brand",children:[" Ver (",e.details.length,") "]}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(y,{body:Ee,headerClassName:"!border-none dark:!bg-gray-800",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",exportable:!1,style:{width:90}})]})})}):r(Ye,{text:"Aún no hay reclamo"}),ge&&r(ee,{h:40,w:40}),r(Te,{show:j,savingOrUpdating:E,setShow:P,destroy:()=>{var e;return xe((e=o.current)==null?void 0:e.id)},text:`${(H=o.current)==null?void 0:H.description}`}),r(L,{show:b,closeModal:R,overlayClick:!1,className:"max-w-[700px] w-fit sm:w-[600px]",titleText:`${k?"Editar":"Iniciar"}  reclamo`,children:t("form",{onSubmit:ke,children:[t(Ge,{children:[t("fieldset",{className:"",children:[r("label",{htmlFor:"PropertyId",children:"Propiedad"}),r(se,{value:C,onChange:e=>S(e.value,"PropertyId"),options:(O=D.data)==null?void 0:O.data,optionLabel:"street",dropdownIcon:()=>r(Ke,{}),disabled:k,showClear:!0,filterPlaceholder:"Busca propiedad",optionValue:"id",filterBy:"street,number,dept,floor",placeholder:"elije una propiedad",filter:!0,valueTemplate:(e,s)=>e?t("span",{children:[e.street," ",e.number," ",e.floor,"-",e.dept]}):s.placeholder,itemTemplate:e=>t("span",{children:[" ",e.street," ",e.number," ",e.floor,"-",e.dept," "]}),className:"h-[42px] items-center !border-gray-200 shadow"}),C!==0&&t("span",{className:"text-blue-600 dark:text-blue-400 text-sm ",children:["Propietario :  ",(V=(Q=($=D.data)==null?void 0:$.data.find(e=>e.id===C))==null?void 0:Q.Owner)==null?void 0:V.fullName]}),(m==null?void 0:m.PropertyId)&&r(oe,{text:"La propiedad es obligatoria."})]}),k&&t("fieldset",{className:"w-full sm:w-[30%]",children:[r("label",{htmlFor:"state",children:"Estado"}),r(se,{value:ie,onChange:e=>S(e.value,"state"),options:["Abierto","Cerrado"],placeholder:"elije un estado",className:"h-[42px] items-center !border-gray-200 shadow"}),(m==null?void 0:m.state)&&r(oe,{text:"El estado es obligatorio."})]})]}),r(le,{placeholder:"Escribe una descripción...",initialValue:ne,onChange:e=>S(e,"description"),maxLength:255,className:"h-24",label:"Descripción",required:!0,hasError:m==null?void 0:m.description,errorText:"La descripción es obligatoria."}),r(ae,{savingOrUpdating:E,onClose:R})]})}),r(L,{show:M,closeModal:T,overlayClick:!1,className:"max-w-[700px] w-fit sm:w-[600px]",titleText:`${k?"Editar":"Agregar"}  comentario`,children:t("form",{onSubmit:Ae,children:[t("fieldset",{children:[t("label",{htmlFor:"PropertyId",children:["Reclamo : #",(Y=o.current)==null?void 0:Y.id]}),t("span",{className:"border border-gray-300 dark:border-slate-500  p-2",children:[" ",(G=o.current)==null?void 0:G.description," "]})]}),r(le,{placeholder:"Escribe un comentario...",initialValue:A,className:"min-h-[150px]",onChange:e=>me(e,"comment"),label:"Comentario",required:!0,hasError:m==null?void 0:m.comment,errorText:"El comentario es obligatorio."}),r(ae,{savingOrUpdating:E,onClose:T})]})}),t(L,{show:de,closeModal:()=>F(!1),overlayClick:!1,className:"max-w-[700px] w-fit sm:w-[600px]",titleText:"Comentarios",children:[r(Qe,{action:()=>F(!1)}),t("div",{className:"",children:[t("fieldset",{className:"border border-gray-300 dark:border-slate-500 p-2 text-sm",children:[t("label",{htmlFor:"PropertyId",children:["Reclamo : #",(K=o.current)==null?void 0:K.id]}),t("span",{className:"",children:[" ",(U=o.current)==null?void 0:U.description," "]})]}),((J=(_=o.current)==null?void 0:_.details)==null?void 0:J.length)===0?r("div",{className:"text-center text-gray-400 my-6",children:"No hay comentarios"}):r("div",{className:"comments flex flex-col gap-y-2  max-h-[420px] my-4 overflow-y-auto",children:(X=(W=o.current)==null?void 0:W.details)==null?void 0:X.map(e=>t("div",{className:"comment bg-gray-200 p-2 pb-5 relative group hover:bg-gray-100 cursor-pointer dark:bg-slate-700",children:[r("div",{dangerouslySetInnerHTML:{__html:e.comment.replaceAll(`
`,"<br />")}}),t("div",{className:"absolute bottom-[2px] right-1 text-xs",children:[" ",$e(e.date)," "]}),t("button",{disabled:E,title:"Doble click para eliminar",onClick:()=>{var s;(s=document.querySelectorAll(".showAlertDelete"))==null||s.forEach(d=>{d.classList.toggle("hidden")})},onDoubleClick:()=>{ve(e.date)},className:"absolute top-[2px] right-1 text-xs hidden bg-red-100   dark:bg-gray-800 p-2 rounded-full shadow-lg group-hover:flex",children:[r(re,{action:()=>{}}),r("span",{className:"showAlertDelete absolute top-2 shadow rounded hidden  right-10 bg-gray-200 p-1 w-40 text-xs",children:"Doble click para eliminar"})]})]},e.date))})]})]})]})};export{br as default};