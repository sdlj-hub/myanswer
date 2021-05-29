<template>
  <div class="bigdiv">
    <h3>测试</h3><span>{{getCurrentTime}}</span>
    <el-card>
      <el-container>
        <el-header>
          <div>多选题</div>
          <div class="title">
            <span>{{ this.currenQuestion + 1 }}、{{ an.title }}</span>
          </div>
        </el-header>
        <el-main class="main">
          <div class="op">
            <el-checkbox-group v-model="checkList">
               <div v-for="(item,index) in an.option" :key="index">
                    <el-checkbox  :label="index" >{{item}}</el-checkbox>
               </div>
            </el-checkbox-group>
          </div>
        </el-main>
        <el-footer>
          <div class="footerDiv">
            <div class="t">{{ this.currenQuestion + 1 }}/{{ this.totle }}</div>
            <div class="ic">
              <i class="el-icon-check">: {{ this.radiograde }}</i>
            </div>
            <div class="next">
              <el-button type="primary" @click="truebutton">下一题</el-button>
            </div>
             <div class="commit">
              <el-button type="success" @click="commitBut">提交</el-button>
            </div>
            <div class="answer">
              <el-button round @click="getCurrentAnswer">查看答案</el-button>
            </div>
            <div class="answer">
              <router-link to="/index"><el-button round >返回主页</el-button></router-link>
            </div>
          </div>
        </el-footer>
      </el-container>
    </el-card>

    <!-- 结果展示 -->

    <el-dialog title="成绩结果" :visible.sync="dialogVisible" width="80%" @closed="closeback">
      <span>本次多选成绩为：{{ this.radiograde * 2 }}分</span>
      <span slot="footer" class="dialog-footer">
        <router-link to="/index"><el-button round >返回主页</el-button></router-link>
        <el-button @click="AllRegame">重新挑战</el-button>
        <el-button type="primary" @click="checkFalsetitel">查看错题</el-button>
      </span>
    </el-dialog>

    <!-- 查看答案 -->
    <el-dialog title="查看答案" :visible.sync="answerDialogVisible" width="30%">
      答案: <span v-for="(item,index) in this.currentAnswer" :key="index">
           {{item}}<span style="color:red">、</span><br/>
          </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="answerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="answerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>



    <!-- 展示本次错题 -->

    <el-dialog title="错题提示" :visible.sync="falseDialogVisible" width="80%" @closed="closeback">
        <div v-for="(item,index) in this.falseTitel" :key="index">
          <strong>题目{{index+1}}：{{item.title}} </strong><br/>
          选项：<br/>
          A.{{item.option[0]}}<br/>
          B.{{item.option[1]}}<br/>
          C.{{item.option[2]}}<br/>
          D.{{item.option[3]}}<br/>
          答案 : <span style="color:red" v-for="(items,index) in item.answer" :key="index"> {{item.option[items]}}、<br/></span><br/>
          <br/>
          <br/>
        </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="reFalseTitle">取 消</el-button> -->
        <router-link to="/index"><el-button round >返回主页</el-button></router-link>
        <el-button type="primary" @click="reFalseTitle">重新开始</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {listData} from '../datas/twoData'

export default {
  data() {
    return {
      //所有数组
      listData: [],
      //本次题库数组
      currentListData: [],
      //一条题目对象
      an: {
        title: "",
        option: [],
        answer: [],
      },
      //选择的选项
      checkList:[],
      //本次题目答案：
      currentAnswer: [],
      //本次错题数组
      falseTitel: [],
      //单选选对提数
      radiograde: 0,
      //当前题数
      currenQuestion: 0,
      //总题数
      totle: 0,
      //结果可视化窗口
      dialogVisible: false,
      //查看答案可视化窗口
      answerDialogVisible: false,
      //本次错题展示窗口
      falseDialogVisible: false,
      //抽取的题数
      count: 15,
      //时间
      time:Date.now()
    };
  },
  created() {
    this.currentListData = this.getRandomTitle(listData, this.count);
    this.getDatas();

     var that =this;
        setInterval(function(){
            that.time=new Date().getTime();
        },1000)
  },
  methods: {
    getDatas: async function () {
      //获取题数变化
      var currentnum = this.currenQuestion;
      this.an.title = this.currentListData[currentnum].title;
      this.an.option = this.currentListData[currentnum].option;
      this.an.answer = this.currentListData[currentnum].answer;
      //获取总提数
      this.totle = this.currentListData.length;
    },
    //确认校验
    truebutton: function () {
      var userAnswer = this.checkList;      //用户输入的答案集合
      var reAnswer = this.an.answer;        //传入的正确答案
      //保证重新开始，错误题目回顾
          if((this.currenQuestion + 1)==1){
            this.falseTitel=[];
          }

      let result =this.JudgeResult(userAnswer,reAnswer);
      if(this.checkList.length >0){
          if (result) {
            this.radiograde++;
          }else{
           this.falseTitel.push(this.currentListData[this.currenQuestion]);
          }
      }
      if (this.currenQuestion < this.totle - 1) {
        if (this.checkList.length > 0) {
          this.currenQuestion = this.currenQuestion + 1;
          this.getDatas();
          this.reGo();
        } else {
          alert("请选择选项");
        }
      } else {
        alert("确认提交？");

        //提交操作
        this.dialogVisible = true;
      }
    },
    //初始化
    reGo: function () {
    //   this.answer = 5;
    this.currentAnswer=[];
      this.checkList=[];
      this.radio = 5;
    },
    //重新开始答题
    AllRegame: function () {
      this.currentListData = this.getRandomTitle(listData, this.count);
      this.reGo();
      this.currenQuestion = 0;
      this.totle = 0;
      this.radiograde = 0;
      this.getDatas();
      this.dialogVisible = false;
    },

    //在传入的数据当中随机取出n条
    getRandomTitle: function (arr, count) {
      var newList = [];
      var List = arr.slice(0);
      var i = arr.length;
      var indexarr = [];
      for (var j = 0; j <= 300; j++) {
        var index = Math.floor(Math.random() * i); //0~9
        if (indexarr.indexOf(index) == -1) {
          newList.push(List[index]);
          indexarr.push(index);
        }
        if (newList.length == count) {
          break;
        }
      }
      return newList;
    },
    //查看答案
    getCurrentAnswer: function () {
        this.getAnswer();
        this.answerDialogVisible =true;

    },
    //提交
    commitBut:function(){
        alert("确认提交？");

        this.dialogVisible = true;
    },

    //查看本次错题
    checkFalsetitel:function(){ 
      this.dialogVisible= false;
      this.falseDialogVisible=true;
    },

    //从错题列表中重新开始
    reFalseTitle: function(){
      this.falseDialogVisible = false;
      this.AllRegame();
    },

    //判断结果集是否正确，数组和答案相同返回ture，否则返回false
    JudgeResult: function(arr1,arr2){
        /**
         * param : arr1: 用户选择的答案集合
         * param : arr2: 数据中标准的答案集合
         * result : 返回结果，用户选择答案全对，返回true,否则，返回false
         */
        for(let i=0;i<=arr2.length-1;i++){
            if(arr1.indexOf(arr2[i])== -1){
                return  false;
            }
        }
        return true;
    },

    //获取当前题目答案
    getAnswer: function(){
      let tempArray=[];
        this.an.answer.forEach( i => {
           tempArray.push("    "+this.an.option[i]+"   ");
        });
        let result =this.JudgeResult(tempArray,this.currentAnswer);
        if(result){
          this.currentAnswer.push(tempArray);
        }
        return;
    },
    //关闭窗口重新开始
    closeback:function(){
      this.AllRegame();
    }


  },
    computed:{
     getCurrentTime:function(){
            return dateFormat("YYYY/mm/dd HH:MM:SS",new Date(this.time));
        },
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
.a {
  position: relative;
  display: flex;
  align-content: space-around;
  flex-direction: column;
  box-sizing: border-box;
}

.bigdiv {
  width: 1200px;
  margin: auto;
  box-sizing: border-box;
}

.title,
.op {
  margin-top: 20px;
  height: 100%;
  box-sizing: border-box;
}
.radios {
  margin-top: 10px;
}

.next {
  margin-bottom: 10px;
}
.t {
  margin-left: 50px;
  margin-bottom: 10px;
}
.ic {
  width: 100px;
  margin-left: 100px;
  margin-bottom: 10px;
}

.el-card {
  height: 500px;
}

.main {
  height: 300px;
}
.footerDiv {
  display: inline-flex;
  align-items: center;
}

/* 查看答案样式 */
.answer ,.commit{
  margin-left: 50px;
  margin-bottom: 10px;
}
</style>