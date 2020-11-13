import {Component} from 'vue-property-decorator';
import {VueComponent} from '../../shims-vue';
import {useStore} from 'vuex-simple';
import {Store} from '../../store/';
import format from 'date-fns/format';
import {Day} from "@/store/calendar";

import styles from './index.css?module';

type DayName = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс';

@Component
export class Calendar extends VueComponent {

    private store: Store = useStore(this.$store);

    private daysNames: DayName[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    private get dateTitle() {
        return this.store.calendar.dateTitle;
    }

    private get calendar() {
        return this.store.calendar.data;
    }

    private get selectedDay() {
        return this.store.calendar.selectedDay;
    }

    private changeDay(day: Day): void {
        this.store.calendar.changeDay(day);
    }

    mounted(): void {
        this.store.calendar.generate();
    }

    render() {
        return (
            <div class={styles.calendar}>
                <p class={styles.title}>{this.dateTitle}</p>
                <div class={styles.header}>
                    {this.daysNames.map((dayName: DayName) => <div>{dayName}</div>)}
                </div>
                {this.calendar.map((week) => (
                    <div class={styles.row}>
                        {week.days.map(day => (
                            day.notThisMonth ? <div></div>
                                : <div
                                    class={`
                                        ${day === this.selectedDay ? styles.selected : ''} 
                                        ${day.today ? styles.today : ''} 
                                        ${day.active ? styles.active : ''}
                                    `}
                                >
                                <span onClick={() => this.changeDay(day)}>
                                    {format(day.value, 'd')}
                                </span>
                                </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

}