var vm={};
vm.yuming='top.sunliangliang.com'
vm.atricleurl='http://top.sunliangliang.com/article/page?'
vm.baseurl='http://211.159.148.43:8888';
vm.mobileurl='http://m.sunliangliang.com/#/article?';
vm.insubscripeurl="http://top.sunliangliang.com/article/keyword?kw=";


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
                if(vm.userlevel==1){
                  docis("userlevel",1)
                }
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
          getid('articleindex').innerHTML='<div class="content" id="news_content"> <p> 最新消息，上周六敲诈旧金山市政运输部门（SFMTA）的黑客也着了道，本周二他也被别人黑了。黑客的勒索信上富有一个email地址，一位安全专家成功猜到了黑客的密保问题并黑进了该邮箱。 </p> <h2> 黑人者被黑 </h2> <p> 在黑客的邮箱中，安全专家发现了不少小秘密，原来这位黑掉旧金山公交售票系统的黑客已经不是初犯了，此前他就从美国一家制造公司拿到了4.5万美元的赎金。此外，其比特币钱包里存了14万美元，此前还曾多次勒索美国的制造和建筑公司。 </p> <p> 由于黑客可能拥有多个邮箱，因此通过勒索软件他肯定是发了一笔横财，技术专家发现这位黑客可能来自伊朗。 </p> <p> </p> <h2> 旧金山市政运输部门被黑事件 </h2> <p> 坐着地铁唱着歌，系统就被黑了。周六晚上，旧金山市政运输部门（SFMTA）遭受恶意软件攻击，2112个系统受到感染。攻击者要价100比特币，合73,184美元。 </p> <p> 车站内的支付设备以及列车时刻表显示屏开始显示“你已被黑”，警告说所有数据已加密。此时，旧金山市铁路系统（MUNI）的乘客均免费搭乘列车。 </p> <p> 当地媒体和SFMTA的工作人员称，此攻击事件正好赶在了感恩节前夕。哥伦比亚广播公司在旧金山的分支机构CBS 5在周六首先报道了该新闻，称此次攻击在几天前就已发生。 </p> <p> 当地媒体和乘客称，整个城市的火车站显示屏上都显示同一消息，支付终端也显示为停止服务。 </p> <p> <img class="alignnone" height="585" src="http://7xkk1o.com1.z0.glb.clouddn.com/unnamed-2-6.jpg" width="1040"> </p> <p> 某些终端的屏幕上显示一则消息，告诉乘客可免费搭乘MUNI的列车。 </p> <p> <img class="alignnone" height="585" src="http://7xkk1o.com1.z0.glb.clouddn.com/unnamed-3-3.jpg" width="1040"> </p> <p> 终端上的图像开始在社交媒体和Reddit网站上传播。火车站的乘客告诉媒体，他们并不知道有坏事发生，认为免费搭乘列车是车站的节日促销活动。 </p> <h2> 攻击者要价100比特币 合73,184美元 </h2> <p> “你已被黑。所有数据均已加密。”恶意软件发出了此消息。该警告还附有邮件地址和账号，用于收取赎金。此类攻击索要数额不等的赎金，但SFMTA的知情人士称此次的赎金为100比特币，按当前汇率计算，为73,184美元。 </p> <p> 此次旧金山攻击中出现的邮件地址（cryptom27@yandex.com）在之前的类似攻击中也曾出现，这要追溯到2016年9月。在此类攻击中，攻击者会发送同样的消息，然后为受害者分配一个用于获取解密密钥的个人账号。 </p> <p> 有人声称对SFMTA黑客攻击一事负责。此人使用Yandex邮件地址，通过与他/她的邮件沟通，发现有2112个系统受到感染。 </p> <p> 有些早期的感染（LIGHT-DUTY1及LIGHT-DUTY2）表明，恶意软件通过员工日常使用的系统进入网络，然后扩散到办公人员的其他系统。第二份清单有8656个SFMTA系统，其中包括MUNI的域控制器，这解释了感染为什么会扩散，不过该份清单并未经过核实。这份清单是SFMTA系统的总览表，上面列举的计算机系统只有一小部分被感染。出现这种差异的原因不明。 </p> <p> 11月26日，SFMTA攻击负责人收到邮件询问关于601的情况（601是显示在受感染SFMTA系统中的数字）。 </p> <p> 他们据此以为可以直接同SFMTA对话，便通过Yandex账户立即回复，要求对方支付100个比特币以获取解密密钥。邮件中还为如何获取比特币提供了建议。如下为从Yandex账户发出的第一封邮件中摘取的部分内容，未作任何改动： </p> <blockquote> <p> 若你是MUNI-RAILWAY的负责人， </p> <p> MUNI-RAILWAY域中的所有计算机/服务器已进行AES 2048-Bit加密！ </p> <p> 我们有2000个解密密钥！ </p> <p> 将100个比特币发送到我的比特币钱包，然后我们会将你的所有服务器硬盘的解密密钥发送给你！！ </p> <p> 为了方便，我们只接受比特币！ </p> <p> 你可以通过经纪人将货币尽快转换为比特币。 </p> <p> 这是最快捷的方法！ </p> </blockquote> <p> 根据要求，邮件回复人提供了他们的比特币钱包地址，提出用一个比特币交换一个解密密钥，以解锁非重要系统，证明他们有能力恢复文件。 </p> <p> SFMTA可将比特币支付给如下钱包：（不要试图从中找到蛛丝马迹，比特币都是加密处理的） </p> <blockquote> <p> 1efs45wsKYTbFf1dmfAsGnPnqmJxgpmYp </p> </blockquote> <p> <img class="alignnone" src="http://7xkk1o.com1.z0.glb.clouddn.com/bitcon%20address.png" style="width: 500px; height: 354px;"> </p> <h2> 攻击美国旧金山地铁的是HDDCryptor变种 </h2> <p> 据称，此恶意软件是HDDCryptor的一个变种，利用商用工具加密硬盘和网络共享。趋势科技公司在今年的9月16日的一篇报告中介绍了此恶意软件。Morphus实验室在9月7日发现了一个恶意软件样本，将其命名为Mamba。 </p> <p> <img class="alignnone" height="1000" src="http://7xkk1o.com1.z0.glb.clouddn.com/HDDCryptor1.jpg" width="1382"> </p> <p> <strong> <em> Infection Vector and Installation </em> </strong> </p> <p> HDDCryptor can infect systems as an executable unsuspectingly downloaded from malicious websites, or as a file dropped by other malware. The ransomware is installed by dropping several components—both legitimate and malicious—to the system’s root folder: </p> <ul> <li> dcapi.dll (detected as Ransom_HDDCRYPTOR.A) </li> <li> dccon.exe (used to encrypt the disk drive) </li> <li> dcrypt.exe </li> <li> dcrypt.sys </li> <li> log_file.txt (log of the malware’s activities) </li> <li> Mount.exe (scans mapped drives and encrypts files stored on them) </li> <li> netpass.exe (used to scan for previously accessed network folders) </li> <li> netuse.txt (used to store information about mapped network drives) </li> <li> netpass.txt (used to store user passwords) </li> </ul> <p> For persistence, it adds a service named <em> DefragmentService </em> and executes it via command line. </p> <p> 更多深入分析， <a href="http://blog.trendmicro.com/trendlabs-security-intelligence/bksod-by-ransomware-hddcryptor-uses-commercial-tools-to-encrypt-network-shares-and-lock-hdds/" target="_blank"> 请参看这里 </a> </p> <p> 周末，向该地址发送邮件的人员被告知，此次攻击是自动执行的，且SFMTA的网络“非常开放”。操纵该邮件地址的人员同时表示，2000多个系统受到影响。截至周日晚间，SFMTA尚未确认此次攻击的详细信息，如感染的系统数量、索要的赎金总额以及恶意软件是如何进入网络的。 </p> <h2> 旧金山市政运输部门（SFMTA）表示运输服务未受影响 </h2> <p> Salted Hash已联系了SMFTA发表对此事的看法。 </p> <p> 在发送给CBS 5的一份声明中，Muni发言人Paul Rose表示，此次攻击中，运输服务并未受到影响，但我们打开了检票闸机作为预防措施，从而将对“客户的影响降至最低”。 </p> <p> Rose称，“鉴于攻击正处于调查阶段，不宜提供其他详情。”&nbsp;声称对此次攻击负责的人员再次爆料了受影响的系统数量以及赎金数额，这些数字还未完全证实，将随着调查的深入而有所变动。 </p> <p> 目前尚不清楚，SFMTA是否愿意支付赎金，而系统恢复需数日，甚至数周，免费乘车也是其在此次攻击中遭受的财务损失。一旦碰到勒索软件，一般备份文件会用作关键恢复资源进行系统恢复。然而，SFMTA遭遇的此次攻击直接指向了硬盘，因此可能需要对硬盘进行更换。 </p> <h2> 攻击者受不了媒体等各界询问 想要关闭勒索邮箱 </h2> <p> 同攻击者的后续沟通表明，攻击者没料到自己的行为会突然获得那么多的关注，因而有点儿不知所措。“我们收到大量SFMTA的邮件。你们好吗？任什么职位？（原文如此）”其中一封邮件如是说。 </p> <p> 目前尚不清楚有多少人向这个Yandex地址发过邮件，他们的陈述并不能证明SFMTA与攻击者有联系。 </p> <p> 不过，因为大量邮件发往这个地址，回复人表示，账户“因安全原因（原文如此）”将于11月27日关闭。使用Yandex账号回复邮件的人直到周日晚上仍保持沉默，最终没有主动联系最初邮件往来的当事人是否想进行“任何交易”。 </p> <p> 邮件中这么说：“许多PPL与新闻机构通过邮件询问各种问题，太烦人了。我想关闭这个邮箱！你们必须给个回复，清楚地说明自己的选择。（原文如此）” </p> <h2> 攻击者的动机是什么？ </h2> <p> 就这一事件，大西洋理事会的网络治国行动（Cyber Statecraft Initiative）副主任Beau Woods有自己的看法： </p> <blockquote> <p> “攻击者知道自己的攻击目标是SF MUNI吗？抑或只是随机攻击而已？好莱坞长老会遭遇的就是随机事件。我怀疑这次事件同样如此。”Woods说，同时坦陈这一判断有可能错误。 </p> </blockquote> <p> 他补充道：“两方面因素结合起来看：攻击目标唾手可得，攻击者意图破坏而非获利，这带来的问题就很严重了。【旧金山】能付得起这类攻击索要的100比特币，但是如果是100条人命呢？”在这番话中，他强调了这类针对交通与基础设施的攻击的严重性。 </p> <p> 事件还在持续，有关信息将会持续更新。 </p> <p> Salted Hash在此感谢安全研究员Mike Grover就本文提供的帮助。 </p> </div>';
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
                    window.location.href=vm.atricleurl+'topid='+element.id;
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

      })
      
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