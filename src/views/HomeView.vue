<script>
export default {
  data() {
    return {
      num: 5,
      name: 'Bond',
      id: 'J432145151',
      age: '35',
      array: ['a', 'b', 'c', '2'],
      bool: false,
      inputType: 'text',
      color: 'bg-blue-400',
    }
  },
  // 方法   
  methods: {
    plus(item) {
      console.log(item);
      console.log('有點到');
      // 跨不同東西 -> 加this 
      this.num = this.num + 5;
      console.log(this.num);
    },
    showAndhide() {
      if (this.inputType == 'text') {
        this.inputType = 'password';
      }
      else {
        this.inputType = 'text';
      }
    },
    changColor() {
      this.color = (this.color === 'bg-blue-400') ? 'bg-red-400' : 'bg-blue-400';
    },
  }
};
</script>
<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="text-3xl text-yellow-600">
    <!-- <TheWelcome /> -->
    放變數
    {{ name }}
    {{ id }}
    {{ age }}
    {{ array }}
    {{ bool }}
    <!-- 按鈕監聽 -->
    <!-- v-on:click -->
    <div class="py-5">
      <button class="btn btn-success w-20 h-15 mx-6" type="button" v-on:click="num++">
        {{ num }}
      </button>
      <!-- 簡略寫法 -->
      <button class="btn btn-success w-20 h-15 mx-6" type="button" @click="plus('886')">
        {{ num }}
      </button>
    </div>


    <!-- v-bind  要操控的網頁元素(屬性的值)-->
    <!-- 1.使用方式 1 -->
    <label class="input input-bordered flex items-center gap-2 m-5 w-1/3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
        <path fill-rule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clip-rule="evenodd" />
      </svg>
      <input class="input-bordered" placeholder="password" type="password">
    </label>
    <div class="flex items-center py-4">
      <label class="input input-bordered flex items-center gap-2 m-5 w-1/3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
          <path fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd" />
        </svg>
        <input class="input-bordered" placeholder="password" v-bind="{ type: inputType }">
      </label>
      <button class="btn btn-info w-20 base-content" type="button" @click="showAndhide">切換</button>
    </div>


    <div class="flex items-end">
      <!-- 簡略寫法 -->
      <div class="box w-24 h-24 mx-4" :class="color"></div>
      <button class="btn btn-info" type="button" @click="changColor">變色按鈕</button>
    </div>


    <!-- JS if 判斷式 -->
    <div>
      <!-- if -->
      <div v-if="num == 1" class="box"></div>
      <!-- else if -->
      <div v-else-if="num == 2" class="box"></div>
      <!-- else -->
      <div v-else></div>
      <!-- *** if 如果要接else if、else 要連起來，中間不能加東西 *** -->
    </div>

    <!-- Vue for 迴圈 -->
    <!-- items.foreach((item)=>{}) -->
    <div v-for="(item, index) in array">
      <div v-if="item === 2">
        {{ item }}
        console.log(item);
      </div>
    </div>

  </main>
</template>