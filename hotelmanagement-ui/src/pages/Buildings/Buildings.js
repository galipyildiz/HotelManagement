import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import { getAllBuildingsEndPoint } from "./ApiEndPoints";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

function Buildings() {
  useInterceptor();
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getBuildingsReq();
  }, []);

  const getBuildingsReq = async () => {
    try {
      const response = await api.get(getAllBuildingsEndPoint);
      setBuildings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBuildingClick = async (e) => {
    e.preventDefault();
    console.log("add");
  };

  const handleDeleteBuildingClick = async (e, buildingId) => {
    e.preventDefault();
    console.log(buildingId, "delete");
  };

  const handleEditBuildingClick = async (e, buildingId) => {
    e.preventDefault();
    console.log(buildingId, "edit");
  };

  return (
    <div>
      <Typography variant="h5" marginBottom={5}>
        Buildings
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "5px",
        }}
      >
        <Button
          onClick={(e) => handleAddBuildingClick(e)}
          variant="outlined"
          color="success"
        >
          <Add />
          <span>Add Building</span>
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell style={{ width: "100px" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((building) => (
              <TableRow
                key={building.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{building.id}</TableCell>
                <TableCell>{building.name}</TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={(e) => handleEditBuildingClick(e, building.id)}
                    >
                      <Edit color="secondary" />
                    </Button>
                    <Button
                      onClick={(e) => handleDeleteBuildingClick(e, building.id)}
                    >
                      <Delete color="error" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Buildings;
