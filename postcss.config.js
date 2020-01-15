module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 37.5, // rootValue 是转换px的基准值，参考设备iPhone6，设备宽度375px。
      // flexible 在iPhone6设备设置的  html--->font-size 也为37.5px 。

      propList: ['*']
    }
  }
}
