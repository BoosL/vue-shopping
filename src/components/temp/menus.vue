<template>
<div id="menus">
<div class="designer-menu" style="position: fixed;bottom:0px;">
    <ul>
        <!-- ngRepeat: menu in menus -->
        <li v-for="menu in menus" :class="{'designer-menu-line':datas.showicon==0 || datas.showicon==1,'designer-menu-w1':menus.length == 1,
                        'designer-menu-w2':menus.length == 2,'designer-menu-w3':menus.length == 3,'designer-menu-w4':menus.length == 4,
                        'designer-menu-w5':menus.length == 5,'designer-menu-border': datas.showborder==1,'designer-menu-noborder': datas.showborder!=1}" :style="{'border-top-color': menu.bordercolor}" @click="openMenu(menu,$event)" class="ng-scope designer-menu-line designer-menu-w5 designer-menu-border" style="border-top-color: rgb(191, 191, 191);">
         <div class="designer-menu-bg" :style="{'background':menu.bgcolor,'opacity':datas.bgalpha}" style="background: rgb(36, 215, 230);"></div>
          <div class="designer-menu-item" :style="{'color':menu.textcolor}" style="color: rgb(112, 193, 11);">
                <span :class="{'designer-menu-block':datas.showicon==2,'designer-menu-icon':datas.showicon==2}"><i class="fa fa-list" :style="{color:menu.iconcolor}" v-show="datas.showicon!=0" style="color: rgb(102, 102, 102);"></i></span>
                <span class="designer-menu-label ng-binding" :class="{'designer-menu-block':datas.showicon==2,'designer-menu-text':datas.showicon==2}" v-show="datas.showtext==1"> 商城首页</span>
          </div>
           <div class="sub" :style="{'border-color':datas.bordercolor2,'background':datas.bgcolor2}" style="border-color: rgb(191, 191, 191); background: rgb(250, 250, 250); bottom: -181px; left: 55px;">
                <span>
                    <!-- ngRepeat: sub in menu.subMenus -->
                    <a class="designer-menu-link ng-binding ng-scope" v-for="sub in menu.subMenus" :style="{'border-bottom-color':datas.bordercolor2,'color':datas.textcolor2}" href="http://hlb.yunzshop.com/app/index.php?i=6&amp;c=entry&amp;p=favorite&amp;do=shop&amp;m=sz_yi" style="border-bottom-color: rgb(191, 191, 191); color: rgb(102, 102, 102);">二级</a>
                    <!-- end ngRepeat: sub in menu.subMenus -->
                </span>
                <div class="corner" :style="{'border-top-color':datas.bordercolor2}" style="border-top-color: rgb(191, 191, 191); left: 24.5938px;"></div>
                <div class="corner2" :style="{'border-top-color':datas.bgcolor2}" style="border-top-color: rgb(250, 250, 250); left: 24.5938px;"></div>
            </div>
            <div class="designer-menu-spliter" v-show="datas.showborder==1" :style="{'background':menu.bordercolor}" style="background: rgb(191, 191, 191);"></div>
        
          </li><!-- end ngRepeat: menu in menus -->
    </ul>
</div>
</div>
</template>
<script>
  export default {
    props: ['datas'],
    mounted(){

    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#menus{
		
	}
</style>