import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Grid,
} from "@mui/material";
import Select, { components } from "react-select";
import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";

const countryOptions = countryList().getData();

const Menu = (props) => {
  const { innerProps, children } = props;
  return (
    <components.Menu {...props}>
      <div {...innerProps} style={{ zIndex: 9999 }}>
        {children}
      </div>
    </components.Menu>
  );
};

const SignInPage = () => {
  const [verificationMethod, setVerificationMethod] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [showRadioButtons, setShowRadioButtons] = useState(false);

  const handleVerificationMethodChange = (event) => {
    setVerificationMethod(event.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setShowRadioButtons(false);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setShowRadioButtons(true);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const isRequestOtpButtonDisabled = () => {
    if (verificationMethod === "whatsapp" || verificationMethod === "sms") {
      return !selectedCountry || !phoneNumber;
    } else if (verificationMethod === "email") {
      return !email;
    }
    return true;
  };

  return (
    <Container maxWidth="sm">
      <div>
        <h2>Sign In Page</h2>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location"
            fullWidth
            value={location}
            onChange={handleLocationChange}
            onBlur={() => setShowRadioButtons(true)}
          />
          {!showRadioButtons && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDetectLocation}
              style={{ marginTop: "8px" }}
            >
              Detect Location
            </Button>
          )}
        </Grid>
        {showRadioButtons && (
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Verification Method</FormLabel>
              <RadioGroup
                row
                value={verificationMethod}
                onChange={handleVerificationMethodChange}
              >
                <FormControlLabel
                  value="whatsapp"
                  control={<Radio />}
                  label="WhatsApp"
                />
                <FormControlLabel value="sms" control={<Radio />} label="SMS" />
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        )}
        {(verificationMethod === "whatsapp" ||
          verificationMethod === "sms") && (
          <>
            <Grid item xs={12} md={12}>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Select Country"
                isSearchable={true}
                components={{ Menu }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Phone Number"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Grid>
          </>
        )}
        {verificationMethod === "email" && (
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={isRequestOtpButtonDisabled()}
            fullWidth
          >
            Request OTP
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
