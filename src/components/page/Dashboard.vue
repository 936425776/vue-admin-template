<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                  <div class="schart">
                      <div class="title-box">
                          <div>
                              信息面板
                          </div>
                          <div style="padding-left:60px;">
                              应急操作
                          </div>
                    </div>
                    <div class="title-body">
                          <div>
                             <div v-for="(item,index) in tab_list" :key="index" class="title-body-son1">
                                 <div> {{item.name }}</div>
                                 <div> {{item.value}}</div>
                             </div>
                          </div>
                          <div style="border:none;" class="title-body-son2">
                            <div>
                            <el-button type="danger" style="margin-left:10px;" class="el-button">紧急停播</el-button>
                            <el-button type="success" class="el-button">全局文字通告</el-button>
                            <el-button type="primary" class="el-button">全局插播视频</el-button>
                            <el-button type="warning" class="el-button">全局插播图片</el-button>
                            </div>
                          </div>
                      </div>
                  </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                     <div ref="option1" class="schart"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                      <div ref="option2" class="schart"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                      <div ref="option3" class="schart"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import echarts from 'echarts';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            tab_list:[
                {
                    name:'设备组数量：',
                    value:467
                },
                {
                    name:'视频列表数量：',
                    value:45
                },
                {
                    name:'图片列表数量：',
                    value:45
                },
                {
                    name:'文字数量：',
                    value:45
                },
                {
                    name:'标志播放数量：',
                    value:45
                }
            ],
            option1: {
                title: {
                    text: '终端数据统计',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                     data: []
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ['40%', '60%'],
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option2: {
                title: {
                    text: '终端故障统计',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['巴西', '印尼', '美国', '印度', '中国', '世界']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },

                ]
            },
            option3:{
                title: {
                    text: '素材数量统计',
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            },
        };
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created(){
        this.$nextTick(()=>{
            this.initEcharts()
        })
    },
    methods: {
       initEcharts(){
        let echObj1 =  echarts.init(this.$refs.option1)
            echObj1.setOption(this.option1)
        let echObj2 =  echarts.init(this.$refs.option2)
            echObj2.setOption(this.option2)
        let echObj3 =  echarts.init(this.$refs.option3)
            echObj3.setOption(this.option3)
            addEventListener('resize',()=>{
                echObj1.resize()
                echObj2.resize()
                echObj3.resize()
            })
       }
    }
};
</script>


<style scoped>
.titleandIcon{
    height: 300px;
     
    /* background:red; */
}
.titleandIcon > .title{
    height: 120px;
    width: 100px;
    /* background:blue; */
}
.titleandIcon > .body{
    height: 100px;
    /* background:orange; */
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
    margin-left:20px;
}
.schart > .title-box {
    width: 100%;
    height: 50px;
    /* background-color: red; */
    display: flex;
}
.schart > .title-box > div {
    width: 50%;
    min-width: 250px;
    height: 50px;
    /* border: 1px solid green; */
    font-weight: 900;
    font-size: 18px;
}
.schart > .title-body {
    width: 100%;
    height: 250px;
    display: flex;
}
.schart > .title-body > div {
    width: 50%;
    height: 250px;
    min-width: 250px;
    /* background-color: green; */
    border-right: 1px solid #ccc;
}
.title-body-son1{
   width: 100%;;
   height: 45px;
   /* border: 1px solid #ccc; */
   line-height: 45px;
   display: flex;
   justify-content: center;
   }
.title-body-son1 > :nth-child(1){
   width: 60%;;
   height: 45px;
   /* border: 1px solid #ccc; */
   /* line-height: 45px; */
   display: flex;
   text-align: right;
   justify-content: flex-end;
   }
   .title-body-son1 > :nth-child(2){
   width: 40%;;
   height: 45px;
   /* border: 1px solid #ccc; */
   /* line-height: 45px; */
   display: flex;
   font-weight: 600;
   justify-content: flex-start
   }
.title-body-son2{
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
}
.title-body-son2 > div{
    display: flex;
    /* width: 100px; */
    height: 200px;
    /* background: red; */
    flex-direction: column;
}
.title-body-son2 .el-button{
   margin-top:20px;
   width: 150px;
}
</style>
