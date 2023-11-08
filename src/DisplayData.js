import React, { useState, useEffect } from 'react';

const DisplayData = ({ toggleView }) => {
  const [invoice, setInvoice] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoice, setFilteredInvoice] = useState([]);

  const getBill = async () => {
    try {
      const sheetId = "134yUSouB1dJ4ZSfsfvwZCWdk8VqcS7chK1UgEIe918w";
      const sheetTitle = "Sheet1";
      const sheetRange = "A2:J";

      const URL =
        "https://docs.google.com/spreadsheets/d/" +
        sheetId +
        "/gviz/tq?sheet=" +
        sheetTitle +
        "&range=" +
        sheetRange;

      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      const parsedData = JSON.parse(data.substr(47).slice(0, -2));

      console.log('Data from Google Sheets:', parsedData);
      setInvoice(parsedData.table.rows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getBill();
  }, []);

  useEffect(() => {
    const filteredData = invoice.filter((row) => {
      // Check if the value is a string before calling toLowerCase
      const column1 = row.c[1]?.v;
      const column7 = row.c[7]?.v;
      const column0 = row.c[0]?.v;
  
      const matchesColumn1 =
        typeof column1 === 'string' && column1.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColumn7 =
        typeof column7 === 'string' && column7.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColumn0 =
        typeof column0 === 'string' && column0.includes(searchQuery);
  
      return matchesColumn1 || matchesColumn7 || matchesColumn0;
    });
  
    setFilteredInvoice(filteredData);
  }, [invoice, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="header">
      <div className='headerItem' >
        <h2 >BILL & ORDER DATABASE</h2>
        </div>
        <div className='headerItem'>
        <button  id="D-btn" onClick={toggleView}>Back</button>
        </div>
        
      </div>

      <div className="search-bar">
        <input
          type='text'
          placeholder='Search by Party Name, Buyer Name, or Date'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table className='display-table'>
          <thead>
            <tr>
            <th style={{ width:'2%'}}>SL no.</th>
              <th>Date</th>
              <th>Party Name</th>
              <th>Bill no.</th>
              <th>Amount</th>
              <th>CGST no.</th>
              <th>SGST no.</th>
              <th>IGST no.</th>
              <th>Payment Buyers</th>
              <th>Cheque no.</th>
              <th>Payment Date</th>
            </tr>
          </thead>
  
          <tbody>
  {filteredInvoice.map((row, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{row.c[0]?.v}</td>
      <td>{row.c[1]?.v}</td>
      <td>{row.c[2]?.v}</td>
      <td>{row.c[3]?.v}</td>
      <td>{row.c[4]?.v}</td>
      <td>{row.c[5]?.v}</td>
      <td>{row.c[6]?.v}</td>
      <td>{row.c[7]?.v}</td>
      <td>{row.c[8]?.v}</td>
      <td>{row.c[9]?.v}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayData;
