const date = new Date();

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

export { currentDate };