import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { URLDevelopment } from "./utilities/Url";
import axios from "axios";

function App() {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

  //var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const { CanvasJSChart } = CanvasJSReact;

  const containerProps = {
    width: "100%",
    height: "100%",
    margin: "auto",
  };

  const selectBranch = [
    {
      id: 1,
      label: "Athulya Homecare Chennai",
      value: "Athulya Homecare Chennai",
    },
    {
      id: 2,
      label: "Athulya Homecare Bangalore",
      value: "Athulya Homecare Bangalore",
    },
    {
      id: 3,
      label: "Athulya Homecare Cochin",
      value: "Athulya Homecare Cochin",
    },
    {
      id: 4,
      label: "Athulya Homecare Hyderabad",
      value: "Athulya Homecare Hyderabad",
    },
    {
      id: 5,
      label: "Athulya Homecare Coimbatore",
      value: "Athulya Homecare Coimbatore",
    },
  ];

  // const selectDayorMonth = [
  //   { label: "Day", value: "Day" },
  //   { label: "Month", value: "Month" },
  // ];

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState("");
  const [invoiceamount, setinvoiceamount] = useState(0);
  const [receiptamount, setreceipamount] = useState(0);
  const [remainingamount, setremainingamount] = useState(0);

  const [servicecategory, setservicecategory] = useState([]);
  const [tabledata1, settabledata1] = useState([]);
  const [tabledata2, settabledata2] = useState([]);
  const [alldaydata, setalldaydata] = useState([]);
  const [selecttype, setselecttype] = useState("Invoices");
  const [splitup, setSplitup] = useState({});
  useEffect(() => {
    fetchData();
    console.log(selecttype);
  }, []);

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleBranch = (branch) => {
    setBranch(branch);
  };
  const handleToDate = (date) => {
    setToDate(date);
  };
  const handleDataPointClick = (dataPoint) => {
    console.log(`You clicked on ${dataPoint.label} with value ${dataPoint.y}`);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    from_Date = !fromDate ? today : from_Date;
    to_Date = !toDate ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    var category = dataPoint.label;
    var select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(branch);
    console.log(category);

    console.log(from_Date);
    console.log(to_Date);
    console.log(branch);
    //from_Date='2023-09-01';
    //to_Date='2023-09-24';
    axios
      .post(
        `${URLDevelopment}/getserviceinvoicesplitup?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}&service_name=${category}`
      )
      .then((response) => {
        //setData(response.data);
        setselecttype("Category");
        settabledata2(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const addSymbols = (e) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(
      Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
      0
    );
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };

  const fetchData = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    from_Date = !fromDate ? today : from_Date;
    to_Date = !toDate ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    var select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(branch);
    //from_Date='2023-09-01';
    //to_Date='2023-09-24';
    axios
      .post(
        `${URLDevelopment}/getinvoices?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}`
      )
      .then((response) => {
        //setData(response.data);
        settabledata1(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post(
        `${URLDevelopment}/getserviceinvoice?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}`
      )
      .then((response) => {
        //setData(response.data);
        setservicecategory(response.data.data);
        //console.log(response.data.data);
        console.log(servicecategory);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post(
        `${URLDevelopment}/getalldayinvoice?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}`
      )
      .then((response) => {
        //setData(response.data);
        setalldaydata(response.data.data);
        //console.log(response.data.data);
        console.log(alldaydata);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .post(
        `${URLDevelopment}/getsummary?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}`
      )
      .then((response) => {
        //setData(response.data);
        var invoice_amount = response.data.data["Invoice_Sum"];
        var receipt_amount = response.data.data["Receipt_Sum"];
        var remaining_amount = invoice_amount - receipt_amount;
        let rupeeIndian = Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        });
        invoice_amount = rupeeIndian.format(invoice_amount);
        receipt_amount = rupeeIndian.format(receipt_amount);
        remaining_amount = rupeeIndian.format(remaining_amount);

        setinvoiceamount(invoice_amount);
        setreceipamount(receipt_amount);
        setremainingamount(remaining_amount);

        //console.log(response.data.data);
        console.log(response.data.data["Invoice_Sum"]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const stock_chart_options = {
    title: {
      text: "Invoices Generated",
    },
    subtitles: [
      {
        text: "INR",
      },
    ],
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    charts: [
      {
        axisX: {
          title: "Period",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "DD-MM-YY",
          },
        },
        axisY: {
          title: "Income",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "#,###.##",
          },
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "splineArea",
            xValueFormatString: "DD-MM-YY",
            color: "#3576a8",
            dataPoints: alldaydata,
          },
        ],
        navigator: {
          slider: {
            minimum: new Date("2017-05-01"),
            maximum: new Date("2018-05-01"),
          },
        },
      },
    ],
    // rangeSelector: {
    //   inputFields: {
    //     startValue: 0,
    //     endValue: 600000,
    //     valueFormatString: "###0"
    //   },

    // }
  };

  const category_chart_options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Invoices Created Based on Category",
    },
    axisX: {
      title: "Category",
      reversed: true,
    },
    axisY: {
      title: "Income",
      includeZero: true,
      labelFormatter: addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: servicecategory,
        click: (e) => {
          const dataPoint = e.dataPoint;
          handleDataPointClick(dataPoint);
        },
      },
    ],
  };
  // const [selectedData, setSelectedData] = useState("data1");
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const [detailsVisible, setDetailsVisible] = useState(
    Array(data.length).fill(false)
  );

  // Sample data
  // const tabledata = [
  //   { name: 'John Doe', patient_id:'ATH-COC124', invoice_no: 'INV452', invoice_no: 'INV452',invoice_date: '2023-09-10', amount:12000, status: 'Pending' },
  //   { name: 'Jane Smith',patient_id:'ATH-COC125', invoice_no: 'INV453', invoice_date: '2023-09-10', amount:2000,status: 'Pending' },
  //   { name: 'Bob Johnson',patient_id:'ATH-COC126',  invoice_no: 'INV454',invoice_date: '2023-09-10', amount:10000,status: 'Pending' },
  // ];

  // const toggleDetails = (index) => {
  //   const newDetailsVisible = [...detailsVisible];
  //   newDetailsVisible[index] = !newDetailsVisible[index];
  //   setDetailsVisible(newDetailsVisible);
  // };
  const toggleDetails = async (id) => {
    try {
      const requestBody = {
        id: id,
      };
      const response = await fetch(
        `${URLDevelopment}/getinvoicesplitup?invoice_id=${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const result = await response.json();

      // Update the split-up data for the specific invoice ID
      setSplitup((prevSplitup) => ({
        ...prevSplitup,
        [id]: result.success,
      }));

      // Toggle the visibility for the specific invoice ID
      setDetailsVisible((prevDetailsVisible) => ({
        ...prevDetailsVisible,
        [id]: !prevDetailsVisible[id],
      }));
    } catch (error) {
      console.error("Error fetching details from the API:", error);
    }
  };

  return (
    <div className="App">
      <div className="grid grid-cols-8 mx-auto border-solid container-fluid border-1 border-white-500">
        {/* Replace border-2 border-sky-500 with border-1 border-white-500  */}
        <div className="col-span-1 border-solid border-1 border-white-500">
          <div className="flex items-center justify-center border-b h-14">
            <div>Athulya Homecare</div>
          </div>
          <div className="flex-grow overflow-x-hidden overflow-y-auto">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Menu
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center pr-6 text-gray-600 border-l-4 border-transparent h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 hover:border-indigo-500"
                >
                  <span className="inline-flex items-center justify-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Dashboard
                  </span>
                </a>
              </li>

              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center pr-6 text-gray-600 border-l-4 border-transparent h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 hover:border-indigo-500"
                >
                  <span className="inline-flex items-center justify-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Profile
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center pr-6 text-gray-600 border-l-4 border-transparent h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 hover:border-indigo-500"
                >
                  <span className="inline-flex items-center justify-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Settings
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center pr-6 text-gray-600 border-l-4 border-transparent h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 hover:border-indigo-500"
                >
                  <span className="inline-flex items-center justify-center ml-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-7  bg-[#F3F4F6] border-solid border-1 border-white-500">
          <header className="col-span-7 h-16 bg-[#F3F4F6] border-solid border-1 border-white-500">
            <h1 className="text-2xl text-center"></h1>
          </header>
          {/* Replace border-2 border-sky-500 with border-0 border-white-500  */}
          <main className="col-span-7 md:col-span-7  p-10 bg-[#F3F4F6] border-0 border-white-500">
            {/* Filters */}
            <div className="grid gap-5 mb-16 border-solid lg:grid-cols-5 border-1 border-white-500">
              <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <Select
                  options={selectBranch}
                  name="branch_name"
                  className="branch_name"
                  placeholder="Select Branch"
                  onChange={handleBranch}
                />
              </div>
              {/* <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <Select
                    options={selectDayorMonth}
                    name="day_or_month"
                    className="day_or_month"
                    placeholder="Day/Month"
                
                  />
                </div> */}
              <div className="w-full h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDate}
                  className="w-full px-2 border border-gray-300 rounded-md outline-none h-9"
                  placeholderText="From Date"
                />
              </div>
              <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <DatePicker
                  selected={toDate}
                  onChange={handleToDate}
                  className="w-full px-2 border border-gray-300 rounded-md outline-none h-9"
                  placeholderText="To Date"
                />
              </div>
              <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <button
                  className="w-full h-full font-semibold text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-700 hover:text-white hover:border-transparent"
                  onClick={fetchData}
                >
                  Filter
                </button>
              </div>
            </div>

            <div className="grid gap-5 mb-16 border-solid lg:grid-cols-3 border-1 border-white-500">
              <div className="bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <div className="flex items-center p-5 bg-white rounded-lg shadow">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-purple-600 bg-purple-100 rounded-full">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">
                      {invoiceamount}
                    </span>
                    <span className="block text-gray-500"> Invoices</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <div className="flex items-center p-5 bg-white rounded-lg shadow">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-blue-600 bg-blue-100 rounded-full">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">
                      {receiptamount}
                    </span>
                    <span className="block text-gray-500">Receipts</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border-solid rounded shadow-sm border-1 border-white-500">
                <div className="flex items-center p-5 bg-white rounded-lg shadow">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-green-600 bg-green-100 rounded-full">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">
                      {remainingamount}
                    </span>
                    <span className="block text-gray-500">Remaining</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid bg-white border-solid shadow-sm col-1 h-96 border-1 border-white-500">
              <div className="relative overflow-x-auto bg-white border-2 border-solid rounded shadow-md sm:rounded-lg">
                <CanvasJSStockChart
                  containerProps={containerProps}
                  options={stock_chart_options}
                />
              </div>
            </div>
            <br></br>

            <div className="grid bg-white border-solid shadow-sm col-1 border-1 border-white-500">
              <div className="relative overflow-x-auto bg-white border-2 border-solid rounded shadow-md sm:rounded-lg">
                <CanvasJSChart options={category_chart_options} />
              </div>
            </div>
            <br></br>
            {/* List of Data */}
            <div className="grid bg-white border-solid shadow-sm col-1 border-1 border-white-500">
              <div className="relative overflow-x-auto bg-white border-2 border-solid rounded shadow-md sm:rounded-lg">
                {selecttype === "Invoices" ? (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-white border-b border-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Sno
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Branch
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Patient ID
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Patient Name
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Invoice No
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Invoice Date
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Paid
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabledata1.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr className="bg-white border-b border-gray-100">
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.branch_name}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.patient_id}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.first_name}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.invoice_no}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.dates}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.total_amount}
                            </td>

                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.amount_paid}
                            </td>

                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.status}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              <button onClick={() => toggleDetails(item.id)}>
                                {detailsVisible[item.id] ? "Hide" : "View"}{" "}
                                Split-up
                              </button>
                            </td>
                          </tr>
                          {detailsVisible[item.id] && (
                            <tr className="">
                              <td colspan="10" className="">
                                <div className="grid grid-cols-5 gap-3 p-2 border-b border-gray-100 ">
                                  <div className="col-span-1 font-semibold text-center text-black bg-white">
                                    Sno
                                  </div>
                                  <div className="col-span-1 font-semibold text-center text-black bg-white">
                                    Branch Name
                                  </div>
                                  <div className="col-span-1 font-semibold text-center text-black bg-white">
                                    Schedule Date
                                  </div>
                                  <div className="col-span-1 font-semibold text-center text-black bg-white">
                                    Service Name
                                  </div>
                                  <div className="col-span-1 font-semibold text-center text-black bg-white">
                                    Amount
                                  </div>
                                </div>
                                {splitup[item.id] &&
                                  splitup[item.id].map((item, index) => (
                                    <div
                                      className="grid grid-cols-5 gap-3 p-2 border-b border-gray-100 "
                                      key={index}
                                    >
                                      <div className="col-span-1 font-normal text-center text-black bg-white">
                                        {index + 1}
                                      </div>
                                      <div className="col-span-1 font-normal text-center text-black bg-white">
                                        {item.branch_name}
                                      </div>
                                      <div className="col-span-1 font-normal text-center text-black bg-white">
                                        {item.schedule_date}
                                      </div>
                                      <div className="col-span-1 font-normal text-center text-black bg-white">
                                        {item.service_name}
                                      </div>
                                      <div className="col-span-1 font-normal text-center text-black bg-white">
                                        {item.amount}
                                      </div>
                                    </div>
                                  ))}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-white border-b border-gray-100 dark:bg-white dark:text-black">
                      <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Sno
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Branch
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Patient ID
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Patient Name
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Service Name
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Invoice No
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Service Date
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabledata2.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr className="bg-white border-b border-gray-100">
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.branch_name}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.patient_id}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.patient_name}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.service_name}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.invoice_no}
                            </td>
                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.service_date}
                            </td>

                            <td className="px-6 py-4 text-black whitespace-nowrap">
                              {item.amount}
                            </td>
                          </tr>
                          {/* {detailsVisible[index] && (
                              <tr class="border-b border-gray-100 bg-white">
                                <th scope="col" class="px-6 py-3 font-semibold">
                                  Sno
                                </th>
                                <th scope="col" class="px-6 py-3 font-semibold">
                                    Invoice Date
                                </th>
                                <th scope="col" class="px-6 py-3 font-semibold">
                                    Patient Name
                                </th>
                                <th scope="col" class="px-6 py-3 font-semibold">
                                    Amount
                                </th>
                              </tr>
                            )} */}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
          <footer className="col-span-7 p-10 bg-green-300 border-2 border-sky-500">
            <h1 className="text-2xl text-center">Footer</h1>
          </footer>
        </div>
      </div>

      {/* <div className="grid gap-5 mb-16 border-solid lg:grid-cols-5 border-1 border-white-500">
        <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500">
          
        </div>
        <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
        <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
        <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
        <div className="h-10 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
      </div>
      <div className="grid gap-5 mb-16 border-solid lg:grid-cols-3 border-1 border-white-500">
        <div className="h-40 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
        <div className="h-40 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
        <div className="h-40 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
      </div>
      <div className="grid gap-5 mb-16 border-solid lg:grid-cols-2 border-1 border-white-500">
        <div className="h-40 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
        <div className="h-40 bg-white border-solid rounded shadow-sm border-1 border-white-500"></div>
      </div>
      <div className="grid bg-white border-solid shadow-sm col-1 h-96 border-1 border-white-500"></div> */}
    </div>
  );
}

export default App;
