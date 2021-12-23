const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');
const cwdDir = process.cwd();
const outputDir = path.resolve(cwdDir, 'src/pages/mock');
const pathDir = path.resolve(cwdDir, 'data');
const files = fs.readdirSync(pathDir);
const excelFilePaths = files
  .filter((i) => i.includes('xls'))
  .map((i) => ({
    type: parseInt(i.split('.')[0]),
    path: path.join(pathDir, i),
  }));
/**
 * 表格格式不一致，分别处理
 * @type {{name: string, data: unknown[]}[]}
 */
const result = [];
excelFilePaths.forEach((i) => {
  const excel = xlsx.parse(i.path);
  let firstSheet = excel[0].data;
  let sheetHeader;
  switch (i.type) {
    case 1:
      sheetHeader = firstSheet.splice(0, 1)[0];
      firstSheet.forEach((j, index) => {
        const lgt = j[5].split(',').map((i) => i - 0);
        j.splice(j.length - 1, 1);
        const showList = j.map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0, 1].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: index + 1,
          lng: lgt[0],
          lat: lgt[1],
          showList: showList,
        });
      });
      return;
    case 2:
      sheetHeader = firstSheet.splice(0, 2)[1];
      sheetHeader.splice(0, 1);
      sheetHeader.splice(sheetHeader.length - 2, 2);
      firstSheet.forEach((j, index) => {
        const showList = j.slice(1, j.length - 2).map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0, 2].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: j[0],
          lng: j[10],
          lat: j[11],
          showList: showList,
        });
      });
      break;
    case 3:
      sheetHeader = firstSheet.splice(0, 2)[1];
      sheetHeader.splice(0, 1);
      sheetHeader.splice(sheetHeader.length - 2, 2);
      firstSheet.forEach((j, index) => {
        const showList = j.slice(1, j.length - 2).map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: j[0],
          lng: j[5],
          lat: j[6],
          showList: showList,
        });
      });
      break;
    case 4:
      sheetHeader = firstSheet.splice(0, 2)[1];
      sheetHeader.splice(0, 1);
      sheetHeader.splice(sheetHeader.length - 2, 2);
      firstSheet.forEach((j, index) => {
        const showList = j.slice(1, j.length - 2).map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0, 1].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: j[0],
          lng: j[8],
          lat: j[9],
          showList: showList,
        });
      });
      break;
    case 5:
      sheetHeader = firstSheet.splice(0, 1)[0];
      sheetHeader.splice(0, 1);
      sheetHeader.splice(sheetHeader.length - 2, 2);
      firstSheet.forEach((j, index) => {
        const showList = j.slice(1, j.length - 2).map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0, 1].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: j[0],
          lng: j[6],
          lat: j[7],
          showList: showList,
        });
      });
      break;
    case 6:
    case 7:
    case 8:
      sheetHeader = firstSheet.splice(0, 1)[0];
      sheetHeader.splice(0, 1);
      sheetHeader.splice(sheetHeader.length - 1, 1);
      firstSheet.forEach((j, index) => {
        const lgt = j[6].split(',').map((i) => i - 0);
        const showList = j.slice(1, j.length - 1).map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0, 1].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: j[0],
          lng: lgt[0],
          lat: lgt[1],
          showList: showList,
        });
      });
      break;
    case 9:
      sheetHeader = firstSheet.splice(0, 2)[1];
      sheetHeader.splice(0, 1);
      sheetHeader.splice(sheetHeader.length - 1, 1);
      firstSheet[0];
      firstSheet.forEach((j, index) => {
        const lgt = (j[8] && j[8].split(',').map((i) => i - 0)) || [0, 0];
        const showList = j.slice(1, j.length - 1).map((k, index2) => ({
          filed: sheetHeader[index2],
          value: k,
          search: [0, 1].indexOf(index2) > -1 ? index2 + 1 : 0,
        }));
        result.push({
          type: i.type,
          serialNumber: j[0],
          lng: lgt[0],
          lat: lgt[1],
          showList: showList,
        });
      });
      break;
    default:
      break;
  }
});

console.log(result.filter((r) => r.type === 9)[0]);
console.log(result[result.length - 1]);

try {
  const ret = result.filter((r) => !!r.lng);
  const content = `export default ${JSON.stringify(ret)}`;
  const data = fs.writeFileSync(path.resolve(outputDir, 'jl/data.ts'), content);
  //文件写入成功。
  console.log(data);
} catch (err) {
  console.error(err);
}
