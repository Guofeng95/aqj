
var vm={};
vm.ymurl="top.sunliangliang.com"
vm.mymurl="m.sunliangliang.com"
vm.atricleurl='//'+vm.ymurl+'/article/keyword?kw='
vm.mobileurl='//'+vm.ymurl+'/#/keyword?'



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
              
    window.location.href=href.replace(vm.atricleurl,vm.mobileurl)
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

  var qs={};
  qs.stringify=function(data){
    var obj=JSON.stringify(data).split('}')[0].split('{')[1];
     obj=obj.replace(/'/g,'');
     obj=obj.replace(/"/g,'');
     obj=obj.replace(/,/g,'&');
     obj=obj.replace(/:/g,'=');
     //console.log(obj)
     return obj;
  }
  axios.defaults.withCredentials = true;
    var app = new Vue({
      el: '#app',
      data: {
      loginis:'false',
      userurl:'',
      userlevel :0,
      userstatus:'未认证',
      val:0,
      munuis:false,
      emalicodeis:false,
      baseurl:Url.baseurl,
      search: '',
      logis:false,
      resetis:false,
      remail:'',
      rverify:'',
      rpassword:'',
      rtwopwd:'',
      username:'',
      password:'',
      rpasswordis:false,
      rtwopwdis:false,
      remailis:false,
      rverifyis:false,
      usernameis:false,
      passwordis:false,
      timeer:'',

      atricleurl:Url.atricleurl,
      tota:0,
      seokeywords:'',
      seodescription:'',
      seotitle:'',
      subis:true,
      subscripe:'',
      nextnotice:'',
      timer:'',
      conbotis:false,
      notice:'',
      adata:[],
      newcontentis:false,
      indexdata:[],
      hotdata:[],
      qqmoreis:false,
      mind:[],
      mindis:false,
      },
      mounted(){
     var id2 = document.getElementById('inde');
     id2.style.color="#fda861";
    this.loginis=false;
    var vm=this;
    //console.log(axios)
   axios({
        method:'post',
        url:vm.baseurl + '/user/ping',
    }).then(function(response){
        if(response.data.status==1){
          vm.loginis=true;
          if(response.data.verified==1){
            vm.userstatus="未认证"
          }else if(response.data.verified==2){
            vm.userstatus="待确认"
          }else if(response.data.verified==3){
            vm.userstatus="已认证"
          }
          vm.userurl=response.data.avatar;
          vm.userlevel=response.data.is_admin;
        }else{
          vm.loginis=false;
        }
    });
    axios({
          method:'post',
          url:vm.baseurl + '/user/message_check_new',
      }).then(function(response){
          if(response.data.status==1){
            vm.val=response.data.count;
          }
      });
    this.timeer=setInterval(function(){
       axios({
          method:'post',
          url:vm.baseurl + '/user/message_check_new',
      }).then(function(response){
          if(response.data.status==1){
            vm.val=response.data.count;
          }
      });

    },60000)
    this.indexdata=[];
    vm.hotda();
    this.subscripe=decodeURIComponent(window.location.href.split("?kw=")[1],"utf8");
    console.log(this.subscripe)
    this.indexdataget(10,"first");
    var date={};
    date.keyword=this.subscripe;
    axios({
        method:'post',
        data:qs.stringify(date),
        url:vm.baseurl + '/article/news_get_keyword_seo_data',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response){
        if(response.data.status==1){
          vm.seotitle=response.data.title;
          vm.seokeywords=response.data.keywords;
          vm.seodescription=response.data.description;
        }
        // else{
        //   vm.$message.warning(response.data.msg);
        // }

    });
    function getScrollTop(){
      　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      　　if(document.body){
      　　　　bodyScrollTop = document.body.scrollTop;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollTop = document.documentElement.scrollTop;
      　　}
      　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      　　return scrollTop;
      }

      //文档的总高度

      function getScrollHeight(){
      　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　if(document.body){
      　　　　bodyScrollHeight = document.body.scrollHeight;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　}
      　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      　　return scrollHeight;
      }

      //浏览器视口的高度

      function getWindowHeight(){
      　　var windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}
      　　return windowHeight;
      }

      window.onscroll = function(){
      　　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
      　　　 if(vm.conbotis==true){
                vm.indexdataget(10);
            }
      　　}
      };

  

  },
  methods:{
    moreqq(){
      this.qqmoreis=true;
    },
    close(){
      this.qqmoreis=false;
    },
    hotda(){
        var vm=this;
        vm.hotdata=[];
        var date={};
        date.limit=5;
        axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/hot_news_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                response.data.data.forEach( function(element, index) {
                  var obj={};
                  obj.content = element.title;
                  obj.id=element.id;
                  vm.hotdata.push(obj)
                });
              }
          })
      },
      seogo(){
        var vm=this;
        var data={};
        data.keyword=this.subscripe;
        data.title=vm.seotitle;
        data.keywords=vm.seokeywords;
        data.description=vm.seodescription;
        axios({
            method:'post',
            data:qs.stringify(data),
            url:vm.baseurl + '/article/news_update_keyword_seo_data',
           headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(response){
            if(response.data.status==1){
              vm.$message.success("保存成功！");
            }else{
              vm.$message.warning(response.data.msg);
            }

        })
      },
      subscr(name){
        var vm=this;
        var date={};
        date.keyword=this.subscripe;

        if(name=="new"){
           date.do_cancel=0;
        }else{
          date.do_cancel=1;
        }
        if(vm.loginis){
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_subscribe_keyword',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                vm.subis=!vm.subis;
              }else{
                vm.$message.warning(response.data.msg);
              }

          })
        }else{
          vm.$message.warning("请先登录哦！");
        }
        

      },
      article(id){
        window.location.href=this.atricleurl+'topid='+id;
      },
      indexdataget(limit,times){
        var vm=this;
        var date={};
          date.limit=limit;
          date.notice=this.notice;
          date.keyword=this.subscripe;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                  if(times=="first"){
                    vm.nextnotice=response.data.next_notice;
                  }
                  vm.notice=response.data.prev_notice;
                  if(limit==response.data.data.length){
                    vm.conbotis=true;
                  }else{
                    vm.conbotis=false;
                  }
                  if(response.data.subscribed==0){
                    vm.subis=true;
                  }else{
                     vm.subis=false;
                  }
                  vm.tota=response.data.total_count;
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content = element.summary;
                    obj.good=element.like_count;
                    obj.read=element.read_count;
                    obj.comment=element.comment_count;
                    obj.time=element.publish_time.split(" ")[0];
                    obj.url=element.images;
                    var l=element.images.length;
                    if(l==0){
                      obj.form=3
                    }else if(l==1){
                      obj.form=1;
                    }else{
                      obj.form=2;
                    };
                    vm.indexdata.push(obj);
                  });
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
      },
      newcon(){
        this.indexdata=[];
        this.indexdataget(7,"first");
        this.newcontentis=false;
      },
    indexgo(){
      window.location.href="#/"
    },
    blursearch(){
      console.log(this.search)
      if(this.search==''){
        this.mindis=false;
      }
    },
     mindsearch(item){
      this.search=item;
      this.mindis=false;
      this.gosearch();
     },
    serkey(){
      var vm=this;
      var id=document.querySelector(".search input");
      //console.log(id)
      id.onkeydown=function(e){
        if(e.keyCode==13){
          vm.gosearch();
        }
      }
      id.onkeyup=function(e){
        if(e.keyCode!=13 && vm.search!=''){
          var date={};
          date.query=vm.search;
          axios({
            method:'post',
            data:qs.stringify(date),
            url:vm.baseurl+'/article/list_autocomplete',
        }).then(function(response){
            if(response.data.status==1){
              //console.log(response.data.suggestions)
              if(response.data.suggestions.length>0){
                vm.mind=[];
                vm.mind=response.data.suggestions;
                // response.data.suggestions.forEach( function(element, index) {
                //   vm.mindarr.push(element);
                // });
                vm.mindis=true;
              }else{
                vm.mind=[];
                vm.mindis=false;
              }
              
            }
          })
        }
      }

    },
    gosearch(){
      sessionStorage.setItem("search",this.search)
      window.location.href="//"+vm.ymurl+"/#/search?"+this.search;
    },
    hlight(name){
      var id1 = document.getElementById('recommend');
        id1.style.color="#ababab";
        var id2 = document.getElementById('inde');
        id2.style.color="#ababab";
        var id3 = document.getElementById('know');
         id3.style.color="#ababab";
        var id6 = document.getElementById(name);
        id6.style.color="#fda861";
    },
    munugo(index){
      if(index==2){
        if(this.munuis){
          this.munuis=false;
        }else{
           this.munuis=true;
        }
      }else{
        this.munuis=false;
      }
      
     
    },
    removein(){
        var vm=this;
        axios({
              method:'post',
              url:vm.baseurl + '/user/logout',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                
                console.log(response.data)
                vm.loginis=false;
                window.location.href="#/"
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
        
      },
    emalicode(){
      var vm=this;
      if(this.remail !='' && this.remailis==false){
          var date= {};
          date.email=this.remail;
          date.for="register"
              var date1= {};
              date1.email=this.remail;
              date1.for="query"
              axios({
                method:'post',
                  data:qs.stringify(date1),
                  url:vm.baseurl + '/user/verify_email',
                 headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(function(response){
                  if(response.data.status!=1){
                      axios({
                          method:'post',
                          data:qs.stringify(date),
                          url:vm.baseurl + '/user/verify_email',
                         headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                      }).then(function(response){
                          if(response.data.status==1){
                            vm.$message.success('验证码已发送');
                            vm.emalicodeis=true;
                          }else if(response.data.status==0){
                            vm.$message.success(response.data.msg);
                            vm.emalicodeis=true;
                          }else{
                            vm.$message.warning(response.data.msg);
                          }
                      });


                  }else{
                    vm.$message.warning("此邮箱已经注册");
                  }
              });
      // console.log(date) 
      }else{
        this.check('remail');

      }

    },
    reset(index){
      if(index==1){
        this.resetis=true;
      }else if(index==2){
        this.resetis=true;
        this.logis=false;
      }else {
        this.resetis=false;
      }
      
    },
    login(index){
      if(index==1){
        this.logis=true;
      }else if(index==2){
        this.resetis=false;
        this.logis=true;
      }else{
        this.logis=false;
      }
    },
    changelog(data){
      if(data[0]=="ok"){
        this.logis=2;
      }
    },
    sublogin(){
      var vm=this;
      if(this.username!='' && this.password!=""){
          var date={};
          date.username=this.username;
          date.password=this.password;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/user/login',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                vm.login();
                //console.log(response.data)
                  if(response.data.verified==1){
                    vm.userstatus="未认证"
                  }else if(response.data.verified==2){
                    vm.userstatus="待确认"
                  }else if(response.data.verified==3){
                    vm.userstatus="已认证"
                  }
                  vm.userurl=response.data.avatar;
                  vm.userlevel=response.data.is_admin;
                vm.loginis=true;
              }else{
                vm.$message.warning("账号密码错误");
              }
          });
          

      }else{
        this.$message.error('请填写信息');
      }
      
    },
    check(style){
      if(style=="remail"){
        var isok=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.remail);
        if(isok){
          this.remailis=false;
        }else{
          this.remailis=true;
          this.emalicodeis=false;
        }
      }
      if(style=="rverify"){
        if( this.rverify==''){
          this.rverifyis=true;
        }else{
          this.rverifyis=false;
        }
      }

      if(style=="rpassword"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(this.rpassword);
        if(isok){
          this.rpasswordis=false;
        }else{
          this.rpasswordis=true;
        }
      }
      if(style=="rtwopwd"){
        if(this.rtwopwd==this.rpassword){
          this.rtwopwdis=false;
        }else{
          this.rtwopwdis=true;
        }
      }
    },
    resetgo(){
      var vm=this;
      if(this.rpasswordis==false && this.rverifyis==false && this.remailis==false && this.rtwopwdis==false){
        if(this.rpassword!="" && this.rverify!='' && this.remail!='' && this.rtwopwd!=''){
            if(this.emalicodeis==true){
              var nickname="社区用户";
              axios({
                  method:'post',
                  data:qs.stringify({"verification_code":this.rverify,"username":this.remail,"password":this.rpassword,"password1":this.rtwopwd,"nickname":nickname}),
                  url:vm.baseurl + '/user/register',
              }).then(function(response){
                  if(response.data.status==1){
                    vm.$message.success('注册成功');
                    vm.login();
                    window.location.reload();
                  }else{
                    vm.$message.error(response.data.msg);
                  }
              });
            }else{
              this.$message.warning('请获取验证码');
            }
        }else{
          this.$message.error('请填写信息');
        }
      }
    }
  }
  })
var oTest=document.getElementsByTagName("body")[0];
var appid=document.getElementById("app");
var divnode=document.createElement("div");
divnode.innerHTML='© 2018 安全加 社区. All Rights Reserved. ';
divnode.style = 'height: 60px;line-height: 60px;border-top: 1px solid #d3d3d3;text-align: center;width: 100%;font-size: 14px;position: relative;margin-top: 20px;';
oTest.insertBefore(divnode,appid.nextSibling);

var dybt=document.getElementsByClassName("dybtn");
//console.log(dybt[1]);
dybt[1].style.marginLeft = 'auto';
