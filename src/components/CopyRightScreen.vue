<template>
  <div class="copy-right">
    <p>
      This game owned by Quylee in Vue 3 course for begginers -
      <a
        href="https://www.facebook.com/profile.php?id=100026767123334"
        target="_blank"
        >view here</a
      >
    </p>
  </div>
</template>
<style lang="css" scoped>
.copy-right {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  color: var(--light);
  font-size: 1.5rem;
  z-index: 3;
}
.copy-right a {
  color: yellow;
}
</style>
