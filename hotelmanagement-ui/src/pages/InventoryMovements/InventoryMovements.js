import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import {
  addInventoryItemEndpoint,
  getAllInventoryMovementsEndpoint,
  getAllStoragesEndpoint,
} from "./ApiEndPoints";
import { useTranslation } from "react-i18next";
import AddButton from "../../components/AddButton/AddButton";

function InventoryMovements() {
  useInterceptor();
  const { t } = useTranslation();
  const defaultNewInventoryItem = {
    name: "",
    locations: [],
  };
  const [storages, setStorages] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [inventoryItemMovements, setInventoryItemMovements] = useState([]);
  const [newInventoryItem, setNewInventoryItem] = useState(
    defaultNewInventoryItem
  );

  useEffect(() => {
    getStoragesRequest();
    getInventoryMovementsReq();
  }, []);

  const getInventoryMovementsReq = async () => {
    try {
      const response = await api.get(getAllInventoryMovementsEndpoint);
      console.log(response.data);
      setInventoryItemMovements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStoragesRequest = async () => {
    try {
      const response = await api.get(getAllStoragesEndpoint);
      setStorages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStorages(typeof value === "string" ? value.split(",") : value);
    let locations = [];
    for (const storageId of value) {
      locations.push({
        storageId: storageId,
        quantity: 1,
      });
    }
    setNewInventoryItem({ ...newInventoryItem, locations: locations });
  };

  const handleQuantityChange = (e, storageId) => {
    let quantity = Number(e.target.value);
    let temp = newInventoryItem.locations.map((x) =>
      x.storageId === storageId ? { ...x, quantity: quantity } : x
    );
    setNewInventoryItem({ ...newInventoryItem, locations: temp });
  };

  const handleAddNewInventoryItemClick = async (e) => {
    e.preventDefault();
    await addInventoryItemReq();
    setSelectedStorages([]);
    setNewInventoryItem(defaultNewInventoryItem);
  };

  const addInventoryItemReq = async () => {
    try {
      const response = await api.post(addInventoryItemEndpoint, {
        name: newInventoryItem.name,
        locations: newInventoryItem.locations,
      });
      if (response.status === 200) {
        getInventoryMovementsReq();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h5" marginBottom={5}>
        {t("InventoryMovements")}
      </Typography>
      <div>
        <Typography paragraph marginBottom={5}>
          {t("InventoryMovementsText")}
        </Typography>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="multiple-checkbox-label">
            {t("TargetStorages")}
          </InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            name="storages"
            multiple
            value={selectedStorages}
            onChange={handleChange}
            input={<OutlinedInput label="Target Storages" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {storages.map((storage) => (
              <MenuItem key={storage.id} value={storage.id}>
                <Checkbox
                  name="asdasd"
                  checked={selectedStorages.indexOf(storage.id) > -1}
                />
                <ListItemText primary={storage.id + " - " + storage.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {selectedStorages.length > 0 && (
        <div>
          <TextField
            id="input"
            label="New Inventory Item Name"
            value={newInventoryItem.name}
            onChange={(e) =>
              setNewInventoryItem({ ...newInventoryItem, name: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          {selectedStorages.map((selectedStorageId) => (
            <div key={selectedStorageId}>
              <TextField
                id="input"
                label="Storage"
                value={storages.find((x) => x.id === selectedStorageId).name}
                disabled
                sx={{ m: 2 }}
              />
              <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                onChange={(e) => handleQuantityChange(e, selectedStorageId)}
                sx={{ m: 2 }}
                defaultValue={
                  newInventoryItem.locations.find(
                    (x) => x.storageId === selectedStorageId
                  ).quantity
                }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <AddButton
              text={t("Add")}
              handleClick={(e) => handleAddNewInventoryItemClick(e)}
            />
          </div>
        </div>
      )}
      <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {/* <TableCell>Movement Id</TableCell> */}
              {/* <TableCell>Inventory Item Id</TableCell> */}
              <TableCell>Inventory Item Name</TableCell>
              {/* <TableCell>From Storage Id</TableCell> */}
              <TableCell>From Storage Name</TableCell>
              {/* <TableCell>To Storage Id</TableCell> */}
              <TableCell>To Storage Name</TableCell>
              {/* <TableCell>To Room Id</TableCell> */}
              <TableCell>To Room Name</TableCell>
              <TableCell>Movement Type</TableCell>
              <TableCell>Movement Date</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItemMovements.map((inventoryMovement) => (
              <TableRow
                key={inventoryMovement.inventoryMovementId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell>{inventoryMovement.inventoryMovementId}</TableCell> */}
                {/* <TableCell>{inventoryMovement.inventoryItemId}</TableCell> */}
                <TableCell>{inventoryMovement.inventoryItemName}</TableCell>
                {/* <TableCell>{inventoryMovement.fromStorageId}</TableCell> */}
                <TableCell>{inventoryMovement.fromStorageName}</TableCell>
                {/* <TableCell>{inventoryMovement.toStorageId}</TableCell> */}
                <TableCell>{inventoryMovement.toStorageName}</TableCell>
                {/* <TableCell>{inventoryMovement.toRoomId}</TableCell> */}
                <TableCell>{inventoryMovement.toRoomName}</TableCell>
                <TableCell>{inventoryMovement.movementType}</TableCell>
                <TableCell>{inventoryMovement.movementDate}</TableCell>
                <TableCell>{inventoryMovement.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InventoryMovements;
