/*
* @Author: Marte
* @Date:   2017-04-25 15:28:59
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-27 14:20:58
*/

'use strict';
import  myMerchants  from './myMerchants';
import  myRatio  from './myRatio';


export default{
    components: { myMerchants,myRatio },
    data(){
        return{

            searchVal:"",
            searchValue:"",
            isActive:true,
            showSearch:true,
            isSupport:false,
            merchantsList:[
                    {name:'昵称一',salary:'100.00'},
                    {name:'昵称一',salary:'100.00'},
                    {name:'昵称一',salary:'100.00'},
                    {name:'昵称一',salary:'100.00'}
                ],

            ratioDatas:[
                {
                    money:"00.00",
                    data:"今日",
                    name:"data"
                },
                {
                    money:"00.00",
                    data:"昨日",
                    name:"data"
                },
                {
                    money:"00.00",
                    data:"本周",
                    name:"data"
                },
                {
                    money:"100.00",
                    data:"本月累计分红",
                    name:"mounth"
                }
            ],

            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            pickerOptions1: {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },
            value1: '',
            value2: '',
        };
    },
    methods:{
        changeActive(b){
            this.isActive=b;
        },
        goBack(){
            this.showSearch=!this.showSearch;
        },

        // 处理子组件传来的搜索框获取焦点的函数
        beginSearch(isSupport){

            // 判断是否是从供应商页面的搜索
            this.isSupport=isSupport;

            // 处理搜索弹窗的隐现
            this.showSearch=!this.showSearch;

            // 清空上次的值
            this.searchVal="";
        },
        searching(){
            //传递搜索的值
            this.searchValue=this.searchVal;

            console.log("");
            console.log("根据不同的方式(是否是搜索供应商)开始向服务器请求搜索的数据.......");
            console.log("获取到数据更新merchantsList并进行消息传递.......");
            console.log("");

            //隐藏搜索弹窗
            this.showSearch=!this.showSearch;
        }
    }
}