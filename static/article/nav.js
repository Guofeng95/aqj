var vm={};
vm.yuming='top.sunliangliang.com'
vm.atricleurl='http://top.sunliangliang.com/article/page?'
vm.baseurl='http://211.159.148.43:8888';
vm.mobileurl='http://m.sunliangliang.com/#/article?';
vm.insubscripeurl="http://top.sunliangliang.com/article/keyword?kw=";
vm.loginis=false;

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


$("#reset a").click(function(){
 // console.log($(this))
  if($(this)['context'].childNodes[2]){
    var text=$(this)['context'].childNodes[2].data;
      if(text.indexOf("微信")>-1){
        window.location.href=vm.baseurl+'/user/wxlog'
      }else if(text.indexOf("微博")>-1){
        window.location.href=vm.baseurl+'/user/wblog'
      }else if(text.indexOf("QQ")>-1){
        window.location.href=vm.baseurl+'/user/qqlog'
      }
  }
})
$("#log a").click(function(){
 // console.log($(this))
  if($(this)['context'].childNodes[2]){
    var text=$(this)['context'].childNodes[2].data;
      if(text.indexOf("微信")>-1){
        window.location.href=vm.baseurl+'/user/wxlog'
      }else if(text.indexOf("微博")>-1){
        window.location.href=vm.baseurl+'/user/wblog'
      }else if(text.indexOf("QQ")>-1){
        window.location.href=vm.baseurl+'/user/qqlog'
      }
  }
})


var id2 = document.getElementById('inde');
     id2.style.color="#fda861";
     
     vm.userlevel='';

     
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
          console.log(vm);
          var userurl = document.getElementById('userurl');
          userurl.src=response.avatar;
          vm.userlevel=response.is_admin;
        }else{
           vm.loginis=false;
           console.log(vm);
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
                vm.loginis=false;
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


    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];
       if(e && e.keyCode==13){ // enter 键
              if(vm.loginis==false && getid("logis").style.display=="block"){
                //console.log(getid("logis").style.display)
                sublogin();
              }
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
                vm.loginis=true;
                var userurl = document.getElementById('userurl');
                userurl.src=response.avatar;
                vm.userlevel=response.is_admin;
                if(vm.userlevel==1){
                  docis("userlevel",1)
                }
              }else{
                vm.loginis=false;
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


    var comis=window.location.href.indexOf("comid");
    if(comis>-1){
      var arr1=window.location.href.split('?')[1].split("&");
      var arr=arr1[0].split("=");
      vm.id=arr[1];
      var arr2=arr1[1].split("=")[1];
      vm.comid=arr2;
      setTimeout(function() {
        var com=document.getElementById('c'+vm.comid).offsetTop;
        //console.log(com)
        document.body.scrollTop = com;
        document.documentElement.scrollTop = com;
      }, 100);
    }else{
      var arr=window.location.href.split('?')[1].split("=");
      vm.id=arr[1];
    }
    getid("wxurl").src='http://s.jiathis.com/qrcode.php?url='+window.location.href;
    function getid(id){
      var now=document.getElementById(id);
      return now;
    }

    var date={};
    date.id=vm.id;
    getid('aurl').innerHTML=window.location.href;
    $.ajax({
        method:'post',
        data:date, 
        url:vm.baseurl + '/article/news_content',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      xhrFields: {withCredentials: true},
      crossDomain: true,
    }).then(function(response){
        if(response.status==1){
          var obj=response.news_data
          vm.artitle=obj.title;
          //getid('artitle').innerHTML=obj.title;
          if(response.keywords[0]){
            getid('thirdtit1').innerHTML='·'+response.keywords[0];
            //getid('thirdtit').innerHTML=response.keywords[0];
          }
          
          getid('artauthor').innerHTML=response.author_data.name;
          getid('artauthor1').innerHTML=response.author_data.name;
          getid('arttime').innerHTML='·'+obj.publish_time;
          getid('readnum').innerHTML="阅读("+obj.read_count+")";
          getid('comnum').innerHTML="评论("+obj.comment_count+")";
          vm.summary=obj.summary;
          tagdatanow(response.keywords[0])
          //getid("articleindex").innerHTML='<div class="content" id="news_content">  <html>   <body>    <p>     近日，krbtgt.pw爆出微软SMBv2及SMBv3版本存在空指针引用 <a href="http://toutiao.secjia.com/tag/dos%E6%BC%8F%E6%B4%9E.shtml" target="_blank">      DoS漏洞     </a>     ，CVE编号CVE-2018-0833，PoC已经在Windows 8.1 (x86)和Windows Server 2012 R2 (x64)上测试通过，目前该漏洞为     <a href="http://toutiao.secjia.com/tag/0day%E6%BC%8F%E6%B4%9E.shtml" target="_blank">      0Day漏洞     </a>     ，微软还没有任何解决办法，微软及SecurityFocus发布预警通告。    </p>    <p>     今年2月份，     <a href="http://toutiao.secjia.com/nsa-exploits-eternalsynergy">      3个泄露的NSA漏洞利用工具散播 Win2000至winserver2016所有版本受影响     </a>     。而2017年出现了4次     <a href="http://toutiao.secjia.com/tag/smb%E6%BC%8F%E6%B4%9E.shtml" target="_blank">      SMB漏洞     </a>     （见文末），CVE-2018-0833漏洞相关信息如下    </p>    <h2>     为什么Windows SMB如此容易出现问题呢？    </h2>    <p>     2017年defcon期间，一位安全专家认为这对微软来说不是一个简单的任务。迪伦表示：    </p>    <blockquote>     <p>      "我认为这个问题不是那么好修复的；这种smb 内存分配方式已存在超过20年。所以所有事情都是依赖于客户端，客户端说 " 我需要一个缓冲区, 我需要发送这么大的数据块。’服务器就保留了这么多的内存，以便可以处理它。     </p>     <p>      What we did we say I have a huge buffer and never send the buffer。仍然有很多组件依赖于这个事实，缓冲区已经被分配并且大小已知。”     </p>    </blockquote>    <h2>     CVE-2018-0833漏洞概要    </h2>    <p>     针对CVE-2018-0833漏洞情况，安全加整理了相关内容如下，这些内容可能来自于CVE-2018-0833涉及厂商、CVE-2018-0833漏洞信息发布组织、CVE、SecurityFocus及其它第三方组织。    </p>    <h3>     CVE-2018-0833漏洞标识    </h3>    <ul>     <li>      CVE ID：CVE-2018-0833     </li>     <li>      BUGTRAQ ID：102924     </li>     <li>      微软漏洞库ID：【漏洞涉及厂商漏洞库ID】     </li>     <li>      CNNVD ID：【CNNVD漏洞编号】     </li>     <li>      绿盟科技漏洞库ID：【绿盟科技漏洞库ID】     </li>    </ul>    <h3>     CVE-2018-0833漏洞相关链接    </h3>    <p>     【增补中】    </p>    <ul>     <li>      百度链接：https://www.baidu.com/s?wd=CVE-2018-0833     </li>     <li>      绿盟科技漏洞库链接：http://www.nsfocus.net/vulndb/{绿盟科技漏洞库ID}     </li>     <li>      微软链接：https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2018-0833     </li>     <li>      SecurityFocus链接：https://www.securityfocus.com/bid/102924     </li>    </ul>    <h3>     CVE-2018-0833漏洞描述    </h3>    <p>     【增补中】    </p>    <p>     <strong>      作者评价该漏洞     </strong>    </p>    <p>     <font>      <font>       去年年底，当设置一个模糊器来定位SMB协议时，我发现了一个如此简单而又非常有效的破坏大型企业的漏洞。      </font>     </font>     <br/>     <font>      <font>       拒绝服务错误，允许 Windows 8.1和Windows Server 2012 R2计算机使用单个数据包制造BSOD。非常感谢Eric Sc​​hayes在根本原因分析期间加入我。      </font>     </font>    </p>    <p>     <font>      <font>       在如下视频中可以看到，当客户端连接到恶意SMB服务器时，瞬间就蓝屏了      </font>     </font>    </p>    <p>     <iframe frameborder="0" height="498" src="http://player.youku.com/embed/XMzQzNzAzNDM4MA==" width="100%">     </iframe>    </p>    <p>     <b>      CVE评价该漏洞     </b>    </p>    <p>     在Windows 8.1和RT 8.1和Windows Server 2012 R2中，微软服务器消息块2.0和3.0（smbv2 / smbv3）客户端存在拒绝服务的DoS漏洞，由于有特制的请求处理，又名“smbv2 / smbv3 空指针引用拒绝服务漏洞”。    </p>    <p>     <strong>      微软评价该漏洞     </strong>    </p>    <p>     <font>      <font>       Microsoft服务器消息块2.0和3.0（SMBv2 / SMBv3）客户端的实现中存在拒绝服务漏洞。      </font>      <font>       该漏洞是由于恶意SMB服务器向客户端发送的某些请求处理不当所致。      </font>      <font>       成功利用此漏洞的攻击者可能会导致受影响的系统在手动重新启动之前停止响应。      </font>     </font>    </p>    <p>     <font>      <font>       为了利用此漏洞，攻击者可以使用各种方法，例如重定向器，注入的HTML标头链接等，这可能会导致SMB客户端连接到恶意的SMB服务器。      </font>     </font>    </p>    <p>     <font>      <font>       此安全更新通过更正Microsoft SMBv2 / SMBv3客户端处理特制请求的方式来解决漏洞。      </font>     </font>    </p>    <p>     <quota>     </quota>    </p>    <p>     <b>      SecurityFocus评价该漏洞     </b>    </p>    <p>     Microsoft Windows SMB Server CVE-2018-0833 Denial of Service Vulnerability    </p>    <blockquote>     <p>      微软Windows容易出现远程拒绝服务漏洞。攻击者可以利用此问题导致拒绝服务状态     </p>    </blockquote>    <table border="0" cellpadding="4" cellspacing="0">     <tbody>      <tr>       <td>        Bugtraq ID:       </td>       <td>        102924       </td>      </tr>      <tr>       <td>        Class:       </td>       <td>        Unknown       </td>      </tr>      <tr valign="top">       <td>        CVE:       </td>       <td>        CVE-2018-0833       </td>      </tr>      <tr>       <td>        Remote:       </td>       <td>        Yes       </td>      </tr>      <tr>       <td>        Local:       </td>       <td>        No       </td>      </tr>      <tr>       <td>        Published:       </td>       <td>        Feb 13 2018 12:00AM       </td>      </tr>      <tr>       <td>        Updated:       </td>       <td>        Feb 13 2018 12:00AM       </td>      </tr>      <tr>       <td>        Credit:       </td>       <td>        Nabeel Ahmed and Eric Schayes from Dimension Data working with Trend Micro\'s Zero Day Initiative       </td>      </tr>      <tr valign="top">       <td>        Vulnerable:       </td>       <td>        Microsoft Windows Server 2012 R2 0        <br/>        Microsoft Windows RT 8.1        <br/>        Microsoft Windows 8.1 for x64-based Systems 0        <br/>        Microsoft Windows 8.1 for 32-bit Systems 0       </td>      </tr>      <tr>       <td colspan="2">       </td>      </tr>      <tr valign="top">       <td>        Not Vulnerable:       </td>      </tr>     </tbody>    </table>    <p>     <br/>     <quota>     </quota>    </p>    <h3>     CVE-2018-0833漏洞影响范围    </h3>    <p>     <b>      CVE-2018-0833漏洞涉及厂商     </b>    </p>    <p>     微软    </p>    <p>     <b>      CVE-2018-0833漏洞涉及产品     </b>    </p>    <p>     SMB    </p>    <p>     <b>      CVE-2018-0833漏洞影响版本     </b>    </p>    <p>     SMB v2 及 SMB v3    </p>    <h2>     CVE-2018-0833漏洞解决方案    </h2>    <p>     【增补中】    </p>    <h3>     微软声明    </h3>    <p>     <font>      <font>       Microsoft尚未发现      </font>      <font>       此漏洞的      </font>      <font>       任何解决方法。      </font>     </font>    </p>    <p>     【增补中】    </p>    <h3>     krbtgt.pw声明    </h3>    <p>     正如您可能注意到的那样，攻击者控制的值在不同寄存器中存储的次数很多，但我们没有找到使用这些寄存器来完全控制流的方法。    </p>    <p>     【增补中】    </p>    <h3>     CVE-2018-0833漏洞安全加声明    </h3>    <p>     本页信息用以描述CVE-2018-0833漏洞的信息，这些信息便于您对CVE-2018-0833漏洞进行快速阅读并了解相关信息。如下信息如有空缺，则CVE-2018-0833漏洞相关内容正在增补中，如果您知悉相关内容或者如下内容有异议，可以联系站长：安全加QQ：468215215；Weixin：gnaw0725    </p>    <h2>     CVE-2018-0833漏洞相关内容    </h2>    <h3>     CVE-2018-0833漏洞相关漏洞    </h3>    <p>     漏洞列表    </p>    <h3>     CVE-2018-0833漏洞相关文章    </h3>    <p>     2018年2月，     <a href="http://toutiao.secjia.com/nsa-exploits-eternalsynergy">      3个泄露的NSA漏洞利用工具散播 Win2000至winserver2016所有版本受影响     </a>    </p>    <p>     2017年10月，     <a href="http://toutiao.secjia.com/windows-smb-cve-2017-11780">      Windows再爆SMB漏洞CVE-2017-11780 即便RCE不行还可以DoS     </a>    </p>    <p>     2017年8月，     <a href="http://toutiao.secjia.com/windows-smb-0day">      DEFCON 微软SMB 0day漏洞 20行代码攻击Win2000以后所有版本 PoC已公开     </a>    </p>    <p>     2017年5月，     <a href="http://toutiao.secjia.com/new-windows-smb-rdos-cve-2017-0280">      最新Windows SMB远程DoS漏洞CVE-2017-0280 多个Windows客户端及服务器产品受影响     </a>    </p>    <p>     2017年3月，     <a href="http://toutiao.secjia.com/windows-update-broken">      CVE-867968 0Day漏洞，而且当时微软的Windows update系统还坏了   </a>     。    </p>   </body>  </html> </div> "'
          
          //getid("articleindex").innerHTML='<a href="http://zhishi.secjia.com/pdf/831928085.pdf" id="download" onclick="_hmt.push(["_trackEvent", "document", "download", "TRITON"]);" target="_blank"><img class="download_img" height="160" src="http://7xkk1o.com1.z0.glb.clouddn.com/triton-report.png" width="113"></a><a href="http://zhishi.secjia.com/pdf/831928085.pdf" id="download" onclick="_hmt.push(["_trackEvent", "document", "download", "TRITON"]);" target="_blank"><img class="download_img" height="160" src="http://7xkk1o.com1.z0.glb.clouddn.com/triton-report.png" width="113"></a>'
          vm.zannum=obj.like_count;
          // vm.hdpurl=obj.images;
          // vm.nowbig=obj.images[0];
          // getid("nowbig").src=vm.hdpurl[0];
          vm.scnum=response.extra_data.mark_count;
          if(response.extra_data.liked==1){
            docis('likeisf',1);
            getid('likeisf').innerHTML="<img src='/static/img/aok.png'>赞("+vm.zannum+")";
          }else{
            docis('likeis',1);
            getid('likeis').innerHTML="<img src='/static/img/aok.png'>赞("+vm.zannum+")";
          }
          if(response.extra_data.marked==1){
             docis('markisf',1);
             getid('markisf').innerHTML="<img src='/static/img/astar.png'>收藏("+vm.scnum+")";
          }else{
           docis('markis',1);
           getid('markis').innerHTML="<img src='/static/img/astar.png'>收藏("+vm.scnum+")";
          }
          getid('artauthornum').innerHTML='为大家奉献了'+response.author_data.news_count+'篇文章';
          getid('artauthorurl').src=response.author_data.url;
          if(response.related_data.older_news.id!=0){
            getid('lasttitle').setAttribute("url",response.related_data.older_news.id);
            getid('lasttitle').innerHTML="上一篇："+response.related_data.older_news.title;
          }
          if(response.related_data.newer_news.id!=0){
            getid('nexttitle').setAttribute("url",response.related_data.newer_news.id);
            getid('nexttitle').innerHTML="下一篇："+response.related_data.newer_news.title;
          }
          
          vm.tagdata=response.keywords;
          if(vm.tagdata.length>0){
            vm.tagdata.forEach( function(element, index) {
              tagdata(index,element)
            });
          }else{
            tagdata('no')
          }
        }else{
          alert(response.msg)
        }
    });
    
    function hdpout(no){

      if(no=="no"){
        docis("bigimgis",2)
        vm.nowbignum=0;
        getid("nowbig").src=vm.hdpurl[0];
      }else{
        docis("bigimgis",1)
      }
      
    }

    function bigchange(lr){
      if(lr=='left'){
        if(vm.nowbignum>0){
          
          vm.nowbignum=vm.nowbignum-1;
          //alert(this.nowbignum)
          getid("nowbig").src=vm.hdpurl[vm.nowbignum];
        }
      }else{
        var l=vm.hdpurl.length-1;
        if(vm.nowbignum<l){
          vm.nowbignum=vm.nowbignum+1;
          //alert(this.nowbignum)
          getid("nowbig").src=vm.hdpurl[vm.nowbignum];
        }
      }
      window.event? window.event.cancelBubble = true : e.stopPropagation();
    }
    function tagdata(index,item){
      var li=document.createElement('li');
      getid('tagdata').appendChild(li);
      if(index==0){
        li.nu='a'
        li.onmouseover= function(){
            var h4=document.getElementById("tagh4");
            var tl=document.getElementById("tagleft");
            var tr=document.getElementById("tagright");
            h4.style.color = 'rgb(0,153,0)';
            tl.style.borderColor = 'rgb(0,153,0)';
            tr.style.borderColor = 'rgb(0,153,0)'; 
            tagdatanow(item);
          };
        li.onmouseout=tagout;
        li.innerHTML="<img src='/static/img/uno.png'><span style = 'margin-left:4px;' onclick='scripe(\""+item+"\")''>"+item+"</span>"
      }else if(index=='no'){
        li.innerHTML="当前无关键词"
      }else{
        li.onmouseover= function (){
          vm.tagchangedata=[];
          var h4=document.getElementById("tagh4");
          var tl=document.getElementById("tagleft");
          var tr=document.getElementById("tagright");
          h4.style.color = 'rgb(0,153,0)';
          tl.style.borderColor = 'rgb(0,153,0)';
          tr.style.borderColor = 'rgb(0,153,0)'; 
          tagdatanow(item);
        };
        li.onmouseout=tagout;
         li.innerHTML="<span style='color:#a1a1a1;'>/</span><img src='/static/img/uno.png'><span style = 'margin-left:4px;' onclick='scripe(\""+item+"\")''>"+item+"</span>"
      }
     
    }
    function narticle(id){
      var now=getid(id).attributes["url"].nodeValue;
      window.location.href=vm.atricleurl+'topid='+now;
    }
    function like(ab){
          var date={};
          if(ab=="ok"){
            date.do_cancel=1
          }else{
            date.do_cancel=0
          }
          date.news_id=vm.id;
        $.ajax({
            method:'post',
            data:date,
            url:vm.baseurl + '/article/news_like',
           headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            xhrFields: {withCredentials: true},
            crossDomain: true,
           }).then(function(response){
            if(response.status==1){
              if(ab=="ok"){
                vm.zannum=vm.zannum-1;
                docis('likeis',1);
                docis('likeisf',2);
                getid('likeis').innerHTML="<img src='/static/img/aok.png'>赞("+vm.zannum+")";
              }else{
                vm.zannum=vm.zannum+1;
                docis('likeis',2);
                docis('likeisf',1);
                getid('likeisf').innerHTML="<img src='/static/img/aok.png'>赞("+vm.zannum+")";
              }
              
            }else{
              if(vm.loginis){
               alert(response.msg)
              }else{
                alert("您还未登录哦！");
                login('1');
              }
              
            }
         });
      
    }
    function mark(ab){
      var date={};
      if(ab=="ok"){
        date.do_cancel=1
      }else{
        date.do_cancel=0
      }
      date.news_id=vm.id;
    $.ajax({
        method:'post',
        data:date,
        url:vm.baseurl + '/article/news_mark',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        xhrFields: {withCredentials: true},
        crossDomain: true
       }).then(function(response){
        if(response.status==1){
          if(ab=="ok"){
            vm.scnum=vm.scnum-1;
            docis('markis',1);
            docis('markisf',2);
            getid('markis').innerHTML="<img src='/static/img/astar.png'>收藏("+vm.scnum+")";
          }else{
            vm.scnum=vm.scnum+1;
            docis('markis',2);
            docis('markisf',1);
            getid('markisf').innerHTML="<img src='/static/img/astar.png'>收藏("+vm.scnum+")";
          }
          
        }else{
          if(vm.loginis){
             alert(response.msg)
          }else{
            alert("您还未登录哦！");
            login('1');
          }
        }
     });
    }
    function scripe(name){
      sessionStorage.setItem("subscripe", name);
      window.location.href=vm.insubscripeurl+name;
    }

   
    function tagout(name){
      var h4=document.getElementById("tagh4");
      var tl=document.getElementById("tagleft");
      var tr=document.getElementById("tagright");
      h4.style.color = '#a1a1a1';
      tl.style.borderColor = '#d7d7d7';
      tr.style.borderColor = '#d7d7d7' 
    }
    function compleng(e){
      var e=e || window.event;
      var value=(val("textarea1")+'').length;
      console.log(e.keyCode)
      if(e.keyCode!=13 && e.keyCode!=8){
        getid('conleng').innerHTML=(value+1)+"/300"
      }else if(e.keyCode==8 && value!=0){
        getid('conleng').innerHTML=(value-1)+"/300"
      }
      
      
    }
    function gotop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }


    vm.offset=0;
    comment('newda')
    function comment(ab){
      var date={};
      date.news_id=vm.id;
      if(ab=="newda"){
        vm.offset=0;
      }
      date.offset=vm.offset;
      date.limit=10;
      $.ajax({
          method:'post',
          data:date,
          url:vm.baseurl + '/article/news_comments',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        xhrFields: {withCredentials: true},
        crossDomain: true
      }).then(function(response){
          if(response.status==1){
            
              var arr = response.data;
              if(arr.length<10){
                docis('combtnis',2);

              }else{
                docis('combtnis',1)
                vm.offset=vm.offset+1;
              }
              if(ab=='newda'){
                if(arr.length>0){
                  docis('nocomis',2);
                }else{
                  docis('nocomis',1);
                }
              }
              arr.forEach( function(element, index) {
                var div=document.createElement("div");
                div.id="c"+element.comment_id;
                div.className="comt";
                div.innerHTML='<img src="'+element.user_url+'"> <span class="comname">'+element.user_name+'<span class="comtime">·'+element.comment_time+'</span></span><p class="comcontent">'+element.comment_content+'</p>';
                getid("commentindex").appendChild(div);
              });
              

          }else{
            alert(response.msg)
          }
      });
     }
     function removeAllChild(coid){  
          var div = coid;
          while(div.hasChildNodes()) //当div下还存在子节点时 循环继续  
          {  
              div.removeChild(div.firstChild);  
          }  
      }  
     function newcomment(){
      
      var date={};
      date.news_id=vm.id;
      date.content=val('textarea1');
      console.log(vm)
      if(vm.loginis){
          if(date.content!="" && date.content.length<=300){
            $.ajax({
              method:'post',
              data:date,
              url:vm.baseurl + '/article/news_new_comment',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            xhrFields: {withCredentials: true},
            crossDomain: true
          }).then(function(response){
              if(response.status==1){
                alertgo("发送成功！")
                  getid("textarea1").value="";
                  var coid= getid("commentindex")
                  removeAllChild(coid)
                  comment("newda");
              }else{
                alert(response.msg)
              }
          });
        }else{
            alert("请输入1-300个字！")
        }
      }else{
        alert("您还未登录哦！");
        login('1');
      }
      
      
    }
    function tagdatanow(name){
      var date={};
      date.limit=10;
      date.notice='';
      date.keyword=name;
      $.ajax({
          method:'post',
          data:date,
          url:vm.baseurl + '/article/news_list',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        xhrFields: {withCredentials: true},
        crossDomain: true
      }).then(function(response){
        if(response.status==1){
            if(response.data.length>0){
              var arr1=[];
              var arr2=[];
              response.data.forEach( function(element, index) {
                var obj={};
                obj.id=element.id;
                obj.title=element.title;
                if(index%2==0){
                  arr1.push(obj)
                }else{
                  arr2.push(obj)
                }
                
              });
              if(arr1.length>0){
                getid("tagleft").innerHTML="";
                arr1.forEach( function(element, index) {
                  var p=document.createElement("p");
                  p.innerHTML='('+(index*2+1)+')'+element.title;
                  p.onclick=function(){
                    window.open(vm.atricleurl+'topid='+element.id);
                  }
                  getid("tagleft").appendChild(p)
                });
              }
             if(arr2.length>0){
              getid("tagright").innerHTML="";
              arr2.forEach( function(element, index) {
                var p=document.createElement("p");
                p.innerHTML='('+(index+1)*2+')'+element.title;
                p.onclick=function(){
                    window.location.href=vm.atricleurl+'topid='+element.id;
                  }
                getid("tagright").appendChild(p)
              });
              }
              //          <p v-for="(item,index) in tagchangedata" v-if="(index%2)!=0"  onclick="narticle(item.id)"> 
              //   {{'('+(index+1)+')'+item.title}}
              // </p>
            }
        }

      })
    };
    function xlwb(){
      var url=window.location.href;
      var _width = "600px";  
      var _height = "800px"; 
      var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+vm.artitle+'--安全头条-安全加'+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+vm.nowbig;
      window.open(sharesinastring,'width='+_width+',height='+_height+',top='+(screen.height-_height)/2+',left='+(screen.width-_width)/2+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
    }

    function qqzone(){ 
        console.log(window.location.href)
         var _url = window.location.href;     
         var _showcount = 1;  
         var _desc = vm.summary;  
         var _summary = vm.summary;  
         var _title = vm.artitle;  
         var _site = vm.summary;  
         var _width = "600px";  
         var _height = "800px";  
         var _pic = vm.nowbig;  
         var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';  
         _shareUrl += 'url=' + encodeURIComponent(_url||document.location);   //参数url设置分享的内容链接|默认当前页location  
         _shareUrl += '&showcount=' + _showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示  
         _shareUrl += '&desc=' + encodeURIComponent(_desc||'分享的描述');    //参数desc设置分享的描述，可选参数  
         //_shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数  
         _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享标题，可选参数  
         //_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数  
         _shareUrl += '&pics=' + encodeURIComponent(_pic||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数  
         _shareUrl += '&summary=' + encodeURIComponent(_summary||''); 
        window.open(_shareUrl);   
    }
    function wxciew(){
      docis('wxfxis',1)
    }
    function wxclose(){
      docis('wxfxis',2)
    }
    setTimeout(function(){
      var article=document.getElementById("articleindex")
      var imgsl=article.getElementsByTagName('img');
     
      //console.log(imgsl);
      var l=imgsl.length;
      var imgsrcarr=[];
      for(var i=0;i<l;i++){
        // alert(document.body.clientWidth)
        // alert(imgsl[i].width)
        //console.log(imgsl[i].src)
        imgsrcarr.push(imgsl[i].src) 
        if( imgsl[i].width > 900){
          var height = (imgsl[i].height/imgsl[i].width).toFixed(2)*900+"px";
          //console.log(height)
          imgsl[i].style.width = '900px';
          imgsl[i].style.height = height;
        }
        
      }
      vm.hdpurl=imgsrcarr;
      vm.nowbig=imgsrcarr[0];
      getid("nowbig").src=vm.hdpurl[0];

      vm.nowbignum=0;
      $("#articleindex img").click(function(){
        var src=$(this).get(0).src;
        vm.hdpurl.forEach( function(element, index) {
           if(element==src){
              vm.nowbignum=index;
              getid("nowbig").src=vm.hdpurl[index];
           }
        }); 
        hdpout();

      });

      var article=document.getElementById("articleindex")
      var pdfarr=article.getElementsByTagName('a');
      var l1=pdfarr.length;
      for(var i=0;i<l1;i++){
        if(pdfarr[i].href.indexOf(".pdf")>-1){
          pdfarr[i].style.display = 'none';
          var div=document.createElement("div");
          div.style ='position:relative;cursor:pointer';
          // div.onclick=function(){
          //   window.location.href=
          // }
          div.innerHTML="<a href="+pdfarr[i].href+" target='_blank'><img class='dimg' src='/static/img/flie.png'><p><span class='dcon'>文章附件"+i+"</span><span class='dlarge'>1M</span><span class='dnum'>下载（1）</span></p></a>"
          if(getid("downcontent").innerHTML=="文章无附件"){
            getid("downcontent").innerHTML="";
          }
          getid("downcontent").append(div);

        }
        
      }
      // <div  style="position:relative">
      //       
      //     </div>
      
    }, 100)
    //弹出框
    function alertgo(msg){
      var div=document.createElement("div");
      div.className="alert";
      div.innerHTML=msg;
     $(div).animate({top:'80px'})
     $('body').get(0).appendChild(div);
     setTimeout(function(){
      $('body').get(0).removeChild(div)
     },2000)
    }


    //统计
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?846d3187b2ffcba57419a9c3f904e9b4";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();

    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3c677a8c1731b5e0ec4b90680ff088e3";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();

    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?9160fbef5be9220763890e6d313df9ef";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();