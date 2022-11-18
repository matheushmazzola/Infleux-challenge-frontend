import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Campaigns from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCampaigns, setListCampaigns] = useState([]);
  const [listFetch, setListFetch] = useState([]);
  console.log(process.env);

  const handleFetch = () => {
    if (typeof values == 'undefined') {
      var data = "";
      }else{
        data = values.country;
      }
      Axios.get(`https://infleux-challenge-api.herokuapp.com/fetch?country=${data}`, ).then((response) => {
          if(response.data.campaign){ 
            setListFetch([...listFetch,
              {
                id: response.data.campaign._id,
                campaign_name: response.data.campaign.campaign_name,
                advertiser: response.data.campaign.advertiser,
                country: response.data.campaign.country,
                conversion: response.data.campaign.conversion,
                bid: response.data.campaign.bid,
              },
            ]);
          }
        });
    };

  const handleCreate = () => {
    Axios.post("https://infleux-challenge-api.herokuapp.com/campaigns/create", {
      campaign_name: values.campaign_name,
      advertiser: values.advertiser,
      country: values.country,
      conversion: values.conversion,
      bid: values.bid,
    }).then(() => {
      Axios.get("https://infleux-challenge-api.herokuapp.com/campaigns/find", {
        id: values._id,
        campaign_name: values.campaign_name,
        advertiser: values.advertiser,
        country: values.country,
        conversion: values.conversion,
        bid: values.bid,
      }).then((response) => {
        setListCampaigns([...listCampaigns,
          {
            id: values._id,
            campaign_name: values.campaign_name,
            advertiser: values.advertiser,
            country: values.country,
            conversion: values.conversion,
            bid: values.bid,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("https://infleux-challenge-api.herokuapp.com/campaigns/find").then((response) => {
      setListCampaigns(response.data.campaign);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="create-container">
      <div className="create-container">
        <h1 className="create-title">Find the best campaign</h1>

        <input
          type="text"
          placeholder="Country"
          name="country"
          className="Create-input"
          onChange={handleaddValues}
        />

        <button onClick={handleFetch} className="Create-button">
          Find
        </button>

        {typeof listFetch !== "undefined" && Object(listFetch).map((val) => (
        <>
          <Campaigns
            key={val._id}
            id={val.id}
            campaign_name={val.campaign_name}
            advertiser={val.advertiser}
            country={val.country}
            conversion={val.conversion}
            bid={val.bid}
          />
        </>
      ))}

      </div>
      <div className="create-container">
        <h1 className="create-title">Create new campaign</h1>

        <input
          type="text"
          name="campaign_name"
          placeholder="Campaign name"
          className="Create-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Advertiser"
          name="advertiser"
          className="Create-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          className="Create-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Conversion"
          name="conversion"
          className="Create-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Bid"
          name="bid"
          className="Create-input"
          onChange={handleaddValues}
        />

        <button onClick={handleCreate} className="Create-button">
          Create
        </button>
      </div>
      
      {typeof listCampaigns !== "undefined" && Object(listCampaigns).map((val) => (
        <>
          <Campaigns
            key={val._id}
            id={val._id}
            campaign_name={val.campaign_name}
            advertiser={val.advertiser}
            country={val.country}
            conversion={val.conversion}
            bid={val.bid}
          />
        </>
      ))}
    </div>
  );
}