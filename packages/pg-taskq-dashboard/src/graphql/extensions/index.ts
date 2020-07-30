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

export const Query = {
  local: {
    searchForm: localObservable("searchForm", { descendants: "direct" })
  }
};

/**
 * Add a key to a type
 */
// export const User = {
//   [GET_KEY]: (user) => user.id
// }

/**
 * Add custom data to a type
 * @example
 * query.users[0].follow()
 */
// export const User = (user) => ({
//   follow() {
//     console.log('follow', user.id)
//   }
// })
