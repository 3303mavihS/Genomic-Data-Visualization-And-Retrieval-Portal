import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

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
        // alignContent: "start",
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
        <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: "700" }}>
          Associate Laboratories
        </Typography>
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
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Prof. S. K. Ray
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Plant-microbe interaction lab,
                  <br /> Dept. of MBBT, Tezpur University
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                target="blank"
                href="http://www.tezu.ernet.in/dmbbt/profile/21"
              >
                Visit Website
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Dr. Aditya Kumar
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Genomics and Bioinformatics lab,
                  <br /> Dept. of MBBT, Tezpur University
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                target="blank"
                href="http://www.tezu.ernet.in/dmbbt/profile/33"
              >
                Visit Website
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Dr. Prabhu B. Patil
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  CSIR Lab, IMTECH Chandigarh
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                target="blank"
                href="https://www.imtech.res.in/contact/staff/dr-prabhu-b-patil"
              >
                Visit Website
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Dr. Shyam K. Masakapalli
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Metabolic Systems Biology Lab,
                  <br /> IIT Mandi, Himachal Pradesh
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                target="blank"
                href="https://sites.google.com/view/metsysbiolab"
              >
                Visit Website
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Prof. S. S. Satapathy
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Computational Biology and <br />
                  Bioinformatics lab, Dept. CSE,
                  <br /> Tezpur University
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                target="blank"
                href="http://agnigarh.tezu.ernet.in/~ssankar/index.html"
              >
                Visite Website
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Laboratories;
