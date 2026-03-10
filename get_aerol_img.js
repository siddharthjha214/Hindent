import https from 'https';

https.get('https://hindent.com/products/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const aerolSection = data.substring(data.indexOf('Aerol Formulation Pvt Ltd'), data.indexOf('Nirmal Trans Belts'));
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = imgRegex.exec(aerolSection)) !== null) {
      console.log(match[1]);
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
