import React from 'react';
import axios from 'axios';

export default class ItemList extends React.Components {
    state = {
        items: [],
    };

    componentDidMuont() {
        axios.get(``).then(res => { 
            this.setState({ items: res.data }); 
        });
    }
}