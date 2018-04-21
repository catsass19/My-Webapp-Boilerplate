import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { appService } from './service/app';

import { AppMain } from './component/Main/';

if (appService.isDEBUG) {
  console.log('Running in DEBUG mode');
}

ReactDOM.render(AppMain, document.getElementById('content'));
