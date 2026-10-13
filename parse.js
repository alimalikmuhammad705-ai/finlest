const fs = require('fs');

const raw = `1\tS Guard Agricultural Research & Services (Pvt) Ltd.\tAgricultural Research & Agri-Tech
2\tHighways Creation (Private) Limited\tInfrastructure & Industrial
3\tPak Denim Limited\tTextiles & Garments
4\tM/S Zubaida Industries\tManufacturing
5\tM/S Malik & Co.\tCommercial Trading
6\tNisar Trading Company\tWholesale & Trading
7\tP.K. Meat & Food Company (Pvt.) Limited\tMeat & Food Products
8\tJM Traders\tGeneral Trading
9\tRavi Traders\tGeneral Trading
10\tSagheer & Company\tCommercial Trading
11\tCasio Metal Industries\tMetal & Hardware
12\tM/S ABCO Technical (Pvt) Ltd.\tTechnical Equipment & Services
13\tSyed Enterprises\tGeneral Trading
14\tM/S Solutronix\tElectronics & Technology
15\tM/S Akif Traders\tGeneral Trading
16\tSubhani Enterprises\tGeneral Trading
17\tK-I-K Trading Company\tCommercial Trading
18\tM/S Guard Friction (Private) Limited\tAutomotive Parts & Friction Products
19\tMalik Auto & Agricultural Industries (Pvt) Ltd\tAutomotive & Agricultural Machinery
20\tM/S Guard Oils (Pvt) Ltd.\tLubricants & Oils
21\tAmin Auto Corporation\tAutomotive Parts
22\tSimco International\tInternational Trading
23\tINC Engineering\tEngineering & Industrial Equipment
24\tAsam Traders\tGeneral Trading
25\tHabib Traders\tGeneral Trading
26\tM/S Muzzamil Traders\tGeneral Trading
27\tPearl Mount Trading Corp.\tCommercial Trading
28\tA.S International Trading Company\tInternational Trading
29\tN F S Traders\tGeneral Trading
30\tA-I Trading Company\tCommercial Trading
31\tMuhammad Saeed Trading Company\tCommercial Trading
32\tGoodwill Enterprises\tGeneral Trading
33\tAnwar Traders\tTrade & Logistics
34\tFirst Deal Enterprises\tCommercial Import
35\tBusiness Empire\tCommercial Trading
36\tAl-Tijarah International\tInternational Trade
37\tM/S P.K. Livestock & Meat Co. (Pvt) Ltd.\tLivestock & Meat Products
38\tJS Internationaal\tInternational Trading
39\tM/S UCH Power (Private) Limited\tPower & Energy
40\tM/S Ahsan Brothers\tCommercial Trading
41\tAmin's\tCommercial Import & Export
42\tWhite House International\tGeneral Trading
43\tAsif Zaheer Trading Company\tCommercial Trading
44\tBenson Belting & Trading Corporation\tIndustrial Belting & Components
45\tCasio Non-Stick Coatings\tChemical Coatings
46\tM/S Kashmir Enterprises\tGeneral Trading
47\tSK Shinwari Enterprises\tGeneral Trading
48\tAyub Bearing Store\tBearings & Automotive Parts
49\tMillat Marble Industry\tMarble & Stone
50\tSultan Enterprise Importer & Exporter\tImport & Export
51\tKhurab Traders\tGeneral Trading
52\tM/S Ayub Bearing Industry\tBearings & Industrial Parts
53\t3W Systems Works\tSystems & Technology
54\tFida Traders\tGeneral Trading
55\tSouth Asian Sourcing Pvt Ltd\tSourcing & Procurement
56\tM.T. Bearing\tBearings & Industrial Parts
57\tJamil Akhtar International\tInternational Trading
58\tKamran Enterprises\tGeneral Trading
59\tLawari Traders\tGeneral Trading
60\tHamza Enterprises\tGeneral Trading
61\tA.B Traders\tGeneral Trading
62\tUmar Industries\tManufacturing & Industrial
63\tHayat International Services\tInternational Services
64\tAkber Traders\tGeneral Trading
65\tZaid Enterprises\tGeneral Trading
66\tSwedish International Circle Enterprise (Pvt.) Limited\tSpecialized Import & Export
67\tA-R Traders International\tInternational Trading
68\tM. Ibrahim & Sons\tCommercial Trading
69\tAWH Agro Industry (Private) Limited\tAgro-Industrial
70\tRaazi Traders\tGeneral Trading
71\tMaryam Bearing Industries\tBearings & Industrial Parts
72\tAHL Enterprises\tGeneral Trading
73\tSmart Life Traders\tGeneral Trading
74\tMubarak Enterprises\tGeneral Trading
75\tAll Precision Equipment Company\tPrecision & Technical Instruments
76\tHassan & Sons Enterprises\tGeneral Trading
77\tMI & MA Crockery House\tCrockery & Household Goods
78\tAl Karam Traders\tGeneral Trading
79\tPort Deal Agencies\tPort & Trade Services
80\tZahid Traders\tGeneral Trading
81\tAl-Saudi Traders\tGeneral Trading
82\tAl Maa Products\tConsumer & Industrial Products
83\tIqra Packages\tPackaging & Packaging Materials
84\tGulma Trading Company\tCommercial Trading
85\tHattar Technical Trading & Services (SMC-Private) Limited\tTechnical Trading & Services
86\tM/S SA Fabricating Industry\tMetal Fabrication & Industrial
87\tAli Traders\tGeneral Trading
88\tMIS Traders\tGeneral Trading
89\tJamil Akhtar Trading Company\tCommercial Trading
90\tSure Secure Solutions and Integrator (Private) Limited\tSecurity & Technology Integration
91\tJA Enterprises\tGeneral Trading
92\tMasood Traders\tGeneral Trading
93\tEco Trade\tEnvironmental & Commercial Trading
94\tDeen Bajwa Impex\tImport & Export
95\tBest Care Solutions\tHealthcare & Care Solutions
96\tDogar Importers (Private) Limited\tImport & Wholesale
97\tM/S Mughal Rehman Traders\tGeneral Trading
98\tK.I.K International\tInternational Trading
99\tQuality Traders\tGeneral Trading
100\tAsad Traders / Imran Enterprises\tGeneral Trading
101\tTiger Boba Food & Beverages (Private) Limited\tFood & Beverages`;

const list = raw.trim().split('\n').map(line => {
  const [num, name, tag] = line.split('\t');
  return { name: name.trim(), tag: tag.trim() };
});

console.log('Parsed count:', list.length);
fs.writeFileSync('parsed_clients.json', JSON.stringify(list, null, 2), 'utf8');
