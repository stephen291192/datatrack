import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CButton,
} from "@coreui/react";
import EmployeeDetailsTable from "./table";
const EmployeeDetails = () => {
    
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState({ value: "", label: "" });
  const [country, setCountry] = useState("");
  const [saveData, setSaveData] = useState({
    EmployeeId: "",
    EmployeeName: "",
    Department: { value: "", label: "" },
    Experince_Details: [], // Initialize as an empty array
  });
  
    
  // add button state
  const [items, setItems] = useState([{ company: "", start: "", end: "" }]);
 

  useEffect(() => {
    // Generate a random number as the employee ID
    const randomDigit = Math.floor(1 + Math.random() * 9);
    const generatedId = `DT000E${randomDigit}`;
    setEmpId(generatedId);
  }, []);

  // Department Options
  const options = [
    { label: "Select department", value: "" },
    { label: "Human Resources", value: "1" },
    { label: "Software developer", value: "2" },
    { label: "Finance Department", value: "3" },
    { label: "Inspection Department", value: "4" },
    { label: "Engineering Management", value: "5" },
    { label: "Quality Assurance", value: "6" },
  ];
// Clear function

  const clear = () => {
    setName("");
    setDepartment([]);
    setCountry("");
    setEmpId("0000000");
    setItems([{ company: "", start: "", end: "" }])
  };


  const add = () => {
    setItems([...items, { company: "", to: "" }]);
  };


  const handleInputChange = (index, fieldName, value) => {
   
    const updatedItems = [...items];
    
    updatedItems[index][fieldName] = value;
  
        if (fieldName === 'start' && updatedItems[index]['end'] && value > updatedItems[index]['end']) {
        toast.error('Start date must be less than or equal to end date');
      return;
    } else if (fieldName === 'end' && updatedItems[index]['start'] && value < updatedItems[index]['start']) {
        toast.error('End date must be greater than or equal to start date');
      return;
    }
  
    // Check previous start dates
    for (let i = 0; i < index; i++) {
      if (fieldName === 'start' && value < updatedItems[i]['end']) {
        toast.error('Start date must be greater than or equal to the previous end date');
        return;
      } 
        }
     
    setItems(updatedItems);
    
    setSaveData({
        ...saveData,
        Experince_Details: updatedItems, // Update experience details in saveData
      });
  };

  const remove = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  

  const saveFunction = () => {
    setSaveData({
      EmployeeId: empId,
      EmployeeName: name,
      Department: { ...department },
      Experince_Details: items, // Use the items array for experience details
    });

    toast.success("Employee details saved successfully");
    console.log("Data123", saveData);
    clear()
    // setItems([])
  };


  return (
    <div>
      {/* Employee Details Form Start */}

      <div>
      <ToastContainer /> 
        <div className="text-center">
          <p className="Title mt-5 ">Employee Details Form</p>
        </div>
        <div className="width">
          <CForm>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="Employee"
                className="col-sm-2 col-form-label"
              >
                Employee Id : <code>*</code>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput type="text" id="Employee" value={empId} readOnly />
              </CCol>
              <CFormLabel
                htmlFor="Department"
                className="col-sm-2 col-form-label"
              >
                Department : <code>*</code>
              </CFormLabel>
              <CCol sm={4}>
              <CFormSelect
          aria-label="Default select example"
          value={department.value}
          onChange={(e) =>
            setDepartment({
              value: e.target.value,
              label: e.target.options[e.target.selectedIndex].text,
            })
          }
        >
          {options.map((x) => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="Employee"
                className="col-sm-2 col-form-label"
              >
                Employee Name <code>*</code>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput
                  type="text"
                  placeholder="Enter Employee Name "
                  value={name}
                 
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </CCol>
              <CFormLabel
                htmlFor="Department"
                className="col-sm-2 col-form-label"
              >
                Country Code <code>*</code>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput type="text" />
              </CCol>
            </CRow>
          </CForm>
        </div>
        <div className="widthChild">
          <p className="ExpDet">Experince Details </p>
          <div>
            {items.map((item, index) => (
              <CRow key={index} xl={12}>
                <CFormLabel
                  htmlFor={`company-${index}`}
                  className="col-sm-2 col-form-label"
                >   Company Name <code>*</code>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    id={`company-${index}`}
                    placeholder="Enter Company Name"
                    disabled ={!name}
                    value={item.company}
                    onChange={(e) =>
                      handleInputChange(index, "company", e.target.value)
                    }
                  />
                </CCol>
                <CFormLabel
                  htmlFor={`start-${index}`}
                  className="col-sm-1 col-form-label"
                >
                  Duration Start <code>*</code>
                </CFormLabel>
                <CCol sm={2}>
                  <CFormInput
                    type="date"
                    id={`start-${index}`}
                    placeholder=""
                    disabled ={!name || !item.company }
                    value={item.start}
                    onChange={(e) =>
                      handleInputChange(index, "start", e.target.value)
                    }
                  />
                </CCol>
                <CFormLabel
                  htmlFor={`end-${index}`}
                  className="col-sm-1 col-form-label "
                >
                  Duration End <code>*</code>
                </CFormLabel>
                <CCol sm={2}>
                  <CFormInput
                    type="date"
                    id={`end-${index}`}
                    placeholder=""
                    value={item.end}
                    disabled ={ !name || !item.company || !item.start}
                    onChange={(e) =>
                      handleInputChange(index, "end", e.target.value)
                    }
                  />
                </CCol>

                <CCol sm={1}>
                  <CButton
                    color="danger"
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    <MdDelete size={26} />
                  </CButton>
                </CCol>
              </CRow>
            ))}
            <CCol sm={2}>
              <CButton
                color="success"
                variant="ghost"
                onClick={(e) => {
                  add();
                }}
              >
                <CiCirclePlus size={35} color="green" />
              </CButton>
            </CCol>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <CButton color="success" variant="outline" className=" m-3"
                  disabled ={ !name || !items}
                  onClick={saveFunction}
              >
                Save
              </CButton>
              <CButton
                color="info"
                variant="outline"
                className="m-3"
                onClick={(e) => {
                  clear();
                }}
              >
                Clear
              </CButton>
            </div>
          </div>
        </div>
          {/* {JSON.stringify(saveData)} */}
          <div>
      {/* <h1>Employee Details</h1> */}
      <EmployeeDetailsTable saveData={saveData} />
    </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
