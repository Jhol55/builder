
const blocksContext = require.context('./blocks', true, /block\.tsx$/);

blocksContext.keys().forEach((filename) => {
  blocksContext(filename);
});
