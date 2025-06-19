# CodeAssessment

This is a simple Angular project developed as part of a coding challenge.
Project url: https://josepinho99.github.io/CodeAssessment/

## Overview

The challenge included two main tasks:

### 1. Product Listing Page

- Create a page that displays products fetched from an API.
- Each product displays:
    - **Title**
    - **Price**
    - **Rating**
    - **Image**
- Follow a provided visual guideline using only **SCSS**, with **no external libraries or prebuilt components**.

I met this requirement by leveraging **Flexbox** for layout and styling of the product components.

#### Extra: Category Filter

An additional feature involved adding a **category filter dropdown**.

- I used a native `<select>` element to comply with the "no libraries" restriction.
- In a real-world project, I would avoid using the native select due to its limitations (e.g., no built-in clear/reset functionality).
- That feature (clearing the selection) was ultimately not implemented. Given more time, I would have built a custom dropdown component, similar to the one used in the cart feature.

---

### 2. Cart Feature

The second task was to implement a **cart system**. The challenge allowed some flexibility in how it could be displayed.

- I chose to allow **inline editing** within the product rows.
- A **toggleable dropdown** was added at the top to show:
    - Products in the cart
    - Their quantities
    - The total price

---

## Notes

Due to time constraints proposed by the challenge, some areas were left unfinished or unrefined:

- **No unit tests and no error handling**
- **Some styles could be further polished**

Additionally, I used **LLMs** during development primarily for layout ideas, SCSS suggestions, and README formatting.

---
