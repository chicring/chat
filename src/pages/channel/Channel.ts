import Google from "../../assets/icon/Google.vue";
import OpenAI from "../../assets/icon/OpenAI.vue";
import Qwen from "../../assets/icon/Qwen.vue";
import ZhiPu from "../../assets/icon/ZhiPu.vue";


interface Channel_name {
  name: string;
  value: string;
  iconComponents: string;
}

export const Channel_name = [
  {
    name: "OpenAI",
    value: "opeani",
    iconComponents: OpenAI
  },
  {
    name: "Gemini",
    value: "gemini",
    iconComponents: Google
  },
  {
    name: "阿里通义千问",
    value: "qwen",
    iconComponents: Qwen
  },
  {
    name: "智谱AI",
    value: "zhipu",
    iconComponents: ZhiPu
  }
]
