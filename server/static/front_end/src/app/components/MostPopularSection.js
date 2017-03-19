import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Subheader from 'material-ui/Subheader';

import { yellow700 } from 'material-ui/styles/colors';

const styles = {
    listItem: {
        textTransform: 'capitalize',
        padding: "8px 8px 8px 16px"
    },

    icon: {
        margin: '0',
        right: 'calc(30%)',
    }
}

const connectionUrl = "ws://localhost:8080/most-popular"

export default class MostPopularSection extends Component {
    constructor(props) {
        super(props);

        this.state = { items: null };

        this.ws = new WebSocket(connectionUrl);

        this.ws.onmessage = (e) => {
            let data = JSON.parse(e.data);
            this.setState({ items: data.top_5 })
        }
    }

    render() {
        let items = []

        if (this.state.items != null) {
            items = this.state.items.map((item, idx) =>
                <ListItem key={idx} primaryText={item.label} secondaryText={item.score}
                    disabled={true} rightIcon={idx == 0 ? <ActionGrade color={yellow700} style={styles.icon} /> : null} style={styles.listItem} />
            )
        }

        return (
            <List>
                <Subheader>Most Popular Categories</Subheader>
                {items}
            </List>
        )
    }
}