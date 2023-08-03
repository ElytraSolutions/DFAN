import { useEffect, useState } from "react"
import { AgGridReact } from "@ag-grid-community/react"
import { IGetRowsParams } from "@ag-grid-community/core"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-alpine.css"

import ExpandableSidebar from "~/components/ExpandableSidebar"

import { ModuleRegistry } from "@ag-grid-community/core"
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model"

ModuleRegistry.registerModules([InfiniteRowModelModule])

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
              {currentView === "Pending Verification" ? (
                <PendingVerificationUsersTable />
              ) : null}
            </div>
          </div>
        )
      }}
    </ExpandableSidebar>
  )
}

const RegisteredUsersDataSource = {
  getRows: (params: IGetRowsParams) => {
    const offset = params.startRow
    const limit = params.endRow - params.startRow
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    })
    fetch(`/api/admins/getUsers?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        params.successCallback(data.data, data.count)
      })
      .catch((err) => {
        console.error(err)
        params.failCallback()
      })
  },
}

const PendingVerificationDataSource = {
  getRows: (params: IGetRowsParams) => {
    const offset = params.startRow
    const limit = params.endRow - params.startRow
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      verified: "pending",
    })
    fetch(`/api/admins/getUsers?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        params.successCallback(data.data, data.count)
      })
      .catch((err) => {
        console.error(err)
        params.failCallback()
      })
  },
}

const RegisteredUsersTable = () => {
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
      rowModelType="infinite"
      datasource={RegisteredUsersDataSource}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      alwaysShowHorizontalScroll={true}
    ></AgGridReact>
  )
}

const PendingVerificationUsersTable = () => {
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
      rowModelType="infinite"
      datasource={PendingVerificationDataSource}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      alwaysShowHorizontalScroll={true}
    ></AgGridReact>
  )
}

export default AdminView
