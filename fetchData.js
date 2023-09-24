
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