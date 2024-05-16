import sqlDmpr from "./sqldumper/index.js"

var dbConf = {
    "dmpr": {
        "win32": {
            "baseDir": "c:\\"

        },
        "linux": {
            "baseDir": "/home/moti/reports"

        }
    },
    "reports": {
        "dashboard": {
            "statement": "INSERT IGNORE INTO everest.dashboard %s values %s",
            "columns": {
                "cid": {
                    "fromQueryString": "cid",
                    "formatting": "quote"
                },
                "cmpgn": {
                    "fromQueryString": "cmpgn",
                    "formatting": "quote"
                },
                "dt": {
                    "fromQueryString": "dt",
                    "formatting": "quote"
                },
                "imps": {
                    "defaultValue": "0",
                    "fromQueryString": "imps",
                },
                // "leads": {
                //     "defaultValue": "0",
                //     "fromQueryString": "leads",
                // },
                // "closed_leads": {
                //     "defaultValue": "0",
                //     "fromQueryString": "closed_leads",
                // },
                "cost": {
                    "defaultValue": "0",
                    "fromQueryString": "cost",
                },
                // "rev": {
                //     "defaultValue": "0",
                //     "fromQueryString": "rev",
                // },                
                // "premia": {
                //     "defaultValue": "0",
                //     "fromQueryString": "premia",
                // },
                // "pipe": {
                //     "defaultValue": "0",
                //     "fromQueryString": "pipe",
                // }
            }
        },

    }
}




export default {
    sqldmpr: null,
    init: function () {

        this.sqldmpr = sqlDmpr(dbConf, {
            // "interval" : 300000,
            "interval": 1000 * 100,
            "maxRecords": 1000000
        });
    },
    push: function (rid_, data_) {
        if (!this.sqldmpr) {
            this.init();
        }
        var rec_ = {
            rid: rid_,
            query: data_,
            params: data_.params || {}
        }
        this.sqldmpr.pushReport(rec_);
    },
    flush: function (cb_) {
        if (this.sqldmpr) {
            console.log("dal flush");
            this.sqldmpr.flush(cb_);
        } else {
            console.log('Sql dmper is not initliazed')
            cb_();

        }
    },
    dump: function (cb_) {
        if (this.sqldmpr) {
            console.log("dal flush");
            this.sqldmpr.dump(cb_);
        } else {
            console.log('Sql dmper is not initliazed')
            cb_();

        }
    }
}