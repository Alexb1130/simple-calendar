import {Component, Vue} from 'vue-property-decorator';
import {Calendar} from './components/calendar';
import {EventsList} from './components/eventsList';

import './App.css';

@Component
export default class App extends Vue {

    render() {
        return (
            <div id="app">
                <div class="container">
                    <Calendar/>
                    <EventsList/>
                </div>
            </div>
        )
    }
}
