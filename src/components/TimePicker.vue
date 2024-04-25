<template>

  <!--  如果需要选择完数值后自动关闭日期框 需要将close-on-content-click 设置为true-->
  <v-menu
    :close-on-content-click="false"
    location="bottom"
    v-model="menu"
  >
    <template v-slot:activator="{ props }">
      <v-text-field color="primary" v-model="formatDate"  v-bind="props" readonly  variant="outlined" append-inner-icon="mdi-calendar-month-outline" :label="label" ></v-text-field>
    </template>
    <v-date-picker v-model="datetime" hide-header>
      <template v-slot:actions>
        <v-btn text="close" @click="menu = !menu"></v-btn>
      </template>
    </v-date-picker>
  </v-menu>
</template>
<script lang="ts" setup>
import { ref,watch } from 'vue'
import  Dayjs  from 'dayjs';

const menu = ref(false)

// datepicker初始格式 Thu Nov 09 2023 00:00:00 GMT+0800 (中国标准时间)
const datetime = ref()
// 转义成YYYY-MM-DD
const formatDate = ref()
// 转化成的时间戳
const timestamp = ref()
defineProps<{
  // 固定名称 modelValue
  modelValue: number,
  //标签名称
  label:string
}>()

const emit = defineEmits(['update:modelValue'])

watch(datetime, () => {
  //转换时间格式
  formatDate.value = Dayjs(datetime.value).format("YYYY-MM-DD")
  //转换成时间戳
  timestamp.value = Math.floor(Dayjs(formatDate.value).valueOf() / 1000);
  emit('update:modelValue', timestamp.value)
})

</script>
