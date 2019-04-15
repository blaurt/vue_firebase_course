import store from "../store/store";

export default function(to, from, next) {
  if (store.getters.user) {
    next();
  } else {
    next({
      name: "login",
      query: {
        loginError: true
      }
    });
  }
}
