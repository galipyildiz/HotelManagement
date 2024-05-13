/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import {
  addRoomEndPoint,
  addStorageEndPoint,
  deleteRoomEndPoint,
  deleteStorageEndPoint,
  getGetBuildingByIdEndPoint,
  getRoomsByBuildingIdEndPoint,
  getStoragesByBuildingIdEndPoint,
} from "./ApiEndPoints";
import { Delete, Edit } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function DetailBuildingModal({ open, setOpen, buildingId }) {
  useInterceptor();
  const { t } = useTranslation();
  const [building, setBuilding] = useState({});
  const [rooms, setRooms] = useState([]);
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    getBuildingByIdReq();
    getBuildingsRoomsReq();
    getBuildingsStoragesReq();
  }, []);

  const getBuildingByIdReq = async () => {
    try {
      const response = await api.get(
        getGetBuildingByIdEndPoint + `?id=${buildingId}`
      );
      setBuilding(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBuildingsRoomsReq = async () => {
    try {
      const response = await api.get(
        getRoomsByBuildingIdEndPoint + `?buildingId=${buildingId}`
      );
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBuildingsStoragesReq = async () => {
    try {
      const response = await api.get(
        getStoragesByBuildingIdEndPoint + `?buildingId=${buildingId}`
      );
      setStorages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRoomClick = async (e) => {
    e.preventDefault();
    let roomName = `Room-${Date.now()}`;
    try {
      const response = await api.post(addRoomEndPoint, {
        buildingId: buildingId,
        name: roomName,
      });
      if (response.status === 200) {
        let temp = [...rooms];
        temp.push(response.data);
        setRooms(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddStorageClick = async (e) => {
    e.preventDefault();
    let storageName = `Storage-${Date.now()}`;
    try {
      const response = await api.post(addStorageEndPoint, {
        buildingId: buildingId,
        name: storageName,
      });
      if (response.status === 200) {
        let temp = [...storages];
        temp.push(response.data);
        setStorages(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoomClick = async (e, roomId) => {
    e.preventDefault();
    try {
      const response = await api.delete(deleteRoomEndPoint + `?id=${roomId}`);
      if (response.status === 204) {
        let temp = rooms.filter((room) => room.id !== roomId);
        setRooms(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStorageClick = async (e, storageId) => {
    e.preventDefault();
    try {
      const response = await api.delete(
        deleteStorageEndPoint + `?id=${storageId}`
      );
      if (response.status === 204) {
        let temp = storages.filter((storage) => storage.id !== storageId);
        setStorages(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={(e) => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: "80%",
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "scroll",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {building.name} - {t("Detail")}
        </Typography>
        <Divider />
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          marginTop={5}
          style={{ display: "flex" }}
        >
          {t("Rooms")}
          <Button
            style={{ marginLeft: "auto" }}
            variant="outlined"
            color="success"
            onClick={(e) => handleAddRoomClick(e)}
          >
            {t("AddRoom")}
          </Button>
        </Typography>
        <TableContainer style={{ marginTop: "10px" }} component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell style={{ width: "100px" }} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow
                  key={room.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                      //TODO
                      //   onClick={(e) =>
                      //     handleEditBuildingClick(e, building.id)
                      //   }
                      >
                        <Edit color="secondary" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleDeleteRoomClick(e, room.id)}
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
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          marginTop={5}
          style={{ display: "flex" }}
        >
          {t("Storages")}
          <Button
            style={{ marginLeft: "auto" }}
            variant="outlined"
            color="success"
            onClick={(e) => handleAddStorageClick(e)}
          >
            {t("AddStorage")}
          </Button>
        </Typography>
        <TableContainer style={{ marginTop: "10px" }} component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell style={{ width: "100px" }} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storages.map((storage) => (
                <TableRow
                  key={storage.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{storage.id}</TableCell>
                  <TableCell>{storage.name}</TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                      //TODO
                      //   onClick={(e) =>
                      //     handleEditBuildingClick(e, building.id)
                      //   }
                      >
                        <Edit color="secondary" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleDeleteStorageClick(e, storage.id)}
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
      </Box>
    </Modal>
  );
}

export default DetailBuildingModal;
