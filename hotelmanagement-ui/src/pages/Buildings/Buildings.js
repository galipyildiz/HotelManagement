import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import {
  deleteBuildingEndPoint,
  getAllBuildingsEndPoint,
} from "./ApiEndPoints";
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
import AddBuildingModal from "./AddBuildingModal";

function Buildings() {
  useInterceptor();
  const [buildings, setBuildings] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  useEffect(() => {
    if (!addModalOpen) {
      getBuildingsReq();
    }
  }, [addModalOpen]);

  const getBuildingsReq = async () => {
    try {
      console.log('cek');
      const response = await api.get(getAllBuildingsEndPoint);
      setBuildings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBuildingClick = async (e) => {
    e.preventDefault();
    setAddModalOpen(true);
  };

  const handleDeleteBuildingClick = async (e, buildingId) => {
    e.preventDefault();
    let isSuccess = await deleteBuildingReq(buildingId);
    if (isSuccess) {
      let temp = buildings.filter((building) => building.id !== buildingId);
      setBuildings(temp);
    }
  };

  const handleEditBuildingClick = async (e, buildingId) => {
    e.preventDefault();
    console.log(buildingId, "edit");
  };

  const deleteBuildingReq = async (buildinId) => {
    try {
      const response = await api.delete(
        deleteBuildingEndPoint + `?id=${buildinId}`
      );
      if (response.status === 204) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      {/* TODO convert to component page header */}
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
      {/* TODO Convert to component table */}
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
      <AddBuildingModal open={addModalOpen} setOpen={setAddModalOpen} />
    </div>
  );
}

export default Buildings;
