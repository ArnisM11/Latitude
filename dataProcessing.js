
function filterDataByMonth(data, selectedMonth) {
    return data.filter(invoice => {
        if (invoice.invoice_date) {
            const invoiceDate = new Date(invoice.invoice_date);
            return invoiceDate.getMonth() === parseInt(selectedMonth);
        }
        return false; // Filter out invoices without a date property
    });
}

// Example usage: Calculate the top 10 items by quantity sold
function calculateTop10Items(data) {
    // Create a dictionary to store item quantities
    const itemQuantities = {};
    // Iterate through the invoice rows and calculate item quantities
    data.forEach((invoice) => {
        invoice.rows.forEach((row) => {
            const itemId = row.item;
            const quantity = row.quantity;

        if (itemId in itemQuantities) {
            itemQuantities[itemId] += quantity;
        } else {
            itemQuantities[itemId] = quantity;
        }
    });
    });

    // Convert the dictionary to an array of objects
    const itemsArray = [];
    //itemQuantities.forEach
    for (const itemId in itemQuantities) {
        itemsArray.push({
            item_id: itemId,
            quantity: itemQuantities[itemId],
        });
    }
    // Sort the items by quantity in descending order
    itemsArray.sort((a, b) => b.quantity - a.quantity);

    // Select the top 10 items
    const top10Items = itemsArray.slice(0, 10);
    return top10Items;
}
async function filterInvoicesByItemName(itemName) {
    const invoices = await fetchAllInvoices(); 
    const itemData = await fetchAllItems(); 
    const itemId = findItemIdByName(itemData.items, itemName);

    if (itemId !== null) {
        return invoices.filter(invoice => invoiceContainsItem(invoice, itemId));
    } else {
        console.error("Item not found, showing full realisation");
        return invoices; 
    }
}

function findItemIdByName(items, itemName) {
    const matchingItem = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
    return matchingItem ? matchingItem.id : null;
}

function invoiceContainsItem(invoice, itemId) {
    return invoice.rows.some(row => row.item === itemId);
}
function processRealizationsData(data) {
    const dayTotals = {};

    data.forEach(invoice => {
        const invoiceDate = new Date(invoice.invoice_date);
        const day = invoiceDate.toLocaleDateString(); 

        if (dayTotals[day]) {
            dayTotals[day] += calculateTotalRealization(invoice);
        } else {
            dayTotals[day] = calculateTotalRealization(invoice);
        }
    });

    const days = Object.keys(dayTotals);
    const totalRealizations = days.map(day => dayTotals[day]);

    return { days, totalRealizations };
}

function calculateTotalRealization(invoice) {
    let total = 0;
    invoice.rows.forEach(row => {
        total += parseFloat(row.price);
    });
    return total;
}