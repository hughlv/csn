// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from 'cheerio';
import fs from 'fs';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const url = "https://www.producthunt.com/topics/artificial-intelligence?order=most_followed"; // 目标网址
  // TODO：目标网页是动态加载的，所以需要考虑如何模拟操作滚动到页面底部
  const response = await fetch(url);
  const html = await response.text();
  console.log(html);
  const $ = cheerio.load(html);
  let data = [];
  $('ul').each((index, element) => {
    console.log(element);
    const title = $(element).find('div[class=noOfLines-1]').text();
    const description = $(element).find('div[class=noOfLines-2]').text();
    const link = $(element).find('a').attr('href');
    const image = $(element).find('img').attr('src');
    data.push({title, description, link, image});
  });

  // Write the JSON string to a local file
  fs.writeFile('./public/data/producthunt.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing JSON data to a file:', err);
    } else {
      console.log('JSON data has been successfully written to producthunt.json');
    }
  });

  res.status(200).json(data)
}
