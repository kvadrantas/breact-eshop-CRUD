import axios from "axios";
import { useEffect, useState } from "react";
import Create from "./components/Create";
import List from "./components/List";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import Sort from "./js/Sort";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for error page 404
import PageNotFound from "./components/404-page";
import fixDate from "./js/fixDate";
 


function App () {

    const [items, setItems] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState({
        product: '',
        quantity: '',
        price: '',
        instock: '',
        lastorder: ''
    });

    // ----------------- FILTERING -----------------
    // const [types, setTypes] = useState([]);  // filters dropbox options
    const [filterBy, setFilterBy] = useState('');
    
    // useEffect(() => {
    //     axios.get('http://localhost:3003/item-types')
    //         .then(res => {
    //             setTypes(res.data);
    //             // console.log(res.data);
    //         })
    // }, [lastUpdate])

    useEffect(() => {
        if (filterBy) {
            axios.get('http://localhost:3003/stock-filter/'+filterBy)
            .then(res => {
                setItems(fixDate(res.data));
                // console.log(res.data);
            })
        }
    }, [filterBy])

    const reset = () => {
        setLastUpdate(Date.now());
    }

    // ----------------- SORT -----------------
    const [sortBy, setSortBy] = useState('');
    useEffect(() => {
        if (sortBy) {
            setItems(Sort(items, sortBy, setFilterBy));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy])

    // ----------------- SEARCH -----------------
    const [searchBy, setSearchBy] = useState('');

    useEffect(() => {
        if (searchBy) {
        axios.get('http://localhost:3003/item-search/?s='+searchBy)
            .then(res => {
                setItems(fixDate(res.data));
                // console.log(res.data);
            })
        }
    }, [searchBy])
    // ------------------------------------------


    // ALL RECORDS
    useEffect(() => {
        axios.get('http://localhost:3003/stock')
        .then(res => {
            // console.log(res.data)
            setItems(fixDate(res.data));
        })
    }, [lastUpdate])

    // NEW RECORD
    const create = item => {
        // console.log(item)
        axios.post('http://localhost:3003/stock', item)
        .then(res => {
            // console.log(res.data)
            setLastUpdate(Date.now());
        })
    }

    // EDIT RECORD 
    const edit = (item, id) => {
        setShowModal(false);
        axios.put('http://localhost:3003/stock/' + id, item)
        .then(res => {
            // console.log(res.data);
            setLastUpdate(Date.now());
        })
    }

    // REMOVE RECORD 
    const remove = (id) => {
        setShowModal(false);
        axios.delete('http://localhost:3003/stock/' + id)
        .then(res => {
            // console.log(res.data);
            setLastUpdate(Date.now());
        })
    }

    
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="main">
                        <Modal edit={edit} remove={remove} modalItem={modalItem} showModal={showModal} setShowModal={setShowModal}></Modal>
                        <div className="nav">
                            <Nav  search={setSearchBy} filter={setFilterBy} sort={setSortBy} reset={reset}></Nav>
                            <Create create={create}></Create>
                        </div>
                        <List items={items} setShowModal={setShowModal} setModalItem={setModalItem} remove={remove}></List>
                    </div>
                    }>
                </Route>

                <Route path="/*" element={<PageNotFound/>} />
            </Routes>
        </Router>
    )
}

export default App; 