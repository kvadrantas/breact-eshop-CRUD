import { useState } from "react";
// import moment from "moment-timezone";


function NewRecord({create, showNewRecordModal, setShowNewRecordModal, types, setShowWarningModal}) {

    const [inputs, setInputs] = useState({
        product: '',
        type: '',
        quantity: '',
        price: '',
        instock: '',
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
        if( !inputs.product || 
            !inputs.quantity || parseFloat(inputs.quantity) < 0 || !isFinite(parseFloat(inputs.quantity)) ||
            !inputs.price || parseFloat(inputs.price) < 0 || !isFinite(parseFloat(inputs.quantity))) {
                setShowWarningModal(true);
            // alert(`
            //     Please check your input!

            //     - required fields cannot be empty;
            //     - quantity and price cannot be negative or infinite.
            // `)
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

            setShowNewRecordModal(false);
            setRadio([false, false, false]);
        }
    }


    return (
        <div className="main-modal" style={{
            display: showNewRecordModal ? 'block' : 'none',
            top: window.scrollY + 100 + 'px'
        }}>
            <div className="main-modal-form">
                <h2>Edit item</h2>
                <label>Product*</label><input type="text" value={inputs.product} onChange={(e) => formControl(e, 'product')} />
                <label>Type*</label><input type="text" value={inputs.type} onChange={(e) => formControl(e, 'type')} />
                <label>Type*</label>
                <select name="" id="" value={inputs.type} onChange={(e) => formControl(e, 'type')}>
                    <option value="default" hidden>Select type...</option>
                    {types.map((e, i) => <option key={i} value={e.type}>{e.type}</option>)}
                    
                </select>
                <label>Quantity*</label><input type="number" value={inputs.quantity} onChange={(e) => formControl(e, 'quantity')} />
                <label>Price*</label><input type="number" value={inputs.price} onChange={(e) => formControl(e, 'price')} />
                <label>In Stock</label>
                <select name="" id="" value={inputs.instock} onChange={(e) => formControl(e, 'instock')}>
                    <option value="1">yes</option>
                    <option value="0">no</option>
                </select>
                {/* <label>Last Order</label><input type="date" value={moment.tz(inputs.lastorder, "Europe/Vilnius").format('YYYY-MM-DD')} onChange={(e) => formControl(e, 'lastorder')} /> */}
                <label>Last Order</label><input type="date" value={inputs.lastorder} onChange={(e) => formControl(e, 'lastorder')} />
                {/* <label>Waranty</label><input type="number" value={inputs.waranty} onChange={(e) => formControl(e, 'waranty')} />
                <label>For Sale</label><input type="number" value={inputs.forsale} onChange={(e) => formControl(e, 'forsale')} />
                <label>Description</label><textarea value={inputs.description} onChange={(e) => formControl(e, 'description')} /> */}
                
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
                </div> <br/>

                <div className="description">
                    <label style={{marginTop:'15px'}} htmlFor="">Description</label>
                    <textarea maxLength="245" value={inputs.description} onChange={(e) => formControl(e, 'description')} />
                </div>
            </div>
            <button className="form-button" onClick={handleCreate}>Add</button>
            <button className="form-button" onClick={() => setShowNewRecordModal(false)}>Cancel</button>
        </div>
    )
    
}

export default NewRecord;