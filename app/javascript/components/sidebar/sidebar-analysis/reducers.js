import * as actions from './actions';

export default { [actions.setAnalysis]: (state, { payload }) => ({ ...state, analysis: payload }) };
