<template>
<!--  vuetify3的snackbar组件-->
  <v-snackbar
    timeout="3000"
    :color="color"
    :variant="variant"
    v-model="snackbar"
    location="top"
    rounded="lg"
    transition="slide-y-transition"
    min-height="60"
    multi-line
  >
    <strong>
      {{message}}
    </strong>
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="snackbar = false"
        ripple
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
type VARIANT = "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain" | undefined;
type COLOR = 'success'| 'info'| 'warning'| 'error' | string;
// 接收数据
defineProps<{
  //可以自己定义其他的参数
  //snackbar: boolean,//状态  注销：调用即显示 所以不需要
  color: COLOR, //颜色
  variant: VARIANT,//类型
  message: string, //消息提示
}>()
// 信息提示状态 因为Props接受的数据是只读
const snackbar = ref<boolean|undefined>()

const show = () => {
  // 调用即显示 所以不需要传递snackbar参数
  snackbar.value = true
}
//将show方法暴露出去
defineExpose({
  show,
})
</script>
