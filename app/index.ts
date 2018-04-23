import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppMain } from '@/component/Main/';
import { appService } from '@/service/app';

(async () => {

  if (appService.isDEBUG) {
    console.log('Running in DEBUG mode hhh');
  }

  ReactDOM.render(AppMain, document.getElementById('content'));

})();
