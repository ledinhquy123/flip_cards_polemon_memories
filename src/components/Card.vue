<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="card"
    :style="{
      height: `${(960 - 16 * Math.sqrt(totalCards)) / Math.sqrt(totalCards)}px`,
      width: `${
        (((960 - 16 * Math.sqrt(totalCards)) / Math.sqrt(totalCards)) * 3) / 4
      }px`,
      perspective: `${
        (2 * ((960 - 16 * Math.sqrt(totalCards)) / Math.sqrt(totalCards)) * 3) /
        4
      }px`,
    }"
  >
    <div
      class="card__inner"
      :class="{ 'is-flipped': isFlipped, 'is-disabled': isDisabled }"
      @click="onToogleFlipCard"
    >
      <div class="card__face card__face--front">
        <div
          class="card__content"
          :style="{
            backgroundSize: `${
              (((960 - 16 * Math.sqrt(totalCards)) / Math.sqrt(totalCards)) *
                3) /
              4 /
              3
            }px ${
              (((960 - 16 * Math.sqrt(totalCards)) / Math.sqrt(totalCards)) *
                3) /
              4 /
              3
            }px`,
          }"
        ></div>
      </div>
      <div class="card__face card__face--back">
        <!-- @ là thư mục gốc 'src'. require là hàm để import đường dẫn vào dự án -->
        <div
          class="card__content"
          :style="{
            backgroundImage: `url(${require('@/assets/' + imgBackFaceUrl)})`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Check lật
      isFlipped: false,
      // Check disable
      isDisabled: false,
    };
  },
  methods: {
    onToogleFlipCard() {
      // Nếu thẻ bị disable rồi thì kết thúc hàm luôn
      if (this.isDisabled) return false;
      this.isFlipped = !this.isFlipped;
      // Kiểm tra card hiện tại có mở hay không? Gửi lại giá trị card mà vừa được click để gửi ngược lại (card là object)
      if (this.isFlipped) this.$emit("onFlip", this.card);
    },
    // Hàm dùng để đóng lại các thẻ bài khác nhau
    onFlipBackCard() {
      this.isFlipped = false;
    },
  },
  props: {
    imgBackFaceUrl: {
      type: String,
      default: "",
      require: true,
    },
    card: {
      // Gần giống kiểu enum card có thể là các biến có kiểu dữ liệu như sau
      type: [String, Number, Array, Object],
      require: true,
    },
    totalCards: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  margin-right: 1rem;
  /* Hiệu ứng xoay theo chiều ngang */
  /* perspective: 200px; */
}
/* Dùng để quay mà không làm thay đổi vị trí của card */
.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card__inner.is-flipped {
  transform: rotateY(-180deg); /* Quay từ phải sang trái */
}

.card__inner.is-disabled {
  cursor: default;
}

.card__face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden; /* Coi là 2 mặt */
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
}

.card__face--front {
  background-color: var(--dark);
}

.card__face--front .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  width: 100%;
  height: 100%;
  /* background-size: cover; */
}

.card__face--back {
  background-color: var(--light);
  transform: rotateY(-180deg); /* Mặc định mặt sau sẽ nẳm ở sau */
}

.card__face--back .card__content {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
