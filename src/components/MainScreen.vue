<template>
  <div class="screen">
    <h1>POKE MEMORIES</h1>
    <h3>Select mode to start game</h3>
    <div class="action">
      <button @click="onStart(16)">
        <span class="first">4x4</span>
        <span class="second">Easy</span>
      </button>
      <button @click="onStart(36)">
        <span class="first">6x6</span>
        <span class="second">Normal</span>
      </button>
      <button @click="onStart(64)">
        <span class="first">8x8</span>
        <span class="second">Hard</span>
      </button>
      <button @click="onStart(100)">
        <span class="first">10x10</span>
        <span class="second">Super Hard</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onStart(totalOfBlocks) {
      // Đưa sự kiện onStart qua App.vue với giá trị value (sẽ được gửi vào event)
      this.$emit("onStart", { totalOfBlocks });
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  color: var(--light);
}
.screen h1 {
  font-size: 4.5rem;
}
.screen h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.screen .action {
  display: flex;
  flex-direction: row;
}
.action button {
  width: 150px;
  height: 150px;
  margin: 0 1rem;
  background: transparent;
  color: var(--light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--light);
  border-radius: 1rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}
.action button:hover {
  outline: none;
  background-color: var(--light);
  cursor: pointer;
  color: var(--dark);
}
button .first {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
button .second {
  font-size: 1.25rem;
}
</style>
