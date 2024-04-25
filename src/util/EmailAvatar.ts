
import md5 from "md5"

export function getEmailAvatar(email : string) {
  // 使用正则表达式判断邮箱格式是否为 QQ 邮箱
  if (/^[1-9][0-9]{4,10}@qq\.com$/.test(email)) {
    // 如果为 QQ 邮箱，则生成 QQ 头像地址
    return `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=100`;
  } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/.test(email)) {
    // 如果为普通邮箱，则生成 Gravatar 头像地址
    const md5Email = md5(email.toLowerCase());
    return `https://gravatar.kuibu.net/avatar/${md5Email}?s=100`;
  } else if (/^[A-Za-z0-9][\w\.-]+[A-Za-z0-9]@163\.com$/.test(email)) {
    // 如果为 163 邮箱，则生成 163 头像地址
    const user = email.split('@')[0];
    return `https://mail.163.com/js6/s?func=mbox:getMessageList&sid=zhaohui_hedahua92&r=${Math.random()}&fid=1&user=${user}&l=100`;
  } else if (/^[A-Za-z0-9][\w\.-]+[A-Za-z0-9]@sina\.cn$/.test(email)) {
    // 如果为新浪邮件，则生成新浪头像地址
    const user = email.split('@')[0];
    return `http://my.sina.com.cn/avatar.php?uid=${user}&size=big`;
  } else {
    // 否则返回默认头像地址
    return 'https://mpay.blogcloud.cn/static/admin/images/avatar.jpg';
  }
}
