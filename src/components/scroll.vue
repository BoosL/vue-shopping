<template>
    <div class="vue-scroll"
        @touchstart="_touchstart($event)"
        @touchmove="_touchmove($event)"
        @touchend="_touchend($event)"
        @scroll="_scroll($event)"
    ref="vueScroll">
        <div class="scroll-inner" 
        :style="{
            transform:'translate3d(0,'+top+'px,0)',
        }"
        :class="{'scroll-to-top':!touching}"
        ref="scrollInner">
            <div class="pull-to-refresh" v-if="!!refresh" :style="{
                    'height':offsetH+'px',
                    'line-height':offsetH+'px'
                }">
                <slot name='refresh' class="refresh">
                    <span :class="{
                        'icon-down-background':state==0,
                        'icon-up-background':state==1,
                        'icon-loading':state==2
                    }"></span>
                    
                    <span class="icon-down" v-if="state==0">下拉刷新</span>
                    <span class="icon-up" v-if="state==1">释放刷新</span>
                    <span class="icon-refreshing" v-if="state==2">正在刷新...</span>
                </slot>
            </div>
            <slot></slot>
            <div class="push-to-refresh" v-if="bottomRefresh" :style="{
                    'height':bottomH+'px',
                    'line-height':bottomH+'px'
                }"  >
                <slot name='bottomScroll' class="bt-scroll">
                    <span class="icon-loading"></span>
                    <span>正在刷新...</span>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    
    export default {
        props:{
            //下拉刷新函数
            refresh:{
                type:Function,
                default:undefined
            },
            //下拉加载中的高度
            offsetH:{
                type:Number,
                default:44
            },
            //底部加载
            bottomRefresh:{
                type:Function,
                default:undefined
            },
            //底部加载中高度
            bottomH:{
                type:Number,
                default:40
            },
        },
        data () {
            return{
                top:0,
                //初始位置
                startY:0,
                //状态变化 0为下拉加载,1为释放加载,2为刷新,初始状态为0
                state:0,
                touching:false
            }
        },
        methods:{
            _touchstart(e){
                this.startY = e.touches[0].pageY;
                this.touching=true;
            },
            _touchmove(e){
                let diff = e.touches[0].pageY - this.startY;
                if(diff<0 || !this.touching || this.$el.scrollTop > 0)return 
                e.preventDefault();
                this.top=Math.pow(diff, 0.8)+(this.state==2?this.offsetH:0);
                if (this.state === 2) {
                    return
                }
                if (this.top >= this.offsetH) {
                    this.state = 1
                } else {
                    this.state = 0
                }
            },
            _touchend(e){
                this.touching=false;
                if(this.state==2){
                    this.top=this.offsetH;
                    return 
                }
                if(this.top>this.offsetH){
                    this.loading()
                }else{
                    this.state=0;
                    this.top=0
                }
            },
            //下拉刷新
            loading(){
                this.state=2;
                this.top=this.offsetH;
                this.refresh(()=>{
                    this.state=0;
                    this.top=0
                })
            },
            _scroll(e){
                if(!this.bottomRefresh){
                    return
                }
                let outerHeight = this.$refs.vueScroll.clientHeight;
                let innerHeight = this.$refs.scrollInner.clientHeight;
                if(innerHeight-outerHeight <= this.$el.scrollTop){
                    this.bottomRefresh()
                }
            }
        }
    }
</script>
<style scoped>
    .vue-scroll{position: absolute;width:100%;height: 100%;overflow-y: scroll;left:0}
    .scroll-inner{position:absolute;overflow-x: hidden;overflow-y: auto;width:100%;}
    .icon-down-background{display:inline-block;width: 20px;height: 20px;background: no-repeat 50%;background-image:url('../assets/load-down.png');background-size:16px;vertical-align: middle;-webkit-transition-duration: .3s;transition-duration: .3s;}
    .icon-up-background{display:inline-block;width: 20px;height: 20px;background: no-repeat 50%;background-image:url('../assets/load-down.png');background-size:16px;vertical-align: middle;transform:rotate(180deg);-webkit-transition-duration: .3s;transition-duration: .3s;}
    .pull-to-refresh{width:100%;color:#a1a1a1;text-align: center;}
    .scroll-to-top{-webkit-transition-duration: .3s;transition-duration: .3s;}
    .icon-loading{display:inline-block;width: 20px;height: 20px;background: no-repeat 50%;background-image:url('../assets/loading.png');background-size:20px;vertical-align: middle;-webkit-animation: loadingCircle 1s infinite linear;animation: loadingCircle 1s infinite linear;}
    .push-to-refresh{text-align: center;}
</style>