import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { uploadedFileUrl } from "../services/serverPathConstants.js";

import { database } from "../app.js";

//standardize the input to make the name have same no. of length and random values
function standardizeGenomeName(genomeName, desiredLength = 10) {
  const parts = genomeName.split('_');

  let standardizedName;
  if (parts.length === 2) {
    const [organism, feature] = parts;
    standardizedName = `${organism.toUpperCase()}_${feature.toUpperCase()}`;
  } else if (parts.length === 1) {
    standardizedName = parts[0].toUpperCase();
  } else {
    return genomeName; // Handle unexpected formats
  }

  // Add random characters to reach the desired length
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (standardizedName.length < desiredLength) {
    standardizedName += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  // Truncate if necessary
  return standardizedName.slice(0, desiredLength);
}

/**
 * Upload the data file to the server
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const uploadDataFile = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error_message: "No file uploaded." });
    } else {
      return res.status(200).json({
        success_message: "File Uploaded Successfully",
        uploadedFileName: req.file.path.split("uploads/")[1],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error_message: err.message });
  }
};

/**
 * function to read content of the file stored in the folder
 * received as params in request and then send the data as json
 * in response.
 * @param {*} req
 * @param {*} res
 */
export const readFileContent = async (req, res) => {
  try {
    /**
     * folder name extracted from request param and
     * look for the csv file that needs to be read
     */
    const { folder_name } = req.params;
    const folderPath = path.resolve(uploadedFileUrl, folder_name);
    //console.log(folderPath);

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error_message: "Folder not found" });
    }

    // Read the contents of the folder to find the CSV file
    const files = fs.readdirSync(folderPath);
    const csvFile = files.find((file) => path.extname(file) === ".csv");

    if (!csvFile) {
      return res
        .status(404)
        .json({ error_message: "No CSV file found in the folder" });
    }

    //exact path of the file to read
    const file_explicit_path = path.join(folderPath, csvFile);

    //console.log(file_explicit_path);

    /**
     * read the file and return 20 line of the file
     */
    let results = []; //store the resultant line is an array
    let lineCount = 0; //lines counter
    let totalCount = 0;
    const maxLines = 20; // Limit to 20 lines

    fs.createReadStream(file_explicit_path)
      .pipe(csv())
      .on("data", (row) => {
        if (lineCount < maxLines) {
          results.push(row);
          lineCount++;
          totalCount = lineCount;
        } else {
          totalCount++;
        }
      })
      .on("end", () => {
        // Return the parsed CSV data (first 20 lines)
        res.status(200).json({
          total_rows: totalCount,
          param_value: folder_name,
          file_content: results,
        });
      })
      .on("error", () => {
        console.error("Error reading file:", err); // Debugging log
        res.status(500).json({ error_message: "Error reading the file" });
      });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * save the file content to the database.
 */
export const saveFileContent = async (req, res) => {
  try {
    const { param_value, genome_name } = req.body;
    const folderPath = path.resolve(uploadedFileUrl, param_value);
    const collection_name = standardizeGenomeName(genome_name,30);
    // console.log(collection_name);
    // console.log(folderPath);

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error_message: "Folder not found" });
    }

    // Read the contents of the folder to find the CSV file
    const files = fs.readdirSync(folderPath);
    const csvFile = files.find((file) => path.extname(file) === ".csv");

    if (!csvFile) {
      return res
        .status(404)
        .json({ error_message: "No CSV file found in the folder" });
    }

    const file_explicit_path = path.join(folderPath, csvFile);
    console.log(file_explicit_path);

    const collection = database.collection(collection_name);
    console.log("Client connection with database established.");

    const results = [];

    //color map for the gene type
    // const colorMap = {
    //   "CDS": {
    //     "+": "#00928D",
    //     "-": "#A7B4E5"
    //   },
    //   "tRNA": {
    //     "+": "#89520B",
    //     "-": "#F39D2F"
    //   },
    //   "tmRNA": {
    //     "+": "#F8DEA7",
    //     "-": "#CFD8F7"
    //   },
    //   "rRNA": {
    //     "+": "#E0C07A",
    //     "-": "#F8DEA7"
    //   }
    // };

    fs.createReadStream(file_explicit_path)
      .pipe(csv())
      .on("data", (row) => {
        //these lines add a color attribute to the data
        // const type = row.Type;
        // const strand = row.Strand;

        // // Assign color based on type and strand
        // row.color = colorMap[type][strand];

        row.Length = parseInt(row.End) - parseInt(row.Begin) + 1;

        results.push(row);
      })
      .on("end", async () => {
        try {
          await collection.insertMany(results);
          console.log("Data saved to database successfully.");
          res.status(200).json({ success_message: "Data Saved Successfully",dat:collection_name });
        } catch (err) {
          console.error("Failed to insert data:", err.message);
          res.status(500).json({ error_message: "Failed to save data" });
        }
      });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};