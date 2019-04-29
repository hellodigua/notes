/**
 * 定位线上压缩代码错误位置
 * 示例：node index.js 1861 6449 app-service.map.map
 * 第一个参数为行数，第二个参数为列数，第三个参数为SourceMap文件
 */

// 读取文件
const fs = require('fs');
const sourceMap = require('source-map');

// sourceMap处理文件
const SourceMapConsumer = sourceMap.SourceMapConsumer;
// 启动构建进程（已构建则不需要）
const exec = require('child_process').exec;

const lineNo = process.argv[2] || 0;
const columnNo = process.argv[3] || 0;
const file = process.argv[4] || '';

// 构建有map的线上代码
// node build onlineMap为构建命令
exec('node build onlineMap', async () => {
  const consumer = await new SourceMapConsumer(fs.readFileSync(file, 'utf8'))

  const result = consumer.originalPositionFor({
    line: +lineNo,
    column: +columnNo
  });

  console.log(result);
});
