<template>
  <div class="bigdiv">
    <h3>测试</h3>
    <el-card>
      <div class="a">
        <div>题目</div>
        <div class="title">
          <span>{{this.currenQuestion + 1 }}、{{ an.title }}</span>
        </div>
        <div class="op">
          <el-radio-group v-model="radio" @change="select">
            <div v-for="(item, index) in an.option" :key="index" class="radios">
              <el-radio :label="index">{{ item }}</el-radio>
            </div>
          </el-radio-group>
        </div>
        <div class="t">{{ this.currenQuestion + 1 }}/{{ this.totle }}</div>
        <div class="ic">
          <i class="el-icon-check">: {{ this.radiograde }}</i>
        </div>
        <div class="next">
          <el-button type="primary" @click="truebutton">下一题</el-button>
        </div>
      </div>
    </el-card>

    <!-- 结果展示 -->

    <el-dialog
      title="成绩结果"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <span>本次单选成绩为：{{this.radiograde*1}}分</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AllRegame">重新挑战</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //所有数组
      listData:[],
      //本次题库数组
      currentListData:[],
      //一条题目对象
      an: {
        title: "",
        option: [],
        answer: "",
      },
      //单选绑定
      radio: 5,
      //初始化答案
      answer: 5,
      //单选选对提数
      radiograde: 0,
      //当前题数
      currenQuestion: 0,
      //总题数
      totle: 0,
      //结果可视化窗口
      dialogVisible: false,

      //抽取的题数
      count:30
    };
  },
  created() {
    this.currentListData=this.getRandomTitle(listData,this.count);
    this.getDatas();
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

    select: function (value) {
      this.answer = value;
    },

    //确认校验
    truebutton: function () {
      var userAnswer = this.answer;
      var reAnswer = this.an.answer;
      if (userAnswer == reAnswer) {
        this.radiograde++;
      }

      if (this.currenQuestion < this.totle - 1) {
        if (this.answer != 5) {
          this.currenQuestion = this.currenQuestion + 1;
          this.getDatas();
          this.reGo();
        } else {
          alert("请选择选项");
        }
      } else {
        alert("确认提交？");
        
        //提交操作
        this.dialogVisible=true;
      }
    },
    //初始化
    reGo: function () {
      this.answer = 5;
      this.radio = 5;
    },
    //重新开始答题
    AllRegame:function(){
      this.currentListData=this.getRandomTitle(listData,this.count);
        this.reGo();
        this.currenQuestion=0;
        this.totle=0;
        this.radiograde=0;
        this.getDatas();
        this.dialogVisible = false;
        
    },

    //在传入的数据当中随机取出n条
    getRandomTitle: function(arr,count){
      var  newList=[];
	  	var  List= arr.slice(0);
	  	var  i=arr.length;
		  var  indexarr=[];
		  for(var  j=0;j<=10000;j++){
		    	var  index =Math.floor(Math.random()*i);//0~9
			if (indexarr.indexOf(index) == -1) {
				newList.push(List[index]);
				indexarr.push(index);
			}
			if (newList.length==count) {
				break;
			};
		}
		return newList;

    }
  },
};


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
  position: absolute;
  left: 560px;
  top: 400px;
  margin-bottom: 10px;
}
.t {
  position: absolute;
  left: 20px;
  top: 400px;
  margin-bottom: 10px;
}
.ic {
  width: 100px;
  position: absolute;
  left: 120px;
  top: 400px;
  margin-bottom: 10px;
}

.el-card {
  height: 500px;
}
</style>