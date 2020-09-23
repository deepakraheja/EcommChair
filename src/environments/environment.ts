// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  stripe_token: 'STRIPE_PUBLISHABLE_KEY',
  paypal_token: 'PAYPAL_CLIENT_ID',




  isContentLoading: false,
  //BASE_API_URL: 'https://esssrv.schedulingsite.com/essservice/Service.svc/',
  //BASE_API_URL: 'http://localhost:61397/ESSServicetest/Service.svc/',


  //Domain: 'http://localhost:4200/',

  //BASE_API_URL: 'http://ecomapi.uccnoida.com/api/',
  //ProductImage: 'http://ecomapi.uccnoida.com/ProductImage/',

//*********************Local Server************* */

  ProductImage: 'http://localhost:5205/ProductImage/',
  BASE_API_URL: 'http://localhost:5205/api/',
  
  //*********************Production Server************* */
  //BASE_API_URL: 'http://34.67.65.213/ecommapi/api/',
  //ProductImage: 'http://34.67.65.213/ecommapi/ProductImage/',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
