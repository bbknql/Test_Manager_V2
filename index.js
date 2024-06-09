/**
 * Data processing module
 * @module dataProcessor
 */

const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  timeout: 5000,
  maxRetries: 3
};

/**
 * Process array of data
 * @param {Array} data - Input data array
 * @returns {Object} Processed results
 */
function processData(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Input must be an array');
  }
  
  const results = data.map((item, index) => ({
    id: index,
    value: item,
    processed: true,
    timestamp: new Date().toISOString()
  }));
  
  return {
    count: results.length,
    data: results,
    status: 'success'
  };
}

/**
 * Fetch data from API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} Response data
 */
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${config.apiUrl}${endpoint}`, {
      timeout: config.timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

module.exports = { processData, fetchData, config };
