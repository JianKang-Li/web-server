(function(){"use strict";var t={771:function(t,e,a){var n=a(6369),s=(a(6699),function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("UpLoad"),e("el-table",{staticStyle:{width:"100%"},attrs:{data:this.$store.state.menu}},[e("el-table-column",{attrs:{prop:"index",label:"序号"}}),e("el-table-column",{attrs:{prop:"filename",label:"文件名","min-width":"120","show-overflow-tooltip":!0}}),e("el-table-column",{attrs:{label:"下载"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("a",{attrs:{download:a.row.filename,href:"./public/files/"+a.row.filename}},[t._v("下载")])]}}])}),e("el-table-column",{attrs:{label:"预览"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"primary",size:"default"},on:{click:function(e){return t.preview(a.row.filename,"/public/files/"+a.row.filename)}}},[t._v("预览")])]}}])}),e("el-table-column",{attrs:{label:"删除"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"danger",size:"default"},on:{click:function(e){return t.open(a.row.filename)}}},[t._v("删除")])]}}])})],1),e("div",[e("el-dialog",{attrs:{title:"预览窗口",visible:t.centerDialogVisible,width:"60%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[e("div",[this.pics.includes(this.type)?e("img",{staticClass:"perv",attrs:{src:t.url,alt:""}}):this.audios.includes(this.type)?e("audio",{staticClass:"perv",attrs:{src:t.url,controls:""}}):this.videos.includes(this.type)?e("video",{staticClass:"perv",attrs:{src:t.url,controls:""}}):e("span",{staticClass:"perv"},[t._v("浏览器不支持此类型文件!")])])])],1)],1)}),r=[],o=a(6265),i=a.n(o);class l{constructor(){this._axios=i().create({})}}var u=new l;const c=()=>u._axios.get("/menu"),p=t=>u._axios.get("/delete?file="+t);var d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"upload"},[e("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"",action:"","http-request":t.httpRequest,"auto-upload":!1,"on-progress":t.proUpdata,name:"file"}},[e("i",{staticClass:"el-icon-upload"}),e("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),e("em",[t._v("点击上传")])])]),e("el-progress",{attrs:{id:"progress",percentage:t.percentage,format:t.format,status:t.status}}),e("el-button",{attrs:{type:"primary",size:"default"},on:{click:t.submitUpload}},[t._v("上传")])],1)},f=[],h={data(){return{percentage:0,fileList:[],status:null}},methods:{format(t){return`${t}%`},submitUpload(){this.$refs.upload.submit()},proUpdata(t){console.log(t),this.percentage=parseInt(t.percent),console.log(this.percentage),this.percentage>=100&&(this.percentage=100,setTimeout((()=>{this.percentage=0}),1e3))},httpRequest(t){var e=new FormData;e.append("filename",t.file),u._axios({method:"post",url:"/upload",data:e,onUploadProgress:t=>{const e=parseInt(t.loaded/t.total*100);this.percentage=e}}).then((t=>{200===t.data.status?(this.$notify({title:"成功",message:"文件上传成功",type:"success"}),setTimeout((()=>{this.percentage=0}),1e3),c().then((t=>{this.$store.dispatch("updata",t.data)}))):this.$notify.error({title:"错误",message:t.data.message}),this.$refs.upload.clearFiles()})).catch((t=>{console.log(t)}))}},watch:{status(){return 100===this.percentage?"success":""}}},m=h,g=a(1001),v=(0,g.Z)(m,d,f,!1,null,"76d058f2",null),b=v.exports,y={name:"App",components:{UpLoad:b},data(){return{url:"",centerDialogVisible:!1,type:"",pics:["jpg","png","webp","jpeg","bmp","gif","apng","avif","ico"],audios:["mp3","ogg","wav"],videos:["mp4","webm"]}},methods:{getMenu(){c().then((t=>{this.$store.dispatch("updata",t.data)}))},preview(t,e){let a=t.match(/\.\w*$/g)[0];this.type=a.replace(".",""),this.url=e,this.centerDialogVisible=!0},open(t){this.$confirm(`此操作将永久删除${t}, 是否继续?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{p(t).then((t=>{this.$message({type:"success",message:`${t.data}`})})).catch((t=>{this.$message({type:"warning",message:`${t}`})})),this.getMenu()})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))}},mounted(){this.getMenu()}},w=y,_=(0,g.Z)(w,s,r,!1,null,"9145d6a4",null),$=_.exports,x=a(8499),O=a.n(x),k=a(3822);n["default"].use(k.ZP);const j=new k.ZP.Store({state:{menu:[]},actions:{updata(t,e){t.commit("flash",e)}},mutations:{flash(t,e){t.menu=e}}});var C=j;n["default"].config.productionTip=!1,n["default"].prototype.globalUrl="http://127.0.0.1:8888",n["default"].use(O()),new n["default"]({render:t=>t($),store:C}).$mount("#app")}},e={};function a(n){var s=e[n];if(void 0!==s)return s.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,a),r.exports}a.m=t,function(){var t=[];a.O=function(e,n,s,r){if(!n){var o=1/0;for(c=0;c<t.length;c++){n=t[c][0],s=t[c][1],r=t[c][2];for(var i=!0,l=0;l<n.length;l++)(!1&r||o>=r)&&Object.keys(a.O).every((function(t){return a.O[t](n[l])}))?n.splice(l--,1):(i=!1,r<o&&(o=r));if(i){t.splice(c--,1);var u=s();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[n,s,r]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,n){var s,r,o=n[0],i=n[1],l=n[2],u=0;if(o.some((function(e){return 0!==t[e]}))){for(s in i)a.o(i,s)&&(a.m[s]=i[s]);if(l)var c=l(a)}for(e&&e(n);u<o.length;u++)r=o[u],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(c)},n=self["webpackChunkairdrop"]=self["webpackChunkairdrop"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(771)}));n=a.O(n)})();
//# sourceMappingURL=app.fd7ef035.js.map