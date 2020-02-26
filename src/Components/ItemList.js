import React, { Component } from 'react';
import axios from 'axios';

class ItemList extends Component {
    state = {
        items: []
    };

    componentDidMuont() {
        axios.get(`https://my-json-server.typicode.com/HuyLee24/Shopping_App/items`).then(res => { 
            console.log(res);
            this.setState({ items: res.data}); 
        });
    }

    render() {
        return (
            <ul>
                { this.state.items.map(item => <li key={item.id}>{item.title}</li>) }
            </ul>    
        )
    }
}

export default ItemList