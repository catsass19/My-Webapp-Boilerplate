import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { appService } from './service/app';

(async () => {

  const t : any = window;

  t.TEST = async () => {
    const { AppMain } = await import(/* webpackChunkName: "Main" */ './component/Main/');

    if (appService.isDEBUG) {
      console.log('Running in DEBUG mode');
    }

    ReactDOM.render(AppMain, document.getElementById('content'));
  };

})();
