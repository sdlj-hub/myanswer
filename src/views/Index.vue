<template>
  <div class="init">
    <el-container>
      <el-header><h1>简易小题库</h1></el-header>
      <el-main>
          <div class="main_left">
              <div class="mp1">
                  <span>We're Building Question bank</span>
                  <div class="word">
                      To Manage answer,Make progress every day and grow step by step every day!
                  </div>
                  <div class="word"><router-link to="/add">添加题库</router-link></div>
              </div>
              <div class="mp2">
                  <router-link to="/radio">
                    <button >单选题</button>
                  </router-link>

                  <router-link to="/checkbox">
                    <button >多选题</button>
                  </router-link>
                  <div>
                      <router-link to="/judge">
                    <button >判断题</button>
                  </router-link>

                  <router-link to="/tiankong">
                    <button >填空题</button>
                  </router-link>
                  </div>
              </div>
          </div>
          <div class="main_right">
              <img src="../assets/img/icon.png"/>
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
    width: 100%;
    height: 100%;
}
button{
    margin: 20px;
    background: white;
    color: #9198e5;
    width: 150px;
    height: 50px;
    border:white 1px solid;
    border-radius: 10px;
    transition: all 0.5s ease-out 0s;
    

}
button:hover{
    color: white;
    animation: mybuttonframes  0.5s;
    background: transparent;
}
.a{
    margin-top: 20px;
}
.el-container{
    width: 100%;
    height: 100%;
}
.el-main{
    background-image: linear-gradient(#0080FF, #9198e5);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.main_left{
    width: 500px;
    height: 500px;
    display:flex;
    align-items: center;
    flex-direction: column;

}
.main_right{
    width: 600px;
    height: 500px;
}

.mp1{
    margin-top: 20px;
    width: 100%;
    height: 100%;

}


.mp1>span{
    margin-top: 50px;
    font-size: 30px;
    color: white;
    font-weight: 800;
}
.word{
    margin-top: 50px;
    font-size: 20px;
    color: white;
    font-weight: 600;
}

.mp2{
    margin-top: 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

}
img{
    width: 100%;
    height: 100%;
}


@keyframes mybuttonframes{
 0% {background-color: white;}
 100%{background: transparent;}
}
</style>