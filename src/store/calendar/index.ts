import Vue from 'vue';
import Vuex from 'vuex';
import {Mutation, State, Getter} from 'vuex-simple';
import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';
import getWeeksInMonth from 'date-fns/getWeeksInMonth';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import isToday from 'date-fns/isToday';
import isThisMonth from 'date-fns/isThisMonth';
import {Store} from '@/store/';

const DAYS_IN_WEEK = 7;

Vue.use(Vuex)

export interface Day {
    value: any
    today: boolean
    active: boolean
    notThisMonth: boolean
}

interface Week {
    days: Day[]
}

export class CalendarStore {

    @State()
    private date: Date = new Date();

    @State()
    public data: Week[] = [];

    @State()
    public selectedDay: Day = {
        value: this.date,
        today: false,
        active: false,
        notThisMonth: false
    };

    private rootStore: Store;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
    }

    public generate(): void {
        const calendar: Week[] = [];
        const weeksInCurrentMonth: number = getWeeksInMonth(this.date, {weekStartsOn: 1});
        const startDate: Date = startOfMonth(this.date);

        let currentDate: Date = startOfWeek(startDate, {weekStartsOn: 1});

        Array(weeksInCurrentMonth).fill(0).forEach(() => {
            calendar.push({
                days: Array(DAYS_IN_WEEK).fill(0).map(() => {
                    const value: Date = currentDate;
                    const today: boolean = isToday(value);
                    const notThisMonth: boolean = !isThisMonth(value);
                    const active: boolean = Boolean(this.rootStore.eventsStore.list.filter((event) => event.date === value).length);

                    const day: Day = {value, today, active, notThisMonth}

                    currentDate = addDays(currentDate, 1);

                    if (day.today) {
                        this.selectedDay = day;
                    }

                    return day;
                })
            })
        })

        this.data = calendar;
    }

    @Mutation()
    public changeDay(day: Day): void {
        this.selectedDay = day;
    }

    @Mutation()
    public setActiveDay(): void {
        this.selectedDay.active = true;
    }

    @Getter()
    public get dateTitle(): string {
        return format(this.date, 'LLLL yyyy', {locale: ru})
    }
}
