import { useState } from "react";
import isValidf from "../js/isValidf";

function Create({create, handleNewRecord, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        product: '',
        type: '',
        quantity: '',
        price: '',
        instock: '0',
        lastorder: '',
        waranty: '',
        forsale: false,
        description: ''
    });

    const [radio, setRadio] = useState([false, false, false]);
    const radioControl = i => {
        // const radioCopy = radio.slice();
        // radioCopy[i] = !radioCopy[i]
        // setRadio(radioCopy);

        const radioCopy = [false, false, false];
        radioCopy[i] = true;
        setRadio(radioCopy);

        const inputsCopy = {...inputs};
        inputsCopy.waranty = i + 1;
        setInputs(inputsCopy);
        // console.log(i)
    }

    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        
        if(what ==='forsale') inputsCopy[what] = !inputs.forsale;

        // console.log('VALUE ', e.target.value)
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if(
            !(isValidf('txt', 'required', inputs.product, error, setError) &&
            isValidf('txt', 'required', inputs.type, error, setError) &&
            isValidf('num', 'required', inputs.quantity, error, setError) &&
            isValidf('num', 'required', inputs.price, error, setError) &&
            isValidf('num', 'optional', inputs.instock, error, setError) &&
            isValidf('txt', 'optional', inputs.lastorder.slice(0, 10), error, setError) &&
            isValidf('num', 'optional', inputs.waranty, error, setError) &&
            isValidf('boolean', 'optional', inputs.forsale, error, setError) &&
            isValidf('txt', 'optional', inputs.description, error, setError))
        ) {
            setShowWarningModal(true);
        } else {
            create(inputs)
            setInputs({
                product: '',
                type: '',
                quantity: '',
                price: '',
                instock: '0',
                lastorder: '',
                waranty: '',
                forsale: false,
                description: ''
            });

            setRadio([false, false, false]);
        }
    }

    return (
        <div className="main-form">
            <fieldset>
                <legend>New record</legend>
                <label htmlFor="">Product*</label>
                <input type="text" value={inputs.product} onChange={(e) => formControl(e, 'product')} />
                <label htmlFor="">Type*</label>
                <input type="text" value={inputs.type} onChange={(e) => formControl(e, 'type')} />
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

                <label style={{marginTop:'15px'}}>Waranty:</label>
                <div className="waranty">
                    <div>
                        <input onChange={(e) => radioControl(0)} type="radio" id="1yr" name="1yr"  checked={radio[0]}/>
                        <label htmlFor="1yr">1yr.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(1)} type="radio" id="2yr" name="2yr"  checked={radio[1]}/>
                        <label htmlFor="2yr">2yr.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(2)} type="radio" id="3yr" name="3yr"  checked={radio[2]}/>
                        <label htmlFor="3yr">3yr.</label>
                    </div>
                </div>

                {/* <div className="sq">
                    <input onChange={() => radioControl(0)} type="checkbox" checked={radio[0]} />
                    <input onChange={() => radioControl(1)} type="checkbox" checked={radio[1]} />
                    <input onChange={() => radioControl(2)} type="checkbox" checked={radio[2]} />
                </div> */}

                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>For sale?</label>
                    <input onChange={(e) => formControl(e, 'forsale')} value={inputs.forsale} checked={inputs.forsale} type="checkbox" />
                </div>

                <label style={{marginTop:'15px'}} htmlFor="">Description</label>
                <textarea maxLength="255" value={inputs.description} onChange={(e) => formControl(e, 'description')} />


                <button className="form-button" onClick={handleCreate}>Add</button>
                <button className="form-button" onClick={handleNewRecord}>New Record...</button>
            </fieldset>
        </div>
    )

}

export default Create;