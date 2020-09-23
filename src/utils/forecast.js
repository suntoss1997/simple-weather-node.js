const request=require('postman-request');

const weatherstack_key='ae176bc741e57c63abba1594ac1d8eae';

const forecast=(lat, long, callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=${weatherstack_key}&query=${lat},%20${long}`;
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to  weather services', undefined);
        } else if(body.error){
            callback('Unable to find location for weather', undefined);

        }else {
            callback(undefined, body.current.weather_descriptions[0]+ ". It is apparently " +body.current.temperature+ " and it feels like " + body.current.feelslike+ ".");
        }
    });

}


module.exports=forecast;