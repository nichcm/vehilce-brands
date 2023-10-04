/* eslint-disable import/no-anonymous-default-export */
const INITIAL_STATE = {
  loading: false,
  menuCollapsed: true,
  filtersList: [],
  optionsListFunction: null,
  filtersToSearch: [],
  authentication: {
    accessToken: null
  },
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        loading: true
      };
    case "COLLAPSE_CHANGE":
      return {
        ...state,
        menuCollapsed: action.menuCollapsed
      };
    case "AUTHENTICATE":
      return {
        ...state,
        authentication: action.authentication
      };
    case "LOGOUT":
      return INITIAL_STATE;
    case "START_REDUX":
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          fullName: action.fullName
        }
      };
    case "LOAD_FILTERS":
      return {
        ...state,
        filtersList: action.filtersList
      };
    case "SEARCH_FILTERS":
      return {
        ...state,
        filtersToSearch: action.filtersToSearch
      };
    case "FILTER_OPTIONS":
      return {
        ...state,
        optionsListFunction: action.optionsListFunction
      };
    default:
      return state;
  }
};
