<template>
  <div class="level">
  	<div >
      <img src="/static/img/error.png">
      <p>
        系统异常 请稍后再试
      </p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name:'error',
  data () {
    return {
      email:'',
      password:'',
      newpwd:'',
      status:true,
      baseurl:Url.baseurl,
      error:''
    }
  },
  methods:{
      
    
  }
}
</script>
<style scoped>
  .level{
    margin-top: 80px;
  }
  .level div{
    width: 300px;
    height: 60px;
    margin: 0 auto;
    text-align: center;
  }
  .level p{
    margin-top: 20px;
    color: orange;
  }
</style>