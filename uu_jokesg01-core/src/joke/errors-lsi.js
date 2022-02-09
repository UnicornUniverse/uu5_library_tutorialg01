import Errors from "./errors";

const Lsi = {
  [Errors.NoOidError.code]: {
    en: "The oid property is missing!",
    cs: "Není zadána property oid!",
  },
  "uu-jokes-main/joke/addRating/userNotAuthorized": {
    en: "The author is not allowed to rate own jokes.",
    cs: "Autor nemůže hodnotit vlastní vtipy.",
  },
};

export default Lsi;
