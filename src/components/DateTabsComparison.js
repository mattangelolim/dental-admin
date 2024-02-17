import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

import { ReactJsBarChart } from "./ReactJsBarChart";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DateTabsComparison({ data }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            sx: {
              backgroundColor: theme.palette.secondary[300],
            },
          }}
          textColor={theme.palette.secondary[300]}
        >
          <Tab label="Daily" {...a11yProps(0)} />
          <Tab label="Weekly" {...a11yProps(1)} />
          <Tab label="Monthly" {...a11yProps(2)} />
          <Tab label="Yearly" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className=" h-[30rem] ">
          <ReactJsBarChart data={data} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className=" h-[30rem]">
          <ReactJsBarChart data={data} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className=" h-[30rem]">
          <ReactJsBarChart data={data} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className=" h-[30rem]">
          <ReactJsBarChart data={data} />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
