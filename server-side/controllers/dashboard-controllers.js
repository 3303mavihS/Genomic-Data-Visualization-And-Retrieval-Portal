import { database } from "../app.js";
import { ObjectId } from "mongodb";

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
export const returnGetRangeData = async (req, res) => {
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
