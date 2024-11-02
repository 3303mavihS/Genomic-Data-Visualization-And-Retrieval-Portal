import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { uploadedFileUrl } from "../services/serverPathConstants.js";

import { database } from "../app.js";

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

// export const saveFileContent = async (req, res) => {
//   try {
//     const { param_value, genome_name } = req.body;
//     const folderPath = path.resolve(uploadedFileUrl, param_value);
//     console.log(folderPath);

//     // Check if the folder exists
//     if (!fs.existsSync(folderPath)) {
//       return res.status(404).json({ error_message: "Folder not found" });
//     }

//     // Read the contents of the folder to find the CSV file
//     const files = fs.readdirSync(folderPath);
//     const csvFile = files.find((file) => path.extname(file) === ".csv");

//     if (!csvFile) {
//       return res
//         .status(404)
//         .json({ error_message: "No CSV file found in the folder" });
//     }

//     const file_explicit_path = path.join(folderPath, csvFile);
//     console.log(file_explicit_path);

//     const collection = database.collection(genome_name);
//     console.log("Client connection with database established.");

//     const results = [];
//     const colors = [
//       "#fc5101",
//       "#a81149",
//       "#0091cf",
//       "#d0eb27",
//       "#fabd00",
//       "#fe2209",
//       "#8700b0",
//       "#0144fe",
//       "#65b12e",
//       "#fdfe2f",
//       "#fb9a00",
//     ]; // Define your set of colors here
//     let lastPickedColor = null;

//     fs.createReadStream(file_explicit_path)
//       .pipe(csv())
//       .on("data", (row) => {
//         // Pick a random color that is not the same as the last one
//         let newColor;
//         do {
//           newColor = colors[Math.floor(Math.random() * colors.length)];
//         } while (newColor === lastPickedColor);

//         // Update last picked color
//         lastPickedColor = newColor;

//         // Add the color attribute to the row
//         row.color = newColor;

//         // Push the modified row into the results array
//         results.push(row);
//       })
//       .on("end", async () => {
//         try {
//           // Insert data into the collection
//           await collection.insertMany(results);
//           console.log("Data saved to database successfully.");
//           res.status(200).json({ success_message: "Data Saved Successfully" });
//         } catch (err) {
//           console.error("Failed to insert data:", err.message);
//           res.status(500).json({ error_message: "Failed to save data" });
//         }
//       });
//   } catch (err) {
//     res.status(500).json({ error_message: err.message });
//   }
// };

export const saveFileContent = async (req, res) => {
  try {
    const { param_value, genome_name } = req.body;
    const folderPath = path.resolve(uploadedFileUrl, param_value);

    console.log(folderPath);

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

    const collection = database.collection(genome_name);
    console.log("Client connection with database established.");

    const results = [];
    const colorMap = {
      "CDS": {
        "+": "#0040ff",
        "-": "#00bfff"
      },
      "fCDS": {
        "+": "#ff0000",
        "-": "#ffb3b3"
      },
      "misc_RNA": {
        "+": "#00994d",
        "-": "#33ff99"
      },
      "tRNA": {
        "+": "#ffc61a",
        "-": "#fff2cc"
      },
      "tmRNA": {
        "+": "#6600ff",
        "-": "#d1b3ff"
      },
      "rRNA": {
        "+": "#ffffff",
        "-": "#ffe6ff"
      }
    };

    fs.createReadStream(file_explicit_path)
      .pipe(csv())
      .on("data", (row) => {
        const type = row.Type;
        const strand = row.Strand;

        // Assign color based on type and strand
        row.color = colorMap[type][strand];

        results.push(row);
      })
      .on("end", async () => {
        try {
          await collection.insertMany(results);
          console.log("Data saved to database successfully.");
          res.status(200).json({ success_message: "Data Saved Successfully" });
        } catch (err) {
          console.error("Failed to insert data:", err.message);
          res.status(500).json({ error_message: "Failed to save data" });
        }
      });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};