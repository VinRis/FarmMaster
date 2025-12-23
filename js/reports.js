// js/reports.js
export const generatePDF = (records, title) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 167, 69); // Green color
    doc.text("Farm Manager Report", 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report: ${title}`, 14, 32);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 38);

    // Table Data
    const tableColumn = ["Date", "Description", "Category", "Amount/Value"];
    const tableRows = [];

    records.forEach(ticket => {
        const ticketData = [
            ticket.date,
            ticket.description,
            ticket.category,
            ticket.amount || ticket.value || "-"
        ];
        tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 50 });
    doc.save(`${title}_Report.pdf`);
};
