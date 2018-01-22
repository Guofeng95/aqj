<template>
  <div class="levelcenter">
    <div class="aside">
      <h4>热门推荐</h4>
      <div style="cursor:pointer" v-for="(item,index) in hotdata" :key='index' @click="article(item.id)">
        <span style="background:#3a9e00;" v-if="index==0">{{index+1}}</span>
        <span style="background:#ff9933;" v-else-if="index==1">{{index+1}}</span>
        <span style="background:#ff0000;" v-else-if="index==2">{{index+1}}</span>
        <span v-else>{{index}}</span>
        <p>{{item.content}}</p>
      </div>
    </div>
    <h2>设置</h2>
    <div class="munu">
      <div>
        <img style="margin-top:4px;margin-right:5px"  src=" /static/img/shezhi.png">
        <a @click="light('shezhi')" id="shezhi" style="color:#008000;">设置</a>
      </div>
      <div>
        <img style="margin-top:4px;margin-right:6px" src=" /static/img/ok.png">
        <a @click="light('ok')" id="ok">安全设置</a>
      </div>
      <div>
        <img style="margin-top:6px;margin-right:2px" src=" /static/img/out.png">
        <a href="#" @click="removelogin">退出登录</a>
      </div> 
    </div>
  
    <div class="level" v-show="table==1">
    	<div class="ltop">完善身份认证有助于我们为您提供更好的服务</div>
      <div class="demo-input-suffix">
        <span>昵称</span>
        <el-input class="input" v-model="nickname" placeholder="请输入文字"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>性别</span>
        <el-radio-group v-model="female">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'2'">女</el-radio>
          <el-radio :label="'3'">保密</el-radio>
        </el-radio-group>
      </div>
      <span class="border"></span>
      <div class="demo-input-suffix">
        <span>QQ:</span>
        <el-input class="input" v-model="qq" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>微博</span>
        <el-input class="input" v-model="wb"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>微信号</span>
        <el-input class="input" v-model="wx" ></el-input>
      </div> 
      <div class="demo-input-suffix">
        <span>邮箱</span>
        <el-input class="input" v-model="email" @change="checke"></el-input>
        <a class="tj" v-show="remailis">请填写正确的邮箱格式</a>
      </div> 
      <span class="border"></span>
      <div class="demo-input-suffix">
        <span>所在行业</span>
        <el-input class="input" v-model="area" ></el-input>
      </el-select>
      </div>
      <div class="demo-input-suffix">
        <span>公司</span>
        <el-input class="input" v-model="company" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>部门</span>
        <el-input class="input" v-model="door" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>职务</span>
        <el-input class="input" v-model="job" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>擅长职能</span>
        <el-input class="input" v-model="skill" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>地址</span>
        <el-input class="input" v-model="adress" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>手机</span>
        <el-input class="input" v-model="phone" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>姓名</span>
        <el-input class="input" v-model="name" ></el-input>
      </div>

      <el-button class="submit" type="success" @click="infonow">更新信息</el-button>
    </div>

    <div class="level" v-show="table==2">
      <div class="demo-input-suffix">
        <span>旧密码</span>
        <el-input class="input" v-model="oldpwd" @change="check('oldpwd')"></el-input>
        <p v-show="oldpwdis">密码错误</p>
      </div>
      <div class="demo-input-suffix">
        <span>新密码</span>
        <el-input class="input" v-model="newpwd" @change="check('newpwd')"></el-input>
        <p v-show="newpwdis">密码应为数字、字母、英文标点符号，长度为6-14位</p>
      </div>
      <div class="demo-input-suffix">
        <span>再输一次</span>
        <el-input class="input" v-model="nextpwd" @change="check('nextpwd')"></el-input>
        <p v-show="nextpwdis">两次密码不统一</p>
      </div>
      <el-button class="submit" type="success" @click="resetpwd">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
import {mapGetters} from "vuex"
export default {
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
      remailis:false,
      baseurl:Url.baseurl,
      table:1,
    	nickname:'',
      female:'2',
      qq:'',
      wx:'',
      wb:'',
      email:'',
      area:'',
      company:'',
      job:'',
      skill:'',
      name:'',
      phone:'',
      adress:'',
      door:'',
      oldpwd:'',
      newpwd:'',
      nextpwd:'',
      oldpwdis:false,
      newpwdis:false,
      nextpwdis:false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      hotdata:[]
      
    }
  },
   mounted(){
    this.hotda();
    this.getinfo();
  },
  methods:{
    checke(){
      var isok=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.email);
        if(isok){
          this.remailis=false;
        }else{
          this.remailis=true;
        }
    },
    getinfo(){
      var date=this;
        axios({
              method:'post',
              url:date.baseurl + '/user/pull_user_info',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                var vm=response.data.data;
                date.nickname=vm.nickname;
                date.female=vm.sex;
                date.qq=vm.qq;
                date.wx=vm.weixin;
                date.wb=vm.weibo;
                date.email=vm.email
                date.area=vm.industry;
                date.job=vm.position;
                date.door=vm.department;
                date.company=vm.company;
                date.skill=vm.special_skills;
                date.adress=vm.address;
                date.phone=vm.phone_number;
                date.name=vm.real_name;
              }
          })
    },
    infonow(){
      var vm=this;
      if(this.remailis==false){
          var date={};
          date.nickname=vm.nickname;
          date.sex=vm.female;
          date.qq=vm.qq;
          date.weixin=vm.wx;
          date.weibo=vm.wb;
          date.email=vm.email
          date.industry=vm.area;
          date.position=vm.job;
          date.department=vm.door;
          date.company=vm.company;
          date.special_skills=vm.skill;
          date.address=vm.adress;
          date.phone_number=vm.phone;
          date.real_name=vm.name;
          axios({
                method:'post',
                data:qs.stringify(date),
                url:vm.baseurl + '/user/push_user_info',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response){
                if(response.data.status==1){
                  vm.$message.success("更新成功");
                }else{
                  vm.$message.warning(response.data.msg);
                }
            })
        }else{
          vm.$message.warning("请核实信息是否正确！");
        }
      
    },
    article(id){
        window.location.href='/static/article/article.html?topid='+id;
      },
     hotda(){
        var vm=this;
        vm.hotdata=[];
        var date={};
        date.limit=6;
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
    light(id){
      var id5 = document.getElementById('ok');
      id5.style.color="#333";
      var id4 = document.getElementById('shezhi');
      id4.style.color="#333";
      var id6 = document.getElementById(id);
      id6.style.color="#008000";
      if(id=="ok"){
        this.table=2;
      }else{
        this.table=1;
      }

    },
    removelogin(){
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
              vm.$store.state.loginis=false;
              window.location.href="/"
            }else{
              vm.$message.warning(response.data.msg);
            }
        });
    },
    check(style){
      if(style=="newpwd"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(this.newpwd);
        if(isok){
          this.newpwdis=false;
        }else{
          this.newpwdis=true;
        }
      }
      if(style=="nextpwd"){
        if(this.newpwd==this.nextpwd){
          this.nextpwdis=false;
        }else{
          this.nextpwdis=true;
        }
      }
      if(style=="oldpwd"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(this.oldpwd);
        if(isok){
          this.oldpwdis=false;
        }else{
          this.oldpwdis=true;
        }
      }
    },
    resetpwd(){
      var vm=this;
      if(this.newpwd!="" && this.oldpwd!='' && this.nextpwd!=''){
          var date={};
            date.new_password=this.newpwd;
            date.old_password=this.oldpwd;
            axios({
                method:'post',
                data:qs.stringify(date),
                url:vm.baseurl + '/user/modify_password',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response){
                if(response.data.status==1){
                  vm.$message.success("修改成功");
                  vm.removelogin();
                }else{
                  vm.$message.success(response.data.msg)
                }
            });
      }else{
          vm.$message.error("请填写信息");
      }
    }

  }
}
</script>
<style scoped>
  .tj{
    color: red;
    font-size: 14px;
    margin-left: 30px;
  }
  .levelcenter{
    width: 100%;
    position: relative;
    padding-bottom: 10px;
  }
  .aside{
   float: right;
    width: 270px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 4px;
    padding:20px;
    padding-top: 26px;
    margin-top: 80px;
  }
  .aside h4{
    margin-bottom: 30px;
  }
  .aside span{
    width: 20px;
    display: block;
    float: left;
    text-align: center;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    background: #aeaeae;
    border-radius: 100%;
    color: white;
    margin-top: 5px;
    margin-right: 10px;
  }
  .aside div{
    width: 290px;
    height: 30px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }
  .aside div p{
    width: 210px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  h2{
    font-size:30px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .munu{
    float: left;
    width: 160px;
    height: 130px;
    border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
    margin-bottom: 10px;
    margin-left: 3px;
    margin-right: 30px;
  }
  .munu div{
    width: 140px;
    margin:0 auto;
    height: 32px;
    line-height: 32px;
    margin-top: 4px;
  }
  .munu div img{
    display: block;
    float: left;
  }
  .munu div a{
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }
  .level{
    width: 720px;
    overflow: hidden;
    padding-bottom: 30px;
     border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
    padding:20px 10px ;
    padding-top: 10px;
  }
  .ltop{
    width: 700px;
    height: 56px;
    background: #fffbf6;
    border:1px solid #fff7ff;
    border-radius: 6px;
    color: #868686;
    padding-left: 20px;
    line-height: 56px;
    font-size: 14px;

  }
  .demo-input-suffix{
    height: 40px;
    line-height: 40px;
    margin-left: 40px;
    margin-top: 26px;
    padding-bottom: 12px;
  }
  .demo-input-suffix span{
    width: 140px;
    display: block;
    float: left;
  }
  .demo-input-suffix p{
    color: red;
    padding-left: 140px;
    font-size: 14px;
  }
  .input{
    width: 260px;
  }
  .verify{
    width: 190px;
  }
  .btn{
    width: 60px;
    text-align: center;
    padding-left:0;
    padding-right:0;
  }
  .submit{
    width: 104px;
    margin-left: 140px;
    margin-top:20px; 
  }
  .border{
    border-bottom: 1px dashed #f2f2f2;
    width: 790px;
    display: block;
    margin-top: 10px;
  }
</style>