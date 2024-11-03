import { database } from "../app.js";
import { ObjectId } from "mongodb";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

//file path constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//this will return the data to show on the first load of data
export const returnFirstWindowData = async (req, res) => {
  try {
    //modified_ralstoniagenedetails
    const collection = database.collection("modified_ralstoniagenedetails");

    const genomeData = await collection
      .find({
        $expr: {
          $and: [
            { $gte: [{ $toInt: "$Begin" }, 1] },
            { $lte: [{ $toInt: "$Begin" }, 100000] },
          ],
        },
      })
      .toArray();

    // Return the fetched data to the client
    res.status(200).json({
      data: genomeData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//this will return the last Row's End value so that it can be used on front end
export const returnLastPointOfData = async (req, res) => {
  try {
    const collection = database.collection("modified_ralstoniagenedetails");

    // Ensure we treat "End" as a number and sort by "End" in descending order
    const highestEndDocument = await collection
      .aggregate([
        {
          $addFields: {
            EndAsNumber: { $toInt: "$End" }, // Ensure "End" is cast as a number
          },
        },
        {
          $sort: { EndAsNumber: -1 }, // Sort by "EndAsNumber" in descending order
        },
        {
          $limit: 1, // Limit the result to the top document
        },
      ])
      .toArray();

    // If the document exists, return the highest "End" value
    if (highestEndDocument.length > 0) {
      const highestEndValue = highestEndDocument[0].EndAsNumber;

      res.status(200).json({
        EndPoint: highestEndValue,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//this function will take params and query values so that it can take be used to filter the
//data from the database
export const returnSlideData = async (req, res) => {
  try {
    const { slideNo } = req.params; // Get slide number from the path
    const begin = parseInt(req.query.begin, 10); // Convert begin to an integer
    const end = parseInt(req.query.end, 10); // Convert end to an integer

    // Use slideNo, begin, and end as needed, e.g.
    console.log(`Slide Number: ${slideNo}, Begin: ${begin}, End: ${end}`);
    //return the response
    const collection = database.collection("modified_ralstoniagenedetails");

    const genomeData = await collection
      .find({
        $expr: {
          $and: [
            { $gte: [{ $toInt: "$End" }, begin] },
            { $lte: [{ $toInt: "$Begin" }, end] },
          ],
        },
      })
      .toArray();

    // Return the fetched data to the client
    res.status(200).json({
      data: genomeData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//this function will take the query values so that it can return the data between the range
export const returnSearchByGenePositionRange = async (req, res) => {
  try {
    //code
    const begin = parseInt(req.query.begin, 10); // Convert begin to an integer
    const end = parseInt(req.query.end, 10); // Convert end to an integer
    // Use slideNo, begin, and end as needed, e.g.
    console.log(`Begin: ${begin}, End: ${end}`);
    // Adjust the begin and end to the nearest multiple of 100000
    const adjustedBegin = Math.floor(begin / 100000) * 100000;
    const adjustedEnd = Math.ceil(end / 100000) * 100000;

    console.log(`Begin: ${begin}, End: ${end}`);
    console.log(
      `Adjusted Begin: ${adjustedBegin}, Adjusted End: ${adjustedEnd}`
    );
    //return the response
    const collection = database.collection("modified_ralstoniagenedetails");

    const genomeData = await collection
      .find({
        $expr: {
          $and: [
            { $gte: [{ $toInt: "$End" }, begin] },
            { $lte: [{ $toInt: "$Begin" }, end] },
          ],
        },
      })
      .toArray();

    // Return the fetched data to the client
    res.status(200).json({
      data: genomeData,
      range: {
        adjustedBegin, // Start of the adjusted range (nearest multiple of 100000)
        adjustedEnd, // End of the adjusted range (nearest multiple of 100000)
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//this function will take the query id values to return the data of that particular id
export const returnGeneData = async (req, res) => {
  try {
    const { gene_id } = req.query;

    if (!gene_id) {
      return res.status(400).json({ error_message: "Gene ID is required" });
    }

    const collection = database.collection("modified_ralstoniagenedetails");

    // Convert gene_id to ObjectId if necessary
    const geneData = await collection.findOne({ _id: new ObjectId(gene_id) });

    if (!geneData) {
      return res.status(404).json({ error_message: "Gene data not found" });
    }

    res.status(200).json(geneData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//this function will take the slno in the query to return the data of the particular slno
export const returnGeneDataByNextPrevBtn = async (req, res) => {
  try {
    //code
    const { gene_slno } = req.query;
    if (!gene_slno) {
      return res.status(400).json({ error_message: "gene_slno is required" });
    }

    const collection = database.collection("modified_ralstoniagenedetails");

    // Find the gene document by slno
    const geneData = await collection.findOne({
      SlNo: gene_slno,
    });

    if (!geneData) {
      return res.status(404).json({ error_message: "Gene data not found" });
    }

    // Return the found gene data
    res.status(200).json(geneData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//return the gene data by based on sequence
export const returnGeneBySeq = async (req, res) => {
  try {
    //code
    const { gene_seq } = req.body;
    // console.log(gene_seq);
    if (!gene_seq) {
      return res.status(400).json({ error_message: "gene_seq is required" });
    }
    // Log the received sequence for debugging
    console.log("Received gene sequence:", gene_seq);
    const collection = database.collection("modified_ralstoniagenedetails");
    // Find the gene by NucleotideSeq
    const geneData = await collection.findOne({ NucleotideSeq: gene_seq });

    if (!geneData) {
      return res.status(404).json({ error_message: "Gene data not found" });
    } else {
      // Return the gene data as a JSON response
      res.status(200).json({ geneData });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//return the data by gene length
export const returnGeneByLength = async (req, res) => {
  try {
    const { gene_min_length, gene_max_length } = req.query;

    // Validate that both parameters are provided
    if (!gene_min_length || !gene_max_length) {
      return res.status(400).json({
        error_message:
          "Please provide both gene_min_length and gene_max_length",
      });
    }

    // Log the received lengths for debugging
    console.log(
      "Received min and max length: ",
      gene_min_length,
      gene_max_length
    );

    // Access the collection
    const collection = database.collection("modified_ralstoniagenedetails");

    // Use aggregation to convert Length to a number and filter by range
    const genes = await collection
      .aggregate([
        {
          $addFields: {
            numericLength: { $toDouble: "$Length" }, // Convert Length to number
          },
        },
        {
          $match: {
            numericLength: {
              $gte: parseInt(gene_min_length), // Ensure length is greater than or equal to gene_min_length
              $lte: parseInt(gene_max_length), // Ensure length is less than or equal to gene_max_length
            },
          },
        },
      ])
      .toArray(); // Convert the aggregation cursor to an array

    // Check if any genes were found
    if (genes.length === 0) {
      return res
        .status(404)
        .json({ message: "No genes found in the specified length range" });
    }

    // Find the last document, sorted by _id to get the most recent
    const lastDocument = await collection
      .find()
      .sort({ _id: -1 }) // Sort by _id in descending order
      .limit(1) // Limit to one document
      .toArray(); // Convert cursor to array

    // Check if a document was found
    if (lastDocument.length === 0) {
      return res
        .status(404)
        .json({ message: "No documents found in the collection" });
    }

    // Extract the End value from the last document
    const endValue = lastDocument[0].End;

    // Return both the genes and the End value of the last document
    return res.status(200).json({
      genes,
      lastDocumentEndValue: endValue,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

//export the gene sequence based on start and end index
export const exportGeneSequence = async (req,res)=>{
  const { beginIndex, endIndex } = req.query;
  console.log(beginIndex,endIndex);
  const begin = parseInt(beginIndex);
  const end = parseInt(endIndex)+1;

  // Check if indices are provided and are valid numbers
  if (!beginIndex || !endIndex || isNaN(beginIndex) || isNaN(endIndex)) {
    return res.status(400).send("Invalid indices provided.");
  }

  try {
    // Step 1: Read the sequence from the local file
    const filePath = path.join(__dirname, "../data/export/genome/ras_bact_gene_sequence_text.txt");
    console.log(filePath);
    const fullSequence = fs.readFileSync(filePath, "utf8");

    // Step 2: Extract the substring based on provided indices
    const sequencePart = fullSequence.substring(
      begin,
      end
    );

    

    // Break the sequence into 16-character lines
const lines = [];
let i = 0;
while (i < sequencePart.length) {
  lines.push(sequencePart.substring(i, i + 50));
  i += 50;
}

// Join the lines with newline characters
const formattedSequence = lines.join('\n');

    const file_content = ">ralstonia:"+beginIndex+":"+endIndex+":- len="+(end-begin)+"\n"+formattedSequence;

    // Step 3: Create a temporary file with the extracted sequence
    const tempFilePath = path.join(__dirname, "temp_sequence.txt");
    fs.writeFileSync(tempFilePath, file_content);

    // Step 4: Send the file as a download
    res.download(tempFilePath, "extracted_sequence.txt", (err) => {
      if (err) {
        console.log("Error downloading file:", err);
      }
      // Delete the temporary file after sending it
      fs.unlinkSync(tempFilePath);
    });
  }catch (err) {
    console.log(err.message);
    res.status(500).json({ error_message: err.message });
  }

}

//return the result of the keyword found in the database of gene data
export const returnSearchInGeneData = async (req, res) => {
  const { keyword } = req.query;
  console.log(`Searching for keyword: ${keyword}`);
  
  try {
    // Access the collection
    const collection = database.collection("modified_ralstoniagenedetails");

    // Perform a case-insensitive search on multiple fields using $or and $regex
    const searchResult = await collection.find({
      $or: [
        { Type: { $regex: keyword, $options: "i" } },
        { Gene: { $regex: keyword, $options: "i" } },
        { Synonyms: { $regex: keyword, $options: "i" } },
        { Product: { $regex: keyword, $options: "i" } },
        { Class: { $regex: keyword, $options: "i" } },
        { ProductType: { $regex: keyword, $options: "i" } },
        { Localization: { $regex: keyword, $options: "i" } },
        { Roles: { $regex: keyword, $options: "i" } },
      ],
    }).toArray();

    // If no results found, return a 404
    if (searchResult.length === 0) {
      return res.status(404).json({ error_message: "No matching gene data found" });
    }

    // Map each document in searchResult to include the fields that contain the keyword
    const resultWithMatchedFields = searchResult.map((doc) => {
      // Initialize an object to hold matched fields
      const matchedFields = {};

      // Check each field and add it to matchedFields if it contains the keyword
      ["Type", "Gene", "Synonyms", "Product", "Class", "ProductType", "Localization", "Roles"].forEach((field) => {
        if (doc[field] && new RegExp(keyword, "i").test(doc[field])) {
          matchedFields[field] = doc[field];
        }
      });

      return {
        geneData: doc,
        matchedFields, // Add the matched fields as a new property in the response
      };
    });

    // Return the search result with matched fields in the response
    res.status(200).json({ data: resultWithMatchedFields });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error_message: err.message });
  }
};

