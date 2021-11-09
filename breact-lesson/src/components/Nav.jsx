// import { useState } from "react";

function Nav({ filterBy, setFilterBy, reset, searchBy, setSearchBy, sortConditions, handleSort, types}) {

// ----------------- FILTER -----------------


    const selectFilter = e => {
        setFilterBy(e.target.value)
    }


// ----------------- SORT -----------------
    const selectSort = e => {
        sortConditions.current = e.target.value;
        handleSort(e.target.value);
    }
    
    // SORT1 & FILTER MIX (SORT1)   
    // const selectSort = e => {
    //     setSortConditions(e.target.value);
    // }

// ----------------- SEARCH -----------------
    const handleSearchValue = e => {
        // console.log(e)
        if(!e.target.value) reset();
        setSearchBy(e.target.value)
    }

// ----------------- RESET -----------------
    const resetHandler = () => {
        reset();
        setFilterBy('');
        setSearchBy('');
        sortConditions.current = '';
        handleSort('');
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
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default" hidden>Select filter...</option>
                            {/* <option value="">Select animal</option> */}
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
                        <select onChange={selectFilter} value={filterBy} >
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
                        <select onChange={selectSort} value={sortConditions.current} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="text-asc,product">Product name &#8593;</option>
                            <option value="text-desc,product">Product name &#8595;</option>
                            <option value="text-asc,type">Type &#8593;</option>
                            <option value="text-desc,type">Type &#8595;</option>
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
            <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>Type search text</label>
                    <input onChange={handleSearchValue} value={searchBy}></input>
                </div>
            </fieldset>
        </div>
    )
}

export default Nav;