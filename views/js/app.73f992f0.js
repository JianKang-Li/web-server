(function(){"use strict";var e={1466:function(e,t,n){n.d(t,{C5:function(){return i},F5:function(){return a},Y_:function(){return o},oO:function(){return l},tE:function(){return s}});var r=n(2843);const i=()=>r.Z._axios.get("/menu"),o=e=>r.Z._axios.get("/delete?file="+e),s=()=>r.Z._axios.get("/ip"),a=e=>r.Z._axios.post("/write",e),l=()=>r.Z._axios.get("/clear")},2843:function(e,t,n){var r=n(6265),i=n.n(r);class o{constructor(){this._axios=i().create({}),this._axios.interceptors.response.use((function(e){return e.data}))}}t["Z"]=new o},7983:function(e,t,n){var r=n(6369),i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("el-container",[t("el-header",[t("Ahead")],1),t("el-main",[t("router-view")],1),t("el-footer",[t("div",{staticClass:"footer"},[t("p",[e._v(" Design By "),t("el-link",{attrs:{href:"https://github.com/JianKang-Li",target:"_blank",type:"primary"}},[e._v("ljk")])],1)])])],1)],1)},o=[],s=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"header"},[t("div",{staticClass:"logo"},[e._v("AirDrop")]),t("div",{staticClass:"tip"},[t("el-button",{on:{click:function(t){e.centerDialogVisible=!0}}},[e._v("Tips")])],1)]),t("el-dialog",{attrs:{title:"Tips",visible:e.centerDialogVisible,width:"fit-content",center:""},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[t("p",[e._v("页面预览文件类型靠自定义和浏览器支持")]),t("p",[e._v("后续可能增加登录功能")]),t("p",[e._v("此项目仅用于私人使用，请勿用于商业使用")]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.centerDialogVisible=!1}}},[e._v("确 定")])],1)])],1)},a=[],l={data(){return{centerDialogVisible:!1}}},u=l,c=n(1001),p=(0,c.Z)(u,s,a,!1,null,"11b06f27",null),f=p.exports,d={name:"App",components:{Ahead:f}},h=d,v=(0,c.Z)(h,i,o,!1,null,"62476f8b",null),g=v.exports,m=n(8499),b=n.n(m),y=n(3822);r["default"].use(y.ZP);const w=new y.ZP.Store({state:{menu:[]},actions:{updata(e,t){e.commit("flash",t)}},mutations:{flash(e,t){e.menu=t}}});var _=w,C=n(1466),D=n(2631),k=function(){var e=this,t=e._self._c;return t("div",[t("router-link",{attrs:{to:"/text"}},[t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("文本上传")])],1),t("UpLoad"),t("FileList")],1)},x=[],$=function(){var e=this,t=e._self._c;return t("div",{staticClass:"upload"},[t("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"",action:"","http-request":e.httpRequest,"auto-upload":!1,"on-progress":e.proUpdata,name:"file",multiple:!0}},[t("i",{staticClass:"el-icon-upload"}),t("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),t("em",[e._v("点击上传")])])]),t("el-progress",{attrs:{id:"progress",percentage:e.percentage,format:e.format,status:e.status}}),t("el-button",{attrs:{type:"primary",size:"default"},on:{click:e.submitUpload}},[e._v("上传")])],1)},O=[],Z=n(2843),j={data(){return{percentage:0,fileList:[],status:null}},methods:{format(e){return`${e}%`},submitUpload(){this.$refs.upload.submit()},proUpdata(e){this.percentage=parseInt(e.percent),this.percentage>=100&&(this.percentage=100,setTimeout((()=>{this.percentage=0}),1e3))},httpRequest(e){var t=new FormData;t.append("filename",e.file),Z.Z._axios({method:"post",url:"/upload",data:t,onUploadProgress:e=>{const t=parseInt(e.loaded/e.total*100);this.percentage=t}}).then((e=>{200===e.status?(this.$notify({title:"成功",message:"文件上传成功",type:"success"}),setTimeout((()=>{this.percentage=0}),1e3),this.ws.send("update"),(0,C.C5)().then((e=>{this.$store.dispatch("updata",e)}))):this.$notify.error({title:"错误",message:e.message}),this.$refs.upload.clearFiles()})).catch((e=>{console.log(e)}))}},watch:{status(){return 100===this.percentage?"success":""}}},S=j,T=(0,c.Z)(S,$,O,!1,null,"abc91124",null),A=T.exports,E=function(){var e=this,t=e._self._c;return t("div",{staticClass:"table"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:this.$store.state.menu}},[t("el-table-column",{attrs:{prop:"index",label:"序号"}}),t("el-table-column",{attrs:{prop:"filename",label:"文件名","show-overflow-tooltip":!0}}),t("el-table-column",{attrs:{label:"下载"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("a",{attrs:{download:n.row.filename,href:"./public/files/"+n.row.filename}},[e._v("下载")])]}}])}),t("el-table-column",{attrs:{label:"预览"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"default"},on:{click:function(t){return e.preview(n.row.filename,"/public/files/"+n.row.filename)}}},[e._v("预览")])]}}])}),t("el-table-column",{attrs:{label:"删除"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"danger",size:"default"},on:{click:function(t){return e.open(n.row.filename)}}},[e._v("删除")])]}}])})],1),t("el-dialog",{attrs:{title:"删除确认",visible:e.DeleteDialog,width:"fit-content",center:""},on:{"update:visible":function(t){e.DeleteDialog=t}}},[t("span",[e._v("是否确认删除文件"+e._s(e.file))]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.DeleteDialog=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.Delete()}}},[e._v("确 定")])],1)]),t("div",[t("el-dialog",{attrs:{title:"预览窗口",visible:e.centerDialogVisible,width:"60%",center:""},on:{"update:visible":function(t){e.centerDialogVisible=t},close:e.Pclose}},[t("div",[this.pics.includes(this.type)?t("img",{staticClass:"perv",attrs:{src:e.url,alt:""}}):this.audios.includes(this.type)?t("audio",{ref:"audio",staticClass:"perv",attrs:{src:e.url,controls:""}}):this.videos.includes(this.type)?t("video",{ref:"video",staticClass:"perv",attrs:{src:e.url,controls:""}}):t("span",{staticClass:"perv"},[e._v("浏览器不支持此类型文件!")])])])],1)],1)},P=[],L={name:"App",data(){return{url:"",centerDialogVisible:!1,DeleteDialog:!1,file:"",type:"",pics:["jpg","png","webp","jpeg","bmp","gif","apng","avif","ico"],audios:["mp3","ogg","wav"],videos:["mp4","webm"],texts:["pdf","txt"],reader:null}},methods:{getMenu(){(0,C.C5)().then((e=>{this.$store.dispatch("updata",e)}))},Pclose(){this.$refs.audio?this.$refs.audio.pause():this.$refs.video&&this.$refs.video.pause()},preview(e,t){let n=e.match(/\.\w*$/g)[0];this.type=n.replace(".",""),this.texts.includes(this.type)?console.log("pdf,txt"):this.Dev?this.url=this.globalUrl+t:this.url=t,this.centerDialogVisible=!0},Delete(){(0,C.Y_)(this.file).then((e=>{this.$message({type:"success",message:`${e}`}),this.ws.send("delete")})).catch((e=>{this.$message({type:"warning",message:`${e}`})})),this.getMenu(),this.DeleteDialog=!1},open(e){this.file=e,this.DeleteDialog=!0}},mounted(){this.getMenu(),this.ws?this.ws.onmessage=e=>{const t=e.data;"upload"!==t&&"delete"!==t||this.getMenu()}:window.timer=setInterval((()=>{this.getMenu()}),3e3)},beforeDestroy(){clearInterval(window.timer)}},U=L,F=(0,c.Z)(U,E,P,!1,null,"d009aa88",null),V=F.exports,M={components:{UpLoad:A,FileList:V}},N=M,q=(0,c.Z)(N,k,x,!1,null,"7277d7c5",null),I=q.exports;r["default"].use(D.Z);const z=new D.Z({mode:"hash",routes:[{path:"/",name:"file",component:I},{path:"/text",name:"Text",component:()=>n.e(213).then(n.bind(n,5213))}]});var B=z;r["default"].config.productionTip=!1,r["default"].prototype.globalUrl="http://127.0.0.1:8888",r["default"].prototype.Dev=!1,r["default"].use(b()),new r["default"]({render:e=>e(g),store:_,router:B,created(){(0,C.tE)().then((e=>{let t=e,n=new WebSocket(`ws://${t}:8089`);n.onopen=()=>{console.log("ws open")},n.onclose=()=>{alert("ws close")},r["default"].prototype.ws=n}))}}).$mount("#app")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,i,o){if(!r){var s=1/0;for(c=0;c<e.length;c++){r=e[c][0],i=e[c][1],o=e[c][2];for(var a=!0,l=0;l<r.length;l++)(!1&o||s>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(a=!1,o<s&&(s=o));if(a){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+".b0961366.js"}}(),function(){n.miniCssF=function(e){return"css/"+e+".23e14d8e.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="airdrop:";n.l=function(r,i,o,s){if(e[r])e[r].push(i);else{var a,l;if(void 0!==o)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var p=u[c];if(p.getAttribute("src")==r||p.getAttribute("data-webpack")==t+o){a=p;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+o),a.src=r),e[r]=[i];var f=function(t,n){a.onerror=a.onload=null,clearTimeout(d);var i=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((function(e){return e(n)})),t)return t(n)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,r){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var o=function(o){if(i.onerror=i.onload=null,"load"===o.type)n();else{var s=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=a,i.parentNode.removeChild(i),r(l)}};return i.onerror=i.onload=o,i.href=t,document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var i=n[r],o=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var s=document.getElementsByTagName("style");for(r=0;r<s.length;r++){i=s[r],o=i.getAttribute("data-href");if(o===e||o===t)return i}},r=function(r){return new Promise((function(i,o){var s=n.miniCssF(r),a=n.p+s;if(t(s,a))return i();e(r,a,i,o)}))},i={143:0};n.f.miniCss=function(e,t){var n={213:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=r(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise((function(n,r){i=e[t]=[n,r]}));r.push(i[2]=o);var s=n.p+n.u(t),a=new Error,l=function(r){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,i[1](a)}};n.l(s,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,s=r[0],a=r[1],l=r[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(l)var c=l(n)}for(t&&t(r);u<s.length;u++)o=s[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},r=self["webpackChunkairdrop"]=self["webpackChunkairdrop"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(7983)}));r=n.O(r)})();
//# sourceMappingURL=app.73f992f0.js.map