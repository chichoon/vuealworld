<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">conduit</RouterLink>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <RouterLink class="nav-link" active-class="active" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/login">Sign in</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/register">Sign up</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
console.log(window.location.pathname);
</script>

<style lang="scss" scoped></style>
