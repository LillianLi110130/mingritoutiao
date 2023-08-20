// next.config.js
const withTM = require('next-transpile-modules')([
    'antd-mobile',
    'antd-mobile-icons',
    // ...你的一些其他引用了.css文件的三方库
  ]);
  
  const nextConfig = withTM({
    // 其他next配置...
  })
  
  module.exports = nextConfig
  