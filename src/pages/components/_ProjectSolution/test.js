const queryString = 'name=CoderBin&age=18';

const params = new URLSearchParams(queryString);

const paramsEntries = params.entries();

const data = Object.fromEntries(paramsEntries) // 

console.log({paramsEntries, data})