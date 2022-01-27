import{a as Q,j as r,b as t,r as h,u as f,c as T,L as y,R,B as Y,S as Z,d as A,e as ee,f as te,g as ne,P as oe}from"./vendor.9b51c18e.js";const ae=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}};ae();const se="https://restaurant-rolodex.herokuapp.com",m=Q.create({baseURL:`${se}/api`}),P="LOGGED_IN",C="LOGGED_OUT",k="UPDATE_USERNAME",M="UPDATE_USER_ID",j="TOTAL_DATA",G="ADD_TOTAL_DATA",H="REMOVE_TOTAL_DATA",$="UPDATE_TOTAL_NAME",V="UPDATE_TOTAL_DESCRIPTION",B="TRIED_DATA",W="ADD_TRIED_DATA",X="REMOVE_TRIED_DATA",z="UPDATE_TRIED_NAME",q="UPDATE_TRIED_DESCRIPTION",re="WIPE_ALL_DATA",F="REMOVE_USERNAME",b=e=>({type:j,payload:e}),ie=e=>({type:G,payload:e}),de=e=>({type:H,payload:e}),ce=(e,o)=>({type:$,id:e,payload:o}),le=(e,o)=>({type:V,id:e,payload:o}),K=r("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]}),J=t("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"})}),_=t("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})});function ue(){const[e,o]=h.exports.useState(""),[i,c]=h.exports.useState(""),n=f(a=>a.username),s=f(a=>a.user_id),u=f(a=>a.totalData),x=f(a=>a.auth),l=T(),w=async()=>{const a=await m.get(`/total/${s}`);u.length===0&&l(b(a.data))},E=async()=>{const a=await m.post("/total/add",{name:e,description:i,username:n,user_id:s});l(ie(a.data)),o(""),c("")},p=async a=>{const D=await m.delete(`/total/remove/${a.idtotal}`);l(de(parseInt(D.data.id)))},g=a=>{o(a.target.value)},N=a=>{c(a.target.value)},d=async a=>{let D=prompt("Enter new Restaurant Name");D===null?alert("No changes made"):(m.put(`/total/update/name/${a.idtotal}`,{newName:D}),l(ce(a.idtotal,D)))},v=a=>{let D=prompt("Enter new Description");D?(m.put(`/total/update/description/${a.idtotal}`,{newDesc:D}),l(le(a.idtotal,D))):alert("No changes made")},I=a=>{p(a),m.post("/tried/add",{name:a.name,description:a.description,username:n}),console.log(a)};return h.exports.useEffect(()=>{w()},[s]),r("div",{className:"font-medium",children:[x&&r("div",{className:"flex justify-center p-2",children:[t("button",{className:"font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white py-1 px-2 transition duration-200 ease-in-out mx-2",onClick:E,children:"POST"}),t("input",{className:"mx-2 p-1 rounded",placeholder:"Restaurant Name",type:"text",name:"totalName",value:e,onChange:g}),t("input",{className:"p-1 rounded",placeholder:"Restaurant Description",type:"text",value:i,name:"totalDesc",onChange:N})]}),x&&u?u.map((a,D)=>r("div",{className:"grid grid-cols-12 items-center rounded mx-4 p-1 hover:bg-blue-500 hover:bg-opacity-80 transition duration-200",children:[r("div",{className:"flex items-center col-start-2 h-fit",children:[t("span",{className:"p-2",children:a.name}),t("button",{className:"opacity-20 hover:opacity-80",onClick:()=>d(a),children:t("span",{children:_})})]}),r("div",{className:"flex items-center justify-center col-start-5 col-span-4",children:[t("span",{className:"m-2 px-2",children:a.description}),t("button",{className:"opacity-20 hover:opacity-100 transition duration-150",onClick:()=>v(a),children:t("span",{children:_})})]}),r("div",{className:"col-start-11 col-span-2",children:[t("button",{className:"font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out",onClick:()=>I(a),children:"Move To Tried"}),t("button",{className:"font-medium mx-2 bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out",onClick:()=>p(a),children:"Remove"})]})]},D)):r("div",{className:"flex justify-center text-4xl font-semibold items-center translate-y-32",children:[t(y,{to:"/login",className:"pr-2 font-semibold hover:underline",children:"Login"}),"to see your restaurants!"]})]})}const S=e=>({type:B,payload:e}),pe=e=>({type:W,payload:e}),me=e=>({type:X,payload:e}),he=(e,o)=>({type:z,id:e,payload:o}),fe=(e,o)=>({type:q,id:e,payload:o});function ge(){const[e,o]=h.exports.useState(""),[i,c]=h.exports.useState(""),n=T(),s=f(d=>d.triedData),u=f(d=>d.username),x=f(d=>d.user_id),l=f(d=>d.auth),w=async()=>{if(x!==null){const d=await m.get(`/tried/${x}`);s.length===0&&n(S(d.data))}},E=async()=>{const d=await m.post("/tried/add",{name:e,description:i,username:u,user_id:x});n(pe(d.data)),c(""),o("")},p=async d=>{const v=await m.delete(`/tried/remove/${d.idtried}`),I=parseInt(v.data.idtried);n(me(I))},g=d=>{let v=prompt("Enter new Restaurant Name");v===null?alert("No changes made"):(m.put(`/tried/update/name/${d.idtried}`,{newName:v}),n(he(d.idtried,v)))},N=d=>{let v=prompt("Enter new Description");v?(m.put(`/tried/update/description/${d.idtried}`,{newDesc:v}),n(fe(d.idtried,v))):alert("No changes made")};return h.exports.useEffect(()=>{w()},[u]),r("div",{className:"font-medium",children:[l&&r("div",{className:"flex justify-center p-2",children:[t("button",{className:"font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white py-1 px-2 transition duration-200 ease-in-out mx-2",onClick:E,children:"POST"}),t("input",{className:"mx-2 p-1 rounded",placeholder:"Restaurant Name",type:"text",name:"totalName",value:e,onChange:d=>o(d.target.value)}),t("input",{className:"rounded",placeholder:"Restaurant Description",type:"text",value:i,name:"totalDesc",onChange:d=>c(d.target.value)})]}),l&&s?s.map((d,v)=>r("div",{className:"grid grid-cols-12 items-center rounded mx-4 p-1 hover:bg-blue-500 hover:bg-opacity-80 transition duration-200",children:[r("div",{className:"flex items-center col-start-2 h-fit",children:[t("span",{className:"p-2",children:d.name}),t("button",{className:"opacity-20 hover:opacity-80 transition duration-500 ease-in-out",onClick:()=>g(d),children:t("span",{children:_})})]}),r("div",{className:"flex items-center justify-center col-start-5 col-span-4",children:[t("span",{className:"m-2 px-2",children:d.description}),t("button",{className:"opacity-20 hover:opacity-100 transition duration-150",onClick:()=>N(d),children:t("span",{children:_})})]}),t("div",{className:"col-start-12",children:t("button",{className:"font-medium mx-2 bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out",onClick:()=>p(d),children:"Remove"})})]},v)):r("div",{className:"flex justify-center text-4xl font-semibold items-center translate-y-32",children:[t(y,{to:"/login",className:"pr-2 font-semibold hover:underline",children:"Login"}),"to see your restaurants!"]})]})}function Ne(){const e=T(),o=f(l=>l.auth),i=f(l=>l.user_id),c=f(l=>l.totalData),n=f(l=>l.triedData),s=n.slice(-5).reverse(),u=c.slice(-5).reverse(),x=()=>{o&&c.length===0&&n.length===0&&(m.get(`/total/${i}`).then(l=>{e(b(l.data))}),m.get(`/tried/${i}`).then(l=>{e(S(l.data))}))};return h.exports.useEffect(()=>x(),[]),t("div",{children:o?r("div",{className:"translate-y-10",children:[t("div",{className:"flex justify-center text-5xl font-semibold ",children:"Recently Updated Restaurants"}),t("div",{className:"flex justify-center text-xl mt-6",children:"To view the complete lists of your total and tried restaurants, and to add, update, or delete restaurants, click the links at the top of the page!"}),r("div",{className:"flex justify-center gap-x-20 p-10",children:[r("div",{className:"flex flex-col items-center",children:[t(y,{to:"/total",className:"font-semibold text-3xl hover:text-white transition duration-200 ",children:"TOTAL"}),t("div",{className:"flex flex-col items-center text-2xl",children:u.map(l=>r("div",{children:["Name: ",l.name]}))})]}),r("div",{className:"flex flex-col items-center",children:[t(y,{to:"/tried",className:"font-semibold text-3xl hover:text-white transition duration-200 ",children:"TRIED"}),t("div",{className:"text-2xl",children:s.map(l=>r("div",{children:["Name: ",l.name]}))})]})]})]}):r("div",{className:"flex justify-center text-4xl font-semibold items-center translate-y-32",children:[t(y,{to:"/login",className:"pr-2 font-semibold hover:underline",children:"Login"}),"to see your restaurants!"]})})}const O=()=>({type:P}),ve=()=>({type:C}),L=e=>({type:k,payload:e}),xe=()=>({type:F});function De(){const e=T(),o=f(n=>n.auth),i=f(n=>n.username);return r("nav",{className:"flex justify-around items-center bg-red-500  pb-6 w-full py-4 text-2xl font-semibold",children:[r("div",{className:"inline-flex items-center",children:[t(y,{className:"p-2 bg-transparent  hover:text-white rounded transition duration-300 ease-in-out",to:"/home",children:"HOME"}),t(y,{className:" p-2 bg-transparent hover:text-white rounded transition duration-300 ease-in-out ",to:"/total",children:"TOTAL"}),t(y,{className:"p-2 bg-transparent hover:text-white rounded transition duration-300 ease-in-out",to:"/tried",children:"TRIED"})]}),o?r("div",{className:"m-2 inline-flex items-center",children:[r("p",{className:"p-2",children:["Welcome ",i,"!"]}),t("button",{className:"font-semibold p-2 hover:text-white transition duration-300 ease-in-out",onClick:()=>{localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("loggedIn"),localStorage.removeItem("user_id"),e(ve()),e(xe())},children:"LOGOUT"})]}):r("div",{className:"inline-flex",children:[t(R,{to:"/login"}),t(y,{to:"/signup",className:"p-2 bg-transparent hover:text-white rounded transition duration-300 ease-in-out",children:"SIGNUP"}),t(y,{to:"/login",className:"p-2 bg-transparent hover:text-white rounded transition duration-300 ease-in-out",children:"LOGIN"})]})]})}const U=e=>({type:M,payload:e});function ye(){const[e,o]=h.exports.useState(""),[i,c]=h.exports.useState(""),[n,s]=h.exports.useState(""),[u,x]=h.exports.useState(!1),[l,w]=h.exports.useState(!1),E=f(N=>N.auth),p=T();return t("div",{children:E?t(R,{to:"/total"}):r("div",{className:"flex-col text-center mt-4 ",children:[t("input",{className:"m-2 rounded p-2 mr-9",type:"text",placeholder:"Enter Username",onChange:N=>{o(N.target.value)}}),r("div",{className:"flex justify-center",children:[t("input",{className:"m-2 rounded p-2",type:u?"text":"password",placeholder:"Enter Password",onChange:N=>{c(N.target.value)}}),t("button",{onClick:()=>x(!u),children:u?K:J})]}),r("div",{className:"flex justify-center",children:[t("input",{className:"m-2 rounded p-2",type:l?"text":"password",placeholder:"Confirm Password",onChange:N=>{s(N.target.value)}}),t("button",{onClick:()=>w(!l),children:l?K:J})]}),t("div",{children:t("button",{className:"m-2 bg-blue-300 rounded hover:bg-blue-500  p-2 transition duration-300 ease-in-out",onClick:()=>{i!==n?alert("Passwords do not match!"):m.post("/signup",{username:e,password:i}).then(N=>{console.log(N.data.insertId),p(O()),p(L(e)),p(U(N.data.insertId))})},children:"CREATE USER"})})]})})}function Te(){const[e,o]=h.exports.useState(""),[i,c]=h.exports.useState(""),n=T(),s=f(p=>p.auth),u=async p=>{const g=await m.get(`/total/${p}`);n(b(g.data)),console.log(g)},x=async p=>{const g=await m.get(`tried/${p}`);n(S(g.data))};return t("div",{children:s?t(R,{to:"/home"}):r("div",{className:"flex justify-center mt-4",children:[t("input",{className:"m-2 rounded p-1",type:"text",placeholder:"Username",onChange:p=>{o(p.target.value)}}),t("input",{className:"m-2 rounded p-1",type:"text",placeholder:"Password",onChange:p=>{c(p.target.value)}}),t("button",{className:"m-2 bg-red-300 rounded hover:bg-red-500 hover:text-white  p-2 transition duration-300 ease-in-out",onClick:()=>{m.post("/login",{username:e,password:i}).then(p=>{if(p.data==="Invalid Credentials")alert("Invalid Login Credentials");else{const g=p.data.user.ID;n(O()),n(L(e)),n(U(g)),localStorage.setItem("user_id",g),localStorage.setItem("username",e),localStorage.setItem("loggedIn","true"),localStorage.setItem("token",p.data.token),u(g),x(g)}})},children:"LOGIN"})]})})}function we(){const e=T(),o=localStorage.getItem("username"),i=localStorage.getItem("user_id"),c=()=>{o?(e(L(o)),e(U(i)),e(O())):console.log("NOTHING TO UPDATE")};return h.exports.useEffect(()=>{c()}),t(Y,{children:r("div",{className:"bg-gradient-to-tr from-violet-400 to-blue-400 h-screen w-full",children:[t("div",{children:t(De,{})}),t("div",{className:"App",children:r(Z,{children:[t(A,{exact:!0,path:"/home",component:Ne}),t(A,{exact:!0,path:"/total",component:ue}),t(A,{exact:!0,path:"/tried",component:ge}),t(A,{exact:!0,path:"/signup",component:ye}),t(A,{exact:!0,path:"/login",component:Te})]})})]})})}const Ee=(e=!1,o)=>{switch(o.type){case P:return e=!0;case C:return e=!1;default:return e}},Ae=(e=null,o)=>{switch(o.type){case M:return e=o.payload;default:return e}},_e=(e=[],o)=>{switch(o.type){case j:return e=[...e,...o.payload];case G:return e=[...e,o.payload];case H:return e=e.filter(n=>n.idtotal!==o.payload);case $:const i=e.find(n=>n.idtotal===o.id);if(i!==void 0){const n=e.indexOf(i),s=e.slice(0,n),u=e.slice(n+1,e.length);return e=[...s,{idtotal:i.idtotal,name:o.payload,description:i.description,user_id:i.user_id},...u]}case V:const c=e.find(n=>n.idtotal===o.id);if(c!==void 0){const n=e.indexOf(c),s=e.slice(0,n),u=e.slice(n+1,e.length);return e=[...s,{idtotal:c.idtotal,name:c.name,description:o.payload,user_id:c.user_id},...u]}default:return e}},Ie=(e=[],o)=>{switch(o.type){case B:return e=[...e,...o.payload];case W:return e=[...e,o.payload];case X:return e=e.filter(n=>n.idtried!==o.payload);case z:const i=e.find(n=>n.idtried===o.id);if(i!==void 0){const n=e.indexOf(i),s=e.slice(0,n),u=e.slice(n+1,e.length);return e=[...s,{idtried:i.idtried,name:o.payload,description:i.description,user_id:i.user_id},...u]}case q:const c=e.find(n=>n.idtried===o.id);if(c!==void 0){const n=e.indexOf(c),s=e.slice(0,n),u=e.slice(n+1,e.length);return e=[...s,{idtried:c.idtried,name:c.name,description:o.payload,user_id:c.user_id},...u]}case re:return e=[];default:return e}},Re=(e="",o)=>{switch(o.type){case k:return e=o.payload;case F:return e="";default:return e}},be=ee({auth:Ee,username:Re,user_id:Ae,totalData:_e,triedData:Ie}),Se={},Oe=be,Le=te(Oe,Se,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());ne.render(t(h.exports.StrictMode,{children:t(oe,{store:Le,children:t(we,{})})}),document.getElementById("root"));