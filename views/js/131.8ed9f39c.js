"use strict";(self["webpackChunkairdrop"]=self["webpackChunkairdrop"]||[]).push([[131],{8131:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var a=function(){var t=this,e=t._self._c;return e("div",[e("router-link",{attrs:{to:"/"}},[e("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("文件传输")])],1),e("div",{staticClass:"content"},[e("el-input",{staticClass:"control_text",attrs:{resize:"none",autosize:{minRows:6,maxRows:10},type:"textarea"},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),e("div",{staticClass:"btns"},[e("el-button",{attrs:{type:"primary"},on:{click:t.postText}},[t._v("发送")]),e("el-button",{attrs:{type:"danger"}},[t._v("清除")])],1)],1)],1)},i=[],r=s(1466),n={data(){return{text:""}},methods:{postText(){let t={text:this.text};(0,r.F5)(t).then((t=>{200===t.status&&this.$notify({title:"成功",message:"发送成功",type:"success"})}))},write(t){this.text+=t},clear(){this.text=""}},mounted(){this.ws.onmessage=t=>{const e=JSON.parse(t.data);"write"===e.status?(this.clear(),this.write(e.content)):"clear"===t.data&&this.clear()}}},o=n,l=s(1001),c=(0,l.Z)(o,a,i,!1,null,"0c3f8c4f",null),u=c.exports}}]);
//# sourceMappingURL=131.8ed9f39c.js.map