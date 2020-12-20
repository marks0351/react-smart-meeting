import { App } from 'App';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'SmartMeetings/store/store';

render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
