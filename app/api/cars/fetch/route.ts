import * as cheerio from 'cheerio';
import axios from 'axios';

/**
 * Get all users for game mode
 * @param req 
 * @returns 
 */
// eslint-disable-next-line
export async function GET(req: any, res:any) {
    const url = "https://forza.net/fh5cars";
    const { data } = await axios.get(url);
    
    const $ = cheerio.load(data);

    const cars:any[] = [];

    $("table tbody tr").each((_, row) => {
      const cells = $(row).find("td");

      const model    = $(cells[0]).text().trim();
      const type     = $(cells[1]).text().trim();
      const collect  = $(cells[2]).text().trim();
      const added    = $(cells[3]).text().trim();
      const nickname = $(cells[4]).text().trim();
      const id       = parseInt($(cells[5]).text().trim());

      cars.push({ id, model, type, collect, added, nickname });
    });

    const transformed = cars.map(car => {
        const parts = car.model.split(" ");

        const year = parseInt(car.model.substring(0, 4));
        let make;

        if (parts[1] == "Aston" || parts[1] == "Formula" || parts[1] == "Forsberg"
            || parts[1] == "Funco" || parts[1] == "Hispano" || parts[1] == "Hot Wheels"
            || parts[1] == "Land" || parts[1] == "Local" || parts[1] == "DS" || parts[1] == "W" || parts[1] == "Hot"
            || parts[1] == "Universal" || parts[1] == "RJ" || parts[1] == "SIERRA" || parts[1] == "Spania") {
            make = parts[1] + " " + parts[2];
        } else if (parts[1] == "Lynk" || parts[1] == "Gordon" || parts[1] == "Fast" || (parts[1] == "AMG" && parts[2] == "Transport")) {
            make = parts[1] + " " + parts[2] + " " + parts[3];
        } else {
            make = parts[1];
        }
       
        const model = car.model.substring(5 + make.length).trim();

        return {
            year,
            make,
            model,
            type: car.type,
            collect: car.collect,
            added: car.added || null
        };
    });
    
    return Response.json(transformed);
}