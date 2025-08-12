// Temporary in-memory store
let queue = [];
let appointments = [];
let nextQueueNumber = 1;

module.exports = {
    queue,
    appointments,
    getNextQueueNumber: () => nextQueueNumber++,
};
