import moment from "moment-timezone";

function Item({item, setShowModal, setModalItem, remove}) {

    const showEdit = () => {
        setShowModal(true);
        setModalItem(item);
    }

    const stock = (a) => {
        if(a === 1) {
            return 'yes';
        } else {
            return 'no';
        }
    }

    return (
        <div className="main-list-item">
            {/* <i className="fas fa-pencil-alt edit" onClick={showEdit}></i> */}
            {/* <i className="far fa-trash-alt delete" onClick={() => remove(item.id)}></i> */}
    
            <div className="main-list-item-stats">
                <span className="main-list-item-name">{item.product}</span>
                <span><span className="field-names">Quantity: </span>{item.quantity}</span>
                <span><span className="field-names">Price: </span>{item.price}</span>
                <span><span className="field-names">Quantity: </span>{item.price * item.quantity}</span>
                <span><span className="field-names">In Stock: </span>{stock(item.instock)}</span>
                <span><span className="field-names">Last Order: </span>{moment.tz(item.lastorder, "Europe/Vilnius").format('YYYY-MM-DD')}  </span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => remove(item.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Item; 