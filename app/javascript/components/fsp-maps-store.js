import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// New modules
import { handleModule } from 'redux-tools';

// Components
import * as fspMaps from 'components/fsp-maps';
import * as sidebar from 'components/sidebar';
import * as sectors from 'components/sidebar/sectors';
import * as contextualLayers from 'components/sidebar/contextual-layers';

const reducer = combineReducers({
  fspMaps: handleModule(fspMaps),
  sidebar: handleModule(sidebar),
  sectorLayers: handleModule(sectors),
  contextualLayers: handleModule(contextualLayers)
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
