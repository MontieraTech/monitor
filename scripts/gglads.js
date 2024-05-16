import { GoogleAdsApi, enums } from 'google-ads-api';

import client_secret_json from './client_secret.json' assert { type: "json" };
const  {client_id, client_secret } = client_secret_json.web;

const DEVELOPER_TOKEN = 'zdtY1GI4bjsf55W3vKiKEA'; 
const CUSTOMER_ID = '3895079829'; 
const MANAGER_ID = '4944064231'; 
const REFRESH_TOKEN  ='1//04YXdhcqt4EHmCgYIARAAGAQSNwF-L9Ir2kBNva_7SqxWHx8w-M80yARgSlD1sNr80fDcPd28iSd0lN1HXtw-P9MeBPaPa6SbZP0'

async function main(dt_) {
    const client = new GoogleAdsApi({
        client_id, 
        client_secret,
        developer_token: DEVELOPER_TOKEN
    });

    
    const customer = client.Customer({ 
        customer_id:CUSTOMER_ID,
        refresh_token: REFRESH_TOKEN
    });
    console.log('Customer:', customer);


    const customers = await client.listAccessibleCustomers(REFRESH_TOKEN);
    console.log('Customers:', customers);



    const query = `SELECT   campaign.id,
        campaign.name,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        segments.date
        FROM campaign 
        WHERE segments.date='${dt_}'`;

    // const results = await customer.searchStream({ query }).execute();
    const results = await customer.query( query );
    // console.log('Results:', results);

    const campaigns = [];
    for(const row of results) {
        const campaign = row.campaign;
        campaigns.push({
            cid: campaign.id,
            cmpgn: campaign.name,
            dt:dt_,
            // status: campaign.status,
            imps: row.metrics.impressions,
            clicks: row.metrics.clicks,
            cost: row.metrics.cost_micros/1000000,
        });
    }
    return campaigns;
}

export default main; 
