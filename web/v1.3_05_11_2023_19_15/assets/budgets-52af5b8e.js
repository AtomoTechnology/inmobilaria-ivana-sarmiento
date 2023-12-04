import{h as A,r as f,j as a,L as z,a as r,F as me,I as ue,B as he}from"./index-3ed1fa78.js";import{u as ge,H as be,D as fe,C as n,a as ye}from"./HeaderData-f8341142.js";import{B as xe}from"./Box-2f3a3966.js";import{E as ke}from"./EditIcon-72ee5f20.js";import{D as Ne}from"./DeleteIcon-e6cc714b.js";import{C as ve,F as we}from"./FormActionBtns-c23092d4.js";import{u as Ce,F as v}from"./FormError-a3fab181.js";import{R as Ee,D as h}from"./RequestError-ce21148f.js";import{C as Fe}from"./CustomTextArea-ed7f84a9.js";import{u as Pe}from"./useProperties-3ec06d0b.js";import{f as Ae}from"./date-8ced1934.js";import{C as Ie}from"./CloseOnClick-54123682.js";import{v as De}from"./form-3a2308eb.js";import{E as Be}from"./EmptyData-5a33961e.js";import{F as P}from"./FieldsetGroup-13ce1fee.js";import{u as Me}from"./useQuery-6083f14c.js";import{D as g}from"./DropDownIcon-494d3a2b.js";const Se=async()=>await A.get("/budgets").then(w=>w.data),Le=()=>Me({queryKey:["bdgets"],queryFn:Se}),Ze=()=>{var q,O,V,G,H;const[w,y]=f.useState(!1),[B,I]=f.useState(!1),{description:M,PropertyId:x,category:K,type:W,photo:C,values:k,belongsTo:_,state:J,approved:X,charged:Z,handleInputChange:p,reset:D,updateAll:S}=Ce({description:"",category:"",type:"",state:"En curso",approved:!1,charged:!1,belongsTo:"",photo:"",PropertyId:null}),[o,L]=f.useState(),[E,T]=f.useState(!1),u=f.useRef(),{showAndHideModal:i}=ge(),[j,b]=f.useState(!1),{data:t,isError:ee,isLoading:ae,error:re,refetch:Te,isFetching:te}=Le(),F=Pe(),oe=e=>{S({...e}),y(!0),T(!0),u.current=e},se=e=>{I(!B),u.current=e},le=async e=>{var s;try{b(!0);const l=await A.delete("/budgets/"+e);l.data.ok?(t!=null&&t.data&&(t.data=t==null?void 0:t.data.filter(c=>c.id!==e)),I(!1),i("Borrado",l.data.message)):i("Error",l.data.message||"Algo malo ocurrío.","red")}catch(l){l.response&&i("Error",((s=l.response.data)==null?void 0:s.message)||"Algo malo ocurrío.","red")}finally{b(!1)}},de=async e=>{var c,m,Q,Y;e.preventDefault();const{error:s,ok:l}=De({...k},["photo","charged","approved"]);if(L(s),!l)return!1;if(E)try{b(!0);const d=await A.put(`/budgets/${(c=u.current)==null?void 0:c.id}`,{...k});d.data.ok?(t!=null&&t.data&&(t.data=t==null?void 0:t.data.map(N=>{var U,$;return N.id===((U=u.current)==null?void 0:U.id)&&(N={...k,Property:($=F.data)==null?void 0:$.data.find(pe=>pe.id===x)}),N})),D(),y(!1),i("Editado",d.data.message)):i("Error",d.data.message||"Algo malo ocurrío.","red")}catch(d){d.response&&i("Error",((m=d.response.data)==null?void 0:m.message)||"Algo malo ocurrío.","red")}finally{b(!1)}else try{b(!0);const d=await A.post("/budgets",{...k});d.data.ok?(t==null||t.data.unshift({...d.data.data,Property:(Q=F.data)==null?void 0:Q.data.find(N=>N.id===x)}),D(),y(!1),i("Guardado",d.data.message)):i("Error",d.data.message||"Algo malo ocurrío.","red")}catch(d){d.response&&i("Error",((Y=d.response.data)==null?void 0:Y.message)||"Algo malo ocurrío.","red")}finally{b(!1)}},R=()=>{D(),y(!1),L({})},ne=e=>r("div",{className:"flex gap-x-3 items-center justify-end",children:[a(ke,{action:()=>oe(e)}),a(Ne,{action:()=>se(e)})]}),ie=()=>{T(!1),u.current=null,y(!0)},ce=e=>{const s=e.target.files[0];if(s&&s.size>3145728)return i("Error","La imagen no debe pesar mas de 3 MB","red"),e.target.files=null,!1;if(s){const l=new FileReader;l.onload=c=>{var m;S({...k,photo:c.target.result}),(m=document.querySelector("#img_preview"))==null||m.setAttribute("src",c.target.result)},l.readAsDataURL(s)}};return ae?a(z,{}):ee?a(Ee,{error:re}):r("div",{className:"container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center",children:[a(be,{action:ie,text:"Presupuestos"}),t.data.length>0?a(me,{children:a(xe,{className:"!p-0 !overflow-hidden !border-none sm:mx-0    mb-4 ",children:r(fe,{size:"small",emptyMessage:"Aún no hay presupuesto",className:"!overflow-hidden   !border-none",value:t==null?void 0:t.data,dataKey:"id",responsiveLayout:"scroll",children:[a(n,{field:"Property.street",sortable:!0,body:e=>{var s,l,c,m;return r("span",{children:[(s=e.Property)==null?void 0:s.street," ",(l=e.Property)==null?void 0:l.number," ",(c=e.Property)==null?void 0:c.floor,"-",(m=e.Property)==null?void 0:m.dept]})},header:"Propiedad",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"type",header:"Tipo",sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"category",header:"Categoria",sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"state",header:"Estado",sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"belongsTo",header:"Pertenece a",sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"approved",header:"Aprobado",body:e=>a("span",{children:e.approved?"Si":"No"}),sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"charged",header:"Cobrado",body:e=>a("span",{children:e.charged?"Si":"No"}),sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),a(n,{field:"description",header:"Descripción",body:e=>a("span",{title:e.description,children:e.description}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 truncate dark:!border-slate-600 ",style:{maxWidth:250}}),a(n,{field:"photo",header:"Foto",body:e=>e.photo?a(ue,{src:e.photo,alt:"Image",width:"70",className:"shadow",preview:!0}):"",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400 ",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600  ",style:{maxWidth:70}}),a(n,{field:"date",header:"Fecha Inicio",body:e=>a("span",{children:Ae(e.createdAt)}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),a(n,{body:ne,headerClassName:"!border-none dark:!bg-gray-800",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",exportable:!1,style:{width:90}})]})})}):a(Be,{text:"Aún no hay presupuesto"}),te&&a(z,{h:40,w:40}),a(ye,{show:B,savingOrUpdating:j,setShow:I,destroy:()=>{var e;return le((e=u.current)==null?void 0:e.id)},text:`${(q=u.current)==null?void 0:q.description}`}),a(ve,{show:w,closeModal:R,overlayClick:!1,className:"max-w-[700px] w-fit sm:w-[600px]",titleText:`${E?"Editar":"Armar"}  presupuesto`,children:r("form",{onSubmit:de,children:[a(P,{children:r("fieldset",{className:"",children:[a("label",{htmlFor:"PropertyId",children:"Propiedad"}),a(h,{value:x,onChange:e=>p(e.value,"PropertyId"),options:(O=F.data)==null?void 0:O.data,optionLabel:"street",dropdownIcon:()=>a(g,{}),disabled:E,showClear:!0,filterPlaceholder:"Busca propiedad",optionValue:"id",filterBy:"street,number,dept,floor",placeholder:"elije una propiedad",filter:!0,valueTemplate:(e,s)=>e?r("span",{children:[e.street," ",e.number," ",e.floor,"-",e.dept]}):s.placeholder,itemTemplate:e=>r("span",{children:[" ",e.street," ",e.number," ",e.floor,"-",e.dept," "]}),className:"h-[42px] items-center !border-gray-200 shadow"}),x!==null&&r("span",{className:"text-blue-600 dark:text-blue-400 text-sm ",children:["Propietario :  ",(H=(G=(V=F.data)==null?void 0:V.data.find(e=>e.id===x))==null?void 0:G.Owner)==null?void 0:H.fullName]}),(o==null?void 0:o.PropertyId)&&a(v,{text:"La propiedad es obligatoria."})]})}),r(P,{children:[r("fieldset",{className:"w-full",children:[a("label",{htmlFor:"type",children:"Tipo"}),a(h,{value:W,onChange:e=>p(e.value,"type"),dropdownIcon:()=>a(g,{}),options:["Factura","Recibo","Presupuesto","Expensas extraordinarias"],placeholder:"elije un tipo",className:"h-[42px] items-center !border-gray-200 shadow"}),(o==null?void 0:o.type)&&a(v,{text:"El tipo es obligatorio."})]}),r("fieldset",{className:"w-full",children:[a("label",{htmlFor:"category",children:"Categoría"}),a(h,{value:K,onChange:e=>p(e.value,"category"),dropdownIcon:()=>a(g,{}),options:["Plomeria","Gasista","Electricista","Pintura","Albañileria","Materiales"],placeholder:"elije una categoría",className:"h-[42px] items-center !border-gray-200 shadow"}),(o==null?void 0:o.category)&&a(v,{text:"La categoría es obligatorio."})]})]}),r(P,{children:[r("fieldset",{className:"w-full",children:[a("label",{htmlFor:"type",children:"Estado"}),a(h,{value:J,onChange:e=>p(e.value,"state"),dropdownIcon:()=>a(g,{}),options:["En curso","Visto","Aprobado","Rechazado"],placeholder:"elije un tipo",className:"h-[42px] items-center !border-gray-200 shadow"}),(o==null?void 0:o.state)&&a(v,{text:"El estado es obligatorio."})]}),r("fieldset",{className:"w-full",children:[a("label",{htmlFor:"category",children:"Pertenece a"}),a(h,{value:_,onChange:e=>p(e.value,"belongsTo"),dropdownIcon:()=>a(g,{}),options:["Propietario","Inquilino"],placeholder:"elije una categoría",className:"h-[42px] items-center !border-gray-200 shadow"}),(o==null?void 0:o.belongsTo)&&a(v,{text:"Este campo es obligatorio."})]})]}),r(P,{children:[r("fieldset",{className:"w-full",children:[a("label",{htmlFor:"approved",children:"Aprobado"}),a(h,{value:X,optionLabel:"label",optionValue:"value",onChange:e=>p(e.value,"approved"),dropdownIcon:()=>a(g,{}),options:[{label:"Si",value:!0},{label:"No",value:!1}],className:"h-[42px] items-center !border-gray-200 shadow"})]}),r("fieldset",{className:"w-full",children:[a("label",{htmlFor:"approved",children:" Cobrado "}),a(h,{value:Z,optionLabel:"label",optionValue:"value",onChange:e=>p(e.value,"charged"),dropdownIcon:()=>a(g,{}),options:[{label:"Si",value:!0},{label:"No",value:!1}],className:"h-[42px] items-center !border-gray-200 shadow"})]})]}),r("div",{className:"flex flex-col",children:[a(Fe,{placeholder:"Escribe una descripción...",initialValue:M,onChange:e=>p(e,"description"),minLength:5,maxLength:255,className:"h-24",label:"Descripción",required:!0,hasError:o==null?void 0:o.description,errorText:"La descripción es obligatoria."}),r("div",{className:"self-end",children:[M.length,"/255"]})]}),a("input",{type:"file",accept:"image/*",className:"hidden",onChange:ce,id:"photoBudget"}),!C&&r("label",{htmlFor:"photoBudget",className:"flex items-center gap-4 justify-center my-4 cursor-pointer border-2 duration-700 hover:border-brand2  dark:hover:border-brand2 hover:translate-y-1  border-gray-300 dark:border-slate-700 border-dashed p-2 text-center shadow hover:shadow-md",children:[r("span",{children:[" ",C?"Cambiar photo":"Cargar photo ","  "]}),a(he,{size:30})]}),r("div",{className:"photo-box relative",children:[a("img",{src:C,alt:"",id:"img_preview",className:"my-4"}),C&&!E&&a(Ie,{action:()=>{p("","photo")}})]}),a(we,{savingOrUpdating:j,onClose:R})]})})]})};export{Ze as default};