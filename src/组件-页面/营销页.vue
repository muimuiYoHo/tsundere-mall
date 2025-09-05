<template>
  <div class="营销页">
    <div class="其它服务">
        <div class="每周游报">
            <div class="tilit">每周游报<div>更多...</div></div>
            <div class="刷怪区">
                <div v-for="(item, index) in 数据" :key="index" class="游报" :class="{ 占高: index === 0 }">
                    <div class="类型" :class="类型颜色[item.类型]">「{{ item.类型 }}」</div>
                    <div class="什么">{{ item.什么 }}</div>
                    <div class="时间">{{ item.时间 }}</div>
                </div>
            </div>
        </div>
        <div class="更多服务">
            <div v-for="(item, index) in 功能列表" :key="index" class="功能方块">
                <span class="icon">{{ item.icon }}</span>
                <span class="label">{{ item.name }}</span>
            </div>
        </div>
    </div>
    <div class="轮播图">
      <!-- 控件层 -->
      <div class="轮播图-控件">
        <div class="轮播图-控件-左" @mouseenter="触发左动画()" @click="移动(-1)" :class="{'轮播图-控件-左-动画': 左动画中}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"viewBox="0 0 24 24" fill="none" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round"class="tabler-icon tabler-icon-chevron-right"><path d="M9 6l6 6l-6 6"></path></svg></div><div class="轮播图-控件-右" @mouseenter="触发右动画()" @click="移动(1)" :class="{'轮播图-控件-右-动画': 右动画中}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"viewBox="0 0 24 24" fill="none" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round"class="tabler-icon tabler-icon-chevron-right"><path d="M9 6l6 6l-6 6"></path></svg></div>
        <div class="轮播图-控件-标题">{{ 当前标题 }}</div>
        <div class="轮播图-控件-介绍">
          <div class="轮播图-控件-介绍1">{{ 当前介绍1 }}</div>
          <div class="轮播图-控件-介绍2 进度条-轮播图">{{ 当前介绍2 }}</div>
        </div>
        <!-- 指定序号 -->
        <div class="轮播图-控件-顺序指定">
          <div v-for="( _ , i) in 播放位置.length" :key="i" @click="指定(i)" :class="[`轮播图-指定-${i+1}`,{ '轮播图-控件-当前指定': i === 当前索引 }]"/>
        </div>
        <div class="轮播图-控件-黑底"></div>
      </div>
      <div class="轮播图-内容" :style="{ transform: 当前变换 }">
        <div class="轮播图-内容-1"></div>
        <div class="轮播图-内容-2"></div>
        <div class="轮播图-内容-3"></div>
      </div>
    </div>
    <!-- <div class="占位"></div> -->
  </div>
</template>

<script setup>
import 服务列表 from "../数据中转/服务列表.json"
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const 功能列表 = ref(服务列表)

onMounted(async () => {
  const res = await fetch("../数据中转/服务列表.json")
  服务列表.value = await res.json()
})

import 数据 from "../数据中转/新闻数据.json"
const 类型颜色 = {
  公告: "color-公告",
  活动: "color-活动",
  最新: "color-最新"
}

// 当前在哪一页
const 当前索引 = ref(0)

const 播放位置 = [
  'translate(0.2%, 0%) scale(1.01)',
  'translate(-33.4%, 0%) scale(1.01)',
  'translate(-66.9%, 0%) scale(1.01)'
]

const 轮播内容文本 = [
  { 标题: 'プラナちゃん、なに..？普拉娜酱、怎么...?',
    介绍1: '画师:セトマン Pid:130472001',
    介绍2: '普拉娜可爱爱❤' },
  { 标题: '星空と少女 星空与少女',
    介绍1: '画师:Stella Pid:1093013961',
    介绍2: '虽然是AI画的 但是很可爱❤' },
  { 标题: '昨日はありがとうね、先生。昨天谢谢啦，老师',
    介绍1: '画师:Anno Pid:112438261',
    介绍2: '嘿嘿❤大叔~' }
]
const 当前标题   = computed(() => 轮播内容文本[当前索引.value].标题)
const 当前介绍1  = computed(() => 轮播内容文本[当前索引.value].介绍1)
const 当前介绍2  = computed(() => 轮播内容文本[当前索引.value].介绍2)
const 当前变换   = computed(() => 播放位置[当前索引.value])

// 轮播控制
function 下一张() {
  当前索引.value = (当前索引.value + 1) % 播放位置.length
}
function 移动(direction) {
  const 总 = 播放位置.length
  当前索引.value = (当前索引.value + direction + 总) % 总
}
function 指定(index) {
  当前索引.value = index
}
const 左动画中 = ref(false)
const 右动画中 = ref(false)
function 触发左动画() {
  if (左动画中.value) return
  左动画中.value = true
  setTimeout(() => (左动画中.value = false), 500)
}
function 触发右动画() {
  if (右动画中.value) return
  右动画中.value = true
  setTimeout(() => (右动画中.value = false), 500)
}

// 定时器
let 计时器 = null
onMounted(() => {
  计时器 = setInterval(下一张, 5000)
})
onBeforeUnmount(() => {
  if (计时器) clearInterval(计时器)
})
</script>

<style lang="scss" scoped>
.营销页{
    width: 100%;
    height: 28.9rem;
    // background-color: #ffdd00;
    display: flex;
    flex: 1 1 0;
    gap: 10px;
    padding-left: 250px;
    flex-direction: row-reverse;
    justify-content: space-between;
    .其它服务 {
        width: 20%;
        min-width: 270px;
        height: 100%;
        border-end-start-radius: 10px;
        border-end-end-radius: 10px;
        background-color: #fbfcfd;
        border: #8888885b 1px solid;
        overflow: hidden;
        .每周游报 {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 61.8%;
            // background-color: cornflowerblue;
            gap: 10px;
            overflow: hidden;
            &::after {
                content: '';
                position: absolute;
                width: 95%;
                height: 2px;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 
                    0 0 5px  #ff00ee,
                    0 0 10px #ff00ee,
                    0 0 20px #ff00ee,
                    0 0 40px #ff00ee;
                filter: blur(0.5px);
                background-color: #ff00ee64;
            }
            .tilit{
                position: absolute;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 12%;
                padding: 0 10px;
                &::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #3131315b;
                }
            }
            .刷怪区 {
                display: flex;
                flex-direction: column;
                overflow-y: auto;
                margin-top: 13%;
                gap: 10px;
                .游报 {
                    position: relative;
                    display: flex;
                    flex: 1 1 0;
                    align-items: center;
                    width: 100%;
                    flex-wrap: nowrap;
                    &::after {
                        content: '';
                        position: absolute;
                        width: 95%;
                        height: 1px;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: #8888885b;
                    }
                    div {
                        display: flex;
                        width: 20%;
                        height: 70%;
                        white-space: nowrap;
                        place-items: center;
                    }
                    .类型 {
                        display: flex;
                        // background-color: #ffc400;
                    }
                    .什么 {
                        width: auto;
                        font-size: small;
                        // background-color: #00ff94;
                    }
                    .时间 {
                        margin-left: auto;
                        font-size: small;
                        color: #999;
                        // background-color: #ff0000;
                    }
                }
                .color-公告 {
                    color: #ffc400;
                }
                .color-最新 {
                    color: #00ff94;
                }
                .color-活动 {
                    color: #00c8ff;
                }
            }
        }
        .更多服务 {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            width: 100%;
            height: 38.2%;
            padding: 1.5px;
        }   
        .功能方块 {
            position: relative;
            overflow: hidden;
            width: 61px;
            flex-grow: 1;
            //   background-color: #00d5ff;
            border: #00c8ff54 1px solid;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #fff;
            user-select: none;
            transition: all 0.3s;
            }
        .icon {
            font-size: 1.5rem;
            }
        .label {
            margin-top: 5px;
            font-size: 0.9rem;
        }
    }
    .轮播图{
        display: flex;
        position: relative;
        flex-grow: 1;
        width:60%;
        height: 100%;
        min-height: 450px;
        background-color: #00d5ff;
        overflow: hidden;
        border-end-start-radius: 10px;
        border-end-end-radius: 10px;
        transition: all .3s;
        .轮播图-控件 {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 2;
            &:hover {
                .轮播图-控件-黑底 {
                    opacity: 1;
                }
                .轮播图-控件-左, .轮播图-控件-右  { 
                    transform: scale(1.2) translate(0%, -40%);
                    color: floralwhite;
                    &:hover { 
                        cursor: url('../piuter/TB2paoVj3JlpuFjSspjXXcT.pXa_!!3037771681.png'), pointer;
                        animation-timing-function: cubic-bezier(0.42, 0.00, 0.58, 1.00);
                    }
                }
                .轮播图-指定-1, .轮播图-指定-2, .轮播图-指定-3 { 
                   background-color: floralwhite !important;
                }
                .轮播图-控件-标题 {
                    left: 10%;
                    &::after  {
                        width: 110%; 
                    }
                }
                .轮播图-控件-介绍  { 
                    opacity: 1;
                    transform: translate(-80%, -65%);

                }
            }
            .轮播图-控件-左, .轮播图-控件-右 {
                position: absolute;
                top: 50%;
                color: rgba(255, 250, 240, 0.7);
                transform: translate(0%, -50%);
                min-width: 40px;
                min-height: 40px;
                transition: all .3s; 
                z-index: 2;
                svg {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(1.5);
                }
            }
            .轮播图-控件-左 {
                left: 10px;
                svg {
                    transform: translate(-50%, -50%) scale(1.5) rotate(180deg);  
                }
            }
            .轮播图-控件-右 {
                right: 10px;
            }
            .轮播图-控件-左-动画  { 
                animation: ←→ .5s ;
            }
            .轮播图-控件-右-动画  { 
                animation: →← .5s ;
            }
            .轮播图-控件-黑底 {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .4);
                z-index: 1;
                opacity: 0;
                transition: all  .3s;
            }
            .轮播图-控件-顺序指定 {
                position: absolute;
                display: flex;
                align-items: center;
                gap: 5px;
                bottom: 0;
                left: 5%;
                width: 15%;
                min-width: 100px;
                height: 10%;
                min-height: 20px;
                z-index: 2;
                .轮播图-指定-1, .轮播图-指定-2, .轮播图-指定-3 {
                    width: 15px;
                    height: 15px;
                    border-radius: 50px;
                    padding: none;
                    background-color: rgba(255, 250, 240, 0.5);
                    transition: all .3s;
                    &:hover {
                        cursor: url('../piuter/TB2paoVj3JlpuFjSspjXXcT.pXa_!!3037771681.png'), pointer;
                    }
                }
                .轮播图-控件-当前指定 {
                    flex-grow: 1;
                }
            }
            .轮播图-控件-标题 {
                display: flex;
                position: absolute;
                align-items: center; 
                white-space: nowrap;
                width: 70%;
                height: 10%;
                left: 5%;
                top: 5%;
                color: floralwhite;
                font-size: 22px;
                font-weight: 600;
                transition: all .3s;
                z-index: 2;
                &::after  {
                    content: '';
                    position: absolute;
                    bottom: -30%;
                    left: 0;
                    width: 0%;
                    height: 5px;
                    transition: all .3s;
                    background-color: floralwhite;
                }
            }
            .轮播图-控件-介绍 {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -65%);
                gap: 10px;
                width: 50%;
                height: auto;
                opacity: 0;
                transition: all .3s;
                z-index: 2;
                // background-color: #003cff;
                .轮播图-控件-介绍1, .轮播图-控件-介绍2 {
                    display: flex;
                    top: 0;
                    width: 100%;
                    left: 5%;
                    bottom: 5%;
                    color: floralwhite;
                    font-size: 15px;
                    z-index: 2;
                }
                .轮播图-控件-介绍1 {
                    height: 20px;
                }
                .轮播图-控件-介绍2 {
                    word-wrap: break-word;
                    overflow-y: auto;
                    height: 160px;
                }
            }
        }
        .轮播图-内容 {
            display: flex;
            position: absolute;
            transform: translate(.16%, 0%) scale(1.01);/*0.16/-33.325/-66.82*/
            width: 300%;
            height: 100%;
            transition: all  .5s;
            .轮播图-内容-1, .轮播图-内容-2, .轮播图-内容-3 {
                width: 100%;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .轮播图-内容-1 {
                background-image: url('../静态资源/1304720010.jpg');
            }
            .轮播图-内容-2 {
                background-image: url('../静态资源/1093013960.jpg');
            }
            .轮播图-内容-3 {
                background-image: url('../静态资源/1148060010.jpg');
            }
        }
    }
    @keyframes ←→  {
        0%   {left: 10px;}
        50% {left: 0px;}
        100%   {left: 10px;}
    }
    @keyframes →←  {
        0%   {right: 10px;}
        50% {right: 0px;}
        100%   {right: 10px;}
    }
    .进度条-轮播图 {
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #dfe9eb76;
            border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: #ffffffba;
            border-radius: 10px;
            &:hover {
                background: #555;
            }
        }
    }
    // .占位 {
    //     min-width: 240px;
    //     height: 100%;
    //     background-color: violet;
    // }
}
</style>