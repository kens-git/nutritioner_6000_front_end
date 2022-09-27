/**
  * Defines the response types of operations performed on
  * a REST endpoint.
*/
enum OperationCode {

  /** Signals the operation was successful. */
  SUCCESS,

  /**
   * Signals the operation attempted to submit
   * a new value that was expected to be unique,
   * when an identical existing value exists. 
   */
  DUPLICATE,

  /**
   * Signals the operation was performed without
   * valid credentials.
   */
  UNAUTHORIZED,

  INVALID,

  /**
   * Signals the operation failed due to a timeout.
   */
  TIMEOUT
}

export default OperationCode;
