function Statistics ({stats}) {

    return(
        <>
            <div className="statistics">
                <fieldset className="sub-statistics">
                    <legend>General Statistics</legend>
                    <div>
                            <span><p>Stock quantity: <i>{stats.totalQuantity}</i></p></span>
                            <span><p>Stock value: <i>{parseFloat(stats.totalValue).toFixed(0)}</i></p></span>
                            <span><p>Unique products <i>{stats.uniqueProducts}</i></p></span>
                    </div>
                    <div>
                        <span><p>Average price: <i>{parseFloat(stats.avgPrice).toFixed(2)}</i></p></span>
                        <span><p>Items in stock: <i>{stats.itmInStock}</i></p></span>
                        <span><p>Items out of stock: <i>{stats.itmOutStock}</i></p></span>
                    </div>
                </fieldset>
                <fieldset className="sub-statistics">
                    <legend>Statistics by group</legend>
                    <div className="group-statistics">
                        {stats.groupStats.map((e, i) => <span key={i}><p>{e.type} : <i>{e.quantity}</i></p></span>)}
                    </div>
                    {/* <div>
                        <span><p>Items in stock</p></span>
                        <span><p>Items out of stock:</p></span>
                        <span><p>Item average price:</p></span>
                    </div> */}
                </fieldset>
            </div>
            <div className="gradient-bar"></div>
        </>
    )

}

export default Statistics;