<template>
  <header class="header">
    <h1>conduit</h1>
    <nav class="navigate">
      <RouterLink to="/" class="button" active-class="selected">home</RouterLink>
      <RouterLink to="/signin" class="button" active-class="selected">Sign in</RouterLink>
      <RouterLink to="/signup" class="button" active-class="selected">Sign up</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
console.log(window.location.pathname);
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 20px 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.navigate {
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.button {
  text-decoration: none;
  background: none;
  border: none;
  color: #aaaaaa;

  &.selected {
    color: #000000;
  }
}
</style>
