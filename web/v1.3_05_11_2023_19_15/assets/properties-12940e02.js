import{j as r,a0 as Me,a1 as Se,r as m,f as x,L as _,a as t,F as Ve,h as A,a2 as Oe}from"./index-3ed1fa78.js";import{u as $e,H as Be,D as Le,C as b,a as De}from"./HeaderData-f8341142.js";import{B as Ze}from"./Box-2f3a3966.js";import{E as Ge}from"./EditIcon-72ee5f20.js";import{D as je}from"./DeleteIcon-e6cc714b.js";import{C as ze,F as qe}from"./FormActionBtns-c23092d4.js";import{C as u}from"./CustomInput-6ca7ad9c.js";import{u as He,F as k}from"./FormError-a3fab181.js";import{R as We,D as F}from"./RequestError-ce21148f.js";import{F as h}from"./FieldsetGroup-13ce1fee.js";import{u as Re}from"./useOwners-dbc72c45.js";import{u as Qe}from"./useProperties-3ec06d0b.js";import{C as Ue}from"./CustomTextArea-ed7f84a9.js";import{u as Ke}from"./useZones-34f93c9a.js";import{u as _e}from"./usePropertyTypes-e0a794cf.js";import{C as J}from"./CloseOnClick-54123682.js";import{B as Je}from"./index.esm-ed5d81e4.js";import{B as Xe}from"./BoxContainerPage-d81583a3.js";import{E as Ye}from"./EmptyData-5a33961e.js";import{v as er}from"./form-3a2308eb.js";import"./useQuery-6083f14c.js";const rr=({action:n,color:v,size:f=25})=>r(Me,{color:v,title:"Visualizar",size:f,onClick:n}),wr=()=>{var D,Z,G,j,z,q,H,W,R,Q;const{isFor:n}=Se(),[v,f]=m.useState(!1),[M,I]=m.useState(!1),{values:y,handleInputChange:o,reset:E,updateAll:T}=He({ZoneId:0,PropertyTypeId:0,OwnerId:0,street:"",number:"",floor:"",dept:"",isFor:"",description:"",nroPartWater:"",nroPartMuni:"",nroPartAPI:"",nroPartGas:"",folderNumber:""}),{ZoneId:X,OwnerId:Y,street:ee,number:re,floor:ae,dept:te,description:oe,isFor:le,nroPartWater:se,nroPartMuni:ne,nroPartAPI:ie,nroPartGas:de,folderNumber:ce,PropertyTypeId:pe}=y,i=m.useRef(),[me,ue]=m.useState(""),[a,S]=m.useState(),[V,O]=m.useState(!1),[g,C]=m.useState(!1),[$,N]=m.useState(!1),[B,he]=m.useState({global:{value:null,matchMode:x.CONTAINS},"Owner.fullName":{value:null,matchMode:x.CONTAINS},"PropertyType.description":{value:null,matchMode:x.CONTAINS},"Zone.name":{value:null,matchMode:x.CONTAINS},street:{value:null,matchMode:x.CONTAINS}}),{showAndHideModal:p}=$e(),{data:l,isError:fe,isLoading:be,error:ge,isFetching:Ne,refetch:L}=Qe(n!==void 0?`isFor=${n}`:""),ye=Ke(),xe=_e(),Ce=Re();m.useEffect(()=>(T({...y,isFor:n!==void 0?n:""}),()=>{}),[n]);const Pe=e=>{T({...e}),C(!1),f(!0),O(!0),i.current=e},we=e=>{C(!1),I(!M),i.current=e},ke=async e=>{var w,U,K;e.preventDefault();const{error:d,ok:c}=er({...y},["state","deletedAt","dept","floor","nroPartWater","nroPartMuni","nroPartAPI","nroPartGas","description"]);if(S(d),!c)return!1;if(V)try{N(!0);const s=await A.put(`/properties/${(w=i.current)==null?void 0:w.id}`,y);s.data.ok?(L(),E(),f(!1),p("Editado",s.data.message)):p("Error",s.data.message||"Algo malo ocurrío.","red")}catch(s){s.response&&p("Error",((U=s.response.data)==null?void 0:U.message)||"Algo malo ocurrío.","red")}finally{N(!1)}else try{N(!0);const s=await A.post("/properties",y);s.data.ok?(L(),E(),f(!1),p("Guardado",s.data.message)):p("Error",s.data.message||"Algo malo ocurrío.","red")}catch(s){s.response&&p("Error",((K=s.response.data)==null?void 0:K.message)||"Algo malo ocurrío.","red")}finally{N(!1)}},Fe=async e=>{var d;try{N(!0);const c=await A.delete("/properties/"+e);c.data.ok?(l!=null&&l.data&&(l.data=l==null?void 0:l.data.filter(w=>w.id!==e)),I(!1),p("Borrado",c.data.message)):p("Error",c.data.message||"Algo malo ocurrío.","red")}catch(c){c.response&&p("Error",((d=c.response.data)==null?void 0:d.message)||"Algo malo ocurrío.","red")}finally{N(!1)}},P=()=>{E(),f(!1),S({})},ve=e=>{const d=e;let c={...B};c.global.value=d,he(c),ue(d)},Ie=e=>{T(e),C(!0),i.current=e,f(!0)},Ee=e=>{var d;Oe(`
Tipo de inmueble:  
${(d=e.PropertyType)==null?void 0:d.description}

Tipo de operacion :  
${e.isFor}

Descripción del inmueble 
${e.description}
`),p("Copiado","Se copio los datos del inmueble al portapapeles"),i.current=e},Te=e=>t("div",{className:"flex gap-x-3 items-center justify-center",children:[n&&r(Je,{size:22,onClick:()=>Ee(e)}),r(rr,{action:()=>Ie(e)}),r(Ge,{action:()=>Pe(e)}),r(je,{action:()=>we(e)})]}),Ae=()=>{O(!1),C(!1),i.current=null,f(!0)};return be?r(_,{}):fe?r(We,{error:ge}):t(Xe,{children:[r(Be,{action:Ae,text:`Propiedades ${n?` en   ${n}`:""}`}),((D=l==null?void 0:l.data)==null?void 0:D.length)>0?t(Ve,{children:[r(u,{onChange:e=>ve(e),className:" w-auto mx-2 sm:mx-0 sm:w-96",initialValue:me,placeholder:"Buscar propiedad",type:"search"}),r(Ze,{className:"!p-0 !overflow-hidden !border-none sm:mx-0   mb-4 ",children:t(Le,{size:"small",emptyMessage:"Aún no hay propiedad",className:"!overflow-hidden   !border-none",value:l==null?void 0:l.data,filters:B,globalFilterFields:["PropertyType.description","Owner.fullName","Zone.name","street"],dataKey:"id",responsiveLayout:"scroll",children:[r(b,{field:"PropertyType.description",header:"Tipo Propiedad",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),r(b,{field:"Owner.fullName",header:"Propietario",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),r(b,{field:"street",header:"Dirección",body:e=>t("span",{children:[" ",e.street," ",e.number," ",e.floor,"-",e.dept," "]}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),r(b,{field:"folderNumber",header:"Nro. Carpeta",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",sortable:!0}),r(b,{field:"Zone.name",header:"Zona",sortable:!0,headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(b,{field:"state",header:"Estado",sortable:!0,body:e=>r("span",{className:`font-bold ${e.state==="Libre"?"text-green-500":"text-red-400"}`,children:e.state}),headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(b,{field:"isFor",header:"Para",headerClassName:"!border-none dark:!bg-gray-800 dark:!text-slate-400",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 "}),r(b,{body:Te,headerClassName:"!border-none dark:!bg-gray-800",className:"dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ",exportable:!1,style:{width:90}})]})})]}):r(Ye,{text:`Aún no hay propiedad  ${n?` en ${n}`:""} `}),Ne&&r(_,{h:40,w:40}),r(De,{show:M,setShow:I,savingOrUpdating:$,destroy:()=>{var e;return Fe((e=i.current)==null?void 0:e.id)},text:`${(Z=i.current)==null?void 0:Z.street} ${(G=i.current)==null?void 0:G.number} ${(j=i.current)==null?void 0:j.floor} ${(z=i.current)==null?void 0:z.dept} de ${(H=(q=i.current)==null?void 0:q.Owner)==null?void 0:H.fullName} `}),t(ze,{show:v,closeModal:P,overlayClick:g,className:" max-w-[650px] sm:w-[600px] w-fit",titleText:`${V?"Editar":g?" Ver  ":"Crear"}  propiedad `,children:[t("form",{onSubmit:ke,className:`${g&&"disabled-all"}`,children:[!g&&r(J,{action:P}),t(h,{children:[t(h,{className:"w-full sm:w-[50%]",children:[r(u,{placeholder:"Sarmiento",initialValue:ee||"",onChange:e=>o(e,"street"),maxLength:100,label:"Calle",required:!0,hasError:a==null?void 0:a.street,errorText:"La calle es obligatoria."}),r(u,{placeholder:"1247",initialValue:re||"",maxLength:5,onChange:e=>o(e,"number"),label:"Número",required:!0,hasError:a==null?void 0:a.number,errorText:"El número es obligatorio."})]}),t(h,{className:"w-full sm:w-[50%]",children:[r(u,{placeholder:"10",maxLength:2,label:"Piso",optional:!0,initialValue:ae||"",onChange:e=>o(e,"floor")}),r(u,{placeholder:"02,B",label:"Depto",optional:!0,maxLength:2,initialValue:te||"",onChange:e=>o(e,"dept")})]})]}),t(h,{children:[t(h,{className:"w-full sm:w-[50%]",children:[t("fieldset",{className:"",children:[r("label",{htmlFor:"ZoneId",children:"Zona "}),r(F,{value:X,onChange:e=>o(e.value,"ZoneId"),options:(W=ye.data)==null?void 0:W.data,optionLabel:"name",filterPlaceholder:"Busca zona",optionValue:"id",placeholder:"elije una zona",filter:!0,className:"h-[42px] items-center w-full sm:w-[125px] !border-gray-200 shadow"}),(a==null?void 0:a.ZoneId)&&r(k,{text:"La zona es obligatoria."})]}),r(u,{initialValue:ce??"",onChange:e=>o(e,"folderNumber"),placeholder:"1000",className:"h-[42px] items-center ",maxLength:10,label:"Nro carpeta",hasError:a==null?void 0:a.folderNumber,errorText:"El número de carpeta es obligatorio.",required:!0})]}),r(h,{className:"w-full sm:w-[50%]",children:t("fieldset",{className:"",children:[r("label",{htmlFor:"ZoneId",children:"Tipo de propiedad "}),r(F,{value:pe,onChange:e=>o(e.value,"PropertyTypeId"),options:(R=xe.data)==null?void 0:R.data,optionLabel:"description",filterPlaceholder:"Busca tipo de propiedad",optionValue:"id",placeholder:"elije un tipo de propiedad",filter:!0,className:"h-[42px] items-center !border-gray-200 shadow "}),(a==null?void 0:a.PropertyTypeId)&&r(k,{text:"El tipo de propiedad es obligatorio."})]})})]}),t(h,{children:[r(h,{className:"w-full sm:w-[80%]",children:t("fieldset",{children:[r("label",{htmlFor:"OwnerId",children:"Propietario"}),r(F,{value:Y,onChange:e=>o(e.value,"OwnerId"),options:(Q=Ce.data)==null?void 0:Q.data,optionLabel:"fullName",filterBy:"fullName,cuit",filterPlaceholder:"Busca propietario por nombre o cuit",optionValue:"id",placeholder:"elije un propietario",filter:!0,valueTemplate:(e,d)=>e?t("span",{children:[" ",e.fullName," | ",e.cuit," "]}):d.placeholder,itemTemplate:e=>t("span",{children:[" ",e.fullName," | ",e.cuit," "]}),className:"h-[42px] items-center !border-gray-200 shadow "}),(a==null?void 0:a.OwnerId)&&r(k,{text:"El propietario es obligatorio."})]})}),t("fieldset",{className:"w-full sm:w-[20%]",children:[r("label",{htmlFor:"isFor",children:"Para"}),r(F,{value:le,onChange:e=>o(e.value,"isFor"),options:["Alquiler","Venta"],placeholder:"elije una opción",className:"h-[42px] items-center !border-gray-200 shadow "}),(a==null?void 0:a.isFor)&&r(k,{text:"Este campo es obligatorio."})]})]}),t(h,{children:[r(u,{initialValue:ne??"",onChange:e=>o(e,"nroPartMuni"),placeholder:"000000000",label:"Nro Part. TGI",optional:!0,className:"h-[42px] items-cente "}),r(u,{initialValue:ie??"",onChange:e=>o(e,"nroPartAPI"),placeholder:"000000000",label:"Nro Part. API",optional:!0,className:"h-[42px] items-cente "})]}),t(h,{children:[r(u,{initialValue:se??"",onChange:e=>o(e,"nroPartWater"),placeholder:"000000000",label:"Nro Part. Agua",optional:!0,className:"h-[42px] items-center "}),r(u,{initialValue:de??"",onChange:e=>o(e,"nroPartGas"),placeholder:"000000000",label:"Nro Part. GAS",optional:!0,className:"h-[42px] items-cente "})]}),r(Ue,{placeholder:"Escribe una descripción para esa propiedad",initialValue:oe||"",label:"Descripción",optional:!0,onChange:e=>o(e,"description")}),!g&&r(qe,{savingOrUpdating:$,onClose:P})]}),g&&r(J,{action:P})]})]})};export{wr as default};
