import React from "react";
import { CContainer, CRow, CCol, CTable, CTableBody, CTableHead, CTableRow, CTableDataCell } from "@coreui/react";

const EmployeeDetailsTable = ({ saveData }) => {
  const { EmployeeId, EmployeeName, Department, Experince_Details } = saveData;

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h3>Employee Details</h3>
          <CTable bordered>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Employee ID:</CTableDataCell>
                <CTableDataCell>{EmployeeId}</CTableDataCell>
                <CTableDataCell>Employee Name:</CTableDataCell>
                <CTableDataCell>{EmployeeName}</CTableDataCell>
                <CTableDataCell>Department:</CTableDataCell>
                <CTableDataCell>{Department.label}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <h4>Experience Details</h4>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Company</CTableDataCell>
                <CTableDataCell>Start Date</CTableDataCell>
                <CTableDataCell>End Date</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {Experince_Details.map((experience, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{experience.company}</CTableDataCell>
                  <CTableDataCell>{experience.start}</CTableDataCell>
                  <CTableDataCell>{experience.end}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EmployeeDetailsTable;
