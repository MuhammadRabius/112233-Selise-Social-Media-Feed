import { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./leadpage.css";
import { Dialog } from "primereact/dialog";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const LeadsPage = () => {
  const onSearchClick = (e) => {
    console.log("search click");
  };

/*   const useStyles = withStyles((theme) => ({
    root: {
      "& .MuiFilledInput-root": {
        background: "rgb(232, 241, 250)"
      }
    }
  })); */

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [leads, setLeads] = useState([
    {
      leadId: 235,

      firstname: "Tomal",

      lastname: "Mahdi",

      email: "tomal.mahdi@metlife.com.bd",

      contactNo: "01677503555",

      leadSourceName: "360Health",

      districtName: "Dhaka",

      leadStatus: "Not Verified",

      leadDate: "2023-06-19",
    },

    {
      leadId: 241,

      firstname: "Tomal",

      lastname: "Mahdi",

      email: "tomal.mahdi@metlife.com.bd",

      contactNo: "01677503555",

      leadSourceName: "360Health",

      districtName: "Dhaka",

      leadStatus: "Not Verified",

      leadDate: "2023-06-19",
    },
  ]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string()
      //.min(5, "Password must be 5 characters at minimum")
      .required("Last name is required"),
    mobileno: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(11, "Mobile number must be 11 characters")
      .max(11, "Mobile number must be 11 characters")
      .required("Mobile number is required"),
      district:Yup.number()
      .positive()
      .required('Please select district')
      
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      district: -1,
      mobileno: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const emailTemplate = (lead) => {
    return (
      <div style={{ width: "85px", wordWrap: "break-word" }}>
        <p> {lead.email}</p>
      </div>
    );
  };

  const statusTemplate = (lead) => {
    console.log(lead.leadStatus);
    return (
      <div>
        <p> {lead.leadStatus}</p>
      </div>
    );
  };

  return (
    <Layout pageName={"Leads"}>
      <div className="lead-container mt-3">
        <div className="lead-header d-flex justify-content-between">
          <div className="lead-search">
            <input
              placeholder="Enter search query"
              className="filterlead"
              type="text"
              name="fname"
            />
            <span style={{ cursor: "pointer" }} onClick={onSearchClick}>
              <i
                className="pi pi-search"
                style={{ color: "var(--primary-color)" }}
              ></i>
            </span>
          </div>

          <div className="add-lead-group me-5">
            <button className="btn btn-primary">Bulk Upload</button>
            <button
              className="btn btn-primary ms-2"
              onClick={() => show("top")}
            >
              + Add Lead
            </button>
          </div>
        </div>

        <div className="lead-table mt-5 me-5">
          <div>
            <DataTable
              value={leads}
              tableStyle={{ minWidth: "5rem" }}
              paginator
              rows={5}
              size="small"
            >
              <Column
                field="leadDate"
                header="Date"
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="firstname"
                header="First Name"
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="lastname"
                header="Last Name"
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="contactNo"
                header="Mobile No"
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="email"
                alignHeader={"center"}
                header="Email"
                body={emailTemplate}
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="districtName"
                header="District"
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="leadSourceName"
                header="Source"
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="leadStatus"
                header="Status"
                body={statusTemplate}
                style={{ width: "25%" }}
                sortable
              ></Column>
              <Column
                field="action"
                header="Action"
                style={{ width: "25%" }}
                sortable
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <Dialog
        header="Add Leads"
        visible={visible}
        position={position}
        style={{ width: "45vw" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            district: -1,
            mobileno: "8801",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              console.log(values);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Form onSubmit={formik.handleSubmit}>
            <div className="mx-5 mt-1">
              <div className="mb-2">
                <TextField
                  fullWidth
                  id="fname"
                  name="fname"
                  label="First Name"
                  variant="standard"
                  required
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  helperText={formik.touched.fname && formik.errors.fname}
                />
              </div>

              <div className="mb-2">
                <TextField
                  fullWidth
                  id="lname"
                  name="lname"
                  label="Last Name"
                  variant="standard"
                  required
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  helperText={formik.touched.lname && formik.errors.lname}
                />
              </div>

              <div className="mb-2">
                <TextField
                  type="number"
                  fullWidth
                  id="mobileno"
                  name="mobileno"
                  label="Mobile No."
                  variant="standard"
                  required
                  value={formik.values.mobileno}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.mobileno && Boolean(formik.errors.mobileno)
                  }
                  helperText={formik.touched.mobileno && formik.errors.mobileno}
                />
              </div>

              <div className="mb-2">
                <TextField
                  type="email"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>

              <div className="mb-2">
                <FormControl  variant="standard" required
                 error={formik.touched.district && Boolean(formik.errors.district)}
                 helperText={formik.touched.district && formik.errors.district}
                    fullWidth>
                  <InputLabel id="district">District</InputLabel>
                  <Select
                   value={formik.values.district}
                    labelId="district"
                    id="district"
                    name="district"
                    onChange={formik.handleChange}
                    error={formik.touched.district && Boolean(formik.errors.district)}
                    helperText={formik.touched.district && formik.errors.district}
                    label="District"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Dhaka</MenuItem>
                    <MenuItem value={2}>Magura</MenuItem>
                    <MenuItem value={3}>Khulna</MenuItem>
                  </Select>
                </FormControl>
              </div>
                <div className="d-flex flex-row-reverse mt-2">
              <button type="submit" className="btn" style={{backgroundColor:'#007ABC',color:'white'}}>
                Submit
              </button>
              </div>
            </div>
          </Form>
        </Formik>
      </Dialog>
    </Layout>
  );
};

export default LeadsPage;
