import * as dbDocuments from '../../dynamo/CavnessDocuments';
import * as dbDocumentAccess from '../../dynamo/DocumentAccess';
import * as dbCompanyLocations from '../../dynamo/CompanyLocation';

export async function getMyCompanyDocuments (companyId) {

    let locations = await dbCompanyLocations.getCompanyLocations(companyId);
    console.log('locations:',locations);
    let promises = [];
    // Fetch all state specific docs
    let states = [];
    locations.forEach((location) => {
        console.log('getting docs for location:',location);
        promises.push(dbDocumentAccess.getDocsByArgs({type:'city',...location}));
        if(states.indexOf(location.state) == -1){
          states.push(location.state);
        }
    });
    // Fetch all city specific docs
    states.forEach((state) => {
        promises.push(dbDocumentAccess.getDocsByArgs({type:'state',state:state}));
    });
    // Fetch all company specific docs
    promises.push(dbDocumentAccess.getDocsByArgs({type:'company',companyId:companyId}));
    console.log('access promises:',promises);
    return Promise.all(promises).then( (values) => {
      console.log('location and company Docs:',JSON.stringify(values));
      let keyArray = [];
        values.forEach((val) => {
          val.forEach((doc) => {
           keyArray.push({documentType:doc.type,documentId:doc.documentId});
         });
      });
    // Fetch all national docs
      console.log('keys to fetch:',keyArray);
      let promises2 = [];
      promises2.push(dbDocuments.getDocumentsByKeys(keyArray));
      promises2.push(dbDocuments.listByType({documentType:'national'}));
      return Promise.all(promises2).then( (docs) => {
        console.log('batch results:',docs[0]);
        return [].concat.apply([], docs);
      });
    });
  }