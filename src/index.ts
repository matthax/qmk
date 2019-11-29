import { RequestError } from './lib/api';
import { QMK } from './lib/qmk';

// Export types, API_ROOT and QMKClient
export * from './lib/qmk';
// Export the RequestError type so it can be used by consumers
export { RequestError };
// Export QMKClient as the default, just for ease of use
export default QMK;
