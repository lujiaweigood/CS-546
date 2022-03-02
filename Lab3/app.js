
const people = require("./people");
const stock = require("./stocks");


//call main
async function main()
{
    try
    {
        const id = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log (id)
    }
    catch (error)
    {
        console.log(error)
    }
    try
    {
        const mail = await people.sameEmail("harvard.edu");
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }
    try
    {
        const mail = await people.manipulateIp();
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }
    try
    {
        const mail = await people.sameBirthday(9, 25);
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }   
    try
    {
        const mail = await  stock.listShareholders("Aeglea BioTherapeutics, Inc.");
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }
    try
    {
        const mail = await  stock.totalShares('Aeglea BioTherapeutics, Inc.'); 
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }
    try
    {
        const mail = await  stock.listStocks("Grenville", "Pawelke" );
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }
    try
    {
        const mail = await  stock.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (mail)
    }
    catch (error)
    {
        console.log(error)
    }
}
    main();
