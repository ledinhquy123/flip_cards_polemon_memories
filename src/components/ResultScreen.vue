<template>
  <div class="screen">
    <h1>✨ Congratulations ✨</h1>
    <h3>{{ timer }} seconds</h3>
    <button @click="onRestart()">Start Again</button>
  </div>
</template>

<script>
export default {
  props: {
    timer: {
      type: Number,
      require: true,
    },
  },
  methods: {
    onRestart() {
      this.$emit("onRestart");
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  background-color: var(--dark);
  width: 100%;
  height: 100vh;
  color: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.screen h1 {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
}
.screen h3 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
button {
  background-color: transparent;
  color: var(--light);
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light);
  font-size: 1.25rem;
  box-shadow: none;
  transition: all 0.3s ease-in-out;
  font-family: var(--font);
}
button:hover {
  outline: none;
  background-color: var(--light);
  cursor: pointer;
  color: var(--dark);
}
</style>
