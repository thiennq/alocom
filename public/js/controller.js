var FACEBOOK_ID = 0;
var FULLNAME = "";


app.controller("GCController", function($scope, $http, $interval){
    var C = this;
    var host = "";


    C.today = function(){
        var d = new Date();
        return d.getDate() + "/" + (d.getMonth() + 1);
    };

    C.menu = {
        visible: false,
        raw: "",
        array: [],
        host: {
            fbid: 0,
            fullname: ""
        },
        onConfirm: function(){
            this.visible = false;

            var arr = this.raw.split(/\s*\n\s*/);
            
            var result = [];
            var reg = /^[0-9]+\.\s+.+$/;
            for(var i = 0; i < arr.length; i++){
                var line = arr[i];
                if(reg.test(line)){
                    result.push(line);
                }
            }

            console.log("con heo", result);

            $http.post(host + '/menu', {
                menu: result,
                fbid: FACEBOOK_ID,
                fullname: FULLNAME
            }).success(function(result){
                console.log(result);
                doReloadMenu();
            });

            
        }
    };

    C.vote = {
        doVote: function(item){
            $http.post(host + "/vote", {
                dish: item.id,
                fbid: FACEBOOK_ID,
                fullname: FULLNAME
            }).success(function(){
                doReloadMenu()
            });
        },
        checkYou: function(item){
            for(var i = 0; i < item.list.length; i++){
                if(item.list[i].fbid === FACEBOOK_ID){
                    return true;
                }    
            }
            return false;
        }
    };

    C.users = {
        all: [],
        checked: {}
    }


    var doReloadMenu = function(){
        $http.get(host + '/menu').success(function(data){
            console.log(data);
            C.menu.array = data.menu;
            C.menu.host = data.host;

            C.users.checked = {};
            for(var i = 0; i < data.menu.length; i++){
                var l = data.menu[i].list;
                for(var j = 0; j < l.length; j++){
                    C.users.checked[l[j].fbid] = true;
                }
            }

            doReloadUsers();

        }).error(function(){
            C.menu.array = fakeMenu.menu;
        });
    };


    
    var doReloadUsers = function(){
        $http.get(host + "/users").success(function(data){
            console.log(data);
            C.users.all = data.users;
        });
    };

    doReloadMenu();

    C.loggined = function(id, name){
        FACEBOOK_ID = id;
        FULLNAME = name;

        console.log("fbid = ", id, "name = ", name);
    }

    $interval(doReloadMenu, 5000);

});