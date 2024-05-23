import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.intervalId = null;
    }
    render() {
        console.log('render');

        return <h1>{ this.state.counter }</h1>
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({ counter: prevState.counter + 1 }));
        }, 5000);
        console.log('component mount')
    }

    componentDidUpdate() {
        console.log('component update')
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        console.log('component unmount')
    }
}

root.render(<App/>);
