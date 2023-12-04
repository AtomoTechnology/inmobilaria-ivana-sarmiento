import{r as u,f as E,j as a,L as O,a as s,F as he,h as A}from"./index-3ed1fa78.js";import{u as pe,H as fe,D as ge,C as f,a as be}from"./HeaderData-f8341142.js";import{B as Ce}from"./Box-2f3a3966.js";import{E as xe}from"./EditIcon-72ee5f20.js";import{D as ye}from"./DeleteIcon-e6cc714b.js";import{C as Ne,F as ve}from"./FormActionBtns-c23092d4.js";import{C as h}from"./CustomInput-6ca7ad9c.js";import{u as ke}from"./FormError-a3fab181.js";import{R as Ee,D as j}from"./RequestError-ce21148f.js";import{F as C}from"./FieldsetGroup-13ce1fee.js";import{p as Ae}from"./provinces-d69f2b85.js";import{C as we}from"./CloseOnClick-54123682.js";import{u as Fe}from"./useClients-8bfd547f.js";import{v as Pe}from"./form-3a2308eb.js";import{E as Se}from"./EmptyData-5a33961e.js";import{C as Me}from"./CustomTextArea-ed7f84a9.js";import{B as Te}from"./BoxContainerPage-d81583a3.js";import"./useQuery-6083f14c.js";const Ye=()=>{var L,V;const[I,g]=u.useState(!1),[w,x]=u.useState(!1),[y,p]=u.useState(!1),{values:t,handleInputChange:d,reset:N,updateAll:$}=ke({fullName:"",email:"",phone:"",fixedPhone:"",cuit:"",province:"",city:"",address:"",codePostal:"",obs:""}),{fullName:G,email:H,phone:R,cuit:J,province:U,city:K,address:_,codePostal:Q,obs:W,fixedPhone:X}=t,[o,F]=u.useState(),[P,S]=u.useState(!1),[Y,Z]=u.useState([]),[z,ee]=u.useState(""),[M,ae]=u.useState({global:{value:null,matchMode:E.CONTAINS},fullName:{value:null,matchMode:E.CONTAINS},cuit:{value:null,matchMode:E.CONTAINS}}),n=u.useRef(),{showAndHideModal:c}=pe(),{data:r,isError:re,isLoading:oe,error:te,isFetching:le,refetch:Le}=Fe(),se=e=>{$({...e}),T(e.province),g(!0),S(!0),n.current=e},ie=e=>{x(!w),n.current=e},ne=async e=>{var b,D,q;e.preventDefault();const{error:m,ok:i}=Pe({...t},["obs","fixedPhone","codePostal","city","province"]);if(F(m),!i)return!1;if(P)try{p(!0);const l=await A.put(`/clients/${(b=n.current)==null?void 0:b.id}`,t);l.data.ok?(r!=null&&r.data&&(r.data=r==null?void 0:r.data.map(k=>{var B;return k.id===((B=n.current)==null?void 0:B.id)&&(k={fullName:t.fullName,email:t.email,phone:t.phone,cuit:t.cuit,province:t.province,city:t.city,address:t.address,codePostal:t.codePostal,fixedPhone:t.fixedPhone,obs:t.obs,id:n.current.id,createdAt:n.current.createdAt,updatedAt:n.current.updatedAt}),k})),N(),g(!1),c("Editado",l.data.message)):c("Error",l.data.message||"Algo malo ocurrío.","red")}catch(l){l.response&&c("Error",((D=l.response.data)==null?void 0:D.message)||"Algo malo ocurrío.","red")}finally{p(!1)}else try{p(!0);const l=await A.post("/clients",t);l.data.ok?(r==null||r.data.unshift(l.data.data),N(),g(!1),c("Guardado",l.data.message)):c("Error",l.data.message||"Algo malo ocurrío.","red")}catch(l){l.response&&c("Error",((q=l.response.data)==null?void 0:q.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},de=async e=>{var m;try{p(!0);const i=await A.delete("/clients/"+e);i.data.ok?(r!=null&&r.data&&(r.data=r==null?void 0:r.data.filter(b=>b.id!==e)),x(!1),c("Borrado",i.data.message)):c("Error",i.data.message||"Algo malo ocurrío.","red")}catch(i){i.response&&c("Error",((m=i.response.data)==null?void 0:m.message)||"Algo malo ocurrío.","red")}finally{p(!1)}},v=()=>{N(),g(!1),F({})},ce=e=>{const m=e;let i={...M};i.global.value=m,ae(i),ee(m)},ue=e=>s("div",{className:"flex gap-x-3 items-center justify-center",children:[a(xe,{action:()=>se(e)}),a(ye,{action:()=>ie(e)})]}),T=async e=>{const i=await(await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${e}&campos=nombre&max=1000`)).json();Z(i.localidades)},me=()=>{S(!1),n.current=null,g(!0)};return oe?a(O,{}):re?a(Ee,{error:te}):s(Te,{children:[a(fe,{action:me,text:"Inquilinos"}),r.data.length>0?s(he,{children:[a(h,{onChange:e=>ce(e),className:" w-auto mx-2 sm:mx-0 sm:w-96",initialValue:z,placeholder:"Buscar inquilino",type:"search"}),a(Ce,{className:"!p-0 !overflow-hidden !border-none sm:mx-0 mb-4 ",children:s(ge,{size:"small",emptyMessage:"Aún no hay inquilino",className:"!overflow-hidden !border-none",value:r==null?void 0:r.data,filters:M,globalFilterFields:["fullName","cuit"],dataKey:"id",responsiveLayout:"scroll",children:[a(f,{field:"fullName",header:"Nombre",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),a(f,{field:"cuit",header:"Cuit/Cuil",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),a(f,{field:"email",header:"Correo",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(f,{field:"phone",header:"Celular",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(f,{field:"address",body:e=>s("span",{children:[e.city||"-"," ",e.province||"-"," , ",e.address]}),header:"Dirección",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(f,{body:ue,headerClassName:"!border-none dark:!bg-gray-800",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",exportable:!1,style:{width:90}})]})})]}):a(Se,{text:"Aún no hay inquilino."}),le&&a(O,{h:40,w:40}),a(be,{show:w,savingOrUpdating:y,setShow:x,destroy:()=>{var e;return de((e=n.current)==null?void 0:e.id)},text:`${(L=n.current)==null?void 0:L.fullName} | ${(V=n.current)==null?void 0:V.cuit}`}),a(Ne,{show:I,closeModal:v,titleText:`${P?"Editar":"Crear"} inquilino`,children:s("form",{onSubmit:ne,className:`${y&&"disabled-all"}`,children:[a(we,{action:v}),s(C,{children:[a(h,{placeholder:"Juan Jose",initialValue:G||"",onChange:e=>d(e,"fullName"),maxLength:100,label:"Nombre Completo",required:!0,hasError:o==null?void 0:o.fullName,errorText:"El nombre es obligatorio."}),a(h,{placeholder:"example@gmail.com",initialValue:H||"",type:"email",onChange:e=>d(e,"email"),maxLength:255,label:"Email",required:!0,hasError:o==null?void 0:o.email,errorText:"El correo es obligatorio."})]}),s(C,{children:[a(h,{placeholder:"20909239120",initialValue:J||"",onChange:e=>d(e,"cuit"),maxLength:255,label:"Cuit/Cuil",required:!0,hasError:o==null?void 0:o.cuit,errorText:"El cuit/cuil es obligatorio."}),a(h,{placeholder:"3417207882",initialValue:R||"",onChange:e=>d(e,"phone"),maxLength:20,label:"Teléfono",required:!0,hasError:o==null?void 0:o.phone,errorText:"El teléfono es obligatorio."}),a(h,{placeholder:"3417207882",initialValue:X||"",onChange:e=>d(e,"fixedPhone"),maxLength:20,label:"Teléfono fijo",optional:!0})]}),s(C,{children:[s("fieldset",{className:"",children:[s("label",{htmlFor:"province",children:["Provincia ",a("span",{className:"text-xs opacity-50",children:"(opcional)"})," "]}),a(j,{value:U,onChange:e=>{d(e.value,"province"),T(e.value)},filterPlaceholder:"santa fe",options:Ae,optionValue:"nombre",optionLabel:"nombre",placeholder:"elije una provincia",filter:!0,className:"h-[42px] items-center"})]}),s("fieldset",{className:"",children:[s("label",{htmlFor:"city",children:["Ciudad ",a("span",{className:"text-xs opacity-50",children:"(opcional)"})," "]}),a(j,{value:K,onChange:e=>d(e.value,"city"),options:Y,filterPlaceholder:"rosario",optionLabel:"nombre",optionValue:"nombre",placeholder:"elije una ciudad",filter:!0,className:"h-[42px] items-center"})]})]}),s(C,{children:[a(h,{placeholder:"Sarmiento 1247",initialValue:_||"",onChange:e=>d(e,"address"),maxLength:100,label:"Dirección",required:!0,hasError:o==null?void 0:o.address,errorText:"La dirección es obligatoria."}),a(h,{placeholder:"2000",initialValue:Q||"",onChange:e=>d(e,"codePostal"),label:"Código Postal",optional:!0})]}),a(Me,{placeholder:"escribe una observación o nota de algo...",initialValue:W||"",onChange:e=>d(e,"obs"),label:"Observación",optional:!0,className:"h-16"}),a(ve,{savingOrUpdating:y,onClose:v})]})})]})};export{Ye as default};
