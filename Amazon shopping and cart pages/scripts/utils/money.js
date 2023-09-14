// this file contains the basic utilities related to money for the website

export function formatCurrency(priceCents) {
  let priceDollars = (priceCents / 100);
  return priceDollars.toFixed(2); // always display 2 decimal places
}