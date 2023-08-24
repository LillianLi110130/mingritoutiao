const imgWidth = /img_width\s*=\s*"\d+"/g;
const imgHeight = /img_height\s*=\s*"\d+"/g;
const htmlandbody = /(<html>)|(<\/html>)|(<body>)|(<\/body>)/g;

export default function modifyHtmlText(htmltext, containerWidth) {
  //处理图片大小
  htmltext = htmltext.replace(imgWidth, `width="${containerWidth}"`);
  htmltext = htmltext.replace(imgHeight, "");
  //处理onerror
  htmltext = htmltext.replace(/onerror=".*?"/g, "");
  //处理html和body
  htmltext = htmltext.replace(htmlandbody, "");
  return htmltext;
}
