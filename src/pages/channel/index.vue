<script setup lang="ts">

import AddchannelDialog from "./AddchannelDialog.vue";
import {onMounted, ref} from "vue";
import {findAllChannel} from "../../api/methods/channel";
import AI360 from "../../assets/icon/AI360.vue";
import ChannelList from "./ChannelList.vue";


const channels = ref([])
const refreshKey = ref(0);
function refresh() {
  refreshKey.value += 1;
}

onMounted(async () => {
  channels.value = await findAllChannel();
})

</script>

<template>
  <v-container>

    <v-card flat rounded="xl" class="mb-4">
      <v-card-title>
        <h3>渠道</h3>
      </v-card-title>

      <v-card-subtitle>
        优先级：<br>
        1. 优先级越大，越优先使用
        2. 相同优先级下：创建时间越早，越优先使用 <br>
        代理：<br>
        1. 必须在启动应用的时候设置代理才能启用
      </v-card-subtitle>

      <v-card-actions class="justify-end">
        <AddchannelDialog @created="refresh()"></AddchannelDialog>
      </v-card-actions>
    </v-card>


    <ChannelList :key="refreshKey"></ChannelList>

  </v-container>
</template>

<style scoped>

</style>
