import Vue from 'vue'
import Vuex from 'vuex'
import {Module} from 'vuex-simple';
import {CalendarStore} from './calendar';
import {EventsStore} from './events';

Vue.use(Vuex)

export class Store {

    @Module()
    public calendar = new CalendarStore(this);

    @Module()
    public eventsStore = new EventsStore(this);

}
