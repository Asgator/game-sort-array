import React from 'react';
import cx from 'classnames';
import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';

import LIGHT_FINGERS_SRC from './finger.png';

import './App.css';

const savedLength = Number(localStorage.getItem('savedLength')) || 1;
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
        const time = 800 - (length * 15);

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

    handleOnDown = (e) => {
        e.currentTarget.classList.add('press-finger')

        const copyArray = createArray(this.state.length);
        let savedNumbers = {};
        const resetLength = Object.keys(this.state.savedNumbers).length;

        clearInterval(this.timer);

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

        let newLength = this.state.length;

        if (!isGood) {
            if (isEmpty(savedNumbers) && isEmpty(this.state.savedNumbers)) {
                newLength--
            }
        } else {
            savedNumbers = {};

            newLength++;
        }

        localStorage.setItem('savedLength', newLength);
        localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));

        this.setState({
            array: this.shuffle(newLength, savedNumbers),
            length: newLength,
            savedNumbers
        });

        this.startTimer(newLength)
    }

    handleOnUp = (e) => e.currentTarget.classList.remove('press-finger');

    renderItem = (i) => <div key={i} className={cx('item', { active: this.state.savedNumbers[i] })}>{i}</div>;

    render() {
        const { array } = this.state;

        return (
            <div className="wrapper">
                <div className="title">
                    Easy sort array
                </div>
                <div className="sub-title">
                    level:<div className="points"> {this.state.length - 1}</div>
                </div>

                <div className="array">
                    {array.map(this.renderItem)}
                </div>

                <img
                    src={LIGHT_FINGERS_SRC}
                    alt="finger"
                    onMouseDown={this.handleOnDown}
                    onMouseUp={this.handleOnUp}
                    className="finger"
                />
            </div>
        );
    }
}

export default App;
