<template>
	<div id="brand">
		<c-title :hide="false" text='品牌'></c-title>
		<div id="category-content" ref="menucontent">
			<div id="carcontent">	
		<div class="branch" v-if="0"><img :src="list.branch"/></div>
			<ul>
				<li v-for="brand in contentlist.data">
					<router-link :to="fun.getUrl('brandgoods',{id:brand.id})">
						<div class="thumb"><img :src="brand.logo" />{{brand.logo}}</div>
						<span>{{brand.name}}</span>
					</router-link>
				</li>
			</ul>
		
			</div>
		</div>
<div style="height: 80px;clear: both;display: block;"></div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import cTitle from 'components/title';
	import cRootlist from 'components/rootlist';
	import cCarcontent from 'components/carcontent';
	import BScroll from 'better-scroll';

	export default {
		data() {
			return {
				active: 99,
				allLoaded: false,
				topStatus: '',
				turl: '/category',
				arg: { index: 10, item: 'pinch' },
				list: [],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
				contentlist: {}
			}
		},
		methods: {
			tabsa(n, i) {
				
				this.$refs.bplista.className='';
				this.active = n;
				this.getContentlist(i);
			},
			bpfun(){
				this.active=99;
				this.$refs.bplista.className='active';
				this.$router.push('/brand');
			},
			getContentlist(id){
				$http.get('goods.brand.get-brand').then((json) => {
					if(json.result == 1) {						
						this.contentlist=json.data;
						console.log(json.data);
//						 this.$nextTick(() => {
//						 	this._initScroll(this.$refs.menucontent)
//						 })
					} else {
						this.doException(json);
					}
				});					
			},
			_initScroll (doc) {
				this.menuScroll = new BScroll(doc, {click: true})  
			}
		},
		mounted(){
			
			this.getContentlist();

		},
		components: { cTitle, cCarcontent }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    #brand {

        #rootlists {
            height: 100vh;overflow: hidden;
            width: 23%;
            
            float: left;
            border-right: 1px solid #D9D9D9;
        }
        #category-content {
        	margin-top: 50px;background: #FFF;
            overflow: hidden;
            width: 100%;
        
            #carcontent {
            	padding: 20px 0;
                word-wrap: break-word;
            }
        }
    }
    
    #rootList {
        width: 100%;
        background: #FFF;
        font-size: .8rem;
        .active {
            color: red;
        }
        li {
            line-height: 46px;
            border-bottom: solid 1px #e5e5e5;
        }
    }
    #carcontent{background: #FFF;color: #686868;
	.sote{clear: both;overflow: hidden;}
	h3{text-align: left;font-size: .9rem;margin: 0;padding: 5px 7px ;font-weight: normal;display: block;clear: both;color: #000;}
	a span{   height: 31px;
    overflow: hidden;color: #686868;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    overflow: hidden;}
	.branch img{width: 100%;}
	.thumb{line-height: 25vw;height: 25vw;overflow: hidden;}
	ul{margin-right: -30px;clear: both;}
	li{width: 22%;text-align: center; float: left;margin-bottom: 10px;margin-right: 1%;font-size: .7rem;box-sizing: border-box;
		img{width: 80%;}
	}
}
</style>