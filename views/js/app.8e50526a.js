(function(){"use strict";var t={2307:function(t,e,i){var a=i(6369),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("el-container",[e("el-header",[e("Ahead")],1),e("el-main",[e("UpLoad"),e("FileList")],1),e("el-footer",[e("div",{staticClass:"footer"},[e("p",[t._v(" Design By "),e("el-link",{attrs:{href:"https://github.com/JianKang-Li",target:"_blank",type:"primary"}},[t._v("ljk")])],1)])])],1)],1)},o=[],n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"upload"},[e("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"",action:"","http-request":t.httpRequest,"auto-upload":!1,"on-progress":t.proUpdata,name:"file"}},[e("i",{staticClass:"el-icon-upload"}),e("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),e("em",[t._v("点击上传")])])]),e("el-progress",{attrs:{id:"progress",percentage:t.percentage,format:t.format,status:t.status}}),e("el-button",{attrs:{type:"primary",size:"default"},on:{click:t.submitUpload}},[t._v("上传")])],1)},r=[],l=i(6265),u=i.n(l);class c{constructor(){this._axios=u().create({})}}var p=new c;const f=()=>p._axios.get("/menu"),d=t=>p._axios.get("/delete?file="+t);var h={data(){return{percentage:0,fileList:[],status:null}},methods:{format(t){return`${t}%`},submitUpload(){this.$refs.upload.submit()},proUpdata(t){console.log(t),this.percentage=parseInt(t.percent),console.log(this.percentage),this.percentage>=100&&(this.percentage=100,setTimeout((()=>{this.percentage=0}),1e3))},httpRequest(t){var e=new FormData;e.append("filename",t.file),p._axios({method:"post",url:"/upload",data:e,onUploadProgress:t=>{const e=parseInt(t.loaded/t.total*100);this.percentage=e}}).then((t=>{200===t.data.status?(this.$notify({title:"成功",message:"文件上传成功",type:"success"}),setTimeout((()=>{this.percentage=0}),1e3),f().then((t=>{this.$store.dispatch("updata",t.data)}))):this.$notify.error({title:"错误",message:t.data.message}),this.$refs.upload.clearFiles()})).catch((t=>{console.log(t)}))}},watch:{status(){return 100===this.percentage?"success":""}}},g=h,v=i(1001),m=(0,v.Z)(g,n,r,!1,null,"c5cfb5a6",null),b=m.exports,y=(i(6699),function(){var t=this,e=t._self._c;return e("div",{staticClass:"table"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:this.$store.state.menu}},[e("el-table-column",{attrs:{prop:"index",label:"序号"}}),e("el-table-column",{attrs:{prop:"filename",label:"文件名","show-overflow-tooltip":!0}}),e("el-table-column",{attrs:{label:"下载"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("a",{attrs:{download:i.row.filename,href:"./public/files/"+i.row.filename}},[t._v("下载")])]}}])}),e("el-table-column",{attrs:{label:"预览"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("el-button",{attrs:{type:"primary",size:"default"},on:{click:function(e){return t.preview(i.row.filename,"/public/files/"+i.row.filename)}}},[t._v("预览")])]}}])}),e("el-table-column",{attrs:{label:"删除"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("el-button",{attrs:{type:"danger",size:"default"},on:{click:function(e){return t.open(i.row.filename)}}},[t._v("删除")])]}}])})],1),e("el-dialog",{attrs:{title:"删除确认",visible:t.DeleteDialog,width:"fit-content",center:""},on:{"update:visible":function(e){t.DeleteDialog=e}}},[e("span",[t._v("是否确认删除文件"+t._s(t.file))]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.DeleteDialog=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.Delete()}}},[t._v("确 定")])],1)]),e("div",[e("el-dialog",{attrs:{title:"预览窗口",visible:t.centerDialogVisible,width:"60%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e},close:t.Pclose}},[e("div",[this.pics.includes(this.type)?e("img",{staticClass:"perv",attrs:{src:t.url,alt:""}}):this.audios.includes(this.type)?e("audio",{ref:"audio",staticClass:"perv",attrs:{src:t.url,controls:""}}):this.videos.includes(this.type)?e("video",{ref:"video",staticClass:"perv",attrs:{src:t.url,controls:""}}):e("span",{staticClass:"perv"},[t._v("浏览器不支持此类型文件!")])])])],1)],1)}),_=[],w={name:"App",data(){return{url:"",centerDialogVisible:!1,DeleteDialog:!1,file:"",type:"",pics:["jpg","png","webp","jpeg","bmp","gif","apng","avif","ico"],audios:["mp3","ogg","wav"],videos:["mp4","webm"]}},methods:{getMenu(){f().then((t=>{this.$store.dispatch("updata",t.data)}))},Pclose(){this.$refs.audio?this.$refs.audio.pause():this.$refs.video&&this.$refs.video.pause()},preview(t,e){let i=t.match(/\.\w*$/g)[0];this.type=i.replace(".",""),this.Dev?this.url=this.globalUrl+e:this.url=e,this.centerDialogVisible=!0},Delete(){d(this.file).then((t=>{this.$message({type:"success",message:`${t.data}`})})).catch((t=>{this.$message({type:"warning",message:`${t}`})})),this.getMenu(),this.DeleteDialog=!1},open(t){this.file=t,this.DeleteDialog=!0}},mounted(){this.getMenu(),window.timer=setInterval((()=>{setTimeout(this.getMenu(),3e3)}),1e3)},beforeDestroy(){clearInterval(window.timer)}},D=w,k=(0,v.Z)(D,y,_,!1,null,"5d87122c",null),$=k.exports,C=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"header"},[e("div",{staticClass:"logo"},[t._v("AirDrop")]),e("div",{staticClass:"tip"},[e("el-button",{on:{click:function(e){t.centerDialogVisible=!0}}},[t._v("Tips")])],1)]),e("el-dialog",{attrs:{title:"Tips",visible:t.centerDialogVisible,width:"fit-content",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[e("p",[t._v("页面预览文件类型靠自定义和浏览器支持")]),e("p",[t._v("后续可能增加登录功能")]),e("p",[t._v("此项目仅用于私人使用，请勿用于商业使用")]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("确 定")])],1)])],1)},x=[],O={data(){return{centerDialogVisible:!1}}},j=O,S=(0,v.Z)(j,C,x,!1,null,"11b06f27",null),T=S.exports,P={name:"App",components:{UpLoad:b,FileList:$,Ahead:T}},U=P,V=(0,v.Z)(U,s,o,!1,null,"31132a64",null),M=V.exports,L=i(8499),Z=i.n(L),A=i(3822);a["default"].use(A.ZP);const F=new A.ZP.Store({state:{menu:[]},actions:{updata(t,e){t.commit("flash",e)}},mutations:{flash(t,e){t.menu=e}}});var I=F;a["default"].config.productionTip=!1,a["default"].prototype.globalUrl="http://127.0.0.1:8888",a["default"].prototype.Dev=!1,a["default"].use(Z()),new a["default"]({render:t=>t(M),store:I}).$mount("#app")}},e={};function i(a){var s=e[a];if(void 0!==s)return s.exports;var o=e[a]={exports:{}};return t[a](o,o.exports,i),o.exports}i.m=t,function(){var t=[];i.O=function(e,a,s,o){if(!a){var n=1/0;for(c=0;c<t.length;c++){a=t[c][0],s=t[c][1],o=t[c][2];for(var r=!0,l=0;l<a.length;l++)(!1&o||n>=o)&&Object.keys(i.O).every((function(t){return i.O[t](a[l])}))?a.splice(l--,1):(r=!1,o<n&&(n=o));if(r){t.splice(c--,1);var u=s();void 0!==u&&(e=u)}}return e}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[a,s,o]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var a in e)i.o(e,a)&&!i.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,a){var s,o,n=a[0],r=a[1],l=a[2],u=0;if(n.some((function(e){return 0!==t[e]}))){for(s in r)i.o(r,s)&&(i.m[s]=r[s]);if(l)var c=l(i)}for(e&&e(a);u<n.length;u++)o=n[u],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(c)},a=self["webpackChunkairdrop"]=self["webpackChunkairdrop"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=i.O(void 0,[998],(function(){return i(2307)}));a=i.O(a)})();
//# sourceMappingURL=app.8e50526a.js.map