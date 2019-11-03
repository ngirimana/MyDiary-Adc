import responses from './responses';

export const notAlphaNum = (res) => responses.errorResponse(res, 400, 'Entry slug should be a alphnumeric ');
