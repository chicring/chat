<script setup lang="ts">

// 定义事件
import {ref} from "vue";

import {info} from "../ToastMessage/Message";

const prop = defineProps({
  size: String,  // 定义 size 属性
});

const emit = defineEmits(['delete', 'edit']);

const dialogVisible = ref(false);

function confirm() {
  dialogVisible.value = true
}

// 删除事件
const deleteItem = (value) => {
  dialogVisible.value = value;
  if (value) {
    emit('delete');
  } else {
    info('用户取消了操作');
  }
  dialogVisible.value = false;
};


// 编辑事件
const editItem = () => {
  emit('edit');
};


</script>

<template>
  <confirm-dialog
    :modelValue="dialogVisible"
    :text="{ title: '删除提示', msg: '确定要删除这项内容吗？' }"
    @update:modelValue="deleteItem"
  ></confirm-dialog>

  <v-menu
    open-on-hover
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        icon="mdi-dots-vertical"
        variant="text"
        v-bind="props"
        :size="prop.size || 'default'"
      >
      </v-btn>
    </template>

    <v-card rounded="lg" width="130">
      <v-list density="compact" nav>
        <slot></slot>

        <v-list-item @click="editItem">
          <template #default>
            <v-icon start >mdi-pencil-outline</v-icon>
            <strong class="align-center">编辑</strong>
          </template>
        </v-list-item>

        <v-list-item @click="confirm">
          <template #default>
            <v-icon start color="red-lighten-2">mdi-trash-can-outline</v-icon>
            <strong class="text-red-lighten-2 align-center">删除</strong>
          </template>
        </v-list-item>
      </v-list>
    </v-card>

  </v-menu>
</template>

<style scoped>

</style>
