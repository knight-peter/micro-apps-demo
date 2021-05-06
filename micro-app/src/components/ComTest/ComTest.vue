<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  name: 'ComTest',
  props:{
    msg:{
      type:String,
      default:()=>null
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
