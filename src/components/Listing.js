import React from 'react';
import '../style/style.css'

function ListingComponent(props) {

    return (
        props.items.map(item => {
            return (
                <div className="activity-item">
                    <p>
                        {
                            item.url == null ? item.content : <a href={ item.url }>{ item.content }</a>
                        }
                    </p>
                </div>
            );
        })
    );
}

export default ListingComponent;