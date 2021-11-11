function ConfirmDelete ({showDeleteCofirm, setShowDeleteConfirm, deleteConfirmed, setDeleteConfirmed, rcrdMarked, remove}) {

    return(
        <div className="main-modal" style={{
            display: showDeleteCofirm ? 'block' : 'none',
            top: window.scrollY + 100 + 'px'
        }}>
            <p>Are you sure you want to delete record?</p>
            <button onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteConfirmed(true);
                // console.log('WE WILL REMOVE ', rcrdMarked)
                remove(rcrdMarked);
            }} className="form-button">Yes</button>
            <button onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteConfirmed(false);
            }} className="form-button">No</button>
        </div>
    )

}

export default ConfirmDelete;