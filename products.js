// Product data parsed from catalog
const PRODUCTS = [
    { id: 'J6KG2JQFVWIRJTAB2QN6NC2M', name: 'Abaya Red N Black W/Buttons', variation: 'Regular', price: 30.00, category: 'abaya', description: '' },
    { id: 'FMVTP4ZAPFTZAV3E55JKXKMA', name: 'Abaya W/zipper', variation: 'Regular', price: 35.00, category: 'abaya', description: '' },
    { id: 'LN76BRDNJFXT4TUJ47ZZ24CL', name: 'Clearance Hijabs', variation: 'Regular', price: 6.00, category: 'hijab', description: '', sku: '8180449' },
    { id: '3NPL6XFIRCJZNVJEVMMSCW4Q', name: 'Colored Sport Tunic', variation: 'Regular', price: 20.00, category: 'tunic', description: '' },
    { id: 'AQQESNRVCVJCZBQ4LG7SSV3I', name: 'Hijab 1-2 PC Amira', variation: 'Regular', price: 8.00, category: 'hijab', description: '' },
    { id: 'YWPIPZYSNBEZG76YIVP4O5EK', name: 'Hijab Fancy Straight Pin Roll', variation: 'Regular', price: 1.00, category: 'hijab', description: '' },
    { id: 'S5EOCNKDFI44HEBXYOTKS2TP', name: 'Hijab Instant', variation: 'Regular', price: 12.00, category: 'hijab', description: '' },
    { id: 'JN3NET76PAUESN72SSCLAI4M', name: 'Hijab Magnets', variation: 'Regular', price: 2.00, category: 'hijab', description: '' },
    { id: '223MZHCSUG3475FMUHC623QP', name: 'Hijab Undercap 1', variation: 'Regular', price: 3.00, category: 'hijab', description: '' },
    { id: 'MGNY2NKCQUIHCJENH743XM4M', name: 'Hijab Undercap 2', variation: 'Regular', price: 5.00, category: 'hijab', description: '', sku: '5906009' },
    { id: 'DKUOYRIP7TR5TVSHU4VEFYVM', name: 'Hijab Straight Pin Roll', variation: 'Regular', price: 3.00, category: 'hijab', description: '' },
    { id: 'VYUKGXWBI6BNJVYJUS55MNDL', name: 'Hijabs Regular', variation: 'Regular', price: 10.00, category: 'hijab', description: '' },
    { id: 'QJICDZYHLBQIUR2HE4VYJJNR', name: 'Kufiyeh', variation: 'Regular', price: 25.00, category: 'other', description: '' },
    { id: 'GTNU7TYVY5MU2PWGDBENOLT3', name: 'Kufiyeh (Yellow)', variation: 'Regular', price: 15.00, category: 'other', description: '' },
    { id: 'CVPMF5WQHVMKEVZZOUXYIZGT', name: 'Mens Cap 1', variation: 'Regular', price: 3.00, category: 'other', description: '' },
    { id: 'PKYN3CFQJ3L7S5SYQJ4OSFQ7', name: 'Mens Cap 2', variation: 'Regular', price: 5.00, category: 'other', description: '' },
    { id: 'G5LXXMPGQ3VJ2JOZGK7PXXSY', name: 'Mens Under Pants - White', variation: 'Regular', price: 8.00, category: 'other', description: '' },
    { id: '6PCY3U5QJ66BSYJNEJVFRFZQ', name: 'Thawb Kids 32-50', variation: 'Regular', price: 25.00, category: 'thawb', description: '' },
    { id: 'OIMYNW3XSWH3U2DJDPMTFGS2', name: 'Thawb Men\'s (Colored)', variation: 'Regular', price: 40.00, category: 'thawb', description: '' },
    { id: '4MTAPKR37FBJC7RTQQJCRMPO', name: 'Thawb Men\'s (White)', variation: 'Regular', price: 27.00, category: 'thawb', description: '' },
    { id: 'AGA54WV4OCSJEWLJBEJFZJ4Y', name: 'Woman Abaya Colored', variation: 'Regular', price: 45.00, category: 'abaya', description: '', sku: '192185P' },
    { id: 'EVEDQMXCQ6WYAF5G3HM4IYCU', name: 'Women Abaya', variation: 'Regular', price: 40.00, category: 'abaya', description: '' },
    { id: 'XJENZTRAGNANXVIO4AC3MJ47', name: 'Women Colored/Blk Abaya', variation: 'Regular', price: 45.00, category: 'abaya', description: '' },
    { id: '7FXSWVEZDNZM6IHNNPU2WS6Y', name: 'Women Thawb Red Design', variation: 'Regular', price: 120.00, category: 'thawb', description: '' },
    { id: 'SYK7PCDZ5FCBESCIBTN4Y6SZ', name: 'Artwork Edit', variation: 'Regular', price: 20.00, category: 'other', description: '' },
    { id: '75KAV27EFCUS557XBKMJ7YZF', name: 'Banner', variation: 'Regular', price: 95.00, category: 'other', description: '' },
    { id: 'BDTYXUP6DOME2TFGDQBJD64U', name: 'CAIRFL Double Sided Multi Color', variation: 'Regular', price: 19.00, category: 'other', description: '' },
    { id: 'NHSXI3XECTSW4XB3PYH4ZTIX', name: 'Camp Leen LS Sports Shirt', variation: 'Regular', price: 9.50, category: 'uniform', description: 'One color, one side long sleeve shirt' },
    { id: 'DW3KCKLCD2CVCVKD2T5E3C7U', name: 'Camp Leena Drawstring Backpacks', variation: 'Regular', price: 7.30, category: 'uniform', description: 'One color, one sided print' },
    { id: 'NCNXKRLFBABPMS5FDLF75WLW', name: 'Camp Leena SS Sports Shirt', variation: 'Regular', price: 8.50, category: 'uniform', description: 'One color, once sided print in Short Sleeve' },
    { id: 'NROTHBA37BOE5M2L3OCKFVJA', name: 'Hifz - SS Cotton', variation: 'Regular', price: 9.00, category: 'uniform', description: '' },
    { id: '76GQTHD3GLVCT7K7TLON7YTX', name: 'Miles for Moffitt', variation: 'Small', price: 15.00, category: 'other', description: '100% Cotton - Unisex' },
    { id: 'T3E6KTK56MT2EF4AH3UVAETJ', name: 'Miles for Moffitt', variation: 'Medium', price: 15.00, category: 'other', description: '100% Cotton - Unisex' },
    { id: 'NLAGKDIJIAI4RXBAT2URNSGI', name: 'Miles for Moffitt', variation: 'Large', price: 15.00, category: 'other', description: '100% Cotton - Unisex' },
    { id: 'X5JI357ZK2KJ7722PL6IDQKM', name: 'Miles for Moffitt', variation: 'XL', price: 15.00, category: 'other', description: '100% Cotton - Unisex' },
    { id: '2ODAAZ6VTOX4O2I4BVKKPMZQ', name: 'Miles for Moffitt', variation: '2XL', price: 16.00, category: 'other', description: '100% Cotton - Unisex' },
    { id: 'EEC444TB5DSD5I6YJ4XHA5PM', name: 'Miles for Moffitt', variation: '3XL', price: 17.00, category: 'other', description: '100% Cotton - Unisex' },
    { id: 'FPTX4SWMS6IH7S3CXGPVHRKB', name: 'Pullover Hoodie', variation: 'Regular', price: 30.50, category: 'uniform', description: 'UAF discounted price' },
    { id: 'ZMGM3GSH5SKWEVMHJHE5CZKH', name: 'Tunic PE', variation: 'Regular', price: 35.00, category: 'tunic', description: '' },
    { id: 'CBQLFG32OW5UU24MOU2KC2PB', name: 'Tunic PE XXS (Cotton)', variation: 'Regular', price: 26.00, category: 'tunic', description: '' },
    { id: '32DKGGZRAJVRTVICU46DOCBT', name: 'Tunic Uniform', variation: 'Regular', price: 28.00, category: 'tunic', description: '' },
    { id: 'GEXUFNZG2DGXANGXSYTKRSII', name: 'Wholesale 1-2pc Sports Hijab', variation: 'Regular', price: 8.00, category: 'wholesale', description: '' },
    { id: '3IESQNLHDZA4RKRUA7O6VJHC', name: 'Wholesale Abaya', variation: 'Regular', price: 27.00, category: 'wholesale', description: '' },
    { id: 'CRZ6DHYGUFCTP7VBGH5HONIG', name: 'Wholesale Cotton LS', variation: 'Regular', price: 11.20, category: 'wholesale', description: '' },
    { id: '4UAK3U5MAEM7AR5MGKZCD7CP', name: 'Wholesale Cotton LS-Bayaan', variation: 'Regular', price: 12.80, category: 'wholesale', description: '' },
    { id: 'GXPYRRJHORK22UNPGLAXO5WE', name: 'Wholesale Cotton SS', variation: 'Regular', price: 9.60, category: 'wholesale', description: '' },
    { id: 'OF3QC7BCCJ2RAG7RQJYUYAVX', name: 'Wholesale Cotton SS-Bayaan', variation: 'Regular', price: 12.00, category: 'wholesale', description: '' },
    { id: 'H2OGQWOJ24OOXTCEXMG32TGO', name: 'Wholesale Instant Hijab', variation: 'Regular', price: 9.75, category: 'wholesale', description: '' },
    { id: 'JAZGL7HN7SE22DMYFSUH266X', name: 'Wholesale Magnets', variation: 'Regular', price: 1.50, category: 'wholesale', description: '1 set' },
    { id: 'HYD3LOTUIMLOQ5B3F26SR2KF', name: 'Wholesale PE Tunic', variation: 'Regular', price: 27.00, category: 'wholesale', description: '' },
    { id: 'HKIUBKO4DQQN5EXCZCVBSM77', name: 'Wholesale Performance LS', variation: 'Regular', price: 12.80, category: 'wholesale', description: '' },
    { id: '66YUV6RKDANGJPAMJP2HGHPI', name: 'Wholesale Performance SS', variation: 'Regular', price: 11.20, category: 'wholesale', description: '' },
    { id: 'UVX233BW7MVNMMTLWY63CEII', name: 'Wholesale Polo Adult SS', variation: 'Regular', price: 18.70, category: 'wholesale', description: '' },
    { id: '5SCN5VSIHSLRMFHBLNK5JJJ3', name: 'Wholesale Polo Performance Limited - Youth', variation: 'Regular', price: 15.00, category: 'wholesale', description: 'Special discount for limited time' },
    { id: 'XK55ZFOPDUWGVCNKRWG2XSA6', name: 'Wholesale Polo Yth SS', variation: 'Regular', price: 17.85, category: 'wholesale', description: '' },
    { id: 'T3RJKD2JUDPHROVZEYYOC4KD', name: 'Wholesale Straight Pins', variation: 'Regular', price: 2.00, category: 'wholesale', description: '1 roll' },
    { id: '2SJRFYXNHMG5QJPWSNLR4BEB', name: 'Wholesale Tunic', variation: 'Regular', price: 23.80, category: 'wholesale', description: '' },
    { id: '63TNFRC3Y2QJH7WZW4APLKRP', name: 'Wholesale Undercap', variation: 'Regular', price: 2.00, category: 'wholesale', description: '' },
    { id: 'L2JVT7GXIXUITR23RH6QIEET', name: 'Wholesale Zip Hoodie -Adult', variation: 'Regular', price: 27.20, category: 'wholesale', description: '' },
    { id: 'GVPSC6DBWN3IERMTUV5RIJTW', name: 'Wholesale Zip Hoodie -youth', variation: 'Regular', price: 24.00, category: 'wholesale', description: '' },
    { id: '5U27MCRMQCAIX4U3ZDJG7D7G', name: 'Wholesale Zip Hoodie XXL', variation: 'Regular', price: 28.80, category: 'wholesale', description: '' }
];

// Helper function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(product => product.category === category);
}

// Helper function to search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.variation.toLowerCase().includes(lowerQuery)
    );
}

// Helper function to format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}
