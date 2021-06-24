import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CAPQUALIF_URL, REQUESTS_ENDPOINT } from '../../../../api/apiList';

import { findIndex, isEmpty } from '../../../../app/utils';
import { REQUEST } from '../../../../dictionnary/demandeDeTitre';

const initialState = {
  requestor: {
    numeroDeMarin: '',
    firstName: '',
    lastName: '',
  },
  possibleRequests: [],
};

export const postRequest = createAsyncThunk(
  'requests/postRequest',
  async (sourceRequest, thunkAPI) => {
    const request = {
      requestor: {
        ...sourceRequest.requestor,
      },
      details: {
        ...sourceRequest.details,
        startDate: getTodayDate(),
      },
    };
    if (isRequestFilled(request)) {
      const response = await axios.post(
        `${CAPQUALIF_URL}/${REQUESTS_ENDPOINT}`,
        request
      );
      return response.data;
    }
  }
);

/**
 * TODO: validate more than just the fact that request is filled
 */
const isRequestFilled = (request) => {
  return !isEmpty(request.requestor) && !isEmpty(request.details);
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    createRequest(state, action) {
      state.requestor.numeroDeMarin = action.payload.requestor.numeroDeMarin;
      state.requestor.firstName = action.payload.requestor.firstName;
      state.requestor.lastName = action.payload.requestor.lastName;
      state.possibleRequests.push({
        requestedTitreId: action.payload.titreId,
        startDate: '',
        requestStatus: REQUEST.STATUS_REQUEST.NOT_SENT.SHORT,
        documents: [],
        canBeSent: false,
      });
    },
    cleanRequests(state) {
      state.possibleRequests = [];
    },
    addDocuments(state, action) {
      const { titreId, condition } = action.payload;
      const documents =
        state.possibleRequests[
          findIndex(state.possibleRequests, 'requestedTitreId', titreId)
        ]?.documents;
      if (documents) {
        if (
          isConditionAlreadyInTheArray(documents, 'conditionId', condition.id)
        ) {
          const newDocuments = action.payload.conditionDocuments;
          updateDocuments(documents, 'conditionId', condition.id, newDocuments);
        } else {
          documents.push(condition);
        }
      }
    },
    setCanBeSent(state, action) {
      state.possibleRequests[
        findIndex(
          state.possibleRequests,
          'requestedTitreId',
          action.payload.titreId
        )
      ].canBeSent = action.payload.canRequestBeSent;
    },
  },
  extraReducers: {
    [postRequest.fulfilled]: (state, action) => {
      state.possibleRequests[
        findIndex(
          state.possibleRequests,
          'requestedTitreId',
          action.payload.titreId
        )
      ] = action.payload;
    },
  },
});

const getTodayDate = () => {
  return new Date().toDateString();
};

const isConditionAlreadyInTheArray = (array, property, value) => {
  return findIndex(array, property, value) !== -1 ? true : false;
};

const updateDocuments = (documents, property, conditionId, newDocuments) => {
  documents[
    findIndex(documents, property, conditionId)
  ].conditionDocuments = newDocuments;
};

export const {
  createRequest,
  cleanRequests,
  addRequestor,
  addStartDate,
  addDocuments,
  setCanBeSent,
} = requestsSlice.actions;

export default requestsSlice.reducer;
