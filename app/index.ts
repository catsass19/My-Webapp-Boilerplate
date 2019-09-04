import * as ReactDOM from 'react-dom';
import { AppMain } from '@/component/Main/';
import appService from '@/service/app';

(async () => {
  if (appService.isDEBUG) {
    console.log('Running in DEBUG mode');
    try {
      await import(/* webpackChunkName: "debug" */ '@/service/debug');
    } catch (err) {
      console.error('Failed to inject debug service', err);
    }
  }
  if ('serviceWorker' in navigator) {
       window.addEventListener('load', () => {
         navigator.serviceWorker.register('/service-worker.js').then(registration => {
         console.log('SW registered: ', registration);
         }).catch(registrationError => {
           console.log('SW registration failed: ', registrationError);
         });
       });
     }

  ReactDOM.render(AppMain, document.getElementById('content'));
})();
