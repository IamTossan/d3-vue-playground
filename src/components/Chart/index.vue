<template>
  <svg height="100" width="100">
    <rect x="1" y="1" height="10" width="10"></rect>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MyButton extends Vue {
  @Prop() private msg!: string;

  public onClick() {
    this.$emit('click');
  }
}
</script>

<style scoped></style>
