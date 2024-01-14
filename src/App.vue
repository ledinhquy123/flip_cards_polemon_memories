<template>
  <main-screen v-if="statusMatch === 'default'" @onStart="startMatch($event)" />
  <interact-screen
    v-if="statusMatch === 'match'"
    :cardsContext="settings.cardsContext"
    @onFinish="resultMatch()"
  />

  <result-screen
    v-if="statusMatch === 'result'"
    :timer="Math.round(timer / 1000)"
    @onRestart="onRestart()"
  />

  <copy-right-screen />
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";
import CopyRightScreen from "./components/CopyRightScreen.vue";

// import hàm
import { shuffled } from "./utils/array.js";

export default {
  name: "App",

  data() {
    return {
      settings: {
        // Lưu tổng số các phần tử trong mảng
        totalOfBlocks: 0,
        // Lưu mảng cuối cùng sau khi đã mix các mảng có phần tử giống nhau
        cardsContext: [],
        // Lưu thời gian chơi game
        startedAt: null,
      },
      timer: 0,
      statusMatch: "default",
    };
  },

  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
    CopyRightScreen,
  },

  methods: {
    startMatch(config) {
      this.settings.totalOfBlocks = config.totalOfBlocks;

      // Tạo ra mảng có totalOfBlocks/2 phần tử thứ nhất
      const firstCard = Array.from(
        { length: this.settings.totalOfBlocks / 2 },
        (_, i) => i + 1 // i + 1 => bắt đầu mảng ở giá trị 1, có độ dài: this.settings.totalOfBlocks / 2
      );

      // Mảng thứ 2 => giống mảng đầu tiên để khi mix lại được mảng n * n có các cặp phần tử như nhau
      const secondCards = [...firstCard]; // Cú pháp copy mảng
      const cards = [...firstCard, ...secondCards]; // mix 2 mảng vào cùng 1 mảng

      // Random các vị trí trong mảng cards (4 lần cho chắc chắn)
      this.settings.cardsContext = shuffled(
        shuffled(shuffled(shuffled(cards)))
      );

      // Cập nhật thời gian
      this.settings.startedAt = new Date().getTime(); // Lấy ra thời gian miliseconds

      // Nên đổi trạng thái sau cùng để tránh trường hợp dữ liệu chưa có đã qua screen mới
      this.statusMatch = "match";
    },
    resultMatch() {
      this.timer = new Date().getTime() - this.settings.startedAt; // Lấy ra thời điểm kết thúc - thời điểm bắt đầu
      this.statusMatch = "result";
    },
    onRestart() {
      this.settings.totalOfBlocks = 0;
      this.settings.startedAt = null;
      this.settings.cardsContext = [];
      this.timer = 0;
      this.statusMatch = "default";
    },
  },
};
</script>
