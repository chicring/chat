import {error, success} from "../components/ToastMessage/Message";

export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    success('复制成功')
  } catch (err) {
    error('复制失败:  ' + text);
    console.error('无法复制文本');
  }
}
