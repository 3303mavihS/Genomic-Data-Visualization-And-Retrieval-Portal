/**
 * url prefixes
 */
//backend main url
const mainDomain = "http://localhost:5174";

//url for upload files on server
export const serverUploadFileUrl =
  mainDomain + "/add-new-genome-data/upload-file";

//url to download the sample data in csv format
export const serverSampleFileDownloadUrl =
  mainDomain + "/data/sample/download/sample-file-structure.csv";

//url to read the data from the csv file
export const serverReadfileUrl =
  mainDomain + "/add-new-genome-data/read-file-content";

//url to save the data from the csv file to database
export const serverSaveFileContentUrl =
  mainDomain + "/add-new-genome-data/save-file-content";
