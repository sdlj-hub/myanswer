<template>
  <div class="init">
    <el-container>
      <el-header><h1>简易小题库</h1></el-header>
      <el-main>
          <div class="b1"><router-link to="/test1"><el-button type="primary">单选题</el-button></router-link><br/></div>
        <div class="b1"> <router-link to="/test2"><el-button type="primary">多选题</el-button></router-link><br/></div>
         <div class="b1"> <router-link to="/test3"><el-button type="primary">判断题</el-button></router-link><br/></div>
          <div class="b1"><router-link to="/test4"><el-button type="primary">填空题</el-button></router-link><br/></div>
      
        <div class="a">
            当前时间：{{getCurrentTime}}
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>


export default {
    
    data(){
        return{
            time:Date.now()
        }
    },
    methods:{
        
    },
    computed:{
        getCurrentTime:function(){
            return dateFormat("YYYY/mm/dd HH:MM:SS",new Date(this.time));
        },
  
    },
    created(){
        var that =this;
        setInterval(function(){
            that.time=new Date().getTime();
        },1000)
    }
    

};
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

</script>
<style scoped>
.init{
    margin: 0 auto;
    width: 600px;
    height: 600px;
}
.b1{
    margin-top: 20px;
    width: 100%;
}
.a{
    margin-top: 20px;
}

</style>