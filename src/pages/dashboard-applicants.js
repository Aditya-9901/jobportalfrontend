import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import GlobalContext from "../context/GlobalContext";
import {isAuthenticated,updateAuthData} from "../helper/index";
import {
  getApplicantsList,
  printRes,
  RejectApplication
  
} from "../helper2/index";
import imgP1 from "../assets/image/table-one-profile-image-1.png";
import imgP2 from "../assets/image/table-one-profile-image-2.png";
import imgP3 from "../assets/image/table-one-profile-image-3.png";
import imgP4 from "../assets/image/table-one-profile-image-4.png";
import imgP5 from "../assets/image/table-one-profile-image-5.png";
import { Avatar } from "@material-ui/core";

const defaultJobs = [
  { value: "pd", label: "Product Designer" },
  { value: "gd", label: "Graphics Designer" },
  { value: "fd", label: "Frontend Developer" },
  { value: "bd", label: "Backend Developer" },
  { value: "cw", label: "Content Writer" },
];

const DashboardApplicants = () => {
  const gContext = useContext(GlobalContext);
  const [applicants, setApplicants] = useState([]);

  const getAppliedList = () => {
    getApplicantsList(isAuthenticated().access_token).then((data) => {
      printRes(data);
      printRes("getting jobs");
      if (data.error === "token_expired") {
        //handle error
        printRes("token expired");
        updateAuthData(isAuthenticated());
        getAppliedList();
      } else {
        // printRes(data)
        setApplicants(data.Applicants);
        printRes(data.Applicants);
      }
    });
  };
  useEffect(() => {
    if (isAuthenticated().company_id) {
      getAppliedList();
    } else {
      printRes("not a company");
    }
  }, []);


  const reject = (id) => {
    RejectApplication(id, isAuthenticated().access_token).then((data) => {
      console.log(data);
      if (data.message === "Application rejected.") {
        alert(data.message);
      } else {
        alert(data.message);
      }
      window.location.reload();
      // console.log(data);
    });
  };

  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div className="dashboard-main-container mt-25 mt-lg-31">
          <div className="container">
            <div className="mb-14">
              <div className="row mb-11 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Applicants List ({applicants.length})</h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <Select
                        options={defaultJobs}
                        className="pl-0 h-100 arrow-3 arrow-3-black min-width-px-273  text-black-2 d-flex align-items-center w-100"
                        border={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                <div className="table-responsive">
                  {
                    applicants.length != 0 && (
                      <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="pl-0  border-0 font-size-4 font-weight-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Applied as
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Applied on
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        ></th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        ></th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                    {applicants?.map((app) =>
                        app.application.status === "rejected" ? (
                          <tr className="border border-color-2">
                            <th scope="row" className="pl-6 border-0 py-7 pr-0">
                              <Link href="/candidate-profile">
                                <a className="media min-width-px-235 align-items-center">
                                  <div className="circle-36 mr-6">
                                    {app.photoURL ? (
                                      <Avatar src={app.photoURL} />
                                    ) : (
                                      <Avatar src="" />
                                    )}
                                    {/* <img
                                    src={app.photoURL}
                                    alt=""
                                    className="w-100"
                                  /> */}
                                  </div>
                                  <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                    {app.name}
                                  </h4>
                                </a>
                              </Link>
                            </th>
                            <td className="table-y-middle py-7 min-width-px-235 pr-0">
                              <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                {app.application.job_title}
                              </h3>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-170 pr-0">
                              <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                {app.application.date}
                              </h3>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-170 pr-0">
                              <div className="">
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // gContext.toggleUserId(app.id);
                                    // gContext.toggleData(app);
                                    // gContext.toggleApplicationModal();
                                  }}
                                >
                                  View Application
                                </span>
                              </div>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-110 pr-0">
                              <div className="">
                                <Link href="/contact">
                                  <a className="font-size-3 font-weight-bold text-green text-uppercase">
                                    Contact
                                  </a>
                                </Link>
                              </div>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-100 pr-0">
                              <div className="">
                                <span
                                  style={{ cursor: "default" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    reject(app.application.id);
                                  }}
                                >
                                  <a
                                    style={{ textDecoration: "line-through" }}
                                    className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                                  >
                                    Rejected
                                  </a>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr
                            // style={{ backgroundColor: "#ffa3a3" }}
                            className="border border-color-2"
                          >
                            <th scope="row" className="pl-6 border-0 py-7 pr-0">
                              <Link href="/candidate-profile">
                                <a className="media min-width-px-235 align-items-center">
                                  <div className="circle-36 mr-6">
                                    {app.photoURL ? (
                                      <Avatar src={app.photoURL} />
                                    ) : (
                                      <Avatar src="" />
                                    )}
                                    {/* <img
                                    src={app.photoURL}
                                    alt=""
                                    className="w-100"
                                  /> */}
                                  </div>
                                  <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                    {app.name}
                                  </h4>
                                </a>
                              </Link>
                            </th>
                            <td className="table-y-middle py-7 min-width-px-235 pr-0">
                              <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                {app.application.job_title}
                              </h3>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-170 pr-0">
                              <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                {app.application.date}
                              </h3>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-170 pr-0">
                              <div className="">
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // gContext.toggleUserId(app.id);
                                    // gContext.toggleData(app);
                                    // gContext.toggleApplicationModal();
                                  }}
                                >
                                  View Application
                                </span>
                              </div>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-110 pr-0">
                              <div className="">
                                <Link href="/contact">
                                  <a className="font-size-3 font-weight-bold text-green text-uppercase">
                                    Contact
                                  </a>
                                </Link>
                              </div>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-100 pr-0">
                              <div className="">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    reject(app.application.id);
                                  }}
                                >
                                  <a className="font-size-3 font-weight-bold text-red-2 text-uppercase">
                                    Reject
                                  </a>
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                      
                    </tbody>
                  </table>
                    )
                  }
                </div>
                {/* <div className="pt-2">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
                      <li className="page-item rounded-0 flex-all-center">
                        
                          <a
                            className="page-link rounded-0 border-0 px-3active"
                            aria-label="Previous"
                          >
                            <i className="fas fa-chevron-left"></i>
                          </a>
                       
                      </li>
                      <li className="page-item">
                        
                          <a className="page-link border-0 font-size-4 font-weight-semibold px-3">
                            1
                          </a>
                       
                      </li>
                      <li className="page-item">
                        
                          <a className="page-link border-0 font-size-4 font-weight-semibold px-3">
                            2
                          </a>
                        
                      </li>
                      <li className="page-item">
                        
                          <a className="page-link border-0 font-size-4 font-weight-semibold px-3">
                            3
                          </a>
                       
                      </li>
                      <li className="page-item disabled">
                        
                          <a className="page-link border-0 font-size-4 font-weight-semibold px-3">
                            ...
                          </a>
                       
                      </li>
                      <li className="page-item ">
                        
                          <a className="page-link border-0 font-size-4 font-weight-semibold px-3">
                            7
                          </a>
                        
                      </li>
                      <li className="page-item rounded-0 flex-all-center">
                        
                          <a
                            className="page-link rounded-0 border-0 px-3"
                            aria-label="Next"
                          >
                            <i className="fas fa-chevron-right"></i>
                          </a>
                      
                      </li>
                    </ul>
                  </nav>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default DashboardApplicants;