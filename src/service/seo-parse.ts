import * as cheerio from 'cheerio';

async function handler(url: string) {

  const response = await fetch(url as string);
  const text = await response.text();

  const $ = cheerio.load(text);
  const title = $('head title').text();
  const desc = $('meta[name="description"]').attr('content');
  const icon = $('link[rel*="icon"]')
    .map((i, el) => $(el).attr('href'))
    .toArray();
  const keywords = $('meta[name="keywords"]').attr('content');
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogKeywords = $('meta[property="og:keywords"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  const twitterDesc = $('meta[name="twitter:description"]').attr('content');

  return {
    status: 'success',
    data: {
      title,
      desc,
      icon,
      keywords,
      ogTitle,
      ogImage,
      ogKeywords,
      ogDesc,
      twitterTitle,
      twitterImage,
      twitterDesc,
    },
  };
}

export default handler;
