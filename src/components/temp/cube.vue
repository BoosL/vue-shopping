<template>
<div id="cube" :style="{'background-color':datas.params.bgcolor}">
    <div style="line-height: 170px; text-align: center; color: #999; font-size: 16px;" v-if="!hasCube(datas)">未设置魔方</div>
    <div class="inner">
        <table cellspacing="0" cellpadding="0" border="0">
            <tr v-for="row in datas.params.layout">
                <td  v-for="col in row" 
                    :rowspan="col.rows" :class="[col.classname, 'rows-'+col.rows, 'cols-'+col.cols]" 
                    :colspan="col.cols" >
                    <div v-if="!col.isempty && col.imgurl" style="display: flex;"><a :href="col.url|href_filters"><img :src="col.imgurl" style="width: 100%;height: auto;" /></a></div>
                </td>
            </tr> 
        </table>
    </div>
</div>	

</template>
<script>
	export default {
      data() {
        return {
          mid:this.fun.getKeyByMid(),
        }
      },
	props: ['datas'],
	mounted() {

	},
	methods: {
		hasCube(Item) {

			let has = false;
			let row = 0,
				col = 0;
			for(let i = row; i < 4; i++) {
				for(let j = col; j < 4; j++) {
					if(Item.params.layout[i][j] && !Item.params.layout[i][j].isempty) {
						has = true;
						break;
					}
				}
			}
			return has;

		}
	}
}</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#cube{
		a{font-size: 0;line-height: 0;width: 100%;}
		td{width: 25%;}
		td.cols-2, td.cols-2 {width: 50%;}
	}
</style>