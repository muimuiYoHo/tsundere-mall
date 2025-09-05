<template>
  <div class="推荐">
    <div class="刷新">
      <logo>logo先欠着...</logo>
    </div>
    <div class="推荐区">
      <a v-for="(item, index) in 金主推荐列表" :key="item.id" :href="item.链接">
        <div class="金主推荐">
          <div class="第一诈骗">
            <div class="诈骗类型">{{ item.活动类型 }}</div>
            <div class="诈骗话术">{{ item.活动宣传 }}</div>
          </div>
          <div class="第二诈骗">
            <img :src="item.图片" :alt="item.名称" />
          </div>
          <div class="第3诈骗">
            <div class="价格">
              <div class="货币">{{ item.货币 }}</div><span>{{ item.价格 }}</span>
            </div>
            <div class="补贴">已补{{ item.补贴 }}元</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const 金主推荐列表 = ref([]);
onMounted(async () => {
  const res = await fetch('src/数据中转/金主推荐.json');
  const data = await res.json();
  金主推荐列表.value = data;
});

onMounted(() => {
  const 推荐区 = document.querySelector('.推荐区');
  let lastTime = 0;
  推荐区.addEventListener('wheel', (e) => {
    e.preventDefault();
    const currentTime = Date.now();
    if (currentTime - lastTime < 10) return; // 控制触发频率
    lastTime = currentTime;
    const scrollAmount = e.deltaY * 8; // 滚动灵敏度
    requestAnimationFrame(() => {
      推荐区.scrollBy({
        left: scrollAmount,
        behavior: 'smooth', // 平滑滚动
      });
    });
  });
});
</script>


<style lang="scss" scoped>
.推荐 {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 200px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    .刷新{
        aspect-ratio: 1.27/1;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: #f7f8fc;
        &::after{
            content: '今天榨点什么 :)❤️~';
            position: absolute;
            bottom: 10%;
        }
        logo {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            border: #7effb2 solid 2px;
        }
    }
    .推荐区{
        display: flex;
        flex: 1;
        height: 100%;
        gap: 10px;
        // border: #bbbb solid 1px;
        overflow-y: hidden;
        overflow-x: hidden;
        .金主推荐 {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            aspect-ratio: 16/9;
            height: 100%;
            border-radius: 10px;
            padding: 5px;
            background-color: #f7f8fc;
            .第一诈骗 {
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 15%;
                // border: #7effb2 solid 2px;
                div {
                    height: 100%;
                }
                .诈骗类型 {
                    min-width: 30%;
                    white-space: nowrap;
                    color: black;
                    font-weight: 600;
                    // background-color: cadetblue;
                }
                .诈骗话术 {
                    color: rgb(181, 105, 26);
                    // background-color: cornflowerblue;
                }
            }
            .第二诈骗 {
                width: 100%;
                img {
                    width: 55%;
                    aspect-ratio: 16/9;
                    border-radius: 10px;
                    margin: 0 auto;
                    object-fit: scale-down;
                    // background-color: #ffffff;
                }
            }
            .第3诈骗 {
                color: #ff4e69;
                .价格 {
                    display: flex;
                    justify-content: center;
                    align-items: end;
                    font-weight: 400;
                    font-size: 20px;
                    color: #FF0F23;
                    gap: 2px;
                    .货币 {
                        font-size: small;
                        color: rgb(255, 15, 35);
                        border: #ff4e69 solid 1px;
                        border-radius: 2px;
                    }
                }
                .补贴 {
                    font-size: small;
                }
            }
        }
    }
}
</style>
<!-- <a>
                    <div class="图片"></div>
                    <div class="描述"></div>
                    <div class="物流">企鹅物流</div>
                    <div class="购买信息">
                        <div class="价格">
                            <div class="货币"></div>
                            <div class="整数价格"></div>
                            <div class="浮点价格"></div>
                        </div>
                        <div class="销量"></div>
                    </div>
                </a>
                <div class="加入吃灰车"></div> -->