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
}

module.exports = { Take };
