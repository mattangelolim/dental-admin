import React, { useEffect, useState } from "react";
import axios from "axios";
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

  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const response = await axios.get(
          "https://13.211.204.176/revenue/analytics?filter=daily"
        );
        console.log(response.data);
        setDailyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchWeekly = async () => {
      try {
        const response = await axios.get(
          "https://13.211.204.176/revenue/analytics?filter=weekly"
        );
        console.log(response.data);
        setWeeklyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchMonthly = async () => {
      try {
        const response = await axios.get(
          "https://13.211.204.176/revenue/analytics?filter=monthly"
        );
        console.log(response.data);
        setMonthlyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchYearly = async () => {
      try {
        const response = await axios.get(
          "https://13.211.204.176/revenue/analytics?filter=yearly"
        );
        console.log(response.data);
        setYearlyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDaily();
    fetchWeekly();
    fetchMonthly();
    fetchYearly();
  }, []);

  const formattedDailyData = {
    labels:
      // dailyData && dailyData.revenueData
      //   ? dailyData.revenueData.map((item) => item.date)
      //   : [],
      Array.from(
        {
          length:
            dailyData && dailyData.revenueData
              ? dailyData.revenueData.length
              : 0,
        },
        (_, index) => `Day ${index + 1}`
      ),
    datasets: [
      {
        label: dailyData && dailyData.revenueData ? "Revenue" : "No Data",
        data:
          dailyData && dailyData.revenueData
            ? dailyData.revenueData.map((item) => item.revenue)
            : [],
        backgroundColor: Array.from(
          {
            length:
              dailyData && dailyData.revenueData
                ? dailyData.revenueData.length
                : 0,
          },
          (_, index) => "hsl(120, 70%, 50%)"
        ),
      },
    ],
  };

  const formattedWeeklyData = {
    labels: Array.from(
      {
        length:
          weeklyData && weeklyData.revenueData
            ? weeklyData.revenueData.length
            : 0,
      },
      (_, index) => `Week ${index + 1}`
    ),
    datasets: [
      {
        label: weeklyData && weeklyData.revenueData ? "Revenue" : "No Data",
        data:
          weeklyData && weeklyData.revenueData
            ? weeklyData.revenueData.map((item) => item.revenue)
            : [],
        backgroundColor: Array.from(
          {
            length:
              weeklyData && weeklyData.revenueData
                ? weeklyData.revenueData.length
                : 0,
          },
          (_, index) => "hsl(120, 70%, 50%)"
        ),
      },
    ],
  };

  const formattedMonthlyData = {
    labels: Array.from(
      {
        length:
          monthlyData && monthlyData.revenueData
            ? monthlyData.revenueData.length
            : 0,
      },
      (_, index) => `Month ${index + 1}`
    ),
    datasets: [
      {
        label: monthlyData && monthlyData.revenueData ? "Revenue" : "No Data",
        data:
          monthlyData && monthlyData.revenueData
            ? monthlyData.revenueData.map((item) => item.revenue)
            : [],
        backgroundColor: Array.from(
          {
            length:
              monthlyData && monthlyData.revenueData
                ? monthlyData.revenueData.length
                : 0,
          },
          (_, index) => "hsl(120, 70%, 50%)"
        ),
      },
    ],
  };

  const formattedYearlyData = {
    labels: Array.from(
      {
        length:
          yearlyData && yearlyData.revenueData
            ? yearlyData.revenueData.length
            : 0,
      },
      (_, index) => `Year ${index + 1}`
    ),
    datasets: [
      {
        label: yearlyData && yearlyData.revenueData ? "Revenue" : "No Data",
        data:
          yearlyData && yearlyData.revenueData
            ? yearlyData.revenueData.map((item) => item.revenue)
            : [],
        backgroundColor: Array.from(
          {
            length:
              yearlyData && yearlyData.revenueData
                ? yearlyData.revenueData.length
                : 0,
          },
          (_, index) => "hsl(120, 70%, 50%)"
        ),
      },
    ],
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
          <ReactJsBarChart data={formattedDailyData} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className=" h-[30rem]">
          <ReactJsBarChart data={formattedWeeklyData} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className=" h-[30rem]">
          <ReactJsBarChart data={formattedMonthlyData} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className=" h-[30rem]">
          <ReactJsBarChart data={formattedYearlyData} />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
