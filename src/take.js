class Take {
  onFirstAttempt(cb) {
    this.onFirstAttemptCallback = cb;
    return this;
  }
  onExecute(cb) {
    this.onExecuteCallback = cb;
    return this;
  }
  onFailure(cb) {
    this.onFailureCallback = cb;
    return this;
  }
  onSuccess(cb) {
    this.onSuccessCallback = cb;
    return this;
  }
  onTimeout(cb) {
    this.onTimeoutCallback = cb;
    return this;
  }
  onLocked(cb) {
    this.onLockedCallback = cb;
    return this;
  }
}

module.exports = { Take };
