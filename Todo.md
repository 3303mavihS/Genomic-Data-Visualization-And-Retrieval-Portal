Structure :

### |\*\* Main Component

### |\*\* Upload Genome Data (Hidden) ----------- Upload Data and saving it to database is done but the whole data complete is not completed

### Features :

### Hidden Feature

--- Upload hidden feature will contain a form that will first take the bacteria name and then some description about it
--- then it will prompt to ask how many chromosome of that bacteria will be created
--- then we will take the name description, any photo, or image and then csv file of the data
--- then we will upload the data and after that we will upload the file to the server and read the file to show it to the user
--- and then on completion we will verify the data and then save it to the database one by one

### \*\*\* MiniMap (if Possible)

--- It will show a vertical representation of whole data in one go and only for data not for search results
--- Interface
/// A vertical minimap at right most side of the screen and it will be hidden in mobile

### \*\*\* Search in Label,Gene,Synonyms,Product,Roles ---------------- DONE

--- It will search for the text provided and the in the provided category or given labels
--- Interface
/// A search box will appear with text field and dropdown box to select the label or category

### \*\*\* Search By NucleotideSeq (By Entering the whole sequence) --------------- DONE

--- It will search whole database for the Sequence
--- Interface
/// A search Box will appear and when found it will shown the detail of that exact genome

### \*\*\* Filters (Strand,Type,Evidence,Mutation,Class,Product Type,Localization)

--- It will be available for the data results that has been received after search feature and these filters will filter the data based on the input
--- Interface
/// A toggle button will be there to show/hide the filter options and these filters will have dropdown values and then it can filter the data based on the input

### \*\*\* Get gene Sequences in Range (Start, End, Strand) ---------------- DONE

--- It will show the genomes within a range provided as input and then only genomes in the range will be fetched from the database will be displayed
--- Interface
/// A start and end input will be there to get the input values for the range and show the result along with the minimap

### \*\*\* Show Gene within (length,Strand). ---------------- DONE

--- It will show the genomes within a given length and the data will be displayed as usual with start and end information too. it will work same as range feature.
--- Interface
/// a range input and strand input will take the length and strand input to show the result.

### \*\*\* pagination and jump to page feature ------------------- DONE

--- It will show the no. of page and pagination next and previous feature with jump to page no.
--- Interface
/// pagination at the bottom of the canvas with input and all the buttons

### \*\*\* Open Dialog Box or Side Panel to display all the info about that gene --------------------- DONE
