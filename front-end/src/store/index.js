import { createStore } from "redux";

const reducer = (
  state = {
    userData: {},
    selectedProblem: {},
    problemList: [],
    problemSubmissionStatus: false,
    showSubmissionCodePanel: {},
  },
  action
) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_PROBLEM_LIST":
      return {
        ...state,
        problemList: action.payload,
      };
    case "SET_SELECTED_PROBLEM":
      return {
        ...state,
        selectedProblem: action.payload,
      };

    case "ACCEPTED_SUBMISSION_STATUS":
      return {
        ...state,
        problemSubmissionStatus: true,
      };

    case "WRONG_SUBMISSION_STATUS":
      return {
        ...state,
        problemSubmissionStatus: false,
      };
    case "RESET_SUBMISSION_STATUS":
      return {
        ...state,
        problemSubmissionStatus: false,
      };
    case "SHOW_SUBMISSION_CODE_PANEL":
      return {
        ...state,
        showSubmissionCodePanel: {
          show: true,
          submission: action.payload,
        },
      };
    case "HIDE_SUBMISSION_CODE_PANEL":
      return {
        ...state,
        showSubmissionCodePanel: {
          show: false,
          submission: "",
        },
      };
      case "LOGOUT":
      return {
        ...state,
        userData: {},
        selectedProblem: {},
        problemList: [],
        problemSubmissionStatus: false,
        showSubmissionCodePanel: {}
      };
    default:
      return state;
  }
    
  
};

const store = createStore(reducer);

export default store;
