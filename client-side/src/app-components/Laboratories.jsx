import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

const Laboratories = () => {
  return (
    <Box
      component="div"
      className="verticalCenterTheElement"
      sx={{
        width: "100%",
        textAlign: "right",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: "700" }}>
          Associate Laboratories
        </Typography> */}
        <Typography variant="p" sx={{ fontSize: "20px", fontWeight: "500" }}>
          List of our associate laboratories.
        </Typography>
        <hr style={{ width: "100%" }} />
        <Box
          component="div"
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gap: "30px",
          }}
        >
          <Card sx={{ width: "100%" }}>
            <CardActionArea
              target="blank"
              href="http://www.tezu.ernet.in/dmbbt/profile/21"
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Plant-microbe interaction lab,
                  <br /> Dept. of MBBT,
                  <br /> Tezpur University
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Prof. S. K. Ray
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea
              target="blank"
              href="http://www.tezu.ernet.in/dmbbt/profile/33"
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Genomics and Bioinformatics lab,
                  <br /> Dept. of MBBT,
                  <br /> Tezpur University
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Dr. Aditya Kumar
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea
              target="blank"
              href="https://www.imtech.res.in/contact/staff/dr-prabhu-b-patil"
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CSIR Lab,
                  <br /> IMTECH Chandigarh
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Dr. Prabhu B. Patil
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea
              target="blank"
              href="https://sites.google.com/view/metsysbiolab"
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Metabolic Systems Biology Lab,
                  <br /> IIT Mandi, Himachal Pradesh
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Dr. Shyam K. Masakapalli
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea
              target="blank"
              href="http://agnigarh.tezu.ernet.in/~ssankar/index.html"
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Computational Biology and <br />
                  Bioinformatics lab, Dept. CSE,
                  <br /> Tezpur University
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Prof. S. S. Satapathy
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Laboratories;
