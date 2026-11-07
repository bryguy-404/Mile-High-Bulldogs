// Source: the seven product PDFs supplied by Luke Wyckoff, November 7, 2026.
// Orders are arranged directly with the supplier; availability is confirmed by Loni.
// Contact verified in Loni's September 27 email forwarded by Luke in “FW: Mile High Website”.
export const swagContact = {
  name: 'Loni',
  business: 'Dezigns with Loni LLC',
  phone: '231-598-9194',
  phoneHref: 'tel:+12315989194',
  email: 'designswithloni@gmail.com',
} as const;

export const swagOrderEmail = (product: string) =>
  `mailto:${swagContact.email}?subject=${encodeURIComponent(`Mile High Bulldogs order — ${product}`)}&body=${encodeURIComponent(`Hi Loni,\n\nI'd like to order this item from the Mile High Bulldogs collection: ${product}.\n\nSize (if applicable):\nQuantity:\n\nPlease let me know availability and how to complete my order.\n\nThank you!`)}`;

export const swag = [
  { id: '00860', brand: 'Gildan', name: 'The everyday Bulldog tee.', type: 'Unisex Softstyle® Midweight T-Shirt', price: 22, size: 'S–4XL', description: 'Soft, ring-spun cotton in a modern classic fit. Bulldog pride up front. Mile High on the back.', alt: 'White Gildan T-shirt, front and back, with the Bulldog mountain graphic and Mile High Bulldog lettering.' },
  { id: '20384', brand: 'Champion', name: 'Reverse Weave® Crewneck', type: 'Unisex sweatshirt', price: 67, size: 'S–3XL', description: 'A heavyweight, relaxed-fit crewneck with a ribbed collar and cuffs, plus Mile High embroidery on the sleeve.', alt: 'White Champion crewneck showing the chest Bulldog logo, back, and embroidered Mile High sleeve detail.' },
  { id: '03960', brand: 'Gildan', name: 'Youth Crewneck', type: 'Youth Softstyle® Midweight Sweatshirt', price: 28, size: 'YXS–YXL', description: 'A cozy, brushed interior and classic fit for the next generation of Bulldogs. Finished with bold sleeve lettering.', alt: 'White youth Gildan sweatshirt with a large Bulldog mountain graphic and Mile High Bulldog lettering down the sleeve.' },
  // The attachment filename says 153533; the printed product sheet says 15353.
  { id: '153533', brand: 'adidas', name: 'Men’s Quarter-Zip', type: 'Elevated Fleece Pullover', price: 86, size: 'XS–4XL', description: 'A regular-fit fleece layer in a cotton and recycled polyester blend, with Bulldog chest and Mile High sleeve embroidery.', alt: 'White adidas men’s quarter-zip shown front and back, with close-ups of the Bulldog, Mile High, and adidas details.' },
  { id: '02096', brand: 'adidas', name: 'Women’s Quarter-Zip', type: 'Stretch Fleece Pullover', price: 55, size: 'S–3XL', description: 'Warmth with a little stretch. A shaped fit, moisture-management fabric, and a cadet collar, finished with Bulldog details.', alt: 'White adidas women’s quarter-zip with a Bulldog chest logo, Mile High sleeve embroidery, and a back view.' },
  { id: '00195', brand: 'Richardson', name: 'The 112 Snapback', type: 'Five-panel cap', price: 30, size: 'Adjustable snapback', description: 'A structured five-panel cap with a mesh back, pre-curved bill, and Bulldog pride from every angle.', alt: 'White Richardson cap showing the Bulldog front design, mesh back, adjustable closure, and Mile High Bulldog embroidery.' },
  { id: '21595', brand: 'Sportsman', name: 'Pom-Pom Beanie', type: 'Cuffed knit beanie', price: 18, size: 'Also offered without the pom-pom', description: 'A red acrylic knit with a three-inch cuff and embroidered Bulldog details. A little extra color for colder days.', alt: 'Red cuffed pom-pom beanies showing the Bulldog front design and Mile High Bulldog back embroidery.' },
] as const;
