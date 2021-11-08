import Item from "./Item";

function List({items, setShowModal, setModalItem, remove}) {

    return (
        <div className="main-list">
            <div className="tbl-header">
                <div className="main-list-item-stats">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Total value</span>
                    <span>In Stock</span>
                    <span>Last Order</span>
                    <button className="form-button" >Edit</button>
                    <button className="form-button" >Delete</button>
    
                </div>
            </div>
            {items.map(item => <Item key={item.id} item={item} setShowModal={setShowModal} setModalItem={setModalItem} remove={remove}></Item>)}
        </div>
    )
}

export default List; 