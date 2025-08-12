const { nanoid } = require('nanoid');

function nextQueueNumber(db) {
  const q = db.data?.queue || [];
  const last = q.slice(-1)[0];
  return last ? last.number + 1 : 1;
}

module.exports = { nextQueueNumber };
