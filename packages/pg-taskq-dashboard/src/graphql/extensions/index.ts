import { observable } from "mobx";

export const Query = {
  local: {
    searchForm: observable.object({
      descendants: "all"
    })
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
