<template>
    <div class="用户导航栏">
        <div class="诈骗登录">
            <div>这么有厨力的网站，为什么不</div>
            <a>登录</a>
            <div>呢</div>
        </div>
        <div class="一些菜单">
            <div v-for="(item, index) in 菜单" :key="index" class="dropdown dropdown-hover">
                <div tabindex="0" role="button" class="btn m-1">{{ item.菜单栏 }}</div>
                <div v-if="index !== 菜单.length - 1" class="分隔"></div>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li v-for="(subItem, subIndex) in item.子项目" :key="subIndex">
                        <a>{{ subItem }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
    const 菜单 =
        [
            { 
                菜单栏: '我的订单 V', 
                子项目: ["1","2"] 
            },
            { 
                菜单栏: '傲娇の推荐V', 
                子项目: ["145","2k","1d","2w"] 
            },
            { 
                菜单栏: '傲娇大会员V', 
                子项目: ["1","2","1"] 
            },
            { 
                菜单栏: '企业采购 V', 
                子项目: ["1","2","1","2"] 
            },
            { 
                菜单栏: '我的关注 V', 
                子项目: ["1","2","1","2"] 
            }
            ,
            { 
                菜单栏: '傲娇客服 V', 
                子项目: ["1","2"] 
            },
            { 
                菜单栏: '傲娇网站导航 V', 
                子项目: ["1","2"] 
            }
        ];
</script>

<style lang="scss" scoped>
.用户导航栏{
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 25px;
    background-color: #dbdbdb;
    overflow: hidden;
    padding: 0 20px;
    .诈骗登录 {
        display: flex;
        align-items: center;
        height: 100%;
        // background-color: bisque;
        gap: 5px;
    }
    .一些菜单 {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 20px;
        // background-color: bisque;
        .dropdown {
            list-style: none;
            .m-1 {
                position: relative;
                background-color: transparent;
                border: none;
            }
            .分隔 {
                position: absolute;
                width: 1.5px;
                height: 50%;
                top: 50%;
                left: 50%;
                transform: translate(3000%, -50%);
                background-color: #6666668f;
            }
            .dropdown-content {
                right: 0;
                left: auto;
                a {
                    color: black;
                }
            }
        }
    }
}
</style>