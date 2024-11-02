/**
 * url prefixes
 */
//backend main url
// const mainDomain = "http://192.168.3.158:5174";
const mainDomain = "http://localhost:5174";

//url for upload files on server
export const serverGetGenomeDataTest = mainDomain + "/data/genome-data";

//url to get the max end point to let calculate the slides
export const serverGetLastEndPoint = mainDomain + "/data/calculate-slides";

//url to get the slide data with Begin and End Point of the slide
export const serverSlideUrl = mainDomain + "/data/slide";

//url to get the range data with the Begin and End Point for the whole canvas
export const serverSearchByGenePositionRangeUrl = mainDomain + "/data/get-range-data";

//url to get the data between a length a range
export const serverGetLengthRangeDataUrl =
  mainDomain + "/data/get-gene-data-by-length";

//url to get the data from the database for the exact row
export const serverGetTheGeneData = mainDomain + "/data/get-gene-data";

//url to get the data from the database from the next and prev btn by slno
export const serverGetTheGeneDataByNextPrevBtn =
  mainDomain + "/data/get-gene-data/by-slno";

//url to get the gene data from the database from the nucleotide seq.
export const serverGetTheGeneDataByNucSeq =
  mainDomain + "/data/get-gene-data-by-seq";

//url to get the gene sequence from the database as the file
export const serverExportGeneSequenceUrl = mainDomain + "/data/export-gene-sequence";

//url to get the result based on the keyword sent to the as the query in request.
export const serverGetResultFromDatabase = mainDomain + "/data/get-keyword-result";
