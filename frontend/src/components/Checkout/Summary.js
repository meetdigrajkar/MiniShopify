import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const Summary = (props) => {
  const total = props.total;

  return (
    <>
      <Card
        variant="outlined"
        style={{
          minWidth: "15vw",
          maxHeight: "40vh",
          borderRadius: "5px",
          boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <CardContent>
          <Grid container>
            <Typography variant="body1">Cart Summary</Typography>
          </Grid>
          <Grid container style={{ paddingTop: "15px" }}>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "lighter" }}
              >
                Sub Total
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "bold" }}
              >
                {total}
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ paddingTop: "15px" }}>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "lighter" }}
              >
                Discount
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "bold" }}
              >
                -
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ paddingTop: "15px", paddingBottom: "10px" }}>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "lighter" }}
              >
                Shipping
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "bold" }}
              >
                -
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container style={{ paddingTop: "15px" }}>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "lighter" }}
              >
                Total
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "9px", fontWeight: "bold", color: "red" }}
              >
                {total}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button
        fullWidth
        variant="outlined"
        style={{ marginTop: "20px", backgroundColor: "green", color: "white" }}
      >
        Checkout
      </Button>
    </>
  );
};

export default Summary;