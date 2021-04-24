const GET_DATA_CURRENCY = "GET_DATA_CURRENCY";
const IS_VISIBLE = "IS_VISIBLE";

export const getDataCurrencyAC = (data) => ({ type: GET_DATA_CURRENCY, payload: { data } });
export const isVisibleAC = (isVisible) => ({ type: IS_VISIBLE, payload: {isVisible} });

export const getDataCurrency = () => async (dispatch) => {
  try {

    const response =  await fetch(
        'https://www.cbr-xml-daily.ru/daily_json.js', {
        method: 'GET'
      }).then(res => res.json())

    if (!response.error) {
      const data = response;
      dispatch(getDataCurrencyAC(data));
    } 

  } catch (err) {
    console.log('Err', err);
  }
};