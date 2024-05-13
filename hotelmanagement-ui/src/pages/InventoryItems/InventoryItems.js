import {
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

function InventoryItems() {
  useInterceptor();
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    getInventoryItemsReq();
  }, []);

  const getInventoryItemsReq = async () => {
    try {
      const response = await api.get(getAllInventoryItemsEndPoint);
      setInventoryItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h5" marginBottom={5}>
        Inventory Items
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
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.inventoryItemId}</TableCell>
                <TableCell>{item.inventoryItemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.storageId}</TableCell>
                <TableCell>{item.storgaName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InventoryItems;
