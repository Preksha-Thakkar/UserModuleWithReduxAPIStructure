import { Item_CRUD } from "../actiontype";

const initialState: { numberOfItems: number } = {
  numberOfItems: 0,
};

export const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Item_CRUD.ADD_ITEM:
      return {
        ...state,
        numberOfItems: state.numberOfItems + 1,
        data: actions.payload,
      };
    case Item_CRUD.REMOVE_ITEM:
      return {
        ...state,
        numberOfItems: state.numberOfItems - 1,
      };
    case Item_CRUD.FETCH_DATA:
      return {
        ...state,
        fetchData: actions.payload,
      };
    case Item_CRUD.UPDATE_DATA:
      let index = state.fetchData.result.records.findIndex(
        (x) => x.id === actions.payload.result.id
      );
      state.fetchData.result.records[index] = actions.payload.result;
      return {
        ...state,
        fetchData: state.fetchData,
      };
    case Item_CRUD.ADD_DATA:
      state.fetchData.result.records.push(actions.payload.result.user);
      return {
        ...state,
        fetchData: state.fetchData,
      };
    case Item_CRUD.DELETE_DATA:
      state.fetchData.result.records = state.fetchData?.result?.records.filter(
        (x) => x.id !== actions.payload
      );
      return {
        ...state,
        fetchData: state.fetchData,
      };

    default:
      return state;
  }
};
