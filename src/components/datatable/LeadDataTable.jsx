
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './leadDatatable.css'
const LeadDataTable = ({data}) => {
  return (
    <div>
        <DataTable paginator  value={data} tableStyle={{ minWidth: '10rem' }}>
        <Column field="leadDate" header="Date" sortable ></Column>
        <Column field="firstname" header="First Name" sortable ></Column>
        <Column field="lastname" header="Last Name" sortable ></Column>
        <Column field="contactNo" header="Mobile No" sortable ></Column>
        <Column field="email" header="Email" sortable ></Column>
        <Column field="districtName" header="District" sortable ></Column>
        <Column field="leadSourceName" header="Source" sortable ></Column>
        <Column field="leadStatus" header="Status" sortable ></Column>
        <Column field="action" header="Action" sortable ></Column>
        </DataTable>
    </div>
  )
}

export default LeadDataTable