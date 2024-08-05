
const blocksContext = require.context('./blocks', true, /frontend\.tsx$/);

blocksContext.keys().forEach((filename) => {
  blocksContext(filename);
});
