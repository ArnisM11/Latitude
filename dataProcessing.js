function filterDataByMonth(data, selectedMonth) {
    return data.filter(item => {
        const invoiceDate = new Date(item.invoice_date);
        return invoiceDate.getMonth() === selectedMonth;
    });
}

// Example usage: Calculate the top 10 items by quantity sold
function calculateTop10Items(data) {
    // Create a dictionary to store item quantities
    const itemQuantities = {};
    //console.log("data : ", data )
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