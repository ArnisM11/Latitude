    
        let invoiceData;
        // Function to fetch data from a given URL
        async function fetchData(url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok for URL: ${url}`);
            }
            return response.json();
        }
        async function fetchCustomers() {
            try {
                const data = await fetchData('http://localhost:3000/api/customers');

                // Log the customer data to the console
                console.log('Customer data:', data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        }

        async function fetchAllItems() {
            let allItems = [];
            let nextPage = 'http://localhost:3000/api/items'; 
            const data = await fetchData(nextPage);
            
            while (nextPage) {
                allItems = allItems.concat(data.results);
                nextPage = data.next; 
            }
            return {items : allItems, data : data.results };
        }
        async function fetchAllInvoices() {
            let nextPage = 'http://localhost:3000/api/invoices';
            let allInvoices = [];
            const data = await fetchData(nextPage);

            while (nextPage) {
                allInvoices = allInvoices.concat(data.results);
                nextPage = data.next;
            }
            //console.log('Invoices:', allInvoices);
            return allInvoices;
        }
        async function fetchAllInvoiceRows() {
            let nextPage = 'http://localhost:3000/api/invoice-rows';
            let allInvoiceRows = [];
            const data = await fetchData(nextPage);

            while (nextPage) {
                allInvoiceRows = allInvoiceRows.concat(data.results);
                nextPage = data.next; 
            }
            console.log('Invoice rows:', allInvoiceRows);
            return allInvoiceRows;
        }

        async function fetchInvoiceData() {
            try {
                // Fetch invoice data
                invoiceData = await fetchAllInvoices();

                const itemDataResponse = await fetchAllItems();
                const itemData = itemDataResponse.items;
                
                const itemLabels = {};
                itemData.forEach(item => {
                    itemLabels[item.id.toString()] = item.name;
                });

                // Example usage: Filter data for January (0 represents January)
                const selectedMonth = 0;
                const filteredData = filterDataByMonth(invoiceData, selectedMonth);
                
                // Example usage: Calculate the top 10 items by quantity sold
                const top10Items = calculateTop10Items(filteredData);
                console.log("Top10 : ", top10Items);
                // Example usage: Update the chart with the top 10 items
                updateChart(top10Items,itemLabels);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        }