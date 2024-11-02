import React from 'react'

const AdminCircularsList = ({circularsList, setActivePage, setCircular}) => {
  const renderCircularsRows = () => {
    return circularsList.map((circular) => (
      <tr key={circular.circular_id} onClick={() => {setCircular(circular);setActivePage('view')}}>
        <td>{circular.circular_id}</td>
        <td>{circular.subject}</td>
        <td>
          <div className={`${circular.category.toLowerCase()}-category`}>
            {circular.category}
          </div>
        </td>
        <td>{new Date(circular.dateIssued).toLocaleDateString()}</td>
      </tr>
    ));
  };
  return (
    <div className='admin-circulars-element'>
      <div className="element-title-course">
        All Circulars
        <div
          className="add-assignment"
          onClick={() => {
            setActivePage("create");
          }}
        >
          <i className="bx bxs-file-plus"></i>
          Add Circular
        </div>
        </div>
        <table className="circulars-table">
            <thead>
              <tr>
                <th className="id">Circular ID</th>
                <th className="sub">Circular Subject</th>
                <th className="cat">Category</th>
                <th className="date">Date</th>
              </tr>
            </thead>
            <tbody>{renderCircularsRows()}</tbody>
          </table>
    </div>
  )
}

export default AdminCircularsList