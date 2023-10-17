<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>
          <CustomForm @submit="onSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomForm from '@/components/CustomForm/CustomForm.vue';

function onSubmit(data: any) {
  console.log(data);
}
</script>
