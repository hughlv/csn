// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from 'cheerio';
import fs from 'fs';
import { Product } from './types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {

  const url = "https://ai-bot.cn"; // 目标网址
  // TODO：目标网页是动态加载的，所以需要考虑如何模拟操作滚动到页面底部
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  let data: Product[] = [];
  $('.url-body').each((index, element) => {
    const title = $(element).find('.url-info strong').text();
    const description = $(element).find('.url-info > p').text();
    const link = $(element).find('a').attr('data-url');
    const image = $(element).find('.url-img > img').attr('data-src');
    if (data.some(obj => obj['title'] === title)) {
      console.log('Duplicate title:', title, 'skipped');
    } else {
      data.push({title, description, link, image});
    }
  });

  // Write the JSON string to a local file
  fs.writeFile('./public/data/aibot.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing JSON data to a file:', err);
    } else {
      console.log('JSON data has been successfully written to aibot.json');
    }
  });

  res.status(200).json(data)
}
