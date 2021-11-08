import { useState } from "react";

function Nav({ filter, reset, search, sort}) {

    // const [filterValue, setFilterValue] = useState('');
    // const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState('');

    // const selectFilter = e => {
    //     setFilterValue(e.target.value);
    //     filter(e.target.value)
    // }

    const selectSort = e => {
        setSortValue(e.target.value);
        sort(e.target.value)
    }

    // const handleSearchValue = e => {
    //     // console.log(e)
    //     if(!e.target.value) reset();
    //     setSearchValue(e.target.value);
    //     search(e.target.value)
    // }

    const resetHandler = () => {
        reset();
        // setFilterValue('');
    }

    return (
        <div className="main-nav">
            <fieldset>
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
                    <legend>Filter</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortValue} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="in-stock">In Stock</option>
                            <option value="out-stock">Out of stock</option>
                            <option value="number-asc">Price low to high</option>
                            <option value="number-desc">Price hight to low</option>
                        </select>
                    </div>
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