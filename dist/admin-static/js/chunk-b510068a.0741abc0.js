(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b510068a"],{7520:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("TopicList")},c=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pa-3"},[a("v-card",[a("v-card-title",[t._v(" Danh sách đề tài "),a("v-spacer")],1),a("v-data-table",{staticClass:"has-border",attrs:{headers:t.headers,items:t.allTopics,"disable-sort":""},scopedSlots:t._u([{key:"item.teacher",fn:function(e){var i=e.item;return[a("div",{staticClass:"font-weight-bold text-left"},[t._v(t._s(i.teacherName))]),a("div",[t._v(t._s(i.departmentName))]),a("div",[t._v(t._s(i.phone)+"1")]),a("div",[t._v(t._s(i.email)+"2")])]}},{key:"item.topic",fn:function(e){var i=e.item;return[a("div",{staticClass:"table-text"},[t._v(" "+t._s(i.topicName)+" ")]),a("div",[t._v(" Số SV: "),a("span",{staticClass:"table-text"},[t._v(t._s(i.maxStudent)+" ")])]),a("div",[t._v(" "+t._s(i.description)+" ")]),a("div",[t._v(" "+t._s(i.description)+" ")])]}}],null,!0)})],1)],1)},s=[],r=a("5530"),o=a("1da1"),l=(a("96cf"),a("2f62")),d={created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.fetchTopics();case 2:case"end":return e.stop()}}),e)})))()},methods:Object(r["a"])({},Object(l["b"])({fetchTopics:"topic/fetchTopics"})),computed:Object(r["a"])({},Object(l["c"])({allTopics:"topic/getAllTopics"})),data:function(){return{headers:[{text:"Giảng viên hướng dẫn",align:"start",value:"teacher",width:"35%"},{text:"Đề tài",value:"topic",align:"start",width:"65%"}]}}},u=d,p=(a("a256"),a("2877")),v=a("6544"),f=a.n(v),h=a("b0af"),_=a("99d9"),b=a("8fea"),m=a("2fa4"),w=Object(p["a"])(u,n,s,!1,null,"6a2c7d8e",null),x=w.exports;f()(w,{VCard:h["a"],VCardTitle:_["c"],VDataTable:b["a"],VSpacer:m["a"]});var T={components:{TopicList:x}},g=T,j=Object(p["a"])(g,i,c,!1,null,null,null);e["default"]=j.exports},9717:function(t,e,a){},a256:function(t,e,a){"use strict";a("9717")}}]);
//# sourceMappingURL=chunk-b510068a.0741abc0.js.map