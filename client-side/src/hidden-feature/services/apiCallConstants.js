/**
 * url prefixes
 */
//backend main url
console.log(`${window.location.protocol}//${window.location.host}`);
//backend main url
// const mainDomain = "http://192.168.3.158:5173";
const mainDomain = "http://localhost:5174";

//make it live for production and deployement
// const mainDomain = `${window.location.protocol}//${window.location.host}`;

//url for upload files on server
export const serverUploadFileUrl =
  mainDomain + "/add-new-genome-data/upload-file";

//url for upload fasta files on server
export const serverUploadFastaFileUrl =
  mainDomain + "/add-new-genome-data/upload-fasta-file";

//url to download the sample data in csv format
export const serverSampleFileDownloadUrl =
  mainDomain + "/data/sample/download/sample-file-structure.csv";

//url to download the sample data of nucleotideSed
export const serverSampleFastaFileDownloadUrl =
  mainDomain + "/data/sample/dowload/sample-fasta-file-structure.txt";

//url to read the data from the csv file
export const serverReadfileUrl =
  mainDomain + "/add-new-genome-data/read-file-content";

//url to save the data from the csv file to database
export const serverSaveFileContentUrl =
  mainDomain + "/add-new-genome-data/save-file-content";

//url to get the list of all the collections list from the database
export const serverGetCollectionList =
  mainDomain + "/add-new-genome-data/get-genome-list";
