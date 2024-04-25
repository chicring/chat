import { markRaw } from 'vue';
import Google from "../../assets/icon/Google.vue";
import OpenAI from "../../assets/icon/OpenAI.vue";
import Qwen from "../../assets/icon/Qwen.vue";
import ZhiPu from "../../assets/icon/ZhiPu.vue";
import AI360 from "../../assets/icon/AI360.vue";
import MoonShot from "../../assets/icon/MoonShot.vue";
import Spark from "../../assets/icon/Spark.vue";

export const Channel_name = [
  {
    name: "OpenAI",
    type: "openai",
    iconComponents: markRaw(OpenAI)
  },
  {
    name: "Gemini",
    type: "gemini",
    iconComponents: markRaw(Google)
  },
  {
    name: "阿里通义千问",
    type: "qwen",
    iconComponents: markRaw(Qwen)
  },
  {
    name: "智谱AI",
    type: "zhipu",
    iconComponents: markRaw(ZhiPu)
  },
  {
    name: "360智脑",
    type: "ai360",
    iconComponents: markRaw(AI360)
  },
  {
    name: "讯飞星火",
    type: "spark",
    iconComponents: markRaw(Spark)
  },
  {
    name: "Moonshot",
    type: "moonshot",
    iconComponents: markRaw(MoonShot)
  }
]
