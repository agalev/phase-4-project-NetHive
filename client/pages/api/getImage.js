// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
  const { imagePath } = req.query;
  const filePath = path.join(__dirname, `../../../../../server/static/images/${imagePath}`);
  const fileContent = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(fileContent);
}
