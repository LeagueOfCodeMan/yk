import { writeCsv } from '../handleCsvComposeJson';

export default {
  '/api/mark': async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const type = req.query.type - 0;
    const serialNumber = req.query.serialNumber - 0;
    const lng = req.query.lng - 0;
    const lat = req.query.lat - 0;
    if (type && serialNumber && lng && lat) {
      try {
        await writeCsv({
          type,
          serialNumber,
          lng,
          lat,
        });
        res.end('写入成功');
      } catch (e) {
        res.end('写入失败');
      }
    }
  },
};
