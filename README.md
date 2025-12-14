# Medical Billing Calculator

A simple, web-based medical billing calculator designed for a small offshore billing company. This tool allows users to input patient details, procedure costs, and automatically calculates the final bill including taxes, insurance adjustments, and discounts.

## Features

*   **Dynamic Procedure List**: Add multiple procedures with codes and costs.
*   **Real-time Calculation**: Updates totals automatically as you type.
*   **Adjustable Settings**: Customize tax rate, insurance coverage percentage, and discounts.
*   **Printable Invoice**: Clean, printer-friendly layout for generating invoices.
*   **Responsive Design**: Works on desktop and mobile devices.

## Usage

1.  **Patient Details**: Enter the patient's name at the top.
2.  **Add Procedures**:
    *   Click "+ Add Procedure" to add a new row.
    *   Enter the **Procedure Code** (e.g., CPT code) and **Cost**.
    *   Use the "Remove" button to delete a line item.
3.  **Adjust Settings**:
    *   **Tax Rate (%)**: Enter the applicable tax percentage (default is 5%).
    *   **Insurance Coverage (%)**: Enter the percentage covered by insurance (e.g., 80%).
    *   **Discount ($)**: Enter any specific dollar amount to be deducted.
4.  **View Summary**: The bottom section displays the breakdown:
    *   **Subtotal**: Sum of all procedure costs.
    *   **Tax**: Calculated on the subtotal.
    *   **Insurance Coverage**: Deducted from the (Subtotal + Tax).
    *   **Total Patient Payable**: The final amount the patient owes.
5.  **Print**: Click "Print Invoice" to open the browser's print dialog. The layout is optimized to hide buttons and show only the invoice details.

## Calculation Logic

*   **Subtotal** = Sum(Procedure Costs)
*   **Tax** = Subtotal * (Tax Rate / 100)
*   **Insurance Deduction** = (Subtotal + Tax) * (Insurance Rate / 100)
*   **Total Payable** = Subtotal + Tax - Insurance Deduction - Discount

## Deployment

This project is built with static HTML, CSS, and JavaScript. It can be deployed easily to **GitHub Pages**.

1.  Push this code to a GitHub repository.
2.  Go to the repository **Settings**.
3.  Navigate to the **Pages** section.
4.  Select the `main` branch as the source.
5.  Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
