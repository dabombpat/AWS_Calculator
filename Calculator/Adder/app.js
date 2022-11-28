// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    let status;
    let body = {};
    try {
        console.log(event);
        let actual_event = event.body;
        let info = JSON.parse(actual_event);
        
        let a1 = parseInt(event.arg1);
        let a2 = parseInt(event.arg2);
        
        if (isNaN(a1) || isNaN(a2)){
            status = 400;
            body["error"] = "Non Numeric Input";
        } else{
            status = 200;
            let sum = a1 + a2;
            body["result"] = sum.toString();
        }
        
    } catch (err) {
        status = 400;
        body["error"] = err.toString();
    }
        
        // const ret = await axios(url);
        response = {
            'statusCode': status,
            
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin" : "'", // Allow from anywhere
                "Access-Control-Allow-Methods" : "POST" // Allow Post request
            },
            
            'body' : JSON.stringify(body)
        };
        return response;
};