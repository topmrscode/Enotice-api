const qs = require('qs');

exports.qsDecoder = (query, paramTypes) => {
  const parsedQuery = qs.parse(query);

  return Object.fromEntries(
    Object.entries(parsedQuery).map(([key, value]) => [key, paramTypes[key] && paramTypes[key](value)])
  );
};
