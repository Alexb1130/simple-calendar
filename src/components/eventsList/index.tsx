import {Component} from 'vue-property-decorator';
import {VueComponent} from '@/shims-vue';
import {useStore} from 'vuex-simple';
import {Store} from '@/store/';

import styles from './index.css?module';
import {EventItem} from "@/store/events";

@Component
export class EventsList extends VueComponent {

    private store: Store = useStore(this.$store);

    private get list() {
        return this.store.eventsStore.list;
    }

    private formSubmit = (evt: Event) => {
        evt.preventDefault();
        const form: any = evt.target;
        const value: string = form.elements['title'].value;

        if (value.trim()) {
            this.store.eventsStore.addEventItem(value)
            form.reset();
        }
    }

    private toggleComplete(item: EventItem) {
        this.store.eventsStore.toggleComplete(item);
    }

    render() {
        return (
            <div class={styles.events}>
                <p class={styles.title}>События</p>
                <ul class={styles.list}>
                    {this.list.map((item) => (
                        <li class={`${styles.event} ${item.done ? styles.complete : ''}`}>
                            <input
                                onChange={() => this.toggleComplete(item)}
                                checked={item.done}
                                type="checkbox"
                            />
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
                <form onSubmit={this.formSubmit} class={styles.form}>
                    <input type="text" name="title" placeholder="Текст"/>
                </form>
            </div>
        )
    }

}