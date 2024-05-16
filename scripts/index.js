
process.env.DEBUG = 'dmpr'
process.env.NODE_ENV = 'development';

import moment from "moment"
import minimist from 'minimist';

import dal from "./dal.js";
import gglads from "./gglads.js"
import fcbkads from "./fcbkads.js"

import { getLastDate } from "./sql.js";



class dates {
    constructor() {

    }

    getDatesAr(dates_prd) {
        var dates_ = []
        while (dates_prd.from <= dates_prd.to) {
            dates_.push(dates_prd.from.format("YYYY-MM-DD"))
            dates_prd.from = dates_prd.from.add(1, "days");
        }
        console.log("Dates are :" + JSON.stringify(dates_))
        return dates_
    }

    getDates(argv, last_date) {
        var dates_prd = null;
        if (argv.d) {
            var dts_ = argv.d.split('-');
            dates_prd = {
                from: new moment(dts_[0], "YYYYMMDD"),
                to: new moment(dts_[1], "YYYYMMDD")
            }
        } else {
            dates_prd = {
                from: last_date ? new moment(last_date, "YYYY-MM-DD") :moment().subtract(30, 'days'),
                to: moment().subtract(1, 'days')
            }            
        }
        return this.getDatesAr(dates_prd);
    }


}


class App {

    constructor(argv_) {
        this.argv = argv_;
    }



    resultsHandler(results_) {
        for(const row of results_) {
            dal.push("dashboard", row);
            console.log(row);
        }

    }


    async main() {
        let dates_ = new dates();
        let dates_ar = dates_.getDates(this.argv, await getLastDate());
        for await (const dt_ of dates_ar) {
            console.log("Date is :" + dt_)
            this.resultsHandler(await gglads(dt_));
            this.resultsHandler(await fcbkads(dt_));
        }
        console.log("START FINAL DUMP !!")
        dal.flush(() => {
            console.log("dal flush!! wait for 1 sec ...");
            dal.dump(() => {
                console.log("FINAL DUMP IS DONE!!")
            })
          })



    }
}






//command line sample
//node ./index   -d 20190928-20190928
try {

    var argv = minimist(process.argv.slice(2));
    var app_ = new App(argv);
    await app_.main();
    console.log("App is done ")
    setTimeout(function () { process.exit(0); }, 3000);
    
} catch (e) { console.log(e); }









