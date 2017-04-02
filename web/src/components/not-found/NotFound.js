import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        const windowStyle = {
            padding: "100px"
        }

        return (
            <div style={{ windowStyle }}>
                <h1>404</h1>
                <hr />
                <p>Página não encontrada</p>
                <p>Tully &copy;</p>
            </div>
        )
    }
}

export default NotFound;