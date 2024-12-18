const puppeteer = require('puppeteer');

const scrapeBookingHotel = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const hotelData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('.hotel-photos img')).map(img => img.src);
    const title = document.querySelector('.hp__hotel-name').innerText;
    const rating = document.querySelector('.review-score-badge').innerText;
    const reviews = Array.from(document.querySelectorAll('.review_list .review_item')).map(review => ({
      text: review.querySelector('.review_item_text').innerText,
      rating: review.querySelector('.review_item_rating').innerText,
      date: review.querySelector('.review_item_date').innerText
    }));

    return { images, title, rating, reviews };
  });

  await browser.close();
  return hotelData;
};

const scrapeMakeMyTrip = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const hotelData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('.slideshow-image')).map(img => img.src);
    const price = document.querySelector('.price-value').innerText;
    const amenities = Array.from(document.querySelectorAll('.amenity-item')).map(item => item.innerText);

    return { images, price, amenities };
  });

  await browser.close();
  return hotelData;
};

module.exports = {
  scrapeBookingHotel,
  scrapeMakeMyTrip
};
