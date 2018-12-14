import {
  GET_SOUVENIRS,
  GET_SOUVENIR,
  GET_UNITS,
  ADD_SOUVENIR,
  UPDATE_SOUVENIR,
  DELETE_SOUVENIR
} from "../actions/types";

const initialState = {
  souvenirs: [],
  souvenir: {},
  units: [],
  status: 0,
  message: ""
};

export default function(state = initialState, action) {
  let status;
  let message;

  switch (action.type) {
    case GET_UNITS:
      return {
        ...state,
        units: action.payload
      };
    case GET_SOUVENIRS:
      return {
        ...state,
        souvenirs: action.payload
      };
    case GET_SOUVENIR:
      return {
        ...state,
        souvenir: action.payload
      };
    case ADD_SOUVENIR:
      let addSouvenir;
      // Return All Souvenir Data
      if (action.code === 201) {
        addSouvenir = [...state.souvenirs];
        status = 3;
        message = action.payload;
      }
      // Return Souvenir Data That Have Been Filtered
      if (action.code === 200) {
        addSouvenir = [...state.souvenirs, action.payload];
        status = 1;
        message = `Data Saved! New Souvenir Has Been Added with Code ${
          action.payload.code
        }!`;
      }
      return {
        ...state,
        souvenirs: addSouvenir,
        status,
        message
      };
    case UPDATE_SOUVENIR:
      let updatedSouvenir;
      // Return All Souvenir Data Without Changing Any Data
      if (action.code === 201) {
        updatedSouvenir = [...state.souvenirs];
        status = 3;
        message = action.payload;
      }

      if (action.code === 200) {
        updatedSouvenir = state.souvenirs.map(souvenir => {
          if (souvenir._id === action.souvenirId) {
            return { ...souvenir, ...action.payload };
          }
          return souvenir;
        });
        status = 1;
        message = "Data Updated! Data Souvenir Has Been Updated!";
      }

      return {
        ...state,
        souvenirs: updatedSouvenir,
        status,
        message
      };

    case DELETE_SOUVENIR:
      let deletedSouvenir;

      // Return All Souvenir Data
      if (action.code === 201) {
        deletedSouvenir = [...state.souvenirs];
        status = 3;
        message = action.message;
      }
      // Return Souvenir Data That Have Been Filtered
      if (action.code === 200) {
        const filtered = state.souvenirs.filter(
          souvenir => souvenir.code !== action.payload
        );
        deletedSouvenir = filtered;
        status = 1;
        message = `Data Deleted! Data Souvenir with Code ${
          action.payload
        } Has Been Deleted!`;
      }

      return {
        ...state,
        souvenirs: deletedSouvenir,
        status,
        message
      };

    default:
      return state;
  }
}
