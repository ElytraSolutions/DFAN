import { useEffect, useState } from "react"
import { AgGridReact } from "@ag-grid-community/react"
import { ModuleRegistry } from "@ag-grid-community/core"
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-alpine.css"

import ExpandableSidebar from "~/components/ExpandableSidebar"

ModuleRegistry.registerModules([ServerSideRowModelModule])

interface Data {
  email: string
  UserProfile: {
    NFAMembershipNumber: string
    name: string
    gender: string
    mobile: string
    currentAddress: string
    permanentAddress: string
    employmentStatus: string
    employmentType: string
    membershipFrom: string
    isLifeMember: boolean
    hasRenewed: boolean
  }
}

type ColumnDef = {
  field: unknown
  headerName: string
  filter: string
  sortable?: boolean
  resizable?: boolean
  floatingFilter?: boolean
}[]

const AdminView = () => {
  const [sideBarLinks] = useState([
    "Pending Registration",
    "Pending Verification",
    "Registered Users",
  ])
  return (
    <ExpandableSidebar links={sideBarLinks}>
      {(currentView: string) => {
        return (
          <div className="grow grid p-2 md:px-12 grid-rows-[min-content_1fr] gap-4">
            <h1 className="text-2xl font-bold">{currentView}</h1>
            <div className="ag-theme-alpine-dark">
              {currentView === "Registered Users" ? (
                <RegisteredUsersTable />
              ) : null}
            </div>
          </div>
        )
      }}
    </ExpandableSidebar>
  )
}

const RegisteredUsersDataSource = {
  getRows: (params) => {
    console.log("Params from getRows", params)
    params.success({
      rowData: [],
    })
  },
}

const RegisteredUsersTable = () => {
  const [rowData, setRowData] = useState<Data[]>([])
  useEffect(() => {
    fetch("/api/admins/getUsers")
      .then((res) => res.json())
      .then((data) => {
        setRowData(data.data)
      })
  }, [])

  const [columnDefs] = useState([
    {
      field: "UserProfile.NFAMembershipNumber",
      headerName: "NFA Membership Number",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.name",
      headerName: "Name",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.membershipFrom",
      headerName: "Membership From",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.isLifeMember",
      headerName: "Life Member",
      filter: "agTextColumnFilter",
    },
    {
      field: "email",
      headerName: "Email",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.gender",
      headerName: "Gender",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.mobile",
      headerName: "Mobile Number",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.currentAddress",
      headerName: "Current Address",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.permanentAddress",
      headerName: "Permanent Address",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.employmentStatus",
      headerName: "Employment Status",
      filter: "agTextColumnFilter",
    },
    {
      field: "UserProfile.employmentType",
      headerName: "Employment Type",
      filter: "agTextColumnFilter",
    },
  ])

  const [defaultColDef] = useState({
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
    floatingFilter: true,
    suppressSizeToFit: true,
  })
  return (
    <AgGridReact
      rowModelType="serverSide"
      serverSideDatasource={RegisteredUsersDataSource}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      alwaysShowHorizontalScroll={true}
    ></AgGridReact>
  )
}

export default AdminView
