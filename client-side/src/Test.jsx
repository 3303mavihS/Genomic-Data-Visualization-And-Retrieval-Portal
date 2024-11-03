import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

/**
 * draw the data as rectangles
 * @param {context} ctx
 * @param {*} data
 * @param {*} rectHeight
 */
// const drawElement = (ctx, data, rectHeight, strand) => {
//   let lineBeginParameter = pageBeginPoint;
//   let lineEndParameter = pageBeginPoint + pageRange - 1;
//   const fontStyle = "bold 10px Open Sans";
//   const fontColor = "black";
//   console.log("Starting Row :", row," Line Begin : ", lineBeginParameter," Line End : ", lineEndParameter,"New Y-coordinate : ", yValue);

//   data?.forEach((element) => {
//     const text = element.Gene===""?element.Label.slice(-4):element.Gene;
//     const color = element.color;
//     element.End = element.End - 50;
//     /** Update row and parameters if the element starts after the current range */
//     if (element.Begin > lineEndParameter && element.End <= pageEndPoint) {
//       row++;
//       lineBeginParameter = lineEndParameter + 1;
//       lineEndParameter = lineEndParameter + pageRange;
//       yValue = gap * row;
//       console.log("New Row :", row," Line Begin : ", lineBeginParameter," Line End : ", lineEndParameter,"New Y-coordinate : ", yValue);
//     }

//     /**Create the rectangle from the previous rectangle */
//     if (
//       element.Begin <= lineBeginParameter &&
//       element.End >= lineBeginParameter
//     ) {
//       console.log(
//         "Previous Remaining Box : ",
//         element.Begin,
//         element.End,
//         element.Label
//       );
//       let Begin = lineBeginParameter;
//       let End = element.End;
//       let rectWidth = End - Begin;
//       rectWidth *= scaleFactor;
//       xValue = 30;
//       createBoxWithText(
//         ctx,
//         color,
//         element.Strand,
//         strand,
//         xValue,
//         yValue,
//         rectWidth,
//         rectHeight,
//         text,
//         element._id,
//         fontColor,
//         fontStyle
//       );
//     }

//     /**create the rectangle normally here */
//     if (
//       element.Begin >= lineBeginParameter &&
//       element.Begin <= lineEndParameter &&
//       element.End <= lineEndParameter
//     ) {
//       console.log(
//         "Normal Box Line-Begin : ",
//         lineBeginParameter," Line-End : ",
//         lineEndParameter," Rect-Begin : ",
//         element.Begin," Rect-End : ",
//         element.End," Rect-Label : ",
//         element.Label
//       );
//       let rectWidth = element.End - element.Begin;
//       rectWidth *= scaleFactor;
//       let Begin = element.Begin % pageRange;
//       xValue = Begin * scaleFactor;
//       xValue = xValue + 30;
//       //create the rectangle here.
//       createBoxWithText(
//         ctx,
//         color,
//         element.Strand,
//         strand,
//         xValue,
//         yValue,
//         rectWidth,
//         rectHeight,
//         text,
//         element._id,
//         fontColor,
//         fontStyle
//       );
//     }

//     /**create the rectangle with begin on current line and end on next line */
//     if (
//       element.Begin >= lineBeginParameter &&
//       element.Begin <= lineEndParameter &&
//       element.End >= lineEndParameter
//     ) {
//       console.log("Box on two lines starts here");
//       console.log(
//         "Box on current line Begin : ",
//           element.Begin," End : ",
//           element.End,"Label : ",
//           element.Label
//       );
//       //create the rectangle on current line
//       let rectWidth = lineEndParameter - element.Begin;
//       rectWidth *= scaleFactor;
//       let Begin = element.Begin % pageRange;
//       xValue = Begin * scaleFactor;
//       xValue += 30;
//       //create the rectangle here.
//       createBoxWithText(
//         ctx,
//         color,
//         element.Strand,
//         strand,
//         xValue,
//         yValue,
//         rectWidth,
//         rectHeight,
//         text,
//         element._id,
//         fontColor,
//         fontStyle
//       );

//       //change the row
//       if (element.End <= pageEndPoint) {
//         row++;
//         lineBeginParameter = lineEndParameter + 1;
//         lineEndParameter = lineEndParameter + pageRange;
//         yValue = gap * row;
//         console.log("New Row :", row," Line Begin : ", lineBeginParameter," Line End : ", lineEndParameter,"New Y-coordinate : ", yValue);
//         console.log(
//           "Remaining Box Begin : ",
//           element.Begin," End : ",
//           element.End,"Label : ",
//           element.Label
//         );
//         console.log("Box on two lines ends here");
//         //and create the remaining part here
//         let remBegin = 30;
//         let remEnd = element.End - lineBeginParameter - 1;
//         let remWidth = remEnd - remBegin;
//         remWidth = remWidth * scaleFactor;
//         xValue = remBegin;
//         //create the rectangle here.
//         createBoxWithText(
//           ctx,
//           color,
//           element.Strand,
//           strand,
//           xValue,
//           yValue,
//           remWidth,
//           rectHeight,
//           text,
//           element._id,
//           fontColor,
//           fontStyle
//         );
//       }
//     }
//   });
// };

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Test() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
}
