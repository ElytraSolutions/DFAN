import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  useGridApiContext,
} from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import UserContext from "~/context/User";
import CustomSidebar from "~/components/CustomSidebar";


const PendingVerification = () => {
  const { userData } = useContext(UserContext);

  if (
    userData?.role !== "Central Admin" &&
    userData?.role !== "Regional Admin"
  ) {
    toast.error("You are not authorized to view this page");
    return <Navigate to="/profile" />;
  }

  return (
    <div className="flex flex-row h-screen overflow-scroll">
      <CustomSidebar />
      <div className="grow p-2 md:px-12 flex flex-col gap-4 pt-8">
        <h1 className="text-2xl font-bold">Pending Verifications</h1>
        <PendingVerificationTable />
      </div>
    </div>
  );
};

const PendingVerificationTable = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
    setSelectedRowData(null);
  };

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 180, resizable: true },
    {
      field: "NFAMembershipNumber",
      headerName: "NFA Membership Number",
      width: 250,
      resizable: true,
      valueGetter: (params) =>
        params.row.UserProfile.NFAMembershipNumber || "N/A",
    },
    {
      field: "Name",
      headerName: "Name",
      width: 250,
      resizable: true,
      valueGetter: (params) => params.row.UserProfile.name || "N/A",
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 250,
      resizable: true,
      valueGetter: (params) => params.row.UserProfile.gender || "N/A",
    },
    {
      field: "Mobile Number",
      headerName: "Mobile Number",
      width: 250,
      resizable: true,
      valueGetter: (params) => params.row.UserProfile.mobile || "N/A",
    },
  ];
  useEffect(() => {
    (async () => {
      const queryParams = new URLSearchParams({
        offset: "0",
        limit: "100",
        verified: "pending",
      });
      const resp = await fetch(
        `/api/admins/getUsers?${queryParams.toString()}`
      );
      if (!resp.ok) {
        toast.error("Error fetching invitation data");
        return;
      }
      const data = await resp.json();
      setRows(data.data);
    })();
  }, []);

  const rowClickHandler: GridEventListener<"rowClick"> = (params) => {
    const AselectedRow = params.row;
    setSelectedRowData(AselectedRow);
    setOpenModal(true);
  };
  // const rowClickHandler: GridEventListener<'rowClick'> = (params) => {
  //     const id = params.row.id;
  //     navigate(`/admin/showProfile/${id}`);
  // };
  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onRowClick={rowClickHandler}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Dialog open={openModal} onClose={closeModal}>
        <DialogTitle className="flex justify-center p-[50px] bg-[#555] font-bold text-white">
          Verify
        </DialogTitle>
        <DialogContent>
            <>
          {selectedRowData && (
            <div className="flex flex-col items-center p-3">
              {selectedRowData["UserProfile"]["avatar"] !== null && (
                <>
                  <img
                    className="w-[10vw] rounded-[50px] pb-4"
                    src={`/api/avatars/${selectedRowData["UserProfile"]["avatar"]}`}
                    alt=""
                  />
                </>
              )}
              {selectedRowData["UserProfile"]["avatar"] === null && (
                <>
                  <img
                    className="w-[10vw] pb-4"
                    src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                    alt=""
                  />
                </>
              )}
              <div className="w-[50vw]"></div>
              <p className="font-semibold ">
                Name:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["name"]}
                </span>
              </p>
              <p className="font-semibold ">
                  Life Member:{" "}
                  <span className="font-bold text-[#005500]">
                    {selectedRowData["UserProfile"]["isLifeMember"] ? "Yes" : "No"}
                  </span>
                </p>
              <p className="font-semibold ">
                NFA ID:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["NFAMembershipNumber"]}
                </span>
              </p>
              <p className="font-semibold ">
                Email:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["email"]}
                </span>
              </p>
              <p className="font-semibold ">
                Role:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["role"]}
                </span>
              </p>
              <p className="font-semibold ">
                Membership From:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["membershipFrom"]}
                </span>
              </p>
              <p className="font-semibold ">
                Gender:
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["gender"]}
                </span>
              </p>
              <p className="font-semibold ">
                Mobile Number:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["mobile"]}
                </span>
              </p>
              <p className="font-semibold ">
                Current Address:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["currentAddress"]}
                </span>
              </p>
              <p className="font-semibold ">
                Permanent Address:{" "}
                <span className="font-bold text-[#005500]">
                  {selectedRowData["UserProfile"]["permanentAddress"]}
                </span>
              </p>
              
            </div>
          )}</>
          <hr />
            <div className="flex justify-center gap-[3vw] mx-auto my-5">
                <button className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-[#2A4A29] text-white font-medium md:mr-4 hover:bg-white hover:text-[#2A4A29] hover:font-bold hover:outline ">
                  Verify
                </button>
                <button className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-[#a22] text-white font-medium md:mr-4 hover:bg-white hover:text-[#a22] hover:font-bold hover:outline">Reject</button>
            </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PendingVerification;
