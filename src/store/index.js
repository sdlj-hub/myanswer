import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const usertitle ={
    actions:{
        addtitle(content,value){
            content.commit('ADDTITLE',value);
        },
        addcheckbox(content,value){
            content.commit('ADDCHECKBOX',value);
        },
        addjudge(content,value){
            content.commit('ADDJUDGE',value);
        },
        addpack(content,value){
            content.commit('ADDPACK',value);
        }

    },
    mutations:{
        ADDTITLE(state,value){
            state.singleList=value;
        },
        ADDCHECKBOX(state,value){
            state.checkboxList=value;
        },
        ADDJUDGE(state,value){
            state.judgeList=value;
        },
        ADDPACK(state,value){
            state.packList=value;
        }
    },
    state:{
        singleList:[],
        checkboxList:[],
        judgeList:[],
        packList:[],

        
        
    },
    getters: {

    }
}

const checkbox ={
    actions:{
        addsingcount(content,value){
            content.commit('ADDSINGCOUNT',value);
        },
        addcheckcount(content,value){
            content.commit('ADDCHECKCOUNT',value);
        }
        ,
        addjudgecount(content,value){
            content.commit('ADDJUDGECOUNT',value);
        },
        addpackcount(content,value){
            content.commit('ADDPACKCOUNT',value);
        }
    },
    mutations:{
        ADDSINGCOUNT(state,value){
            state.singcount=value
        },
        ADDCHECKCOUNT(state,value){
            state.checkboxcount=value
        },
        ADDJUDGECOUNT(state,value){
            state.judgecount=value
        },
        ADDPACKCOUNT(state,value){
            state.packcount=value
        }

    },
    state:{
        singcount:15,
        checkboxcount:15,
        judgecount:15,
        packcount:15
        
    },
    getters: {

    }
}


const store = new Vuex.Store({
    modules:{
        usertitle,
        checkbox
    }
})
export default store;