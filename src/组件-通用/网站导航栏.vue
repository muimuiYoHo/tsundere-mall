<template>
    <div class="WebNavBar">
        <div class="上半部分">
            <div class="logo">
                <img src="../静态资源/IMG_20250512_101952.png" alt="logo" />
            </div>
            <div class="搜索栏战斗群">搜索栏区域</div>
            <div class="购物车">购物车区域</div>
        </div>
        <div class="navBar">
            <div class="dropdown dropdown-open">
                <div tabindex="0" role="button" class="btn m-1 商品分类">吉普莉尔已经完成商品分类啦</div>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
                    <div v-for="(分类, index) in 商品分类" :key="index" class="dropdown dropdown-hover dropdown-right">
                        <div tabindex="0" role="button" class="btn m-1 商品大类 ">{{ 分类.大类 }}</div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
                            <li v-for="(item, i) in 分类.细分" :key="i"><a>{{ item }}</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
            <div class="dropdown dropdown-bottom dropdown-center" v-for="(版块, index) in navBar" :key="index">
                <div tabindex="0" role="button" class="btn m-1 别换行">{{ 版块.name }}</div>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
                    <li v-for="(item, i) in 版块.细分" :key="i"><a>{{ item }}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.WebNavBar {
    position: relative;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    width: 100%;
    height: 15vh;
    min-height: 120px;
    background-image: linear-gradient(to right, #f7fcfe, rgba(255, 255, 255, 0.7));
    // background-color: lighten($color: #f7fcfe,$amount: 0);
    backdrop-filter: blur(10px);
    padding: 0 5%;
    z-index: 2;
    &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: -1;
        background-color: #ff0000;
    }
    .上半部分 {
        width: 100%;
        height: 75%;
        // background-color: rgb(140, 0, 255);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            height: 90%;
            aspect-ratio: 1.5/1;
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
                image-rendering: auto;
                transform: scale(1.25);
            }
        }
        .搜索栏战斗群 {
            width: 50%;
            height: 60%;
            background-color: rgb(32, 218, 255);
        }
        .购物车 {
            width: 10%;
            height: 60%;
            background-color: rgb(96, 175, 0);
        }
    }
    .navBar {
        display: flex;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 25%;
        gap: 50px;
        // background-color: rgba(255, 0, 255, 0.678);
        .dropdown-open {
            position: relative;
            margin-right: 50px;
            .商品分类 {
                width: 130%;
                border-end-end-radius: 0;
                border-end-start-radius: 0;
                z-index: 2;
            }
            ul {
                width: 130%;
                border-start-start-radius: 0;
                border-start-end-radius: 0;
                .商品大类 {
                    width: 100%;
                    border: none;
                    background-color: transparent;
                }
            }
        }
        .dropdown-center{
            .m-1 {
                background-color: transparent;
                box-shadow: none;
                border: none;
            }
            .别换行{
                white-space: nowrap;
            }
        }
    }
}

</style>
<script setup>
const 商品分类 = [
  {
    大类: "家用玩具❤",
    细分: ["神秘遥控器", "水晶埴轮", "催眠APP", "感官链接模型"]
  },
  {
    大类: "游戏周边✨",
    细分: ["圣剑模型", "EX-咖喱棒", "盗版光盘"]
  },
  {
    大类: "动漫周边💖",
    细分: ["萝莉手办", "大~海报", "老婆抱枕"]
  },
  {
    大类: "数码产品⚡️",
    细分: ["硬币相机", "透视镜头阵列", "VR眼镜"]
  },
  {
    大类: "同人本子📚",
    细分: ["汉化资源", "生肉搬运", "CC漫展图包", "全年龄"]
  },
  {
    大类: "插画漫画📖",
    细分: ["今日热门","男生欢迎","女生欢迎","每日AI","同人","原创"]
  },
  {
    大类: "生命购买🧬",
    细分: ["魅魔","梦魔","非洲奴隶"]
  },
  {
    大类: "家政服务🧹",
    细分: ["魅魔陪睡","梦魔助眠","JK援交","JS援交","女仆服务"]
  },
  {
    大类: "不是哥们👬",
    细分: ["就是姐们👭"]
  },
  {
    大类: "Cosplay👗",
    细分: ["官方下场","ooc","职业Coser"]
  },
  {
    大类: "其他🤔",
    细分: ["什么还有别的?!"]
  },
];
const navBar = [
    {
        name: "男娘域👨🏻‍❤️‍👨🏻",
        细分:["衣娘","药娘"]
    },
    {
        name: "女娘域👩🏻‍❤️‍👩🏻",
        细分:["萝莉","御姐","兽娘"]
    },
    {
        name: "百合域⚡️",
        细分:["轻百","重百"]
    },
    {
        name: "BL域💖",
        细分:["年上攻","年下攻","纯爱","虐文"]
    },
    {
        name: "GL域💖",
        细分:["漫画","小说","动画","游戏","Cosplay"]
    },
    {
        name: "萝莉域⛓️‍💥",
        细分:["三年","五年","十年","无期徒刑"]
    },
    {
        name: "御姐域👩🏻",
        细分:["高冷","傲娇","温柔","腹黑","成熟","女王"]
    },
    {
        name: "兽娘域🐾",
        细分:["猫耳","兔耳","狼耳","狗耳","龙女"]
    }
];
</script>