import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// New modules
import { handleModule } from 'redux-tools';

// Components
import * as fspMaps from 'components/fsp-maps';
import * as intro from 'components/intro';
import * as sidebar from 'components/sidebar';
import * as map from 'components/map';
import * as sectors from 'components/sidebar/sectors';
import * as contextualLayers from 'components/sidebar/contextual-layers';
import * as legend from 'components/map/legend';


const reducer = combineReducers({
  common: handleModule(fspMaps),
  intro: handleModule(intro),
  sidebar: handleModule(sidebar),
  map: handleModule(map),
  sectorLayers: handleModule(sectors),
  contextualLayers: handleModule(contextualLayers),
  legend: handleModule(legend)
});

const initStore = (initialState = {}) =>
  createStore(
    reducer,
    initialState,
    /* Redux dev tool, install chrome extension in
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
    composeWithDevTools(
      /* The router middleware MUST be before thunk otherwise the URL changes
      * inside a thunk function won't work properly */
      applyMiddleware(thunk)
    )
  );

export { initStore };