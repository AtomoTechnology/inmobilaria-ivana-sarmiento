import{h as A,r as d,f as w,j as a,L as z,a as s,F as Le,a3 as De}from"./index-3ed1fa78.js";import{u as je,H as Oe,D as W,C as c,a as qe}from"./HeaderData-f8341142.js";import{B as Be}from"./Box-2f3a3966.js";import{E as Re}from"./EditIcon-72ee5f20.js";import{D as Y}from"./DeleteIcon-e6cc714b.js";import{C as ee,F as ae}from"./FormActionBtns-c23092d4.js";import{C as x}from"./CustomInput-6ca7ad9c.js";import{u as re,F as Ge}from"./FormError-a3fab181.js";import{R as Ue,D as He}from"./RequestError-ce21148f.js";import{u as Qe}from"./useQuery-6083f14c.js";import{F as te}from"./FieldsetGroup-13ce1fee.js";import{u as Ke}from"./useProperties-3ec06d0b.js";import{a as Xe,b as $e}from"./date-8ced1934.js";import{E as Je}from"./EmptyData-5a33961e.js";import{v as se}from"./form-3a2308eb.js";import{C as Ze}from"./CustomTextArea-ed7f84a9.js";const _e=async()=>await A.get("/visits?sort=date:desc").then(k=>k.data),ze=()=>Qe({queryKey:["visits"],queryFn:_e}),ba=()=>{var U,H,Q,K,X;const[k,f]=d.useState(!1),[I,E]=d.useState(!1),[M,p]=d.useState(!1),{date:le,phone:We,description:T,fullName:Ye,PropertyId:g,values:v,handleInputChange:F,reset:V,updateAll:oe}=re({date:"",phone:"",description:"",fullName:"",PropertyId:null}),{email:de,fullName:ie,phone:ne,values:L,handleInputChange:S,reset:ce}=re({phone:"",fullName:"",email:""}),[me,ue]=d.useState(""),[h,D]=d.useState(),[j,O]=d.useState(!1),m=d.useRef(),[pe,q]=d.useState(!1),[he,B]=d.useState(!1),[i,b]=d.useState([]),{showAndHideModal:n}=je(),{data:t,isError:fe,isLoading:ge,error:be,isFetching:ye,refetch:ea}=ze(),C=Ke(),[Ne,xe]=d.useState(),[R,ke]=d.useState({global:{value:null,matchMode:w.CONTAINS},fullName:{value:null,matchMode:w.CONTAINS},phone:{value:null,matchMode:w.CONTAINS},"Property.street":{value:null,matchMode:w.CONTAINS}}),ve=e=>{const r=e;let l={...R};l.global.value=r,ke(l),ue(r)},Ce=e=>{oe({...e,date:$e(e.date),PropertyId:e.Property.id}),b(e.participants),f(!0),O(!0),m.current=e},we=e=>{E(!I),m.current=e},Ae=async e=>{var r;try{p(!0);const l=await A.delete("/visits/"+e);l.data.ok?(t!=null&&t.data&&(t.data=t==null?void 0:t.data.filter(u=>u.id!==e)),E(!1),n("Borrado",l.data.message)):n("Error",l.data.message||"Algo malo ocurrío.","red")}catch(l){l.response&&n("Error",((r=l.response.data)==null?void 0:r.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},Ee=async e=>{var u,y,$,J;e.preventDefault();const{error:r,ok:l}=se({...v},["description","fullName","phone"]);if(console.log(r),D(r),!l||i.length===0)return!1;if(j)try{p(!0);const o=await A.put(`/visits/${(u=m.current)==null?void 0:u.id}`,{...v,participants:i});o.data.ok?(t!=null&&t.data&&(t.data=t==null?void 0:t.data.map(N=>{var Z,_;return N.id===((Z=m.current)==null?void 0:Z.id)&&(N={...v,participants:i,Property:(_=C.data)==null?void 0:_.data.find(Te=>Te.id===g)}),N})),V(),b([]),f(!1),n("Editado",o.data.message)):n("Error",o.data.message||"Algo malo ocurrío.","red")}catch(o){o.response&&n("Error",((y=o.response.data)==null?void 0:y.message)||"Algo malo ocurrío.","red")}finally{p(!1)}else try{p(!0);const o=await A.post("/visits",{...v,participants:i});o.data.ok?(t==null||t.data.unshift({...o.data.data,Property:($=C.data)==null?void 0:$.data.find(N=>N.id===g)}),V(),b([]),f(!1),n("Guardado",o.data.message)):n("Error",o.data.message||"Algo malo ocurrío.","red")}catch(o){o.response&&n("Error",((J=o.response.data)==null?void 0:J.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},G=()=>{V(),f(!1),D({})},P=()=>{ce(),q(!1)},Fe=async e=>{e.preventDefault();const{error:r,ok:l}=se({...L});if(!l)return!1;B(!0),b([...i,{...L,id:De()}]),B(!1),P()},Ve=e=>b(i.filter(r=>r.id!==e.id)),Se=e=>s("div",{className:"flex gap-x-3 items-center justify-center",children:[a(Re,{action:()=>Ce(e)}),a(Y,{action:()=>we(e)})]}),Pe=()=>{O(!1),m.current=null,f(!0)},Ie=e=>{var r;return((r=e==null?void 0:e.participants)==null?void 0:r.length)>0||!1},Me=e=>a("div",{className:"p-3",children:s(W,{size:"small",dataKey:"id",className:"!overflow-hidden   !border-none",responsiveLayout:"scroll",value:e.participants,children:[a(c,{field:"fullName",body:r=>s("span",{children:[r.fullName," "]}),header:"Nombre",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),a(c,{field:"phone",body:r=>s("span",{children:[r.phone," "]}),header:"Celular",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(c,{field:"email",body:r=>s("span",{children:[r.email," "]}),header:"Email",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "})]})});return ge?a(z,{}):fe?a(Ue,{error:be}):s("div",{className:"container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center",children:[a(Oe,{action:Pe,text:"Visitas"}),t.data.length>0?s(Le,{children:[a(x,{onChange:e=>ve(e),className:" w-auto mx-2 sm:mx-0 sm:w-96",initialValue:me,placeholder:"Buscar vista por nombre, teléfono o dirección",type:"search"}),a(Be,{className:"!p-0 !overflow-hidden !border-none sm:mx-0   mb-4",children:s(W,{size:"small",emptyMessage:"Aún no hay visita",className:"!overflow-hidden   !border-none",value:t==null?void 0:t.data,filters:R,globalFilterFields:["fullName","phone","Property.street"],dataKey:"id",expandedRows:Ne,rowExpansionTemplate:Me,onRowToggle:e=>xe(e.data),responsiveLayout:"scroll",children:[a(c,{expander:Ie,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",style:{width:"0.5rem"}}),a(c,{header:"Dirección",body:e=>{var r,l,u,y;return s("span",{children:[(r=e.Property)==null?void 0:r.street," ",(l=e.Property)==null?void 0:l.number," ",(u=e.Property)==null?void 0:u.floor,"-",(y=e.Property)==null?void 0:y.dept]})},headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),a(c,{field:"date",header:"Fecha Inicio",body:e=>a("span",{children:Xe(e.date)}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),a(c,{field:"participants.length",header:"Cant. Visitores",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 !text-center"}),a(c,{field:"description",header:"Nota",body:e=>s("span",{title:e.description,children:[e.description.slice(0,60)," ",e.description.length>60?"...":""]}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600"}),a(c,{body:Se,headerClassName:"!border-none dark:!bg-gray-800",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",exportable:!1,style:{width:90}})]})})]}):a(Je,{text:"Aún no hay visita "}),ye&&a(z,{h:40,w:40}),a(qe,{show:I,savingOrUpdating:M,setShow:E,destroy:()=>{var e;return Ae((e=m.current)==null?void 0:e.id)},text:`${(U=m.current)==null?void 0:U.fullName}`}),a(ee,{show:pe,closeModal:P,overlayClick:!1,className:"",titleText:"Agregar persona",children:s("form",{action:"",onSubmit:Fe,children:[s("div",{children:[a(x,{placeholder:"Juan jose",initialValue:ie,onChange:e=>S(e,"fullName"),maxLength:100,label:"Nombre Completo",name:"",required:!0}),a(x,{placeholder:"3410101010",initialValue:ne,onChange:e=>S(e,"phone"),maxLength:20,label:"Télefono",required:!0}),a(x,{placeholder:"example@gmail.com",initialValue:de,onChange:e=>S(e,"email"),maxLength:100,label:"Email",required:!0})]}),a(ae,{savingOrUpdating:he,onClose:P})]})}),a(ee,{show:k,closeModal:G,overlayClick:!1,className:"sm:min-w-[350px] max-w-2xl",titleText:`${j?"Editar":"Agendar"}   visita`,children:s("form",{onSubmit:Ee,children:[s("fieldset",{className:"",children:[a("label",{htmlFor:"PropertyId",children:"Propiedad"}),a(He,{value:g,onChange:e=>F(e.value,"PropertyId"),options:(H=C.data)==null?void 0:H.data,optionLabel:"street",showClear:!0,filterPlaceholder:"Busca propiedad",optionValue:"id",filterBy:"street,number,dept,floor",placeholder:"elije una propiedad",filter:!0,valueTemplate:(e,r)=>e?s("span",{children:[e.street," ",e.number," ",e.floor,"-",e.dept]}):r.placeholder,itemTemplate:e=>s("span",{children:[" ",e.street," ",e.number," ",e.floor,"-",e.dept," "]}),className:"h-[42px] items-center !border-gray-200 shadow"}),g!==null&&s("span",{className:"text-blue-600 dark:text-blue-400 text-sm ",children:["Propietario :  ",(X=(K=(Q=C.data)==null?void 0:Q.data.find(e=>e.id===g))==null?void 0:K.Owner)==null?void 0:X.fullName]}),(h==null?void 0:h.PropertyId)&&a(Ge,{text:"La propiedad es obligatoria."})]}),a(te,{}),i.length>0&&a("div",{className:"flex flex-col gap-y-4 mt-4   relative",children:i==null?void 0:i.map(e=>s("div",{className:"relative",children:[a("div",{className:"absolute top-1 right-1",children:a(Y,{action:()=>Ve(e)})}),s("div",{className:"flex items-center !border !border-gray-300 justify-between  shadow  dark:!border-slate-600 p-1 px-2 ",children:[a("div",{title:e.fullName,className:"w-[220px] truncate ",children:e.fullName}),a("div",{className:"w-[220px] ",children:e.phone}),a("div",{className:"w-[220px] ",children:e.email})]})]},e.id))}),a("div",{className:"add-more-visitors w-full grid items-center  hover:border-brand2 mt-2 border border-gray-400 bg-transparent  border-dashed ",children:a("button",{type:"button",className:"btn !bg-transparent dark:text-slate-400 hover:!text-blue-400 ",onClick:()=>q(!0),children:"Agregar"})}),a(te,{children:a(x,{placeholder:"Fecha visita",type:"datetime-local",initialValue:le,onChange:e=>F(e,"date"),label:"Fecha",required:!0,hasError:h==null?void 0:h.date,errorText:"La fecha es obligatoria."})}),s("div",{className:"flex flex-col justify-between",children:[a(Ze,{placeholder:"Puede llegar tarde el inquilino",initialValue:T,onChange:e=>F(e,"description"),label:"Nota",maxLength:255,optional:!0}),s("div",{className:"items-end self-end",children:[T.length,"/255"]})]}),a(ae,{savingOrUpdating:M,onClose:G})]})})]})};export{ba as default};