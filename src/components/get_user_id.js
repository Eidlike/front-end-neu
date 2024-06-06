import {useCookies} from 'react-cookie'



function Getuserid( ) {
    const [cookie,]=useCookies(['AccessToken'])

const realjob=async()=>{
    const token=cookie.AccessToken
    const fetched_data= await fetch('http://localhost:5000/tstfun',{
        method:'get',
        headers:{
            'Authorization': 'Bearer ',token

        }
    })
    const response = await fetched_data.json()
    console.log(response)

}

realjob();    
}

export default Getuserid