import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Paid", "Organic", "Agent Leads", "Source"];

const data = {
  base: 50000,
  labels: labels,
  datasets: [
    {
      label: "",
      data: [65, 59, 80, 0],
      backgroundColor: ["#5F259F", "#0090DA", "#A4CE4E"],
      borderColor: ["#5F259F", "#0090DA", "#A4CE4E"],
      borderWidth: 1,
    },
  ],
};

const HomePage = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Layout pageName={"Dashboard"}>
      <div className="d-flex  flex-row-reverse">
       <div style={{width:'200px'}} className="mx-2">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div style={{width:'200px'}} >
          <FormControl fullWidth>
            <InputLabel id="currentyear">Select Current Year</InputLabel>
            <Select
              labelId="currentyear"
              id="currentyear"
              value={age}
              label="Select Current Year"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          </div>
      </div>

      <div className="home-barchart ms-5">
        <Bar options={options} data={data} width={600} height={300} />
      </div>
    </Layout>
  );
};

export default HomePage;
