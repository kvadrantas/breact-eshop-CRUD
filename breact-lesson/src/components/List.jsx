import Item from "./Item";

function List({items, setShowModal, setModalItem, confirmDelete}) {
    return (
        <div className="main-list">
            <div className="tbl-header">
                <div className="main-list-item-stats">
                    <span>Product</span>
                    <span>Type</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Total value</span>
                    <span>In Stock</span>
                    <span>Last Order</span>
                    <span>Waranty</span>
                    <span>For Sale</span>
                    <span>Description</span>
                    <button className="form-button" >Edit</button>
                    <button className="form-button" >Delete</button>
    
                </div>
            </div>
            {items.map(item => <Item key={item.id} item={item} setShowModal={setShowModal} setModalItem={setModalItem} confirmDelete={confirmDelete}></Item>)}
        </div>
    )
}

export default List; 