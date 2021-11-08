import { useState } from "react";

function Nav({ filter, reset, search, sortConditions, setSortConditions, types}) {

// ----------------- FILTER -----------------

    const [filterValue, setFilterValue] = useState('');
    // const [searchValue, setSearchValue] = useState('');

    const selectFilter = e => {
        setFilterValue(e.target.value);
        filter(e.target.value)
    }


// ----------------- SORT -----------------
    const selectSort = e => {
        setSortConditions(e.target.value);
    }
    
    // SORT1 & FILTER MIX (SORT1)   
    // const selectSort = e => {
    //     setSortConditions(e.target.value);
    // }

    // const handleSearchValue = e => {
    //     // console.log(e)
    //     if(!e.target.value) reset();
    //     setSearchValue(e.target.value);
    //     search(e.target.value)
    // }

    const resetHandler = () => {
        reset();
        setFilterValue('');
        setSortConditions('');
    }

    return (
        <div className="main-nav">
            <fieldset>
                <fieldset>
    {/* <option value="in-stock">In Stock</option>
    <option value="out-stock">Out of stock</option> */}
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>By type</label><br></br>
                        <select onChange={selectFilter} value={filterValue} >
                            {/* <option value="default"  hidden>Select filter...</option> */}
                            {
                                types.map(t => <option key={t.type} value={t.type}>{t.type}</option>)
                            }
                        </select>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>By type</label><br></br>
                        <select onChange={selectFilter} value={filterValue} >
                            <option value="default"  hidden>Select item...</option>
                            {
                                types.map(t => <option key={t.type} value={t.type}>{t.type}</option>)
                            }
                        </select>
                    </div>
                </fieldset> */}
                <fieldset>
                    <legend>Sorting</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortConditions} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="text-asc,name">Product name &#8593;</option>
                            <option value="text-desc,name">Product name &#8595;</option>
                            <option value="number-asc,quantity">Quantity &#8593;</option>
                            <option value="number-desc,quantity">Quantity &#8595;</option>
                            <option value="number-asc,price">Price &#8593;</option>
                            <option value="number-desc,price">Price &#8595;</option>
                            <option value="totalvalue-asc, ">Total value &#8593;</option>
                            <option value="totalvalue-desc, ">Total value &#8595;</option>
                            <option value="date-asc,lastorder">Last order &#8593;</option>
                            <option value="date-desc,lastorder">last order &#8595;</option>
                        </select>
                    </div>
                    {/* SORT & FILTER MIX (SORT1)- */}
                    {/* <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortConditions} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="in-stock">In Stock</option>
                            <option value="out-stock">Out of stock</option>
                            <option value="number-asc">Price low to high</option>
                            <option value="number-desc">Price hight to low</option>
                        </select>
                    </div> */}
                </fieldset>
                <button className="form-button" onClick={resetHandler}>Reset</button>
            </fieldset>
            {/* <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>Type search text</label>
                    <input onChange={handleSearchValue} value={searchValue}></input>
                </div>
            </fieldset> */}
        </div>
    )
}

export default Nav;