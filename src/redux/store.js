import { createStore} from "redux";
import handleFav from "./reducers/favorites"

export const store = createStore(handleFav)

