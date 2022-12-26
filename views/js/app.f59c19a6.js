(function(){"use strict";var e={1466:function(e,t,n){n.d(t,{C5:function(){return r},F5:function(){return a},Y_:function(){return o},tE:function(){return s}});var i=n(2843);const r=()=>i.Z._axios.get("/menu"),o=e=>i.Z._axios.get("/delete?file="+e),s=()=>i.Z._axios.get("/ip"),a=e=>i.Z._axios.post("/write",e)},2843:function(e,t,n){var i=n(6265),r=n.n(i);class o{constructor(){this._axios=r().create({}),this._axios.interceptors.response.use((function(e){return e.data}))}}t["Z"]=new o},9971:function(e,t,n){var i=n(6369),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("el-container",[t("el-header",[t("Ahead")],1),t("el-main",[t("router-view")],1),t("el-footer",[t("div",{staticClass:"footer"},[t("p",[e._v(" Design By "),t("el-link",{attrs:{href:"https://github.com/JianKang-Li",target:"_blank",type:"primary"}},[e._v("ljk")])],1)])])],1)],1)},o=[],s=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"header"},[t("div",{staticClass:"logo"},[e._v("AirDrop")]),t("div",{staticClass:"tip"},[t("el-button",{on:{click:function(t){e.centerDialogVisible=!0}}},[e._v("Tips")])],1)]),t("el-dialog",{attrs:{title:"Tips",visible:e.centerDialogVisible,width:"fit-content",center:""},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[t("p",[e._v("页面预览文件类型靠自定义和浏览器支持")]),t("p",[e._v("后续可能增加登录功能")]),t("p",[e._v("此项目仅用于私人使用，请勿用于商业使用")]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.centerDialogVisible=!1}}},[e._v("确 定")])],1)])],1)},a=[],l={data(){return{centerDialogVisible:!1}}},u=l,c=n(1001),p=(0,c.Z)(u,s,a,!1,null,"11b06f27",null),f=p.exports,d={name:"App",components:{Ahead:f}},h=d,v=(0,c.Z)(h,r,o,!1,null,"62476f8b",null),g=v.exports,m=n(8499),b=n.n(m),y=n(3822);i["default"].use(y.ZP);const w=new y.ZP.Store({state:{menu:[]},actions:{updata(e,t){e.commit("flash",t)}},mutations:{flash(e,t){e.menu=t}}});var _=w,C=n(1466),D=n(2631),k=function(){var e=this,t=e._self._c;return t("div",[t("router-link",{attrs:{to:"/text"}},[t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("文本上传")])],1),t("UpLoad"),t("FileList")],1)},x=[],$=function(){var e=this,t=e._self._c;return t("div",{staticClass:"upload"},[t("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"",action:"","http-request":e.httpRequest,"auto-upload":!1,"on-progress":e.proUpdata,name:"file",multiple:!0}},[t("i",{staticClass:"el-icon-upload"}),t("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),t("em",[e._v("点击上传")])])]),t("el-progress",{attrs:{id:"progress",percentage:e.percentage,format:e.format,status:e.status}}),t("el-button",{attrs:{type:"primary",size:"default"},on:{click:e.submitUpload}},[e._v("上传")])],1)},T=[],j=n(2843),O={data(){return{percentage:0,fileList:[],status:null}},methods:{format(e){return`${e}%`},submitUpload(){this.$refs.upload.submit()},proUpdata(e){this.percentage=parseInt(e.percent),this.percentage>=100&&(this.percentage=100,setTimeout((()=>{this.percentage=0}),1e3))},httpRequest(e){var t=new FormData;t.append("filename",e.file),j.Z._axios({method:"post",url:"/upload",data:t,onUploadProgress:e=>{const t=parseInt(e.loaded/e.total*100);this.percentage=t}}).then((e=>{200===e.status?(this.$notify({title:"成功",message:"文件上传成功",type:"success"}),setTimeout((()=>{this.percentage=0}),1e3),this.ws.send("update"),(0,C.C5)().then((e=>{this.$store.dispatch("updata",e)}))):this.$notify.error({title:"错误",message:e.message}),this.$refs.upload.clearFiles()})).catch((e=>{console.log(e)}))}},watch:{status(){return 100===this.percentage?"success":""}}},S=O,Z=(0,c.Z)(S,$,T,!1,null,"abc91124",null),A=Z.exports,E=(n(6699),function(){var e=this,t=e._self._c;return t("div",{staticClass:"table"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:this.$store.state.menu}},[t("el-table-column",{attrs:{prop:"index",label:"序号"}}),t("el-table-column",{attrs:{prop:"filename",label:"文件名","show-overflow-tooltip":!0}}),t("el-table-column",{attrs:{label:"下载"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("a",{attrs:{download:n.row.filename,href:"./public/files/"+n.row.filename}},[e._v("下载")])]}}])}),t("el-table-column",{attrs:{label:"预览"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"default"},on:{click:function(t){return e.preview(n.row.filename,"/public/files/"+n.row.filename)}}},[e._v("预览")])]}}])}),t("el-table-column",{attrs:{label:"删除"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"danger",size:"default"},on:{click:function(t){return e.open(n.row.filename)}}},[e._v("删除")])]}}])})],1),t("el-dialog",{attrs:{title:"删除确认",visible:e.DeleteDialog,width:"fit-content",center:""},on:{"update:visible":function(t){e.DeleteDialog=t}}},[t("span",[e._v("是否确认删除文件"+e._s(e.file))]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.DeleteDialog=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.Delete()}}},[e._v("确 定")])],1)]),t("div",[t("el-dialog",{attrs:{title:"预览窗口",visible:e.centerDialogVisible,width:"60%",center:""},on:{"update:visible":function(t){e.centerDialogVisible=t},close:e.Pclose}},[t("div",[this.pics.includes(this.type)?t("img",{staticClass:"perv",attrs:{src:e.url,alt:""}}):this.audios.includes(this.type)?t("audio",{ref:"audio",staticClass:"perv",attrs:{src:e.url,controls:""}}):this.videos.includes(this.type)?t("video",{ref:"video",staticClass:"perv",attrs:{src:e.url,controls:""}}):t("span",{staticClass:"perv"},[e._v("浏览器不支持此类型文件!")])])])],1)],1)}),P=[],L={name:"App",data(){return{url:"",centerDialogVisible:!1,DeleteDialog:!1,file:"",type:"",pics:["jpg","png","webp","jpeg","bmp","gif","apng","avif","ico"],audios:["mp3","ogg","wav"],videos:["mp4","webm"],texts:["pdf","txt"],reader:null}},methods:{getMenu(){(0,C.C5)().then((e=>{this.$store.dispatch("updata",e)}))},Pclose(){this.$refs.audio?this.$refs.audio.pause():this.$refs.video&&this.$refs.video.pause()},preview(e,t){let n=e.match(/\.\w*$/g)[0];this.type=n.replace(".",""),this.texts.includes(this.type)?console.log("pdf,txt"):this.Dev?this.url=this.globalUrl+t:this.url=t,this.centerDialogVisible=!0},Delete(){(0,C.Y_)(this.file).then((e=>{this.$message({type:"success",message:`${e}`}),this.ws.send("delete")})).catch((e=>{this.$message({type:"warning",message:`${e}`})})),this.getMenu(),this.DeleteDialog=!1},open(e){this.file=e,this.DeleteDialog=!0}},mounted(){this.getMenu(),this.ws?this.ws.onmessage=e=>{const t=e.data;"upload"!==t&&"delete"!==t||this.getMenu()}:window.timer=setInterval((()=>{this.getMenu()}),3e3)},beforeDestroy(){clearInterval(window.timer)}},U=L,F=(0,c.Z)(U,E,P,!1,null,"d009aa88",null),V=F.exports,M={components:{UpLoad:A,FileList:V}},N=M,q=(0,c.Z)(N,k,x,!1,null,"7277d7c5",null),I=q.exports;i["default"].use(D.Z);const z=new D.Z({mode:"hash",routes:[{path:"/",name:"file",component:I},{path:"/text",name:"Text",component:()=>n.e(131).then(n.bind(n,8131))}]});var B=z;i["default"].config.productionTip=!1,i["default"].prototype.globalUrl="http://127.0.0.1:8888",i["default"].prototype.Dev=!1,i["default"].use(b()),(0,C.tE)().then((e=>{let t=e,n=new WebSocket(`ws://${t}:8089`);n.onopen=()=>{console.log("ws open")},n.onclose=()=>{alert("ws close")},i["default"].prototype.ws=n})),setTimeout((()=>{new i["default"]({render:e=>e(g),store:_,router:B}).$mount("#app")}),100)}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,i,r,o){if(!i){var s=1/0;for(c=0;c<e.length;c++){i=e[c][0],r=e[c][1],o=e[c][2];for(var a=!0,l=0;l<i.length;l++)(!1&o||s>=o)&&Object.keys(n.O).every((function(e){return n.O[e](i[l])}))?i.splice(l--,1):(a=!1,o<s&&(s=o));if(a){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[i,r,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,i){return n.f[i](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+".8ed9f39c.js"}}(),function(){n.miniCssF=function(e){return"css/"+e+".4e5f8da3.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="airdrop:";n.l=function(i,r,o,s){if(e[i])e[i].push(r);else{var a,l;if(void 0!==o)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var p=u[c];if(p.getAttribute("src")==i||p.getAttribute("data-webpack")==t+o){a=p;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+o),a.src=i),e[i]=[r];var f=function(t,n){a.onerror=a.onload=null,clearTimeout(d);var r=e[i];if(delete e[i],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((function(e){return e(n)})),t)return t(n)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,i){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var o=function(o){if(r.onerror=r.onload=null,"load"===o.type)n();else{var s=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=a,r.parentNode.removeChild(r),i(l)}};return r.onerror=r.onload=o,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var r=n[i],o=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(o===e||o===t))return r}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){r=s[i],o=r.getAttribute("data-href");if(o===e||o===t)return r}},i=function(i){return new Promise((function(r,o){var s=n.miniCssF(i),a=n.p+s;if(t(s,a))return r();e(i,a,r,o)}))},r={143:0};n.f.miniCss=function(e,t){var n={131:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=i(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,i){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)i.push(r[2]);else{var o=new Promise((function(n,i){r=e[t]=[n,i]}));i.push(r[2]=o);var s=n.p+n.u(t),a=new Error,l=function(i){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var o=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,r[1](a)}};n.l(s,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,i){var r,o,s=i[0],a=i[1],l=i[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(l)var c=l(n)}for(t&&t(i);u<s.length;u++)o=s[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},i=self["webpackChunkairdrop"]=self["webpackChunkairdrop"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9971)}));i=n.O(i)})();
//# sourceMappingURL=app.f59c19a6.js.map