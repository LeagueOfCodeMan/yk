const path = require('path');
const fs = require('fs');
const cwdDir = process.cwd();
const inputPath = path.resolve(cwdDir, 'src/pages/mock/jl/data.ts');
const outputDir = path.resolve(cwdDir, 'src/pages/mock');
const csvPath = path.resolve(cwdDir, 'data/data.csv');
const csv = require('csvtojson');
const converter = require('json-2-csv');

let json = fs.readFileSync(inputPath);
// 不要格式化json
let data = JSON.parse(
  json
    .toString()
    .replace(/export default/, '')
    .trim(),
);

async function handleCsv() {
  let csvData = [];
  const csvJson = await csv().fromFile(csvPath);
  csvJson.forEach((i) => {
    let obj = {};
    for (const iKey in i) {
      try {
        obj[iKey] = i[iKey] - 0;
      } catch (e) {
        obj[iKey] = i[iKey];
      }
    }
    csvData.push(obj);
  });
  return csvData;
}

/**
 * @param item { type: 1, serialNumber: 1, lng: 120.024829, lat: 28.88291 },
 * @returns {Promise<boolean>}
 */
async function writeCsv(item) {
  let csvData = await handleCsv();
  csvData = csvData.filter(
    (i) =>
      i.type + '-' + i.serialNumber !== item.type + '-' + item.serialNumber,
  );
  csvData = [...csvData, item];
  converter.json2csv(csvData, (err, csv) => {
    if (err) {
      throw err;
    }
    // print CSV string
    console.log(item, csv);
    fs.writeFileSync(csvPath, csv);
  });
}

handleCsv().then((res) => {
  data = data.map((d) => {
    const tg =
      (res &&
        res.filter(
          (r) =>
            r.type + '-' + r.serialNumber === d.type + '-' + d.serialNumber,
        )) ||
      [];
    if (!!tg[0]) {
      return { ...d, ...tg[0] };
    } else {
      return d;
    }
  });
  try {
    const ret = data.filter((r) => !!r.lng);
    const content = `export default ${JSON.stringify(ret)}`;
    fs.writeFileSync(path.resolve(outputDir, 'jl/data.ts'), content);
    //文件写入成功。
    console.log(ret.length);
  } catch (err) {
    console.error(err);
  }
});

export { handleCsv, writeCsv };
