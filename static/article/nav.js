var _width = parseInt(window.screen.width);
      var scale = _width/1300;
      var ua = navigator.userAgent.toLowerCase();
      var result = /android (\d+\.\d+)/.exec(ua);
      if (result){
      var version = parseFloat(result[1]);
      if(version>2.3){
      document.write('<meta name="viewport" content="width=1300, minimum-scale = '+scale+', maximum-scale = '+scale+', target-densitydpi=device-dpi">');
      }else{
      document.write('<meta name="viewport" content="width=1300, target-densitydpi=device-dpi">');
      }
      } else {
      document.write('<meta name="viewport" content="width=1300, user-scalable=no, target-densitydpi=device-dpi">');
      }
 var flag = IsPC();
 var href=window.location.href;

  if(!flag){
              
    window.location.href=href.replace('toutiao.secjia.com/static/article/article.html',"m.secjia.com/#/article")
  }

function IsPC() {
          var userAgentInfo = navigator.userAgent;
          var Agents = ["Android", "iPhone",
                      "SymbianOS", "Windows Phone",
                      "iPad", "iPod"];
          var flag = true;
          for (var v = 0; v < Agents.length; v++) {
              if (userAgentInfo.indexOf(Agents[v]) > 0) {
                  flag = false;
                  break;
              }
          }
          return flag;
      };


var id2 = document.getElementById('inde');
     id2.style.color="#fda861";
     var vm={};
     vm.userlevel='';

     vm.baseurl='http://211.159.148.43:8888';
     //判断是否登录
     $.ajax({
        method:'post',
        url:vm.baseurl + '/user/ping',
        xhrFields: {withCredentials: true},
        crossDomain: true,
    }).then(function(response){
        if(response.status==1){
          docis('loginis',1);
          docis('loginisf',2);
          if(response.verified==1){
            docis('userstatus',3,"未认证");
            docis('levels',3,"未认证");
          }else if(response.verified==2){
            docis('userstatus',3,"待确认");
            docis('levels',3,"待确认");
          }else if(response.verified==3){
            docis('userstatus',3,"已认证");
            docis('levels',3,"已认证");
          };
          vm.loginis=true;
          var userurl = document.getElementById('userurl');
          userurl.src=response.avatar;
          vm.userlevel=response.is_admin;
        }else{
           vm.loginis=false;
          docis('loginis',2);
          docis('loginisf',1);
        }
    });


    function removein(){
        $.ajax({
              method:'post',
              url:vm.baseurl + '/user/logout',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            xhrFields: {withCredentials: true},
            crossDomain: true,
          }).then(function(response){
              if(response.status==1){
                docis('loginis',2);
                docis('loginisf',1);
                munugo();
              }
          });
        
      }
      vm.remailis=false;
      vm.emalicodeis=false;
      vm.rverifyis=false;
      vm.rtwopwdis=false;
      vm.rpasswordis=false;
     function check(style){

      if(style=="remail"){
        var isok=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val('remail'));
        if(isok){
          vm.remailis=false;
          docis('remailis',2);
        }else{
          vm.remailis=true;
          vm.emalicodeis=false;
          docis('remailis',1);
        }
      }
      if(style=="rverify"){
        if( val('rverify')==''){
          vm.rverifyis=true;
          docis('rverifyis',1);
        }else{
          vm.rverifyis=false;
          docis('rverifyis',2);
        }
      }

      if(style=="rpassword"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(val('rpassword'));
        if(isok){
          vm.rpasswordis=false;
          docis('rpasswordis',2);
        }else{
          vm.rpasswordis=true;
          docis('rpasswordis',1);
        }
      }
      if(style=="rtwopwd"){
        if(val('rtwopwd')==val('rpassword')){
          vm.rtwopwdis=false;
          docis('rtwopwdis',2);
        }else{
          vm.rtwopwdis=true;
          docis('rtwopwdis',1);
        }
      }
    }

    function resetgo(){
      if(vm.rpasswordis==false && vm.rverifyis==false && vm.remailis==false && vm.rtwopwdis==false){
        if(val("rpassword")!="" && val("rverify")!='' && val("remail")!='' && val("rtwopwd")!=''){
            if(vm.emalicodeis==true){
              var nickname="社区用户";
              $.ajax({
                  method:'post',
                  data:{"verification_code":val("rverify"),"username":val("remail"),"password":val("rpassword"),"password1":val("rtwopwd"),"nickname":nickname},
                  url:vm.baseurl + '/user/register',
                  xhrFields: {withCredentials: true},
                crossDomain: true,
              }).then(function(response){
                  if(response.status==1){
                    reset();
                    alert('注册成功');
                    location.reload();

                  }else{
                    alert(response.msg);
                  }
              });
            }else{
              alert('请获取验证码');
            }
        }else{
          alert('请填写信息');
        }
      }
    }
      //获取验证码
      function emalicode(){
      if(val('remail') !='' && vm.remailis==false){
          var date= {};
          date.email=val('remail');
          date.for="register"
              var date1= {};
              date1.email=val('remail');
              date1.for="query"
              $.ajax({
                method:'post',
                  data:date1,
                  url:vm.baseurl + '/user/verify_email',
                 headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                xhrFields: {withCredentials: true},
                crossDomain: true,
              }).then(function(response){
                  if(response.status!=1){
                      $.ajax({
                          method:'post',
                          data:date,
                          url:vm.baseurl + '/user/verify_email',
                         headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        xhrFields: {withCredentials: true},
                        crossDomain: true,
                      }).then(function(response){
                          if(response.status==1){
                            alert('验证码已发送');
                            vm.emalicodeis=true;
                          }else if(response.status==0){
                            alert(response.msg);
                            vm.emalicodeis=true;
                          }else{
                            alert(response.msg);
                          }
                      });


                  }else{
                    alert("此邮箱已经注册");
                  }
              });
      // console.log(date) 
      }else{
        check('remail');

      }

    }




    function sublogin(){
      if(val('username')!='' && val('password')!=""){
          var date={};
          date.username=val('username');
          date.password=val('password');
           $.ajax({
              method:'post',
              data:date,
              url:vm.baseurl + '/user/login',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            xhrFields: {withCredentials: true},
            crossDomain: true,
          }).then(function(response){
              if(response.status==1){
                login();
                docis('loginis',1);
                docis('loginisf',2);
                if(response.verified==1){
                  docis('userstatus',3,"未认证");
                  docis('levels',3,"未认证");
                }else if(response.verified==2){
                  docis('userstatus',3,"待确认");
                  docis('levels',3,"待确认");
                }else if(response.verified==3){
                  docis('userstatus',3,"已认证");
                  docis('levels',3,"已认证");
                };
                var userurl = document.getElementById('userurl');
                userurl.src=response.avatar;
                vm.userlevel=response.is_admin;
              }else{
                alert("账号密码错误");
              }
          });
          

      }else{
        alert('请填写信息');
      }
      
    }

    function reset(index){
      if(index==1){
        docis('resetis',1);
      }else if(index==2){
        docis('resetis',1);
        docis('logis',2);
      }else {
        docis('resetis',2);
      }
      
    }
    function login(index){
      if(index==1){
        docis('logis',1);
      }else if(index==2){
         docis('resetis',2);
         docis('logis',1);
      }else{
         docis('logis',2);
      }
    }
    function serkey(){
      var vm=vm;
      var id=document.querySelector(".search input");
      //console.log(id)
      id.onkeydown=function(e){
        if(e.keyCode==13){
          gosearch();
        }
      }
    }
    function gosearch(){
      var search=$("#searchin").val();
      sessionStorage.setItem("search",search)
      window.location.href="/#/search?"+search;
    }

    function val(id){
      var id = document.getElementById(id);
      var value=id.value;
      return value;
    }

    function docis(id,style,content){
      var id = document.getElementById(id);
      if(style==1){
        id.style.display = 'block'
      }else if(style==2){
        id.style.display = 'none'
      }else if(style==3){
        id.innerHTML = content;
      }
    }

    var munun=false;
    function munugo(index){
      if(index==2){
        if(munun==false){
           docis('munuis',1);
           munun=true;
        }else{
           docis('munuis',2);
            munun=false;
        }
      }else{
        docis('munuis',2);
        munun=false;
      }
    }
    function indexgo(){
      window.location.href="/#/"
    }