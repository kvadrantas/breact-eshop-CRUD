import { useState } from "react";

function Create({create}) {

    const [inputs, setInputs] = useState({
        product: '',
        quantity: '',
        price: '',
        instock: '0',
        lastorder: ''
    });

    const formControl = (e, what) => {
        // console.log(e.target.value)
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if( !inputs.product || 
            !inputs.quantity || parseFloat(inputs.quantity) < 0 || !isFinite(parseFloat(inputs.quantity)) ||
            !inputs.price || parseFloat(inputs.price) < 0 || !isFinite(parseFloat(inputs.quantity))) {
            alert(`
                Please check your input!

                - required fields cannot be empty;
                - quantity and price cannot be negative or infinite.
            `)
        } else {
            create(inputs)
            setInputs({
                product: '',
                quantity: '',
                price: '',
                instock: '0',
                lastorder: ''
            });
        }
    }

    return (
        <div className="main-form">
            <fieldset>
                <legend>New record</legend>
                <label htmlFor="">Product*</label>
                <input type="text" value={inputs.product} onChange={(e) => formControl(e, 'product')} />
                <label htmlFor="">Quantity*</label>
                <input type="number" value={inputs.quantity} onChange={(e) => formControl(e, 'quantity')} />
                <label htmlFor="">Price*</label>
                <input type="number" value={inputs.price} onChange={(e) => formControl(e, 'price')} />

                <label>In Stock</label>
                <select name="" id="" value={inputs.instock} onChange={(e) => formControl(e, 'instock')}>
                    {/* <option value="default" hidd>select...</option> */}
                    <option value="1">yes</option>
                    <option value="0">no</option>
                </select>
                
                <label htmlFor="">Last Order</label>
                <input type="date" value={inputs.lastorder} onChange={(e) => formControl(e, 'lastorder')} />
                <button className="form-button" onClick={handleCreate}>Add</button>
            </fieldset>
        </div>
    )

}

export default Create;