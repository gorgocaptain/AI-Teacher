import React from 'react';
import { saveAs } from 'file-saver';

const Export = () => {
  const handleExport = () => {
    try {
      // Retrieve data from localStorage
      const essayTextInput = localStorage.getItem('essayTextInput') || 'No essay text saved.';
      const essayFeedback = localStorage.getItem('essayFeedback') || 'No feedback saved.';
      const contentResponse = localStorage.getItem('responseData') || 'No content response data saved.';

      // Combine all the data
      const combinedData = `
        Essay Text Input:\n${essayTextInput}
        
        Essay Feedback:\n${essayFeedback}
        
        Content Response Data:\n${contentResponse}
      `;

      // Convert the data to a Blob and save it as a .txt file
      const blob = new Blob([combinedData], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'exported_data.txt');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="export">
      <button onClick={handleExport}>Export Data as TXT File</button>
    </div>
  );
};

export default Export;
