// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  stripe_token: 'STRIPE_PUBLISHABLE_KEY',
  paypal_token: 'PAYPAL_CLIENT_ID',




  isContentLoading: false,



  //*********************Local Server************* */

  // ProductImage: 'http://localhost:56283/ProductImage/',
  // BASE_API_URL: 'http://localhost:56283/api/',
  // Report_Path: 'http://localhost:56283/ReportGenerate/',
  // WebSite_URL: 'http://localhost:4200/',
  // Invoice_URL:'http://localhost:56283/TempPDF/',
  // APIURL:'http://localhost:56283/',
  // CCAvenue: 'http://localhost:61970/',
  //*********************Production Server************* */

  // BASE_API_URL: 'http://apiservice.alibabachair.com/api/',
  // ProductImage: 'http://apiservice.alibabachair.com/ProductImage/',
  // Report_Path: 'http://apiservice.alibabachair.com/ReportGenerate/',
  // WebSite_URL: 'www.alibabachair.com',
  // Invoice_URL:'http://apiservice.alibabachair.com/TempPDF/',

  BASE_API_URL: 'https://store.alibabachair.com/api/',
  ProductImage: 'https://store.alibabachair.com/ProductImage/',
  Report_Path: 'https://store.alibabachair.com/ReportGenerate/',
  WebSite_URL: 'www.alibabachair.com',
  Invoice_URL: 'https://store.alibabachair.com/TempPDF/',
  APIURL: 'https://store.alibabachair.com/',
  CCAvenue: 'http://localhost:61970/', 

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
