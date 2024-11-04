import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  rastoniaImage1,
  rastoniaImage2,
  rastoniaImage3,
  rastoniaImage4,
  rastoniaImage5,
} from "../constants";

const Intro = () => {
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
          Ralstonia solanacearum
        </Typography>
        <Typography variant="p" sx={{ fontSize: "20px", fontWeight: "500" }}>
          A phytopathogenic bacterium with a wide host range
        </Typography>
        <hr style={{ width: "100%" }} />
        <Box component="div" sx={{ display: "flex", gap: "20px" }}>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", width: "calc (100vw - 300px)" }}
            gutterBottom
          >
            Ralstonia solanacearum, previously known as Pseudomonas
            solanacearum, was originally described by Smith (1896) as the
            causative agent of bacterial wilt of solanaceous plants. It is
            internationally recognized as one of the leading models in the
            analysis of plant pathogenicity. This soil bacterium is the causal
            agent of a severe and devastating disease of major economical
            importance on solanaceous crops. It also causes disease on the model
            plant Arabidopsis thaliana, therefore facilitating analysis of basic
            molecular mechanisms governing pathogenicity. The high economic and
            social impact of this organism results from its wide geographical
            distribution in all warm and tropical countries of the globe. This
            impact also results from the very wide host range of R. solanacearum
            which comprises over 200 plant species, representing over 50
            botanical families and covering both monocots and dicots extending
            from annual plants to trees and shrubs. Recently, geographical
            distribution of the pathogen has been extended to more temperate
            countries from Europe and North America as the result of the
            dissemination of strains adapted to cooler climates.
          </Typography>
          <img
            src={rastoniaImage1}
            alt=""
            style={{ width: "300px", objectFit: "contain" }}
          />
        </Box>
        <Typography variant="body1" sx={{ textAlign: "justify" }} gutterBottom>
          The sequencing and annotation of the complete genome from strain
          GMI1000, performed in collaboration with the French sequencing center
          Genoscope, has been a major achievement which has contributed to the
          development of genomic resources to study the pathogenicity
          determinants in this bacterium. GMI1000 is a wide host range strain
          originally isolated from tomato in French Guyana. It is a race 1
          biovar 3 strain belonging to Phylotype I. Recently the draft genome
          sequence of two additional strains was realized. Both strains belong
          to Phylotype II. Strain Molk2 was isolated from banana in Philippines
          and is classified as a race 2 strain while strain IPO1609 is race 3
          (potato) strain isolated in the Netherlands.
        </Typography>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Splide
            hasTrack={false}
            options={{
              width: "960px",
              type: "loop",
              perPage: 3,
              perMove: 1,
              gap: "30px",
            }}
          >
            <SplideTrack>
              <SplideSlide>
                <img
                  src={rastoniaImage1}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  alt=""
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={rastoniaImage2}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  alt=""
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={rastoniaImage3}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  alt=""
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={rastoniaImage4}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  alt=""
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={rastoniaImage5}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  alt=""
                />
              </SplideSlide>
            </SplideTrack>
          </Splide>
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: "32px",
            fontWeight: "700",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          Ralstonia solanacearum in North Eastern Region of India
        </Typography>
        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              margin: "20px",
            }}
          >
            <img
              src={rastoniaImage1}
              style={{
                width: "350px",
                height: "350px",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            <Typography
              variant="p"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Chromosome
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ height: "56px", width: "180px" }}
            >
              View
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              margin: "20px",
            }}
          >
            <img
              src={rastoniaImage4}
              style={{
                width: "350px",
                height: "350px",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            <Typography
              variant="p"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Plasmid
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ height: "56px", width: "180px" }}
            >
              View
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
