<template>
  <form>
    <fieldset class="form-group">
      <CustomInput type="text" placeholder="URL of profile picture" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="text" placeholder="Your Name" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="text" placeholder="Short bio about you" is-text-area />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="email" placeholder="Email" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="password" placeholder="New Password" />
    </fieldset>
    <CustomButton type="submit" text="Update Settings" />
  </form>
</template>

<script lang="ts" setup>
import CustomInput from './CustomInput.vue';
import CustomButton from '../CustomButton.vue';
</script>
