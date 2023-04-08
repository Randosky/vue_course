import {Module} from "vuex";
import { State } from ".";

interface Auto{
    name: string;
}

const autos: Module<Auto, State> = {
    // Если мы добавляем имя в основном стейте. А мы добавлии auto = autos
    namespaced: true,
    state: {
        name: "Cruiser"
    },
    mutations: {
        changeCar(state: Auto, payload: Auto) {
            state.name = payload.name;
        }
    },
    actions: {
        setCar({commit}, name:string) {
            commit("changeCar", {name: name})
        }
    }
}

export default autos