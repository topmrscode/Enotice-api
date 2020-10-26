const isConnected = (ctx) => !!ctx.state && !!ctx.state.organization;

exports.isConnected = isConnected;
