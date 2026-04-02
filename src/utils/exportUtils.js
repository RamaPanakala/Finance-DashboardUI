/**
 * Export Utilities
 * Handles CSV and JSON export functionality for transactions and financial data
 * 
 * Features:
 * - Export transactions to CSV
 * - Export transactions to JSON
 * - Export financial summary report
 * - Download files with proper formatting
 */

/**
 * Export data to CSV format
 * @param {Array} data - Array of objects to export
 * @param {String} filename - Output filename
 */
export const exportToCSV = (data, filename = 'data.csv') => {
  try {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    // Add rows
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        // Handle values with commas by wrapping in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value || '';
      });
      csvContent += values.join(',') + '\n';
    });

    // Create blob and download
    downloadFile(csvContent, filename, 'text/csv');
  } catch (error) {
    console.error('CSV export error:', error);
    alert('Failed to export CSV');
  }
};

/**
 * Export data to JSON format
 * @param {*} data - Data to export
 * @param {String} filename - Output filename
 */
export const exportToJSON = (data, filename = 'data.json') => {
  try {
    if (!data) {
      alert('No data to export');
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
  } catch (error) {
    console.error('JSON export error:', error);
    alert('Failed to export JSON');
  }
};

/**
 * Export financial report
 * @param {Object} summary - Financial summary data
 * @param {Array} transactions - Transaction data
 * @param {String} filename - Output filename
 */
export const exportFinancialReport = (summary, transactions, filename = 'financial_report.json') => {
  try {
    const report = {
      exportDate: new Date().toISOString(),
      summary: summary,
      transactions: transactions,
      statistics: {
        totalTransactions: transactions.length,
        averageTransaction: transactions.length > 0 
          ? (summary.totalExpenses / transactions.length).toFixed(2)
          : 0,
        transactionsByType: {
          income: transactions.filter(t => t.type === 'income').length,
          expenses: transactions.filter(t => t.type === 'expense').length,
        }
      }
    };

    downloadFile(JSON.stringify(report, null, 2), filename, 'application/json');
  } catch (error) {
    console.error('Report export error:', error);
    alert('Failed to export report');
  }
};

/**
 * Generic file download helper
 * @param {String} content - File content
 * @param {String} filename - Output filename
 * @param {String} mimeType - MIME type
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Print financial report
 * @param {Object} data - Data to print
 */
export const printReport = (data) => {
  try {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
    printWindow.document.close();
    printWindow.print();
  } catch (error) {
    console.error('Print error:', error);
    alert('Failed to print');
  }
};
