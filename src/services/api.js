const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
//const query = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
//const category = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
//const queryCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`;


export async function getCategories() {
  const request = await fetch(endPoint);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const queryCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`;
  const request = await fetch(queryCategory);
  const requestJson = await request.json();
  console.log(requestJson);
  return requestJson;
}

export async function getProductById(PRODUCT_ID) {
  const product = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const request = await fetch(product);
  const requestJson = await request.json();
  return requestJson;
}
