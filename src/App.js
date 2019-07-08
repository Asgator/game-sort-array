import React from 'react';
import cx from 'classnames';
import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';

import './App.css';

const savedLength = Number(localStorage.getItem('savedLength')) || 2;
const savedNumbers = localStorage.getItem('savedNumbers') ? JSON.parse(localStorage.getItem('savedNumbers')) : {};

const createArray = (length) => {
    return Array(length).fill(length).map((_, i) => i);
};

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            array: this.shuffle(savedLength, savedNumbers),
            length: savedLength,
            savedNumbers: savedNumbers
        };
    }

    timer;

    componentDidMount() {
        this.startTimer(this.state.length)
    }

    startTimer(length) {
        const time = 800 - (length * 10);

        this.timer = setInterval(() => {
            this.setState({
                array: this.shuffle(this.state.length, this.state.savedNumbers)
            })
        }, time < 350 ? 350 : time);
    }

    handleToggle = () => {
        this.checkArray();
    }

    shuffle = (length, savedNumbers) => {
        const array = createArray(length);
        let shuffleNumbers = array.filter((item) => {
            return !savedNumbers[item];
        });

        shuffleNumbers = flatten(chunk(shuffleNumbers, 6).map(a => shuffle(a)));

        const data = array.map(item => savedNumbers[item] ? item : shuffleNumbers.shift());

        return data;
    }

    checkArray = () => {
        const copyArray = createArray(this.state.length);
        let savedNumbers = {};
        const resetLength = Object.keys(this.state.savedNumbers).length;

        const isGood = this.state.array.every((item, i) => {
            const isGood = item === copyArray[i];

            if (isGood) {
                savedNumbers[item] = true;

                return isGood
            }

            if (resetLength === i) {
                savedNumbers = {};
            }

            return isGood;
        });

        if (!isGood) {
            this.setState({
                isRun: false,
                savedNumbers
            });

            localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));

            return;
        }

        const newLength = this.state.length + 1;

        localStorage.setItem('savedLength', newLength);
        localStorage.setItem('savedNumbers', JSON.stringify({}));

        clearInterval(this.timer);

        this.setState({
            array: this.shuffle(newLength, {}),
            length: newLength,
            savedNumbers: {}
        });

        this.startTimer(newLength)
    }

    renderItem = (i) => <div key={i} className={cx('item', { active: this.state.savedNumbers[i] })}>{i}</div>;

    render() {
        const { array } = this.state;

        return (
            <div className="wrapper">
                <div className="title">
                    Easy sort array
                </div>
                <div className="sub-title">
                    level:<div className="points"> {this.state.length - 2}</div>
                </div>

                <div className="array">
                    {array.map(this.renderItem)}
                </div>

                <div className="button" onClick={this.handleToggle}>
                    Check
                </div>
            </div>
        );
    }
}

export default App;
