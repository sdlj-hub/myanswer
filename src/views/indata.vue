<template>
    <div class="init">
    <el-container>
      <el-header><h1>简易小题库</h1></el-header>
      <el-main>
          <el-card>
              题库Excel格式要求详见文档
              <h3>请选择题库的类型</h3>
              <el-radio v-model="radio" label="1">单项选择</el-radio>
              <el-radio v-model="radio" label="2">多选选择</el-radio>
              <el-radio v-model="radio" label="3">判断</el-radio>
              <el-radio v-model="radio" label="4">填空</el-radio>
              <h3>请上传规定格式的Excel表格</h3>
              <vue-xlsx-table @on-select-file="handExcelJSOn">上传数据</vue-xlsx-table>
              <h3>设置单次抽题次数</h3>
              <el-input v-model="input" placeholder="请输入内容"></el-input>

                <div class="bottomdiv">
                  <el-button type="primary" @click="sureadd">确定添加</el-button>
                  <el-button @click="back">返回主页</el-button>
                </div>
          </el-card>
             
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
    data () {
      return {

        radio: '1',
        input: 15,
        mynewdata:[],
      };
    },
    methods:{
         handExcelJSOn(data) {
             this.mynewdata=data.body 
             alert("上传成功") 
         },
         back:function(){
            this.$router.push("/index")
         },
         sureadd(){
             if(this.mynewdata!=""){
                 if(this.radio=="1"){
                     this.$store.dispatch('addsingcount',this.input);
                     this.$store.dispatch('addtitle',this.mynewdata);
                     alert("添加成功")
                      this.$router.push("/index")
                 }else if(this.radio=="2"){
                     this.$store.dispatch('addcheckcount',this.input);
                     this.$store.dispatch('addcheckbox',this.mynewdata);
                     alert("添加成功")
                      this.$router.push("/index")
                 }else if(this.radio=="3"){
                     this.$store.dispatch('addjudgecount',this.input);
                     this.$store.dispatch('addjudge',this.mynewdata);
                     alert("添加成功")
                      this.$router.push("/index")
                 }else if(this.radio=="4"){
                     this.$store.dispatch('addpackcount',this.input);
                     this.$store.dispatch('addpack',this.mynewdata);
                     alert("添加成功")
                      this.$router.push("/index")
                 }

             }
         },
         

    }
}
</script>
<style scoped>
.init{
    width: 100%;
    height: 100%;
}
.bottomdiv{
  margin-top: 20px;
}
</style>