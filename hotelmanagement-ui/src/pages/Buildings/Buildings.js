import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import {
  deleteBuildingEndPoint,
  getAllBuildingsEndPoint,
} from "./ApiEndPoints";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete, Edit, Settings } from "@mui/icons-material";
import AddBuildingModal from "./AddBuildingModal";
import EditBuildingModal from "./EditBuildingModal";
import DetailBuildingModal from "./DetailBuildingModal";
import { useTranslation } from "react-i18next";
import AddButton from "../../components/AddButton/AddButton";

function Buildings() {
  useInterceptor();
  const { t } = useTranslation();
  const [buildings, setBuildings] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState(0);

  useEffect(() => {
    if (!addModalOpen || !editModalOpen) {
      getBuildingsReq();
    }
  }, [addModalOpen, editModalOpen]);

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

  const handleEditBuildingClick = (e, buildingId) => {
    e.preventDefault();
    setSelectedBuildingId(buildingId);
    setEditModalOpen(true);
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

  const handleDetailClick = (e, buildingId) => {
    e.preventDefault();
    setSelectedBuildingId(buildingId);
    setDetailModalOpen(true);
  };

  return (
    <div>
      <Typography variant="h5" marginBottom={5}>
        {t("Buildings")}
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "5px",
        }}
      >
        <AddButton
          text={t("AddBuilding")}
          handleClick={(e) => handleAddBuildingClick(e)}
        />
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
                    <IconButton
                      onClick={(e) => handleDetailClick(e, building.id)}
                    >
                      <Settings color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleEditBuildingClick(e, building.id)}
                    >
                      <Edit color="secondary" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleDeleteBuildingClick(e, building.id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {addModalOpen && (
        <AddBuildingModal open={addModalOpen} setOpen={setAddModalOpen} />
      )}
      {editModalOpen && (
        <EditBuildingModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          buildingId={selectedBuildingId}
        />
      )}
      {detailModalOpen && (
        <DetailBuildingModal
          open={detailModalOpen}
          setOpen={setDetailModalOpen}
          buildingId={selectedBuildingId}
        />
      )}
    </div>
  );
}

export default Buildings;
