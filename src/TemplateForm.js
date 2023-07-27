const TemplateForm = ({toggleView}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Perform any additional logic or validation before submitting the form
    // If needed, you can use the fetch API to submit the form data to the URL
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Form submitted successfully!', data);
      // Clear the input fields after submitting the form
      const inputFields = document.querySelectorAll('input');
      for (const inputField of inputFields) {
        inputField.value = '';
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div>
      <div>
        <div className="templateBox">
          <div className="templateInput">
            <form
              method="post"
              action="https://script.google.com/macros/s/AKfycbxUdqaD6zGR3ppC3KhLp_biO9wVLbHF16CTV_klheCb22gNyxX9RKzPfWfQPwcSxxh9/exec"
              onSubmit={handleFormSubmit}>
              <span htmlFor="Date">Date</span>
              <input type="date" name="Current Date" id="Date" onKeyDown={handleKeyPress} required/>
            <span htmlFor="Pname">Party Name</span>
            <input type="text" name="Party Name" id="Pname" onKeyDown={handleKeyPress} required/>
            <span htmlFor="Billno">Bill no.</span>
            <input type="number" name="Bill no." id="Billno"  onKeyDown={handleKeyPress} required/>
            <span htmlFor="amount">Amount</span>
            <input type="number" name="Amount" id="Amount" onKeyDown={handleKeyPress} required/>
            <span htmlFor="CGST">CGST no.</span>
            <input type="text" name="CGST" id="CGST" onKeyDown={handleKeyPress} required/>
            <span htmlFor="SGST">SGST no.</span>
            <input type="text" name="SGST" id="SGST"  onKeyDown={handleKeyPress} required/>
            <span htmlFor="IGST">IGST no.</span>
            <input type="text" name="IGST" id="IGST" onKeyDown={handleKeyPress} required/>
            <span htmlFor="Pbuyers">Payment Buyers</span>
            <input type="text" name="Payment Buyers" id="Pbuyers"  onKeyDown={handleKeyPress} required/>
            <span htmlFor="Chequeno">Cheque no.</span>
            <input type="number" name="Cheque no." id="Chequeno" onKeyDown={handleKeyPress} required/>
            <span htmlFor="Pdate">Payment Date</span>
            <input type="date" name="Payment Date" id="PDate" onKeyDown={handleKeyPress} required/>
            <button className="btn" id="submit">
                Submit
              </button>
              <button className="btn" id="history" onClick={toggleView}>
                History
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;
