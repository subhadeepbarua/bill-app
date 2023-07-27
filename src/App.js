import React, { useState } from 'react';
import './TemplateStyle.css';
import './DisplayDataStyle.css';
import TemplateForm from './TemplateForm';
import DisplayData from './DisplayData';

function App() {
  const [showForm, setShowForm] = useState(true);

  const toggleView = () => {
    setShowForm(!showForm);
  };

  return (
    <>
    <div>
      {showForm ? <TemplateForm toggleView={toggleView} /> : <DisplayData toggleView={toggleView} />}
    </div>
    </>
  );
}

export default App;
