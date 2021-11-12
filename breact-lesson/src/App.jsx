import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Create from "./components/Create";
import List from "./components/List";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import Sort from "./js/Sort";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for error page 404
import PageNotFound from "./components/404-page";
import fixDate from "./js/fixDate";
import Statistics from "./components/Statistics";
import ActionMsg from "./components/ActionMsg";
import ConfirmDelete from "./components/ConfirmDelete";
import NewRecord from "./components/NewRecord";
import WarningModal from "./components/WarningModal";
 


function App () {

    const [items, setItems] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

// EDIT RECORD MODAL
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState({
        product: '',
        type: '',
        quantity: '',
        price: '',
        instock: '',
        lastorder: '',
        waranty: '',
        forsale: '',
        description: ''
    });

// WARNING MODAL 
const [showWarningModal, setShowWarningModal] = useState(false);
const [error, setError] = useState('');


    // ----------------- ACTION MESSAGES -----------------
    const [showMsg, setShowMsg] = useState(false);
    const msg = useRef('');

    const addMsg = (text) => {
        msg.current = text;
        setShowMsg(true);
        setTimeout(() => {clearMsg()}, 2000);
    }

    const clearMsg = () => {
        setShowMsg(false)
    }

    // ----------------- STATISTICS -----------------
    const [stats, setStats] = useState({
        totalQuantity: 0,
        totalValue: 0,
        uniqueProducts: 0,
        avgPrice: 0,
        itmInStock: 0,
        itmOutStock: 0,
        groupStats: []
    })

    useEffect(() => {
        axios.get('http://localhost:3003/statistics')
            .then(res => {
                setStats(res.data);
                // console.log(res.data);
            })
    }, [lastUpdate])

    // useEffect(() => {
    //     axios.get('http://localhost:3003/group-statistics')
    //         .then(res => {
    //             setGroupStats(res.data);
    //         })
    // }, [lastUpdate])

    // ----------------- FILTERING -----------------
    const [types, setTypes] = useState([]);  // filters dropbox options
    const [filterBy, setFilterBy] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:3003/stock-types')
            .then(res => {
                setTypes(res.data);
                // console.log(res.data);
            })
    }, [lastUpdate])

    useEffect(() => {
        if (filterBy) {
            axios.get('http://localhost:3003/stock-filter/'+filterBy)
            .then(res => {
                setItems(Sort(fixDate(res.data), sortConditions.current));
                // setItems(fixDate(res.data));
                // console.log(res.data);
            })
            setSearchBy('');
        }
    }, [filterBy])



    const reset = () => {
        setLastUpdate(Date.now());
    }

    // ----------------- SORT -----------------
    const sortConditions = useRef('');
    // const [sortConditions, setSortConditions] = useState('');
    const handleSort = () => {
        if (sortConditions.current) {
            setItems(Sort(items, sortConditions.current));
        }
    }

        // useEffect(() => {
        //     if (sortConditions) {
        //         setItems(Sort(items, sortConditions));
        //     }
        //     //eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [sortConditions])

    // ----------------- SORT & FILTER MIX (SORT1) -----------------
    // const [sortBy, setSortBy] = useState('');
    // useEffect(() => {
    //     if (sortBy) {
    //         setItems(Sort(items, sortBy, setFilterBy));
    //     }
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [sortBy])

    // ----------------- SEARCH -----------------
    const [searchBy, setSearchBy] = useState('');

    useEffect(() => {
        if (searchBy) {
        axios.get('http://localhost:3003/stock-search/?s='+searchBy)
            .then(res => {
                setItems(Sort(fixDate(res.data), sortConditions.current));
                // setItems(fixDate(res.data));
                // console.log(res.data);
            })
            setFilterBy('');
        }
    }, [searchBy])
    // ------------------------------------------


    // ALL RECORDS
    useEffect(() => {
        axios.get('http://localhost:3003/stock')
        .then(res => {
            setItems(Sort(fixDate(res.data), sortConditions.current));
            // setItems(fixDate(res.data));
            // console.log(res.data)
        })
    }, [lastUpdate])

    // NEW RECORD
    const [showNewRecordModal, setShowNewRecordModal] = useState(false);

    const handleNewRecord = () => {
        setShowNewRecordModal(true);
    }

    const create = item => {
        // console.log(item)
        axios.post('http://localhost:3003/stock', item)
        .then(res => {
            // console.log(res.data)
            addMsg('Record successfully added.');
            setLastUpdate(Date.now());
        })
    }

    // EDIT RECORD 
    const edit = (item, id) => {
        setShowModal(false);
        axios.put('http://localhost:3003/stock/' + id, item)
        .then(res => {
            // console.log(res.data);
            addMsg('Record successfully saved.');
            setLastUpdate(Date.now());
        })
    }

    // REMOVE RECORD 
    const[showDeleteCofirm, setShowDeleteConfirm] = useState(false);
    const[deleteConfirmed, setDeleteConfirmed] = useState(false);
    const[rcrdMarked, setrcrdMarked] = useState();

    const confirmDelete = (id) => {
        setShowDeleteConfirm(true);
        setrcrdMarked(id);
    }

    const remove = (id) => {
        setShowModal(false);
        // console.log('THATS IT ', id)
        axios.delete('http://localhost:3003/stock/' + id)
        .then(res => {
            // console.log(res.data);
            addMsg('Record successfully removed.');
            setLastUpdate(Date.now());
        })
    }

    
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <ActionMsg msg={msg.current} showMsg={showMsg}></ActionMsg>
                        <Statistics stats={stats} />
                        <div className="main">
                            <WarningModal showWarningModal={showWarningModal} setShowWarningModal={setShowWarningModal} error={error}/>
                            <ConfirmDelete showDeleteCofirm={showDeleteCofirm} setShowDeleteConfirm={setShowDeleteConfirm} deleteConfirmed={deleteConfirmed} setDeleteConfirmed={setDeleteConfirmed} rcrdMarked={rcrdMarked} remove={remove}/>
                            <Modal edit={edit} remove={remove} modalItem={modalItem} showModal={showModal} setShowModal={setShowModal} types={types} confirmDelete={confirmDelete} setShowWarningModal={setShowWarningModal} error={error} setError={setError}></Modal>
                            <div className="nav">
                                <Nav searchBy={searchBy}  setSearchBy={setSearchBy} filterBy={filterBy} setFilterBy={setFilterBy} sortConditions={sortConditions} handleSort={handleSort} types={types} reset={reset}></Nav>
                                <Create create={create} handleNewRecord={handleNewRecord} setShowWarningModal={setShowWarningModal} error={error} setError={setError}></Create>
                                <NewRecord create={create} showNewRecordModal={showNewRecordModal} setShowNewRecordModal={setShowNewRecordModal} setShowWarningModal={setShowWarningModal} types={types} error={error} setError={setError}></NewRecord>
                            </div>
                            <List items={items} setShowModal={setShowModal} setModalItem={setModalItem} confirmDelete={confirmDelete}></List>
                        </div>
                    </>
                    }>
                </Route>

                <Route path="/*" element={<PageNotFound/>} />
            </Routes>
        </Router>
    )
}

export default App; 