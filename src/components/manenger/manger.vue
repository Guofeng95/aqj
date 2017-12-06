<template>
  <div class="usercenter">
  	<div class="table" v-show="status==1">
      <div class="tabletop">
        <span>{{"共"+number+"项"}}</span>
        <el-button class="btn" type="success" @click="submitgo">发布</el-button>
        <el-button class="btn" @click="remove" type="danger">批量删除</el-button>
        <el-select class="selct"  v-model="search" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="btn" type="success">筛选</el-button>
      </div>
      <div>
        <el-table
          border
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          >
           <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            show-overflow-tooltip>
            <template  slot-scope="scope">
                  <span class="doit">{{scope.row.title}}</span>
              </template>
          </el-table-column>
          <el-table-column
            label="数据"
            prop="message"
            width="120">
              <template  slot-scope="scope">
                  <span class="doit">{{scope.row.message}}</span>
              </template>
          </el-table-column>
          <el-table-column
            label="日期"
            sortable
            prop="date"
            width="120">
          </el-table-column>
          <el-table-column
            prop="class"
            label="分类"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
              <template  slot-scope="scope">
                  <span class="doit" @click="remove">删除</span>
                  <span class="doit" @click="submitgo">编辑</span>
                  <span class="doit">数据</span>
              </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="nowpage"
          :page-sizes="[10, 25, 50, 100]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="number">
        </el-pagination>
      </div>
    </div>
    <div class="table" v-show="status==2">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status:1,
      nowpage:1,
      number:100,
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
      search:"",
      tableData3: [{
          date: '2016-05-03',
          class: '王小虎',
          title: '上海市普陀区金沙江路 1 弄',
          message:"100",
        }, {
          date: '2016-05-02',
          class: '王小虎',
          message:"100",
          title: '上海市普陀区金沙江路 2 弄'
        }, {
          date: '2016-05-04',
          class: '王小虎',
          message:"100",
          title: '上海市普陀区金沙江路 3弄'
        }, {
          date: '2016-05-01',
          class: '王小虎',
          message:"100",
          title: '上海市普陀区金沙江路 4 弄'
        }, {
          date: '2016-05-08',
          class: '王小虎',
          message:"100",
          title: '上海市普陀区金沙江路 5 弄'
        }, {
          date: '2016-05-06',
          class: '王小虎',
          message:"100",
          title: '上海市普陀区金沙江路 6 弄'
        }, {
          date: '2016-05-07',
          class: '王小虎',
          message:"100",
          title: '上海市普陀区金沙江路 7 弄'
        }],
    }
  },
  mounted(){
  	
  },
  methods:{
  		handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      remove(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    submitgo(){
      window.location.href="#/submit"
    }

  }
}
</script>
<style scoped>
	.usercenter{
		width: 100%;
	}
	h2{
		font-size:30px;
		margin-top: 40px;
		margin-bottom: 40px;
	}
	
  .table{
    width: 1100px;
    overflow: hidden;
    margin-left: 200px;
  }
  .table .btn{
    height: 36px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 36px;
    margin-left: 20px;
  }
  .tabletop{
    height: 50px;
  }
  .tabletop span{
    margin-right: 10px;
  }
  .selct{
    margin-left: 20px;
  }
  .doit{
    cursor: pointer;
    color: #108EE9;
  }
  .block{
    margin-top: 20px;
  }
</style>