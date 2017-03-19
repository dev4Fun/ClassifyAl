import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
        background: '#C5CAE9',
    },

    chipLabel: {
        fontSize: '12px',
        fontWeight: '500'
    },

    header: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '3em'
    },

    mainContainer: {
        padding: '8px',
    },

    wrapper: {
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
    }
}

const tags = [
    'Driving',
    'Eating',
    'Sleeping',
    'Hiking',
    'Selfie',
    'Swimming',
    'Running/Jogging',
    'Reading',
    'Cooking',
    'Using Phone',
    'Biking',
    'Drinking',
    'Shopping',
    'Talking',
    'Clubbing',
    'Using Computer',
    'Dancing/Party',
    'Posing',
    'Meme',
    'Group Photo',
    'Watching TV',
    'Construction/Building',
    'Gaming',
    'Portrait',
    'Presentig/Public Speaking',
    'Exercising/Lifting',
    'Hockey',
    'Soccer',
    'Basketbal',
    'Skiing/Snowboarding',
    'Football',
];

export default class ChipList extends React.Component {
    constructor(props) {
        super(props);

        let formatted = [];
        for (var i = 0; i < tags.length; i++) {
            formatted.push({ key: i + "_chip", label: tags[i] })
        }

        this.state = {
            chips: formatted
        };
    }

    renderChip(data) {
        return (
            <Chip
                key={data.key}
                style={styles.chip}
                labelStyle={styles.chipLabel}
            >
                {data.label}
            </Chip>
        )
    }

    render() {
        return (
            <div style={styles.mainContainer}>
                <h2 style={styles.header}>Available Categories</h2>
                <div style={styles.wrapper}>
                    {this.state.chips.map(this.renderChip, this)}
                </div>
            </div>
        )
    }
}