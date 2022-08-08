const API_VERSION = 'v1';
const BASE_ENDPOINT = `petlove/api/${API_VERSION}/`;

const AUTH_ENDPOINT = BASE_ENDPOINT + 'auth';
const USER_ENDPOINT = BASE_ENDPOINT + 'users';
const PET_CATEGORY_ENDPOINT = BASE_ENDPOINT + 'pet-category';

const PRODUCT_ENDPOINT = BASE_ENDPOINT + 'product';

console.log(AUTH_ENDPOINT);

export {
  AUTH_ENDPOINT,
  USER_ENDPOINT,
  PET_CATEGORY_ENDPOINT,
  PRODUCT_ENDPOINT,
};
