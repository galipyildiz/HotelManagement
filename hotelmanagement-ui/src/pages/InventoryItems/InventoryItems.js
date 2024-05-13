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
import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import { getAllInventoryItemsEndPoint } from "./ApiEndPoint";
import { ImportExport } from "@mui/icons-material";
import MoveModal from "./MoveModal";
import { useTranslation } from "react-i18next";

function InventoryItems() {
  useInterceptor();
  const { t } = useTranslation();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState({});
  const [moveModalOpen, setMoveModalOpen] = useState(false);

  useEffect(() => {
    if (!moveModalOpen) {
      getInventoryItemsReq();
    }
  }, [moveModalOpen]);

  const getInventoryItemsReq = async () => {
    try {
      const response = await api.get(getAllInventoryItemsEndPoint);
      setInventoryItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInventoryItemMoveClick = (e, selectedInventoryItem) => {
    e.preventDefault();
    setSelectedInventoryItem(selectedInventoryItem);
    setMoveModalOpen(true);
  };

  return (
    <div>
      <Typography variant="h5" marginBottom={5}>
        {t("InventoryItems")}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Inventory Item Id</TableCell>
              <TableCell>Inventory Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Storage Id</TableCell>
              <TableCell>Storage Name</TableCell>
              <TableCell style={{ width: "100px" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow
                key={`${item.inventoryItemId}-${item.storageId}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.inventoryItemId}</TableCell>
                <TableCell>{item.inventoryItemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.storageId}</TableCell>
                <TableCell>{item.storgaName}</TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      onClick={(e) => handleInventoryItemMoveClick(e, item)}
                    >
                      <ImportExport color="primary" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {moveModalOpen && (
        <MoveModal
          open={moveModalOpen}
          setOpen={setMoveModalOpen}
          inventoryItem={selectedInventoryItem}
        />
      )}
    </div>
  );
}

export default InventoryItems;
