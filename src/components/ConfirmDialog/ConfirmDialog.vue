<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <v-card flat>
      <v-card-title class="text-h6">
        {{ props.text.title }}
      </v-card-title>
      <v-card-text class="text-md-center mt-3">{{ props.text.msg }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" variant="flat" @click="confirm(true)">
          确认
        </v-btn>
        <v-btn @click="confirm(false)">
          取消
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  text: {
    type: Object,
    default: () => ({
      title: '提示',
      msg: '确定要删除吗？',
    }),
  },
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(true);
function confirm(value) {
  dialog.value = false;
  emit('update:modelValue', value);
}
</script>
