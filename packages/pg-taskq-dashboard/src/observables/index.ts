import { observable, autorun } from "mobx";

function localObservable<T>(key: string, defaultValue: T) {
  let localValue;
  const localValueRaw = localStorage.getItem(key);
  if (localValueRaw) {
    try {
      localValue = Object.assign(defaultValue, JSON.parse(localValueRaw));
    } catch {}
  }
  const observableValue = observable.object(localValue || defaultValue);
  autorun(() => {
    localStorage.setItem(key, JSON.stringify(observableValue));
  });
  return observableValue;
}

export const searchFrom = localObservable("searchForm", {
  descendants: "direct",
});
