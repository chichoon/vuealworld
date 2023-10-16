<template>
  <nav class="header">
    <RouterLink to="/">
      <h1>conduit</h1>
    </RouterLink>
    <div class="navigate">
      <RouterLink to="/" class="link" active-class="selected">home</RouterLink>
      <RouterLink to="/signin" class="link" active-class="selected">Sign in</RouterLink>
      <RouterLink to="/signup" class="link" active-class="selected">Sign up</RouterLink>
    </div>
  </nav>
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

  & > a {
    text-decoration: none;
    color: #000000;

    h1 {
      font-size: 30px;
    }
  }
}

.navigate {
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.link {
  text-decoration: none;
  background: none;
  border: none;
  color: #aaaaaa;

  &.selected {
    color: #000000;
  }
}
</style>
