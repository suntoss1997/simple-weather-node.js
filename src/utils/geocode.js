const request=  require('postman-request');

const geocode=(address, callback)=>{

    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?&access_token=pk.eyJ1Ijoic3VudG9zczE5OTciLCJhIjoiY2tmOW85NGZ6MG53dzJybXF6eXhkOGpqaiJ9.S8MzvRAvna9lSJ31N-HB1A`;
    
    request({url, json:true}, (error,{body}={})=>{
        if(error){
            callback('Unable to connect to location Services!', undefined);

        } else if (body.features.length===0){
            callback('Unable to find location. Try another search !', undefined);    
    } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }


    });
    

}

module.exports=geocode;