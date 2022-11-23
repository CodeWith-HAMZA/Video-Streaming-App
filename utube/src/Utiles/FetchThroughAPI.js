 
import axios from "axios";
 

 
// * Base URL For The Current-API
// ! Don't Use '/' in the end of BASE_URL, or The App May Break :|
const BASE_URL = "https://youtube-v31.p.rapidapi.com";
// // const options = {
// //     params: {
//         // relatedToVideoId: '7ghhRHRP6t4',
//         // part: 'id,snippet',
//         // type: 'video',
//         // maxResults: '50'

// //     },
// //     headers: {
// //         'X-RapidAPI-Key': '889d2e1235mshffe1aba3d372808p1e8586jsnca3b7d74e587',
// //         'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
// //     }
// // };

// // axios.request(options).then((response) => {
// //     console.log(response.data);
// // }).catch((error) => {
// //     console.error(error);
// // });
// // console.log(REACT_APP_RAPID_API_KEY)

// // const res = await axios.request(options);
// // console.log(res.data);

const options = {
  method: "GET",
  headers: {
    // todo: The Key Would be Accessed Through '.env' (dotenv file)
    "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

// * Creating and Exporting-Function To Call "APIS" Conveniently
export const FetchAPI = async (url) => {
  // Todo: I Would Replace .fetch() Method With The Modern .axios() Method
  // const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  // return data; 
  const response = await fetch(`${BASE_URL}/${url}`, options);
  const json = await response.json(); 
  return json;
};
