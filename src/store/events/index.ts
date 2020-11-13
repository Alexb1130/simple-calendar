import Vue from 'vue'
import Vuex from 'vuex'
import {Mutation, State, Getter} from 'vuex-simple';
import {Store} from '@/store/';
import {Day} from "@/store/calendar";

export interface EventItem {
    id?: string
    title: string
    date: Date | string
    done?: boolean
}

Vue.use(Vuex)

export class EventsStore {

    private rootStore: Store;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
    }

    @Getter()
    private get selectedDate(): Day {
        return this.rootStore.calendar.selectedDay;
    }

    @State()
    private eventsList: EventItem[] = []

    @Mutation()
    public addEventItem(value: string): void {

        const eventItem: EventItem = {
            title: value,
            date: this.selectedDate?.value,
            done: false
        }

        this.eventsList.push(eventItem);
        this.rootStore.calendar.setActiveDay();
    }

    @Mutation()
    public toggleComplete(eventItem: EventItem) {
        eventItem.done = !eventItem.done;
    }

    @Getter()
    public get list(): EventItem[] {
        return this.eventsList.filter(events => events.date === this.selectedDate.value)
    }
}
