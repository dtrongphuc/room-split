import React from 'react';
import './RoomInfo.css'

const test = '344121';
export default class RoomInfo extends React.Component {
    render() {
        //const {data} = this.props;
        
        return(
            <div className="info shadow-sm rounded" >
                <h2>Phòng 6.2 Cute</h2>
                <ul className="info-list">
                    <li>Giá phòng: {test}</li>
                    <li>Số người: {test}</li>
                </ul>
            </div>
        );
    }
}