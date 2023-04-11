// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from 'cheerio';
import fs from 'fs';
import { Product } from './types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {

  const url = "https://www.futuretools.io/"; // 目标网址
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  let data: Product[] = [];
  $('.tool-item-columns---new').each((index, element) => {
    const title = $(element).find('.tool-item-link---new').text();
    const description = $(element).find('.tool-item-description-box---new').text();
    const link = $(element).find('.tool-item-new-window---new').attr('href');
    const image = $(element).find('.tool-item-image---new').attr('src');
    data.push({title, description, link, image});
  });

  // Write the JSON string to a local file
  fs.writeFile('./public/data/futuretools.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing JSON data to a file:', err);
    } else {
      console.log('JSON data has been successfully written to futuretools.json');
    }
  });

  res.status(200).json(data)
}
