<template>
  <div class="usercenter">
    <div class="aside">
      <h4>热门推荐</h4>
      <div v-for="(item,index) in hotdata" :key='index'>
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
        <a href="#">退出登录</a>
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
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">保密</el-radio>
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
        <el-input class="input" v-model="email" ></el-input>
      </div> 
      <span class="border"></span>
      <div class="demo-input-suffix">
        <span>所在行业</span>
        <el-select class="input" v-model="area" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
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

      <el-button class="submit" type="success">提交</el-button>
    </div>

    <div class="level" v-show="table==2">
      <div class="demo-input-suffix">
        <span>旧密码</span>
        <el-input class="input" v-model="oldpwd"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>新密码</span>
        <el-input class="input" v-model="newpwd" ></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>再输一次</span>
        <el-input class="input" v-model="nextpwd"></el-input>
      </div>
      <el-button class="submit" type="success">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      table:1,
    	nickname:'',
      female:1,
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
      hotdata:[
            {
              "content":"转移战场”的暗网市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣"
            },

      ]
      
    }
  },
  methods:{
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

    }

  }
}
</script>
<style scoped>
  .usercenter{
    width: 100%;
    position: relative;
  }
  .aside{
   float: right;
    width: 270px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 4px;
    padding:20px;
    padding-top: 26px;
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
    width: 790px;
    overflow: hidden;
    padding-bottom: 30px;
  }
  .ltop{
    width: 768px;
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
    margin-top: 26px;
    padding-bottom: 2px;
  }
  .demo-input-suffix span{
    width: 140px;
    display: block;
    float: left;
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