import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    campaign_name: props.campaign_name,
    advertiser: props.advertiser,
    country: props.country,
    conversion: props.conversion,
    bid: props.bid,
  });
  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditCampaigns = () => {
    Axios.put(`http://localhost:3001/campaigns/edit?_id=${editValues.id}`, {
      campaign_name: editValues.campaign_name,
      advertiser: editValues.advertiser,
      country: editValues.country,
      conversion: editValues.conversion,
      bid: editValues.bid,
    }).then(() => {
    });
    handleClose();
  };

  const handleDeleteCampaigns = () => {
    console.log(editValues)
    Axios.delete(`http://localhost:3001/campaigns/delete?_id=${editValues.id}`).then(() => {
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="campaign_name"
            label="campaign name"
            defaultValue={props.campaign_name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="advertiser"
            label="Advertiser"
            defaultValue={props.advertiser}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="country"
            label="Country"
            defaultValue={props.country}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="conversion"
            label="Conversion"
            defaultValue={props.conversion}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="bid"
            label="Bid"
            defaultValue={props.bid}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleDeleteCampaigns}>
            Delete
          </Button>
          <Button color="primary" onClick={() => handleEditCampaigns()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
