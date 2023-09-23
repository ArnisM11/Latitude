import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

// Example server-side code to paginate and consolidate data from multiple API pages
app.get('/api/items', async (req, res) => {
    try {
      const allItems = [];
  
      // Loop through multiple pages of the external API
      for (let page = 1; page <= 9; page++) { // Adjust the number of pages as needed
        const response = await fetch(`https://api.bpms.lv/items/?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        allItems.push(...data.results);
      }
  
      // Respond with the consolidated data
      res.json({ results: allItems });
    } catch (error) {
      console.error('Error fetching data from the external API:', error);
      res.status(500).json({ error: 'Unable to fetch data from the external API' });
    }
  });

app.get('/api/customers', async (req, res) => {
    try {
      // Make a request to the external API for customer data
      const response = await fetch('https://api.bpms.lv/customers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Respond with the customer data
      res.json(data);
    } catch (error) {
      console.error('Error fetching customer data from the external API:', error);
      res.status(500).json({ error: 'Unable to fetch customer data from the external API' });
    }
  });
  app.get('/api/invoices', async (req, res) => {
    try {
      const allInvoices = [];
  
      // Loop through multiple pages of the external API
      for (let page = 1; page <= 68; page++) { // Adjust the number of pages as needed
        const response = await fetch(`https://api.bpms.lv/invoices/?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        allInvoices.push(...data.results);
      }
  
      // Respond with the consolidated data
      res.json({ results: allInvoices });
    } catch (error) {
      console.error('Error fetching data from the external API:', error);
      res.status(500).json({ error: 'Unable to fetch data from the external API' });
    }
  });

app.get('/api/invoice-rows' ,async (req,res) => {
    try {
        const allInvoiceRows = [];
    
        // Loop through multiple pages of the external API
        for (let page = 1; page <= 346; page++) { // Adjust the number of pages as needed
          const response = await fetch(`https://api.bpms.lv/invoice-rows/?page=${page}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          allInvoiceRows.push(...data.results);
        }
    
        // Respond with the consolidated data
        res.json({ results: allInvoiceRows });
      } catch (error) {
        console.error('Error fetching data from the external API:', error);
        res.status(500).json({ error: 'Unable to fetch data from the external API' });
      }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
