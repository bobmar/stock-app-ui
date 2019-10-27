//const TEST_URL = 'http://bob-hp:8080/';
const TEST_URL = 'http://192.168.0.62:8080/';
const BASE_URI = 'stocks/'
const STOCK_CHARTS_URL = 'https://stockcharts.com/h-sc/ui?s={tickerSymbol}'
const STOCK_CHARTS_PNF = 'https://stockcharts.com/freecharts/pnf.php?c={tickerSymbol},P'
// Set to true for design-time testing only. Set to false before building for deployment
let isTest = false;
export const DASHBOARD_LIST = 'stat/dashboardtype/list';
export const DASHBOARD_BULL_BEAR = 'stat/bullbear/list';
export const STAT_TYPE_LIST = 'stat/type/list';
export const STAT_FOR_TICKER = 'stat/{tickerSymbol}';
export const STAT_LIST = 'stat/list';
export const SIGNAL_TYPE_LIST = 'signal/type';
export const SIGNAL_BY_TYPE = 'signal/list/{signalType}';
export const SIGNAL_BY_DATE_TYPE = 'signal/datetype/list';
export const SIGNAL_BY_DATE_TYPES = 'signal/datetype/merged';
export const SIGNAL_PRICE_BY_TYPE = 'signal/list/multi';
export const TICKER_LIST_UPLOAD = 'ticker/upload';
export const TICKER_PAGE = 'ticker/page';
export const TICKER_LIST_SAVE = 'ticker/list/save';
export const PRICE_COMPOSITE = 'price/latest/{tickerSymbol}';
export const PRICE_COMPOSITE_BY_ID = "signal/cprice";

export const replacePathVar = (uriStr, paramStr, value)=> {
    let pattern = new RegExp(paramStr);
    let newUri = uriStr.replace(pattern, value);
    return newUri;
}

export const buildUrl = (uri)=> {
    let url = isTest?TEST_URL:'';
    url += BASE_URI + uri;
    return url;
}

export const stockChartsUrl = (tickerSymbol)=> {
    let url = replacePathVar(STOCK_CHARTS_URL, '{tickerSymbol}', tickerSymbol);
    return url;
}

export const stockChartsPnf = (tickerSymbol)=> {
    let url = replacePathVar(STOCK_CHARTS_PNF, '{tickerSymbol}', tickerSymbol);
    return url;
}
