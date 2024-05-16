// const adsSdk = require('facebook-nodejs-business-sdk');
import  adsSdk from 'facebook-nodejs-business-sdk';

//  app id is:7006554366139491
const accessToken='EABjkbJAX3GMBO0uNVhL7ZAPFqrAA9SdfzSw8AAIXwPK7TYa4rypkQlFWRLVWjsILeKTkyRWWErxzaZAI6xdwXddzZBhJ3td56X2ZBPAMrfz6KcvIfhysvM87JWw4k1dUGK7UrUPAqhFTkv8dEKRSMJtcfc3pPxWDsza9mcXNJf0UoMHwagDSa0T29bYZD';
const adAccountId = 'act_2163078083722617';
const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;



async function getInsights(account, dt_){
    let results = [];
    let insights= await account.getInsights([
        'campaign_id', // 'campaign_id' is the id of the campaign
        'campaign_name',
        'impressions',
        'clicks',
        'spend',       
    ], {
        time_range: {'since':dt_,'until':dt_},
        level: 'campaign',
        limit: 100
    })

    insights.forEach((insight) => {   
            results.push({
                cid: insight.campaign_id,
                dt: dt_,
                cmpgn: insight.campaign_name,
                imps: insight.impressions,
                clicks: insight.clicks,
                cost: insight.spend,
            });
        }
        );

    
    return results;
    }



  async function main(dt_) {
   
    const account = new AdAccount(adAccountId);

    await account.read([AdAccount.Fields.name])
    return await  getInsights(account,dt_);
    
  }

 
  export default main; 