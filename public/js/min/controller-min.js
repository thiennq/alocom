var FACEBOOK_ID=0,FULLNAME="";app.controller("GCController",function(n,e,o){var s=this,t="";s.today=function(){var n=new Date;return n.getDate()+"/"+(n.getMonth()+1)},s.menu={visible:!1,raw:"",array:[],host:{fbid:0,fullname:""},onConfirm:function(){this.visible=!1;for(var n=this.raw.split(/\s*\n\s*/),o=[],s=/^[0-9]+\.\s+.+$/,r=0;r<n.length;r++){var i=n[r];s.test(i)&&o.push(i)}console.log("con heo",o),e.post(t+"/menu",{menu:o,fbid:FACEBOOK_ID,fullname:FULLNAME}).success(function(n){console.log(n),u()})}},s.vote={doVote:function(n){e.post(t+"/vote",{dish:n.id,fbid:FACEBOOK_ID,fullname:FULLNAME}).success(function(){u()})},checkYou:function(n){for(var e=0;e<n.list.length;e++)if(n.list[e].fbid===FACEBOOK_ID)return!0;return!1}},s.users={all:[],checked:{}};var u=function(){e.get(t+"/menu").success(function(n){console.log(n),s.menu.array=n.menu,s.menu.host=n.host,s.users.checked={};for(var e=0;e<n.menu.length;e++)for(var o=n.menu[e].list,t=0;t<o.length;t++)s.users.checked[o[t].fbid]=!0;r()}).error(function(){s.menu.array=fakeMenu.menu})},r=function(){e.get(t+"/users").success(function(n){console.log(n),s.users.all=n.users})};u(),s.loggined=function(n,e){FACEBOOK_ID=n,FULLNAME=e,console.log("fbid = ",n,"name = ",e)},s.sendDone=function(){e.post(t+"/done",{fbid:FACEBOOK_ID,fullname:FULLNAME})},s.isHost=function(){return console.log(FACEBOOK_ID,s.menu.host.fbid),FACEBOOK_ID==s.menu.host.fbid},o(u,5e3)});