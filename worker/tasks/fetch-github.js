var fetch = require('node-fetch')

var redis = require('redis');
client = redis.createClient();


const {promisify} =require('util');
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);



const baseurl =  'https://jobs.github.com/positions.json'
async function fetchGithub(){

    let resultCount=1; onPage=0;
    const allJobs =[];
    //fetch all pages
    while(resultCount > 0){
        const res = await fetch(`${baseurl}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs)
        resultCount = jobs.length;
        console.log('got ',resultCount,' jobs');
        onPage++;

    }
    console.log('Total in array [] = ', allJobs.length, 'jobs')

    //filter algo
    const jrJobs =  allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        let isJunior =true;
        //algo logic
        if  (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
            )
            {
                return false
            }
        return true;

    })

    console.log('Filyered out jobs to', jrJobs.length)


    //set in redis
    const success = await setAsync('github',    JSON.stringify(jrJobs));
    console.log({success})
}


module.exports = fetchGithub;