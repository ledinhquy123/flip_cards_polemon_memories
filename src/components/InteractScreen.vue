<template>
  <div class="screen">
    <div
      class="card__container"
      :style="{
        width: `${
          ((((960 - 16 * Math.sqrt(cardsContext.length)) /
            Math.sqrt(cardsContext.length)) *
            3) /
            4) *
            Math.sqrt(cardsContext.length) +
          16 * Math.sqrt(cardsContext.length)
        }px`,
      }"
    >
      <card-flip
        v-for="(card, index) in cardsContext"
        :key="index"
        :imgBackFaceUrl="`images/${card}.png`"
        :card="{ index, value: card }"
        @onFlip="checkRule($event)"
        :ref="`card-${index}`"
        :totalCards="cardsContext.length"
      />
    </div>
  </div>
  <!-- :card="{ index, value: card }" gửi 1 object qua bên Card.vue inde =>short hand của index: index -->
</template>

<script>
import CardFlip from "./Card.vue";
export default {
  data() {
    return {
      // Biến rules để lưu đúng 2 giá trị để so sánh xem 2 thẻ lật có giống nhau hay không? Nếu khác thì sẽ úp lại
      rules: [],
    };
  },
  props: {
    cardsContext: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CardFlip,
  },
  methods: {
    checkRule(card) {
      if (this.rules.length === 2) this.rules = [];
      this.rules.push(card);

      if (this.rules.length === 2) {
        if (this.rules[0].value === this.rules[1].value) {
          this.$refs[`card-${this.rules[0].index}`][0].isDisabled = true;
          this.$refs[`card-${this.rules[1].index}`][0].isDisabled = true;
        } else {
          // Tạo độ trễ (khi click vào 2 thẻ khác nhau thường thẻ sẽ bị đóng ngay lập tức nên không kịp hiện ra thẻ thứ 2 => cần tạo độ trễ)
          setTimeout(() => {
            // Lưu ý: this.$refs trả về object các mảng nên cần truy cập tới phần từ thứ 0
            this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard();
            this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard();
          }, 800);
        }
      }
      const disabledElementsAll = document.querySelectorAll(
        ".screen .card .card__inner.is-disabled"
      ).length;
      // Khi tất cả các thẻ được lật hết thì kết thúc trò chơi => để độ trễ khoảng 1s để người dùng có thể xem kết quả
      if (disabledElementsAll === this.cardsContext.length - 2) {
        setTimeout(() => {
          this.$emit("onFinish");
        }, 1000);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__container {
  position: relative;
  /* width: 734px; */
  display: flex;
  flex-wrap: wrap;
  /* margin: 2rem auto; */
}
</style>
