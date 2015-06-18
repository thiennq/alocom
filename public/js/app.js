var app = angular.module("GCApp", []);

// app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
//          $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://datcom.ngrok.com/**']);

//      }])

// .config(function($routeProvider) {
//     $routeProvider.
//       when('/', {controller:ListCtrl, templateUrl:'http://mhnystatic.s3.amazonaws.com/angulartest/list.html'}).
//       otherwise({redirectTo:'/'});
//   });

app.filter("totalSort", function() {
    return function(array){
        return array.sort(function(a, b){
            return b.total - a.total;
        });
    };
});

app.filter("hasValue", function(){
    return function(value){
        if(value > 0){
            return "hasValue";
        }
        return "";
    }
});

app.filter("filterMenu", function(){
    return function(menu){
        var threshold = 0;
        if(menu.done){
            threshold = 1;
        }

        var l = [];

        for(var i = 0; i < menu.list.length; i++){
            if(menu.list[i].total >= threshold){
                l.push(memu.list[i]);
            }
        }

        return l;
    }
})


app.filter("toCheckedClass", function(){
    return function(value){
        return value? "checked": ""
    }
});

app.filter("toTime", function(){
    return function(date){
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
});

app.filter("sortUsers", function(){
    return function(users){
        var a = users.all;

        if(a.length){
            for(var i = 0; i < a.length; i++){
                a[i].checked = a[i].fbid in users.checked
                a[i].updated_time = new Date(a[i].updated_time);
            }

            // console.log(a);

            return a.sort(function(a, b){
                var ia = a.checked ? a.fbid / 1000 : a.fbid;
                var ib = b.checked ? b.fbid / 1000 : b.fbid;

                return ib - ia;
            });
        }
        else{
            return [];
        }
        
    }
});